"use client";

import { useSyncExternalStore } from "react";

export type ConsentState = "granted" | "denied" | "unset";

const KEY = "tce-consent-v1";
const EVENT = "tce-consent-change";
export const OPEN_SETTINGS_EVENT = "tce-consent-open";

function read(): ConsentState {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : "unset";
  } catch {
    return "unset";
  }
}

export function setConsent(value: Exclude<ConsentState, "unset">) {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    // Storage blocked: consent applies to this page view only.
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));
}

let memory: ConsentState | null = null;

function subscribe(callback: () => void) {
  const onChange = (e: Event) => {
    memory = (e as CustomEvent<ConsentState>).detail ?? null;
    callback();
  };
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", callback);
  };
}

/** Returns null during SSR/hydration so nothing consent-gated renders on the server. */
export function useConsent(): ConsentState | null {
  return useSyncExternalStore(
    subscribe,
    () => {
      const stored = read();
      return stored === "unset" && memory ? memory : stored;
    },
    () => null,
  );
}
