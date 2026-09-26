"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="mt-8 space-y-4">
      <label className="block">
        <span className="eyebrow">Password</span>
        <input
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="mt-2 h-12 w-full rounded-xl border border-line-strong bg-ink-2 px-4 text-bone focus:border-gold focus:outline-none"
        />
      </label>
      {state?.error && (
        <p role="alert" className="text-sm text-red-300">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="h-12 w-full rounded-full bg-bone text-sm font-medium text-ink transition-colors hover:bg-gold disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
