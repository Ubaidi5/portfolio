"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";
import type { Testimonial } from "@/content/site";
import { LinkedInIcon } from "./LinkedInIcon";
import { cn } from "@/lib/cn";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const formatMonth = (iso: string) => {
  const [y, m] = iso.split("-");
  return `${months[Number(m) - 1]} ${y}`;
};

/** Longer recommendations are clamped on the card and read in full in the dialog. */
const isLong = (t: Testimonial) => t.quote.join(" ").length > 320;

const noop = () => () => {};

const morph = { type: "spring", bounce: 0.12, duration: 0.7 } as const;
const ease = [0.16, 1, 0.3, 1] as const;

export function Recommendations({ items, verifyUrl }: { items: Testimonial[]; verifyUrl: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  // True only in the browser, so the dialog portal never renders on the server.
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const track = useRef<HTMLUListElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpened = useRef<number | null>(null);

  const close = useCallback(() => setOpen(null), []);

  function onScroll() {
    const el = track.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first) return;
    const step = first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    setActive(Math.min(items.length - 1, Math.max(0, Math.round(el.scrollLeft / step))));
  }

  function go(i: number) {
    const card = track.current?.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  return (
    <>
      <ul
        ref={track}
        onScroll={onScroll}
        className="-mx-4 mt-12 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:mt-16 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((t, i) => (
          <li key={t.name} className="w-[86%] shrink-0 snap-start sm:w-[62%] md:w-[46%] lg:w-auto">
            <Card
              t={t}
              index={i}
              verifyUrl={verifyUrl}
              triggerRef={(el) => {
                triggers.current[i] = el;
              }}
              onOpen={() => {
                lastOpened.current = i;
                setOpen(i);
              }}
            />
          </li>
        ))}
      </ul>

      {items.length > 1 && (
        <div className="mt-6 flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-2" aria-hidden>
            {items.map((t, i) => (
              <span
                key={t.name}
                className={cn("h-1 rounded-full transition-all duration-500 ease-out-expo", i === active ? "w-8 bg-gold" : "w-3 bg-line-strong")}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <ArrowButton label="Previous recommendation" disabled={active === 0} onClick={() => go(active - 1)} flip />
            <ArrowButton label="Next recommendation" disabled={active === items.length - 1} onClick={() => go(active + 1)} />
          </div>
        </div>
      )}

      {mounted &&
        createPortal(
          <AnimatePresence
            onExitComplete={() => {
              if (lastOpened.current !== null) triggers.current[lastOpened.current]?.focus({ preventScroll: true });
            }}
          >
            {open !== null && <Dialog key={open} t={items[open]} index={open} verifyUrl={verifyUrl} onClose={close} />}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

function Card({
  t,
  index,
  verifyUrl,
  triggerRef,
  onOpen,
}: {
  t: Testimonial;
  index: number;
  verifyUrl: string;
  triggerRef: (el: HTMLButtonElement | null) => void;
  onOpen: () => void;
}) {
  const long = isLong(t);
  return (
    <motion.article
      layoutId={`recommendation-${index}`}
      transition={morph}
      style={{ borderRadius: 20 }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border border-line bg-ink-2 p-6 transition-colors duration-500 hover:border-line-strong sm:p-8",
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-56 rounded-full bg-gold/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
      />
      <div className="relative flex items-start justify-between gap-4">
        <VerifiedBadge href={t.profile ?? verifyUrl} />
        <span aria-hidden className="-mt-1 font-serif text-6xl leading-[0.7] text-gold/70">
          &ldquo;
        </span>
      </div>

      <blockquote className="relative mt-6 flex-1">
        <p className={cn("text-[1.0625rem] leading-[1.7] text-bone", long && "line-clamp-9 xl:line-clamp-7")}>{t.quote.join(" ")}</p>
      </blockquote>

      {long && (
        <button
          ref={triggerRef}
          type="button"
          onClick={onOpen}
          aria-haspopup="dialog"
          className="mt-5 inline-flex items-center gap-2 self-start text-sm text-gold transition-colors after:absolute after:inset-0 after:content-[''] hover:text-bone focus-visible:outline-none focus-visible:after:rounded-[20px] focus-visible:after:ring-1 focus-visible:after:ring-gold"
        >
          Read the full recommendation
          <svg viewBox="0 0 24 24" aria-hidden className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          <span className="sr-only"> from {t.name}</span>
        </button>
      )}

      <Person t={t} className="relative mt-8 border-t border-line pt-6" />
    </motion.article>
  );
}

function Dialog({ t, index, verifyUrl, onClose }: { t: Testimonial; index: number; verifyUrl: string; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();
  const titleId = `recommendation-title-${index}`;

  useEffect(() => {
    lenis?.stop();
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeButton.current?.focus({ preventScroll: true });

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !panel.current) return;
      const focusable = panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = overflow;
      lenis?.start();
    };
  }, [lenis, onClose]);

  return (
    <div className="fixed inset-0 z-100 grid place-items-center p-3 sm:p-6">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-ink/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
      />
      <motion.div
        ref={panel}
        layoutId={`recommendation-${index}`}
        transition={morph}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={{ borderRadius: 28 }}
        className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl flex-col overflow-hidden border border-line-strong bg-ink-2 shadow-[0_40px_120px_-24px_rgb(0_0_0/0.9)] sm:max-h-[calc(100dvh-3rem)]"
      >
        <span aria-hidden className="pointer-events-none absolute -top-48 left-1/2 size-96 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

        <motion.div
          className="relative flex min-h-0 flex-1 flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.35 } }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
        >
          <div className="flex items-center justify-between gap-4 px-6 pt-6 sm:px-10 sm:pt-8">
            <VerifiedBadge href={t.profile ?? verifyUrl} />
            <button
              ref={closeButton}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="-mr-2 grid size-10 place-items-center rounded-full border border-line text-bone-2 transition-colors hover:border-line-strong hover:text-bone focus-visible:border-gold focus-visible:outline-none"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-8 sm:px-10 sm:pb-10">
            <h2 id={titleId} className="sr-only">
              Recommendation from {t.name}
            </h2>
            <span aria-hidden className="mt-6 block h-12 font-serif text-8xl leading-[0.9] text-gold/70 sm:mt-8">
              &ldquo;
            </span>
            <blockquote className="mt-2 space-y-5 font-serif text-[1.375rem] leading-[1.4] tracking-[-0.01em] text-bone sm:text-[1.625rem]">
              {t.quote.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 + i * 0.07, duration: 0.7, ease }}
                >
                  {p}
                </motion.p>
              ))}
            </blockquote>
          </div>

          <div className="flex flex-col gap-4 border-t border-line bg-ink-2/90 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-6">
            <Person t={t} />
            <a
              href={t.profile ?? verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-bone px-5 text-sm font-medium text-ink transition-colors hover:bg-gold"
            >
              <LinkedInIcon className="size-3.5" />
              Read it on LinkedIn
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function Person({ t, className }: { t: Testimonial; className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Image
        src={t.photo}
        alt={t.name}
        width={48}
        height={48}
        className="size-12 shrink-0 rounded-full object-cover ring-1 ring-line-strong ring-offset-2 ring-offset-ink-2"
      />
      <div className="min-w-0 text-sm leading-snug">
        <p className="font-medium text-bone">{t.name}</p>
        <p className="text-bone-2">{t.title}</p>
        <p className="mt-0.5 text-xs text-mute">
          {t.relation} · {formatMonth(t.date)}
        </p>
      </div>
    </div>
  );
}

function VerifiedBadge({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-10 inline-flex items-center gap-2 rounded-full border border-line bg-ink/60 py-1 pl-1 pr-3 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-bone-2 transition-colors hover:border-line-strong hover:text-bone"
    >
      <span className="grid size-5 place-items-center rounded-full bg-[#0a66c2] text-white">
        <LinkedInIcon className="size-2.5" />
      </span>
      Verified on LinkedIn
      <VerifiedSeal className="size-4" />
    </a>
  );
}

/** A soft eight-lobed seal with a check, drawn to sit on the dark badge. */
function VerifiedSeal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={className}>
      <path d="M8.00 0.19L8.41 0.25L8.80 0.43L9.16 0.70L9.48 1.02L9.78 1.34L10.07 1.62L10.37 1.84L10.69 1.97L11.04 2.03L11.45 2.03L11.89 2.02L12.34 2.02L12.79 2.09L13.19 2.23L13.52 2.48L13.77 2.81L13.91 3.21L13.98 3.66L13.98 4.11L13.97 4.55L13.97 4.96L14.03 5.31L14.16 5.63L14.38 5.93L14.66 6.22L14.98 6.52L15.30 6.84L15.57 7.20L15.75 7.59L15.81 8.00L15.75 8.41L15.57 8.80L15.30 9.16L14.98 9.48L14.66 9.78L14.38 10.07L14.16 10.37L14.03 10.69L13.97 11.04L13.97 11.45L13.98 11.89L13.98 12.34L13.91 12.79L13.77 13.19L13.52 13.52L13.19 13.77L12.79 13.91L12.34 13.98L11.89 13.98L11.45 13.97L11.04 13.97L10.69 14.03L10.37 14.16L10.07 14.38L9.78 14.66L9.48 14.98L9.16 15.30L8.80 15.57L8.41 15.75L8.00 15.81L7.59 15.75L7.20 15.57L6.84 15.30L6.52 14.98L6.22 14.66L5.93 14.38L5.63 14.16L5.31 14.03L4.96 13.97L4.55 13.97L4.11 13.98L3.66 13.98L3.21 13.91L2.81 13.77L2.48 13.52L2.23 13.19L2.09 12.79L2.02 12.34L2.02 11.89L2.03 11.45L2.03 11.04L1.97 10.69L1.84 10.37L1.62 10.07L1.34 9.78L1.02 9.48L0.70 9.16L0.43 8.80L0.25 8.41L0.19 8.00L0.25 7.59L0.43 7.20L0.70 6.84L1.02 6.52L1.34 6.22L1.62 5.93L1.84 5.63L1.97 5.31L2.03 4.96L2.03 4.55L2.02 4.11L2.02 3.66L2.09 3.21L2.23 2.81L2.48 2.48L2.81 2.23L3.21 2.09L3.66 2.02L4.11 2.02L4.55 2.03L4.96 2.03L5.31 1.97L5.63 1.84L5.93 1.62L6.22 1.34L6.52 1.02L6.84 0.70L7.20 0.43L7.59 0.25Z" className="fill-gold" />
      <path d="M5.3 8.2 7.1 10l3.6-3.8" fill="none" className="stroke-ink" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowButton({ label, onClick, disabled, flip }: { label: string; onClick: () => void; disabled?: boolean; flip?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid size-11 place-items-center rounded-full border border-line-strong text-bone transition-colors hover:border-bone disabled:opacity-30 disabled:hover:border-line-strong"
    >
      <svg viewBox="0 0 24 24" aria-hidden className={cn("size-4", flip && "rotate-180")} fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}
