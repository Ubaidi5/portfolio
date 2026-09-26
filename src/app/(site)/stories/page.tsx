import { getStories } from "@/lib/stories";
import { StoriesGrid } from "@/components/StoriesGrid";
import { SubscribeButton } from "@/components/Subscribe";
import { RevealWords } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata, personId } from "@/lib/seo";

// Safety net: admin saves refresh these pages instantly; this catches anything missed (e.g. a build without database access).
export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "Stories",
  description: "Travel notes, tech lessons and life updates from Ubaid Hussain, a frontend engineer from Karachi.",
  path: "/stories",
});

export default async function StoriesPage() {
  const stories = await getStories();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Stories", path: "/stories" },
          ]),
          {
            "@type": "Blog",
            url: absoluteUrl("/stories"),
            name: "Stories by Ubaid Hussain",
            author: { "@id": personId },
            blogPost: stories.map((s) => ({ "@type": "BlogPosting", headline: s.title, url: absoluteUrl(`/stories/${s.slug}`), datePublished: s.date })),
          },
        ]}
      />
      <section className="container-page pb-24 pt-36 sm:pb-32 sm:pt-44">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Stories</p>
            <h1 className="mt-6 max-w-[14ch] font-serif text-display">
              <RevealWords text="Notes from the road" />{" "}
              <RevealWords text="and the keyboard." delay={0.3} className="italic text-gold" />
            </h1>
          </div>
          <SubscribeButton className="inline-flex h-12 w-fit shrink-0 items-center rounded-full border border-line-strong px-6 text-sm text-bone transition-colors hover:border-gold hover:text-gold">
            Get new stories by email
          </SubscribeButton>
        </div>
        <div className="mt-16 sm:mt-24">
          <StoriesGrid stories={stories} />
        </div>
      </section>
    </>
  );
}
