import Image from "next/image";
import Link from "next/link";
import type { StoryMeta } from "@/lib/stories";
import { cn } from "@/lib/cn";

const labels = { travel: "Travel", tech: "Tech", life: "Life" } as const;

const tints = {
  travel: "from-[#2a2217] via-[#16130e] to-ink-2",
  tech: "from-[#17202a] via-[#0f1318] to-ink-2",
  life: "from-[#261a1f] via-[#150f12] to-ink-2",
} as const;

const date = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(new Date(iso));

export function StoryCard({ story, className, priority }: { story: StoryMeta; className?: string; priority?: boolean }) {
  return (
    <article className={cn("group relative", className)}>
      <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-line bg-ink-2">
        {story.cover ? (
          <Image
            src={story.cover}
            alt={story.coverAlt ?? ""}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-[1.04]"
          />
        ) : (
          <div className={cn("absolute inset-0 bg-linear-to-br transition-transform duration-1000 ease-out-expo group-hover:scale-[1.04]", tints[story.category])}>
            <span aria-hidden className="absolute bottom-4 left-5 font-serif text-7xl italic leading-none text-bone/10 sm:text-8xl">
              {labels[story.category]}
            </span>
          </div>
        )}
        {story.draft && (
          <span className="absolute right-3 top-3 rounded-full bg-gold px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-wider text-ink">
            Draft
          </span>
        )}
      </div>
      <div className="mt-5 flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-mute">
        <span className="text-gold">{labels[story.category]}</span>
        <span aria-hidden>·</span>
        <time dateTime={story.date}>{date(story.date)}</time>
        <span aria-hidden>·</span>
        <span>{story.readingMinutes} min</span>
      </div>
      <h3 className="mt-3 font-serif text-2xl leading-tight tracking-tight text-bone sm:text-[1.75rem]">
        <Link href={`/stories/${story.slug}`} className="after:absolute after:inset-0">
          <span className="bg-linear-to-r from-bone to-bone bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-out-expo group-hover:bg-[length:100%_1px]">
            {story.title}
          </span>
        </Link>
      </h3>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-bone-2">{story.excerpt}</p>
    </article>
  );
}
