import "server-only";
import { Resend } from "resend";
import { company } from "@/content/company";

export type LeadKind = "enquiry" | "quote";

/** Strips control characters and angle brackets; values are rendered as plain text only. */
export function sanitize(value: string) {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[<>]/g, "")
    .trim();
}

export function sanitizeRecord(record: Record<string, string | boolean>) {
  return Object.fromEntries(
    Object.entries(record).map(([k, v]) => [k, typeof v === "string" ? sanitize(v) : v]),
  ) as Record<string, string | boolean>;
}

function toText(kind: LeadKind, fields: Record<string, string | boolean>) {
  const lines = Object.entries(fields)
    .filter(([, v]) => v !== "" && v !== undefined)
    .map(([k, v]) => `${k}: ${typeof v === "boolean" ? (v ? "Yes" : "No") : v}`);
  return [`New ${kind} from the ${company.name} website`, "", ...lines].join("\n");
}

/**
 * Sends the lead by email (Resend) and optionally to a CRM webhook.
 * Succeeds if at least one configured channel accepts the lead.
 */
export async function deliverLead(kind: LeadKind, fields: Record<string, string | boolean>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const webhook = process.env.CRM_WEBHOOK_URL;

  const tasks: Promise<void>[] = [];

  if (apiKey && to && from) {
    const resend = new Resend(apiKey);
    const name = typeof fields.name === "string" ? fields.name : "Website visitor";
    tasks.push(
      resend.emails
        .send({
          from,
          to: to.split(",").map((s) => s.trim()),
          subject: `[${kind === "quote" ? "Quote request" : "Enquiry"}] ${name}`,
          text: toText(kind, fields),
          replyTo: typeof fields.email === "string" ? fields.email : undefined,
        })
        .then(({ error }) => {
          if (error) throw new Error(`Resend: ${error.message}`);
        }),
    );
  }

  if (webhook) {
    tasks.push(
      fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.CRM_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.CRM_WEBHOOK_SECRET}` } : {}),
        },
        body: JSON.stringify({ kind, source: "website", submittedAt: new Date().toISOString(), fields }),
        signal: AbortSignal.timeout(10000),
      }).then((res) => {
        if (!res.ok) throw new Error(`CRM webhook responded ${res.status}`);
      }),
    );
  }

  if (tasks.length === 0) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[lead:${kind}] no delivery channel configured; logging instead\n${toText(kind, fields)}`);
      return { ok: true };
    }
    console.error("[lead] No delivery channel configured. Set RESEND_API_KEY/ENQUIRY_* or CRM_WEBHOOK_URL.");
    return { ok: false };
  }

  const results = await Promise.allSettled(tasks);
  results.forEach((r) => r.status === "rejected" && console.error(`[lead:${kind}] delivery failed`, r.reason));
  return { ok: results.some((r) => r.status === "fulfilled") };
}
