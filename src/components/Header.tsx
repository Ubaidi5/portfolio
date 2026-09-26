"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { nav } from "@/content/site";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { SubscribeButton } from "./Subscribe";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open ? "border-b border-line bg-ink/75 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <Link href="/" aria-label="Ubaid Hussain, home" className="relative z-10 -m-2 p-2">
          <Logo className="h-7 w-auto sm:h-8" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-bone-2 transition-colors hover:text-bone"
            >
              {item.label}
            </Link>
          ))}
          <SubscribeButton className="ml-3 rounded-full border border-line-strong px-4 py-2 text-sm text-bone transition-colors hover:border-gold hover:text-gold">
            Subscribe
          </SubscribeButton>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="relative z-10 -mr-2 grid size-11 place-items-center md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-3 w-6">
            <span className={cn("absolute left-0 top-0 h-px w-6 bg-bone transition-transform duration-500 ease-out-expo", open && "translate-y-1.5 rotate-45")} />
            <span className={cn("absolute bottom-0 left-0 h-px w-6 bg-bone transition-transform duration-500 ease-out-expo", open && "-translate-y-1.5 -rotate-45")} />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-ink md:hidden"
      >
        <nav aria-label="Mobile" className="container-page flex h-full flex-col justify-between py-8">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-2 font-serif text-5xl tracking-tight text-bone"
                >
                  <span className="font-mono text-xs text-mute">0{i + 1}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <SubscribeButton onClick={() => setOpen(false)} className="h-12 w-full rounded-full bg-bone text-sm font-medium text-ink">
            Get new stories by email
          </SubscribeButton>
        </nav>
      </div>
    </header>
  );
}
