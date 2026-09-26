"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { StoryMeta } from "@/lib/stories";
import { cn } from "@/lib/cn";
import { StoryCard } from "./StoryCard";

const filters = [
  { key: "all", label: "Everything" },
  { key: "travel", label: "Travel" },
  { key: "tech", label: "Tech" },
  { key: "life", label: "Life" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

export function StoriesGrid({ stories, limit }: { stories: StoryMeta[]; limit?: number }) {
  const [active, setActive] = useState<FilterKey>("all");
  const visible = stories.filter((s) => active === "all" || s.category === active).slice(0, limit);
  const count = (key: FilterKey) => (key === "all" ? stories.length : stories.filter((s) => s.category === key).length);

  return (
    <div>
      <div role="tablist" aria-label="Filter stories" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const selected = active === f.key;
          return (
            <button
              key={f.key}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(f.key)}
              className={cn(
                "relative isolate flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm sm:px-5 transition-colors",
                selected ? "text-ink" : "text-bone-2 hover:text-bone",
              )}
            >
              {selected && (
                <motion.span layoutId="story-filter" className="absolute inset-0 -z-10 rounded-full bg-bone" transition={{ type: "spring", bounce: 0.15, duration: 0.6 }} />
              )}
              {!selected && <span className="absolute inset-0 -z-10 rounded-full border border-line-strong" />}
              {f.label}
              <span className={cn("font-mono text-[0.6875rem]", selected ? "text-ink/60" : "text-mute")}>{count(f.key)}</span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="mt-10 grid gap-x-6 gap-y-14 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((story, i) => (
            <motion.li
              layout
              key={story.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <StoryCard story={story} priority={i < 3} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <p className="mt-10 rounded-2xl border border-dashed border-line-strong p-8 text-center text-bone-2">
          Nothing here yet. This chapter is still being lived.
        </p>
      )}
    </div>
  );
}
