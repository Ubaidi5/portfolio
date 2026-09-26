import Image from "next/image";
import { facts, site } from "@/content/site";
import { Reveal } from "../Reveal";
import { ScrollText } from "../ScrollText";

const story =
  "I shipped my first real website in 2019, for a charity building schools in Nigeria. Since then I've built dashboards that turn messy data into decisions, apps that run quietly inside other people's online stores, a startup I sold a little too early, and, as part of a team in Dubai, a faster home for one of the UAE's insurance marketplaces. These days I build alongside a team of AI agents I wrote myself. The tools keep changing. The obsession doesn't: whoever uses what I make should never have to think about it.";

export function Story() {
  return (
    <section id="story" aria-labelledby="story-title" className="scroll-mt-20 py-24 sm:py-32 lg:py-40">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow">Chapter 01</p>
            <h2 id="story-title" className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
              The short version
            </h2>
            <Reveal delay={0.1} className="mt-8 w-40 sm:w-52 lg:w-full lg:max-w-72">
              <figure className="group relative overflow-hidden rounded-2xl border border-line bg-ink-3">
                <Image
                  src={site.photo}
                  alt={`Portrait of ${site.name}`}
                  width={900}
                  height={900}
                  sizes="(min-width: 1024px) 288px, 208px"
                  className="aspect-4/5 w-full object-cover object-top grayscale transition-[filter,transform] duration-1000 ease-out-expo group-hover:scale-[1.03] group-hover:grayscale-0"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/80 to-transparent p-4 pt-10 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-bone-2">
                  {site.location}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ScrollText text={story} className="font-serif text-lede text-bone" />

          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-24 md:grid-cols-4">
            {facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.08} className="grid content-start gap-3 bg-ink p-5 sm:p-6">
                <dt className="text-sm leading-snug text-mute">{f.label}</dt>
                <dd className="row-start-1 font-serif text-5xl leading-none tracking-tight text-bone sm:text-6xl">{f.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
