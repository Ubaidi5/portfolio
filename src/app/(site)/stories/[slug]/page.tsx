import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryLabel, formatDate, getStories, getStory } from "@/lib/stories";
import { site } from "@/content/site";
import { StoryCard } from "@/components/StoryCard";
import { Markdown } from "@/components/Markdown";
import { SubscribeForm } from "@/components/Subscribe";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata, personId } from "@/lib/seo";

// Safety net: admin saves refresh these pages instantly; this catches anything missed (e.g. a build without database access).
export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

// New stories published from the admin render on first visit, then stay cached until the next edit.
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getStories()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) return {};
  return pageMetadata({
    title: story.title,
    description: story.excerpt,
    path: `/stories/${slug}`,
    type: "article",
    publishedTime: story.date,
  });
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) notFound();
  const { content, ...meta } = story;
  const more = (await getStories())
    .filter((s) => s.slug !== slug)
    .sort((a, b) => Number(b.category === meta.category) - Number(a.category === meta.category))
    .slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Stories", path: "/stories" },
            { name: meta.title, path: `/stories/${slug}` },
          ]),
          {
            "@type": "BlogPosting",
            headline: meta.title,
            description: meta.excerpt,
            url: absoluteUrl(`/stories/${slug}`),
            mainEntityOfPage: absoluteUrl(`/stories/${slug}`),
            datePublished: meta.date,
            dateModified: meta.updatedAt,
            articleSection: categoryLabel[meta.category],
            image: absoluteUrl(`/stories/${slug}/opengraph-image`),
            author: { "@id": personId, "@type": "Person", name: site.name, url: site.url },
            publisher: { "@id": personId },
          },
        ]}
      />

      <article className="pb-24 pt-36 sm:pb-32 sm:pt-44">
        <header className="container-page max-w-4xl">
          <Link href="/stories" className="eyebrow inline-flex items-center gap-2 transition-colors hover:text-bone">
            <span aria-hidden>←</span> Stories
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-mute">
            <span className="text-gold">{categoryLabel[meta.category]}</span>
            <span aria-hidden>·</span>
            <time dateTime={meta.date}>{formatDate(meta.date)}</time>
            <span aria-hidden>·</span>
            <span>{meta.readingMinutes} min read</span>
          </div>
          <h1 className="mt-5 font-serif text-headline text-bone">{meta.title}</h1>
          {meta.excerpt && <p className="mt-6 text-lg leading-relaxed text-bone-2 sm:text-xl">{meta.excerpt}</p>}
        </header>

        {meta.cover && (
          <div className="container-page mt-12 max-w-6xl sm:mt-16">
            <Image
              src={meta.cover}
              alt={meta.coverAlt ?? ""}
              width={1600}
              height={900}
              priority
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="aspect-video w-full rounded-2xl border border-line object-cover"
            />
          </div>
        )}

        <div className="container-page mt-14 max-w-4xl sm:mt-20">
          <Markdown>{content}</Markdown>

          <div className="mt-20 flex items-center gap-4 border-t border-line pt-10">
            <Image src={site.photo} alt="" width={56} height={56} className="size-14 rounded-full object-cover object-top" />
            <p className="text-sm leading-relaxed text-bone-2">
              Written by <span className="text-bone">{site.name}</span>, a {site.role.toLowerCase()} who likes to travel,
              build and write things down.
            </p>
          </div>

          <div className="mt-12 rounded-3xl border border-line bg-ink-2 p-6 sm:p-10">
            <p className="font-serif text-3xl tracking-tight text-bone">Enjoyed this one?</p>
            <p className="mt-2 text-bone-2">The next story lands in your inbox the day I publish it.</p>
            <SubscribeForm className="mt-6" />
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section aria-labelledby="more-title" className="border-t border-line py-20 sm:py-28">
          <div className="container-page">
            <h2 id="more-title" className="font-serif text-4xl tracking-tight sm:text-5xl">Keep reading</h2>
            <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2">
              {more.map((s) => (
                <StoryCard key={s.slug} story={s} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
