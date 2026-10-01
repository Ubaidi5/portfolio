import Link from "next/link";
import { crafts } from "@/content/site";
import { Reveal } from "../Reveal";

export function Crafts() {
  return (
    <section aria-labelledby="crafts-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Chapter 02</p>
            <h2 id="crafts-title" className="mt-4 max-w-[16ch] font-serif text-headline">
              What people trust me with
            </h2>
          </div>
          <Link
            href="/work"
            className="group inline-flex h-12 w-fit items-center gap-3 rounded-full border border-line-strong pl-6 pr-2 text-sm text-bone transition-colors hover:border-gold"
          >
            Explore my work
            <span aria-hidden className="grid size-8 place-items-center rounded-full bg-bone text-ink transition-[background-color,transform] duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:bg-gold">
              →
            </span>
          </Link>
        </div>

        <ol className="mt-14 border-t border-line sm:mt-20">
          {crafts.map((c, i) => (
            <Reveal as="li" key={c.index} delay={i * 0.05} className="group border-b border-line">
              <div className="grid gap-4 py-8 transition-[padding] duration-700 ease-out-expo sm:py-10 md:grid-cols-12 md:gap-8 lg:group-hover:pl-4">
                <span className="font-mono text-xs text-mute transition-colors group-hover:text-gold md:col-span-1 md:pt-3">
                  {c.index}
                </span>
                <h3 className="font-serif text-3xl leading-[1.05] tracking-tight text-bone sm:text-4xl md:col-span-6 lg:text-5xl">
                  {c.title}
                </h3>
                <div className="md:col-span-5 md:pt-2">
                  <p className="text-base leading-relaxed text-bone-2">{c.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
