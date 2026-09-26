import { renderOg, ogSize } from "@/lib/og";
import { categoryLabel, getStories, getStory } from "@/lib/stories";

export const alt = "Story by Ubaid Hussain";
export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getStories()).map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await getStory(slug);
  return renderOg({
    eyebrow: story ? `Stories · ${categoryLabel[story.category]}` : "Stories",
    title: story?.title ?? "Stories",
  });
}
