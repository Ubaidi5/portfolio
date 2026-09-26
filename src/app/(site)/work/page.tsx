import Image from "next/image";
import Link from "next/link";
import { experience, projects, site, skills } from "@/content/site";
import { Reveal, RevealWords } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata, personId } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "The professional side of Ubaid Hussain: six years building dashboards, Shopify and Wix apps, and fast Next.js platforms. Experience, selected projects and résumé.",
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
              Senior frontend engineer who is at home anywhere between a Figma file and a database. React and Next.js are
              my daily tools; performance, clarity and shipping on time are the habits.
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

      <section aria-labelledby="selected-title" className="border-t border-line py-20 sm:py-28">
        <div className="container-page">
          <h2 id="selected-title" className="font-serif text-headline">Selected work</h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal as="li" key={p.name} delay={(i % 3) * 0.06} className="group bg-ink">
                <article className="flex h-full flex-col p-6 transition-colors duration-500 group-hover:bg-ink-2 sm:p-8">
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-gold">{p.kind}</p>
                  <h3 className="mt-4 font-serif text-3xl tracking-tight text-bone sm:text-4xl">{p.name}</h3>
                  <p className="mt-4 flex-1 leading-relaxed text-bone-2">{p.body}</p>
                  <ul className="mt-8 flex flex-wrap gap-2" aria-label="Stack">
                    {p.stack.map((s) => (
                      <li key={s} className="rounded-full border border-line px-3 py-1 text-xs text-mute">
                        {s}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </ul>
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
                <Image
                  src={job.logo}
                  alt=""
                  width={56}
                  height={56}
                  className="size-12 rounded-xl border border-line object-cover sm:size-14"
                />
                <div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="text-xl font-medium text-bone">
                      {job.role} <span className="text-mute">at</span> {job.company}
                    </h3>
                    <p className="shrink-0 font-mono text-xs uppercase tracking-[0.12em] text-mute">{job.period}</p>
                  </div>
                  <p className="mt-1 text-sm text-mute">{job.place}</p>
                  <ul className="mt-4 space-y-2">
                    {job.points.map((pt) => (
                      <li key={pt} className="relative pl-5 leading-relaxed text-bone-2 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-gold">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="toolbox-title" className="border-t border-line py-20 sm:py-28">
        <div className="container-page">
          <h2 id="toolbox-title" className="font-serif text-headline">Toolbox</h2>
          <dl className="mt-12 grid gap-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((s) => (
              <div key={s.group}>
                <dt className="eyebrow">{s.group}</dt>
                <dd className="mt-4">
                  <ul className="space-y-2.5">
                    {s.items.map((item) => (
                      <li key={item} className="text-bone-2">{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
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
