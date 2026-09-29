import Image from "next/image";
import Link from "next/link";
import { experience, site, studio } from "@/content/site";
import { Reveal, RevealWords } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata, personId } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "The professional side of Ubaid Hussain: six years as a frontend engineer, the roles along the way, and KarachiSol, the product studio he founded.",
  path: "/work",
  type: "profile",
});

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]),
          {
            "@type": "ProfilePage",
            url: `${site.url}/work`,
            name: `${site.name} · Work`,
            mainEntity: { "@id": personId },
          },
        ]}
      />

      <section className="container-page pb-20 pt-36 sm:pb-28 sm:pt-44">
        <p className="eyebrow">The professional side</p>
        <h1 className="mt-6 max-w-[16ch] font-serif text-display">
          <RevealWords text="Six years of making hard things" />{" "}
          <RevealWords text="feel simple." delay={0.35} className="italic text-gold" />
        </h1>
        <div className="mt-12 grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal delay={0.6} className="md:col-span-7 lg:col-span-6">
            <p className="text-lg leading-relaxed text-bone-2">
              Senior frontend engineer who is at home anywhere between a design file and a database. The habits that
              stuck: clarity, speed, and shipping when I said I would.
            </p>
          </Reveal>
          <Reveal delay={0.75} className="flex flex-wrap gap-3 md:col-span-5 md:justify-end lg:col-span-6">
            <a
              href={site.resume}
              download
              className="inline-flex h-12 items-center rounded-full bg-bone px-6 text-sm font-medium text-ink transition-colors hover:bg-gold"
            >
              Download résumé
            </a>
            <a
              href={site.social[0].href}
              target="_blank"
              rel="me noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full border border-line-strong px-6 text-sm text-bone transition-colors hover:border-bone"
            >
              LinkedIn
            </a>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="studio-title" className="border-t border-line py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <a
              href={studio.work}
              target="_blank"
              rel="noopener"
              className="group relative isolate block overflow-hidden rounded-3xl border border-line bg-ink-2 p-6 transition-colors duration-500 hover:border-line-strong sm:p-10 lg:p-14"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-32 -top-32 -z-10 size-96 rounded-full bg-gold/10 opacity-60 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
              />
              <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-8">
                  <p className="eyebrow">Now building</p>
                  <h2 id="studio-title" className="mt-5 font-serif text-headline">
                    Founder of <em className="text-gold">{studio.name}</em>
                  </h2>
                  <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-bone-2">
                    {studio.summary} The products, case studies and technical write-ups live there now.
                  </p>
                </div>
                <div className="lg:col-span-4 lg:flex lg:justify-end">
                  <span className="inline-flex h-12 items-center gap-3 rounded-full bg-bone pl-6 pr-2 text-sm font-medium text-ink transition-colors duration-500 group-hover:bg-gold">
                    See the work at {studio.name}
                    <span aria-hidden className="grid size-8 place-items-center rounded-full bg-ink text-bone transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </span>
                </div>
              </div>
            </a>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="experience-title" className="border-t border-line py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2 id="experience-title" className="font-serif text-headline lg:sticky lg:top-32">
              Where I&rsquo;ve been
            </h2>
          </div>
          <ol className="lg:col-span-8">
            {experience.map((job, i) => (
              <Reveal as="li" key={job.company} delay={i * 0.04} className="grid gap-4 border-t border-line py-8 first:border-t-0 first:pt-0 sm:grid-cols-[3.5rem_1fr] sm:gap-6 sm:py-10">
                {job.logo ? (
                  <Image
                    src={job.logo}
                    alt=""
                    width={56}
                    height={56}
                    className="size-12 rounded-xl border border-line object-cover sm:size-14"
                  />
                ) : (
                  <span aria-hidden className="grid size-12 place-items-center rounded-xl border border-line bg-ink-2 font-serif text-2xl text-gold sm:size-14">
                    {job.company[0]}
                  </span>
                )}
                <div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="text-xl font-medium text-bone">
                      {job.role} <span className="text-mute">at</span> {job.company}
                    </h3>
                    <p className="shrink-0 font-mono text-xs uppercase tracking-[0.12em] text-mute">{job.period}</p>
                  </div>
                  <p className="mt-1 text-sm text-mute">{job.place}</p>
                  {job.points.map((pt) => (
                    <p key={pt} className="mt-4 max-w-2xl leading-relaxed text-bone-2">
                      {pt}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line py-24 sm:py-32">
        <div className="container-page flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-[16ch] font-serif text-headline">
            Have something worth <em className="text-gold">building well?</em>
          </h2>
          <Link href="/#contact" className="inline-flex h-12 items-center rounded-full bg-bone px-8 text-sm font-medium text-ink transition-colors hover:bg-gold">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  );
}
