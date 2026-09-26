import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getStoryById } from "@/lib/stories";
import { StoryEditor } from "@/components/admin/StoryEditor";

export const dynamic = "force-dynamic";

export default async function EditStoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
}) {
  await requireAdmin();
  const [{ id }, { created }] = await Promise.all([params, searchParams]);
  const story = await getStoryById(id);
  if (!story) notFound();
  const notice = created === "published" ? "Published. The live page is ready." : created ? "Draft saved." : undefined;
  return <StoryEditor story={story} notice={notice} />;
}
