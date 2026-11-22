import { stack } from "@/content/site";
import { Reveal } from "./Reveal";
import { TechIcon } from "./TechIcon";

/** The hero's right-hand card: the tools I ship with day to day, grouped by layer. */
export function TechStack() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-12 -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(217_183_126/0.10),transparent)]"
      />

      <figure className="relative overflow-hidden rounded-3xl border border-line bg-ink-2/80 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)] backdrop-blur-sm">
        <span
          aria-hidden
          className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-gold/60 to-transparent"
        />

        <figcaption className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-7">
          <span className="eyebrow">The stack</span>
          <span className="flex items-center gap-1.5" aria-hidden>
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-gold/70" />
          </span>
        </figcaption>

        <dl className="divide-y divide-line">
          {stack.map((group, i) => (
            <Reveal
              key={group.label}
              delay={1.2 + i * 0.08}
              className="grid gap-3 px-5 py-5 sm:grid-cols-[6.5rem_1fr] sm:items-center sm:gap-4 sm:px-7 lg:grid-cols-1 lg:gap-3 xl:grid-cols-[6.5rem_1fr] xl:gap-4"
            >
              <dt className="flex items-baseline gap-2 font-mono text-[0.6875rem] leading-none tracking-[0.14em] text-mute uppercase">
                <span className="text-gold/70">0{i + 1}</span>
                {group.label}
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="group inline-flex h-9 items-center gap-2 rounded-full border border-line bg-ink-3/70 pr-3.5 pl-2.5 text-sm text-bone-2 transition-colors duration-500 ease-out-expo hover:border-gold/40 hover:text-bone"
                    >
                      {"icon" in item ? (
                        <TechIcon
                          name={item.icon}
                          className="size-4 shrink-0 text-bone/75 transition-colors duration-500 ease-out-expo group-hover:text-gold"
                        />
                      ) : (
                        <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0 text-gold" fill="currentColor">
                          <path d="M8 0c.4 3.9 2.1 6.6 8 8-5.9 1.4-7.6 4.1-8 8-.4-3.9-2.1-6.6-8-8 5.9-1.4 7.6-4.1 8-8Z" />
                        </svg>
                      )}
                      {item.name}
                    </li>
                  ))}
                </ul>
              </dd>
            </Reveal>
          ))}
        </dl>

        <div className="flex items-start gap-3 border-t border-line bg-gold-soft/40 px-5 py-4 sm:items-center sm:px-7">
          <span className="relative mt-1.5 flex size-2 shrink-0 sm:mt-0">
            <span className="absolute inset-0 animate-pulse-dot rounded-full bg-gold" />
          </span>
          <p className="text-sm leading-relaxed text-pretty text-bone-2">
            <span className="text-bone">Lately:</span> shipping with an AI orchestrator and agent skills I wrote myself.
          </p>
        </div>
      </figure>
    </div>
  );
}
