import Link from "next/link";
import { site } from "@/content/site";
import { CursorGlow } from "../CursorGlow";
import { LocalTime } from "../LocalTime";
import { Reveal, RevealWords } from "../Reveal";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden pt-28 sm:pt-32">
      <div
        aria-hidden
        className="absolute -top-1/3 left-1/2 -z-10 aspect-square w-[140%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(217_183_126/0.10),transparent)] sm:w-[90%]"
      />
      <CursorGlow />

      <div className="container-page flex flex-1 flex-col justify-center py-12">
        <Reveal>
          <p className="eyebrow">
            {site.name} <span className="mx-2 text-line-strong">/</span> {site.role}
          </p>
        </Reveal>

        <h1 className="mt-6 max-w-[14ch] font-serif text-display text-bone sm:mt-8">
          <RevealWords text="I build the part of your product people" delay={0.15} />{" "}
          <RevealWords text="remember." delay={0.6} className="italic text-gold" />
        </h1>

        <div className="mt-10 grid gap-8 sm:mt-14 md:grid-cols-12 md:items-end">
          <Reveal delay={0.9} className="md:col-span-6 lg:col-span-5">
            <p className="text-base leading-relaxed text-bone-2 sm:text-lg">
              Six years of turning complicated products into interfaces that feel effortless. Right now I&rsquo;m doing
              that for {site.currently.company} in {site.currently.city}.
            </p>
          </Reveal>
          <Reveal delay={1.05} className="flex flex-wrap gap-3 md:col-span-6 md:justify-end lg:col-span-7">
            <Link
              href="/#story"
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-bone px-6 text-sm font-medium text-ink transition-colors hover:bg-gold"
            >
              Read my story
              <span aria-hidden className="transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5">↓</span>
            </Link>
            <Link
              href="/work"
              className="inline-flex h-12 items-center rounded-full border border-line-strong px-6 text-sm text-bone transition-colors hover:border-bone"
            >
              See the work
            </Link>
          </Reveal>
        </div>
      </div>

      <Reveal delay={1.2} className="container-page">
        <div className="flex items-center justify-between gap-4 border-t border-line py-5 text-xs text-mute sm:text-sm">
          <p className="flex items-center gap-2.5">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-pulse-dot rounded-full bg-gold" />
            </span>
            <span>
              Open to select projects <span className="hidden sm:inline">and conversations</span>
            </span>
          </p>
          <p className="font-mono">
            Karachi <span className="text-bone-2"><LocalTime /></span>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
