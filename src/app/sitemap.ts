import type { MetadataRoute } from "next";
import { getStories } from "@/lib/stories";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const stories = getStories().filter((s) => !s.draft);
  const latest = stories[0]?.date ?? new Date().toISOString();
  return [
    { url: absoluteUrl("/"), lastModified: latest, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/work"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/stories"), lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    ...stories.map((s) => ({
      url: absoluteUrl(`/stories/${s.slug}`),
      lastModified: s.date,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
