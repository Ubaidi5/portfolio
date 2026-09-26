import { requireAdmin } from "@/lib/auth";
import { StoryEditor } from "@/components/admin/StoryEditor";

export default async function NewStoryPage() {
  await requireAdmin();
  return <StoryEditor />;
}
