import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../actions";
import { Logo } from "@/components/Logo";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/admin" aria-label="Admin home">
              <Logo className="h-6 w-auto" />
            </Link>
            <span className="hidden font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-mute sm:inline">Admin</span>
          </div>
          <nav className="flex items-center gap-0.5 whitespace-nowrap text-sm sm:gap-1">
            <Link href="/admin" className="hidden rounded-full px-3 py-2 text-bone-2 hover:text-bone sm:inline-block">
              Stories
            </Link>
            <Link href="/" target="_blank" className="rounded-full px-2.5 py-2 text-bone-2 hover:text-bone sm:px-3">
              View site ↗
            </Link>
            <form action={logout}>
              <button type="submit" className="rounded-full px-2.5 py-2 text-mute hover:text-bone sm:px-3">
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">{children}</main>
    </>
  );
}
