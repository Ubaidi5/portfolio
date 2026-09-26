// Imports content/stories/*.mdx into MongoDB as drafts (skips slugs that already exist).
// Usage: node --env-file=.env.local scripts/seed-stories.mjs
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is not set");

const dir = path.join(process.cwd(), "content", "stories");
const client = await new MongoClient(uri).connect();
const stories = client.db(process.env.MONGODB_DB || "website").collection("stories");
await stories.createIndex({ slug: 1 }, { unique: true });

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))) {
  const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
  const slug = file.replace(/\.mdx$/, "");
  if (await stories.findOne({ slug })) {
    console.log(`skip  ${slug} (exists)`);
    continue;
  }
  const now = new Date();
  await stories.insertOne({
    slug,
    title: String(data.title),
    excerpt: String(data.excerpt ?? ""),
    category: data.category,
    content: content.trim(),
    cover: data.cover ?? "",
    coverAlt: data.coverAlt ?? "",
    status: "draft",
    date: new Date(data.date),
    createdAt: now,
    updatedAt: now,
  });
  console.log(`added ${slug}`);
}

await client.close();
