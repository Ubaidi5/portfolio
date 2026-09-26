"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { endSession, passwordMatches, requireAdmin, startSession } from "@/lib/auth";
import {
  STORIES_TAG,
  categories,
  createStory,
  deleteStory,
  getStoryById,
  slugTaken,
  slugify,
  updateStory,
  type Category,
  type StoryInput,
} from "@/lib/stories";

export type FormState = { error?: string; saved?: string } | undefined;

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    // Slow down guessing.
    await new Promise((r) => setTimeout(r, 1000));
    return { error: "That password isn't right." };
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

function refreshSite(slugs: string[]) {
  // Stale content must never be served after an edit, so expire immediately.
  revalidateTag(STORIES_TAG, { expire: 0 });
  revalidatePath("/", "layout");
  slugs.forEach((slug) => revalidatePath(`/stories/${slug}`));
}

function parse(formData: FormData): StoryInput | string {
  const title = String(formData.get("title") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? "") || title);
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const category = String(formData.get("category") ?? "");
  const content = String(formData.get("content") ?? "");
  const cover = String(formData.get("cover") ?? "").trim();
  const coverAlt = String(formData.get("coverAlt") ?? "").trim();
  const dateRaw = String(formData.get("date") ?? "");
  const status = formData.get("intent") === "publish" ? "published" : "draft";

  if (!title) return "Give the story a title.";
  if (!slug) return "The URL slug can only use letters, numbers and dashes.";
  if (!(categories as readonly string[]).includes(category)) return "Pick a category.";
  if (status === "published" && !excerpt) return "Add a short excerpt before publishing. It shows on cards, Google and emails.";
  if (status === "published" && content.trim().length < 50) return "The story needs more words before it can be published.";
  if (cover && !/^https:\/\//.test(cover)) return "The cover must be an https image URL.";
  const date = dateRaw ? new Date(`${dateRaw}T12:00:00Z`) : new Date();
  if (Number.isNaN(date.getTime())) return "That date doesn't look right.";

  return { title, slug, excerpt, category: category as Category, content, cover, coverAlt, status, date };
}

export async function saveStory(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const input = parse(formData);
  if (typeof input === "string") return { error: input };
  if (await slugTaken(input.slug, id || undefined)) return { error: `Another story already uses /stories/${input.slug}.` };

  if (id) {
    const before = await getStoryById(id);
    if (!before) return { error: "This story no longer exists." };
    await updateStory(id, input);
    refreshSite([before.slug, input.slug]);
    return { saved: input.status === "published" ? "Published. The live page is updated." : "Draft saved." };
  }

  const newId = await createStory(input);
  refreshSite([input.slug]);
  redirect(`/admin/stories/${newId}?created=${input.status}`);
}

export async function removeStory(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const story = await getStoryById(id);
  if (story) {
    await deleteStory(id);
    refreshSite([story.slug]);
  }
  redirect("/admin");
}
