"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "done" | "error";

const field =
  "w-full border-0 border-b border-line-strong bg-transparent px-0 py-3 text-base text-bone placeholder:text-mute focus:border-gold focus:outline-none focus:ring-0";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("loading");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }),
    }).catch(() => null);
    setStatus(res?.ok ? "done" : "error");
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-2xl border border-gold/30 bg-gold-soft p-8">
        <p className="font-serif text-3xl tracking-tight text-bone">Message received.</p>
        <p className="mt-3 text-bone-2">I read everything myself and usually reply within a day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow">Your name</span>
          <input name="name" required autoComplete="name" className={field} placeholder="Jane Cooper" />
        </label>
        <label className="block">
          <span className="eyebrow">Email</span>
          <input name="email" type="email" required autoComplete="email" className={field} placeholder="jane@company.com" />
        </label>
      </div>
      <label className="block">
        <span className="eyebrow">What are you building?</span>
        <textarea name="message" required rows={4} className={`${field} resize-none`} placeholder="A few lines is plenty." />
      </label>
      {/* Honeypot: bots fill it, people never see it. */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-12 rounded-full bg-bone px-8 text-sm font-medium text-ink transition-colors hover:bg-gold disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Send message"}
        </button>
        {status === "error" && (
          <p role="alert" className="text-sm text-red-300">
            Something went wrong. Email me directly instead.
          </p>
        )}
      </div>
    </form>
  );
}
