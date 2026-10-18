import "server-only";
import type { z } from "zod";
import { antiSpamSchema } from "@/lib/schemas";
import { deliverLead, sanitizeRecord, type LeadKind } from "./deliver";
import { clientIp, rateLimit } from "./rate-limit";
import { verifyTurnstile } from "./turnstile";

const MAX_BODY_BYTES = 20_000;

function json(body: Record<string, unknown>, status: number, headers?: HeadersInit) {
  return Response.json(body, { status, headers });
}

/** Shared POST pipeline: size check → rate limit → honeypot → validation → captcha → delivery. */
export async function handleLead(request: Request, kind: LeadKind, schema: z.ZodObject) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return json({ ok: false, message: "Submission is too large." }, 413);

  const ip = clientIp(request);
  const limit = rateLimit(`${kind}:${ip}`);
  if (!limit.ok) {
    return json(
      { ok: false, message: "Too many submissions. Please try again in a few minutes or call us." },
      429,
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400);
  }

  const spam = antiSpamSchema.safeParse(raw);
  if (!spam.success) return json({ ok: false, message: "Invalid request." }, 400);
  // Honeypot filled: pretend success so bots learn nothing.
  if (spam.data.website) return json({ ok: true }, 200);

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return json(
      { ok: false, message: "Please check the highlighted fields.", errors: parsed.error.flatten().fieldErrors },
      422,
    );
  }

  if (!(await verifyTurnstile(spam.data.turnstileToken, ip))) {
    return json({ ok: false, message: "Verification failed. Please refresh the page and try again." }, 400);
  }

  const result = await deliverLead(kind, sanitizeRecord(parsed.data as Record<string, string | boolean>));
  if (!result.ok) {
    return json(
      { ok: false, message: "We couldn't send your request right now. Please try again or contact us directly." },
      502,
    );
  }
  return json({ ok: true }, 200);
}
