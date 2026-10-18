import "server-only";

/**
 * Fixed-window, in-memory IP rate limiter.
 *
 * Fluid Compute reuses instances, so this blocks bursts from a single client,
 * but limits are per instance. For strict global limits, back this with a
 * shared store (e.g. Upstash Redis) or a Vercel Firewall rate-limit rule.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, now = Date.now()) {
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
  }
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true as const };
  }
  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    return { ok: false as const, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true as const };
}

export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}
