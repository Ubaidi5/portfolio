import { testimonials } from "@/content/site";
import { Reveal } from "../Reveal";

export function Testimonials() {
  const items = testimonials.filter((t) => process.env.NODE_ENV !== "production" || !t.placeholder);
  if (items.length === 0) return null;
  const [lead, ...rest] = items;

  return (
    <section aria-labelledby="words-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <p className="eyebrow">Chapter 04</p>
        <h2 id="words-title" className="mt-4 font-serif text-headline">
          In other people&rsquo;s words
        </h2>

        <Reveal>
          <figure className="mt-14 border-l border-gold pl-6 sm:mt-20 sm:pl-10 lg:max-w-5xl">
            <blockquote className="font-serif text-lede text-bone">
              <p>&ldquo;{lead.quote}&rdquo;</p>
            </blockquote>
            <Attribution t={lead} className="mt-8" />
          </figure>
        </Reveal>

        {rest.length > 0 && (
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-20 md:grid-cols-2">
            {rest.map((t, i) => (
              <Reveal key={i} delay={i * 0.08} className="bg-ink">
                <figure className="flex h-full flex-col justify-between gap-10 p-6 sm:p-10">
                  <blockquote className="text-lg leading-relaxed text-bone sm:text-xl">
                    <p>&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>
                  <Attribution t={t} />
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Attribution({ t, className }: { t: (typeof testimonials)[number]; className?: string }) {
  const initials = t.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
  return (
    <figcaption className={`flex items-center gap-4 ${className ?? ""}`}>
      <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-xs text-bone-2">
        {initials}
      </span>
      <span className="text-sm">
        <span className="block text-bone">{t.name}</span>
        <span className="block text-mute">
          {t.title}, {t.company}
          {t.href && (
            <>
              {" · "}
              <a href={t.href} target="_blank" rel="noopener noreferrer" className="underline decoration-line-strong underline-offset-4 hover:text-bone">
                Verify on LinkedIn
              </a>
            </>
          )}
        </span>
      </span>
    </figcaption>
  );
}
