"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

/** Reads the hidden honeypot field from the submitted form. */
export function honeypotValue(event?: { target: EventTarget | null }) {
  const form = event?.target instanceof HTMLFormElement ? event.target : null;
  return form ? String(new FormData(form).get("website") ?? "") : "";
}

type ApiResponse = { ok: boolean; message?: string; errors?: Record<string, string[] | undefined> };

/**
 * Posts a lead to an API route. On success navigates to the thank-you page;
 * on failure keeps all form values, surfaces server field errors and moves
 * focus to the error summary.
 */
export function useLeadSubmit<T extends FieldValues>(
  endpoint: string,
  setError: UseFormSetError<T>,
  onFieldErrors?: (fields: string[]) => void,
) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const errorRef = useRef<HTMLDivElement>(null);

  async function submit(values: T, honeypot: string) {
    setServerError(null);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot, turnstileToken }),
      });
      const data = (await res.json().catch(() => ({ ok: false }))) as ApiResponse;
      if (res.ok && data.ok) {
        router.push("/thank-you");
        return;
      }
      if (data.errors) {
        const fields: string[] = [];
        for (const [field, messages] of Object.entries(data.errors)) {
          if (!messages?.[0]) continue;
          setError(field as Path<T>, { type: "server", message: messages[0] });
          fields.push(field);
        }
        if (fields.length) onFieldErrors?.(fields);
      }
      setServerError(data.message ?? "Something went wrong. Please try again.");
    } catch {
      setServerError("We couldn't reach the server. Please check your connection and try again. Your details are still here.");
    }
    setTurnstileReset((n) => n + 1);
    requestAnimationFrame(() => errorRef.current?.focus());
  }

  return { submit, serverError, errorRef, setTurnstileToken, turnstileReset };
}
