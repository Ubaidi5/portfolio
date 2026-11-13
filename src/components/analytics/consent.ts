"use client";

import { useSyncExternalStore } from "react";

const KEY = "tracking-consent";
const CHANGE = "tracking-consent-change";

export type Consent = "granted" | "denied" | "unset" | "pending";

// Used when the browser blocks localStorage, so the banner still goes away for this visit.
let memory: Consent = "unset";

function read(): Consent {
  // Global Privacy Control is an explicit "no", as promised in the privacy policy.
  if ((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return "denied";
  try {
    const stored = localStorage.getItem(KEY);
    return stored === "granted" || stored === "denied" ? stored : memory;
  } catch {
    return memory;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function setConsent(choice: "granted" | "denied" | "unset") {
  memory = choice;
  try {
    if (choice === "unset") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, choice);
  } catch {}
  window.dispatchEvent(new Event(CHANGE));
}

/** "pending" on the server and during hydration, so tracking and the banner never appear in the HTML. */
export const useConsent = () => useSyncExternalStore<Consent>(subscribe, read, () => "pending");
