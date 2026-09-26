import { getStories } from "@/lib/stories";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

// Rebuilt in the background at most hourly, and on every admin save, so crawlers never wait on the database.
export const revalidate = 3600;

const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);

export async function GET() {
  const items = (await getStories())
    .map(
      (s) => `
    <item>
      <title>${esc(s.title)}</title>
      <link>${absoluteUrl(`/stories/${s.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/stories/${s.slug}`)}</guid>
      <description>${esc(s.excerpt)}</description>
      <category>${s.category}</category>
      <pubDate>${new Date(s.date).toUTCString()}</pubDate>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} · Stories</title>
    <link>${site.url}/stories</link>
    <description>Travel, tech and life, written by ${esc(site.name)}.</description>
    <language>en</language>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
