import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const categories = ["travel", "tech", "life"] as const;
export type Category = (typeof categories)[number];

export const categoryLabel: Record<Category, string> = {
  travel: "Travel",
  tech: "Tech",
  life: "Life",
};

export type StoryMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  cover?: string;
  coverAlt?: string;
  readingMinutes: number;
  draft: boolean;
};

const dir = path.join(process.cwd(), "content", "stories");
const showDrafts = process.env.NODE_ENV !== "production";

function readFile(file: string) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.trim().split(/\s+/).length;
  const meta: StoryMeta = {
    slug: file.replace(/\.mdx$/, ""),
    title: String(data.title),
    excerpt: String(data.excerpt ?? ""),
    category: (categories as readonly string[]).includes(data.category) ? data.category : "life",
    date: new Date(data.date).toISOString(),
    cover: data.cover,
    coverAlt: data.coverAlt,
    readingMinutes: Math.max(1, Math.round(words / 220)),
    draft: Boolean(data.draft),
  };
  return { meta, content };
}

export function getStories(): StoryMeta[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => readFile(f).meta)
    .filter((s) => showDrafts || !s.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getStory(slug: string) {
  const file = `${slug}.mdx`;
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(path.join(dir, file))) return null;
  const story = readFile(file);
  if (story.meta.draft && !showDrafts) return null;
  return story;
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(
    new Date(iso),
  );
}
