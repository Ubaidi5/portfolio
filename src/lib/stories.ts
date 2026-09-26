import "server-only";
import { unstable_cache } from "next/cache";
import { ObjectId, type Collection } from "mongodb";
import { getDb, hasDatabase } from "./db";

export const categories = ["travel", "tech", "life"] as const;
export type Category = (typeof categories)[number];

export const categoryLabel: Record<Category, string> = {
  travel: "Travel",
  tech: "Tech",
  life: "Life",
};

export const STORIES_TAG = "stories";

export type StoryStatus = "draft" | "published";

type StoryDoc = {
  _id: ObjectId;
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  content: string;
  cover?: string;
  coverAlt?: string;
  status: StoryStatus;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type StoryMeta = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  updatedAt: string;
  cover?: string;
  coverAlt?: string;
  readingMinutes: number;
  status: StoryStatus;
};

export type Story = StoryMeta & { content: string };

export type StoryInput = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  content: string;
  cover?: string;
  coverAlt?: string;
  status: StoryStatus;
  date: Date;
};

async function collection(): Promise<Collection<StoryDoc>> {
  const col = (await getDb()).collection<StoryDoc>("stories");
  return col;
}

let indexesReady: Promise<unknown> | undefined;
async function ensureIndexes() {
  indexesReady ??= collection().then((c) =>
    Promise.all([c.createIndex({ slug: 1 }, { unique: true }), c.createIndex({ status: 1, date: -1 })]),
  );
  return indexesReady;
}

const toStory = (d: StoryDoc): Story => ({
  id: d._id.toHexString(),
  slug: d.slug,
  title: d.title,
  excerpt: d.excerpt,
  category: d.category,
  content: d.content,
  cover: d.cover || undefined,
  coverAlt: d.coverAlt || undefined,
  status: d.status,
  date: d.date.toISOString(),
  updatedAt: d.updatedAt.toISOString(),
  readingMinutes: Math.max(1, Math.round(d.content.trim().split(/\s+/).length / 220)),
});

const toMeta = (story: Story): StoryMeta => {
  const meta: Partial<Story> = { ...story };
  delete meta.content;
  return meta as StoryMeta;
};

// ---------- Public reads (cached, invalidated by the "stories" tag on every admin write) ----------

export const getStories = unstable_cache(
  async (): Promise<StoryMeta[]> => {
    if (!hasDatabase()) return [];
    const docs = await (await collection()).find({ status: "published" }).sort({ date: -1 }).toArray();
    return docs.map((d) => toMeta(toStory(d)));
  },
  ["published-stories"],
  { tags: [STORIES_TAG] },
);

export const getStory = unstable_cache(
  async (slug: string): Promise<Story | null> => {
    if (!hasDatabase() || !/^[a-z0-9-]+$/.test(slug)) return null;
    const doc = await (await collection()).findOne({ slug, status: "published" });
    return doc ? toStory(doc) : null;
  },
  ["published-story"],
  { tags: [STORIES_TAG] },
);

// ---------- Admin reads and writes (never cached) ----------

export async function listAllStories(): Promise<StoryMeta[]> {
  const docs = await (await collection()).find().sort({ date: -1 }).toArray();
  return docs.map((d) => toMeta(toStory(d)));
}

export async function getStoryById(id: string): Promise<Story | null> {
  if (!ObjectId.isValid(id)) return null;
  const doc = await (await collection()).findOne({ _id: new ObjectId(id) });
  return doc ? toStory(doc) : null;
}

export async function createStory(input: StoryInput): Promise<string> {
  await ensureIndexes();
  const now = new Date();
  const { insertedId } = await (await collection()).insertOne({ _id: new ObjectId(), ...input, createdAt: now, updatedAt: now });
  return insertedId.toHexString();
}

export async function updateStory(id: string, input: StoryInput): Promise<void> {
  await ensureIndexes();
  await (await collection()).updateOne({ _id: new ObjectId(id) }, { $set: { ...input, updatedAt: new Date() } });
}

export async function deleteStory(id: string): Promise<void> {
  await (await collection()).deleteOne({ _id: new ObjectId(id) });
}

export async function slugTaken(slug: string, exceptId?: string): Promise<boolean> {
  const filter = exceptId ? { slug, _id: { $ne: new ObjectId(exceptId) } } : { slug };
  return (await (await collection()).countDocuments(filter, { limit: 1 })) > 0;
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(iso));
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
