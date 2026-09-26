import Link from "next/link";
import { getStories } from "@/lib/stories";
import { StoriesGrid } from "../StoriesGrid";
import { SubscribeButton } from "../Subscribe";

export async function StoriesSection() {
  const stories = await getStories();
  if (stories.length === 0) return null;

  return (
    <section aria-labelledby="stories-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Chapter 03</p>
            <h2 id="stories-title" className="mt-4 font-serif text-headline">
              Stories, <em className="text-mute">off the clock</em>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-bone-2">
              Places I&rsquo;ve been, things I&rsquo;ve broken, and what I learned putting them back together.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <SubscribeButton className="inline-flex h-12 items-center rounded-full border border-line-strong px-6 text-sm text-bone transition-colors hover:border-gold hover:text-gold">
              Get new stories by email
            </SubscribeButton>
            <Link href="/stories" className="inline-flex h-12 items-center rounded-full bg-bone px-6 text-sm font-medium text-ink transition-colors hover:bg-gold">
              All stories
            </Link>
          </div>
        </div>
        <div className="mt-12 sm:mt-16">
          <StoriesGrid stories={stories} limit={6} />
        </div>
      </div>
    </section>
  );
}
