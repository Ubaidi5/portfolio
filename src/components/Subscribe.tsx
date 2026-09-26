"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/cn";

type Status = "idle" | "loading" | "done" | "error";

const SubscribeContext = createContext<() => void>(() => {});
export const useSubscribe = () => useContext(SubscribeContext);

/** Owns the single subscribe dialog. It opens only when a visitor asks for it. */
export function SubscribeProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();
  const open = useCallback(() => {
    ref.current?.showModal();
    lenis?.stop();
  }, [lenis]);

  useEffect(() => {
    const dialog = ref.current;
    const onClose = () => lenis?.start();
    dialog?.addEventListener("close", onClose);
    return () => dialog?.removeEventListener("close", onClose);
  }, [lenis]);

  return (
    <SubscribeContext.Provider value={open}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="subscribe-title"
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-line-strong bg-ink-2 p-0 text-bone shadow-2xl backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-6">
            <p className="eyebrow">Stories by email</p>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="-mr-2 -mt-2 grid size-9 place-items-center rounded-full text-mute transition-colors hover:bg-white/5 hover:text-bone"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
          <h2 id="subscribe-title" className="mt-4 font-serif text-4xl leading-none tracking-tight">
            When I write, <em className="text-gold">you&rsquo;ll know.</em>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-bone-2">
            New stories about travel, tech and building things, sent the day they go up. Around one or two a month, never anything else.
          </p>
          <SubscribeForm className="mt-6" autoFocus />
        </div>
      </dialog>
    </SubscribeContext.Provider>
  );
}

export function SubscribeForm({ className, autoFocus }: { className?: string; autoFocus?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setStatus("loading");
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => null);
    setStatus(res?.ok ? "done" : "error");
  }

  if (status === "done") {
    return (
      <p className={cn("rounded-xl border border-gold/30 bg-gold-soft px-4 py-3 text-sm text-bone", className)} role="status">
        You&rsquo;re in. Check your inbox to confirm.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      <label htmlFor={autoFocus ? "subscribe-email-dialog" : "subscribe-email"} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={autoFocus ? "subscribe-email-dialog" : "subscribe-email"}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="h-12 min-w-0 flex-1 rounded-full border border-line-strong bg-transparent px-5 text-sm text-bone placeholder:text-mute focus:border-gold focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-12 shrink-0 rounded-full bg-bone px-6 text-sm font-medium text-ink transition-colors hover:bg-gold disabled:opacity-60"
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-3 text-sm text-red-300" role="alert">
          That didn&rsquo;t go through. Try again in a moment.
        </p>
      )}
    </form>
  );
}

export function SubscribeButton({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const open = useSubscribe();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        open();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
