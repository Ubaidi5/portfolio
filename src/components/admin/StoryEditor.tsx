"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { removeStory, saveStory } from "@/app/admin/actions";
import type { Story } from "@/lib/stories";
import { Markdown } from "@/components/Markdown";
import { cn } from "@/lib/cn";

const categories = [
  { value: "travel", label: "Travel" },
  { value: "tech", label: "Tech" },
  { value: "life", label: "Life" },
] as const;

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const field =
  "w-full rounded-xl border border-line-strong bg-ink-2 px-4 py-3 text-sm text-bone placeholder:text-mute focus:border-gold focus:outline-none";

async function upload(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Upload failed");
  return data.url;
}

export function StoryEditor({ story, notice }: { story?: Story; notice?: string }) {
  const [state, action, pending] = useActionState(saveStory, undefined);
  const [title, setTitle] = useState(story?.title ?? "");
  const [slug, setSlug] = useState(story?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(story));
  const [content, setContent] = useState(story?.content ?? "");
  const [cover, setCover] = useState(story?.cover ?? "");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [uploading, setUploading] = useState<"cover" | "inline" | null>(null);
  const [uploadError, setUploadError] = useState<string>();
  const [dirty, setDirty] = useState(false);
  const textarea = useRef<HTMLTextAreaElement>(null);

  const message = state?.error ?? state?.saved ?? notice;
  const isError = Boolean(state?.error);
  const words = content.trim() ? content.trim().split(/\s+/).length : 0;

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    if (!dirty) return;
    const onLeave = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [dirty]);

  // A successful save clears the unsaved flag.
  const [lastSaved, setLastSaved] = useState(state);
  if (state !== lastSaved) {
    setLastSaved(state);
    if (state?.saved) setDirty(false);
  }

  async function onCover(file?: File) {
    if (!file) return;
    setUploading("cover");
    setUploadError(undefined);
    try {
      setCover(await upload(file));
      setDirty(true);
    } catch (e) {
      setUploadError((e as Error).message);
    } finally {
      setUploading(null);
    }
  }

  async function onInlineImage(file?: File) {
    if (!file) return;
    setUploading("inline");
    setUploadError(undefined);
    try {
      const url = await upload(file);
      const el = textarea.current;
      const at = el?.selectionStart ?? content.length;
      const snippet = `\n\n![Describe the photo](${url})\n\n`;
      setContent(content.slice(0, at) + snippet + content.slice(at));
      setDirty(true);
    } catch (e) {
      setUploadError((e as Error).message);
    } finally {
      setUploading(null);
    }
  }

  return (
    <form action={action} onChange={() => setDirty(true)} className="grid gap-8 pb-24 lg:grid-cols-[minmax(0,1fr)_20rem] lg:pb-0">
      <input type="hidden" name="id" value={story?.id ?? ""} />
      <input type="hidden" name="cover" value={cover} />

      <div className="min-w-0 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Link href="/admin" className="eyebrow hover:text-bone">
            ← All stories
          </Link>
          {story?.status === "published" && (
            <Link href={`/stories/${story.slug}`} target="_blank" className="text-sm text-gold hover:underline">
              View live ↗
            </Link>
          )}
        </div>

        {message && (
          <p
            role={isError ? "alert" : "status"}
            className={cn(
              "rounded-xl border px-4 py-3 text-sm",
              isError ? "border-red-400/30 bg-red-400/10 text-red-200" : "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
            )}
          >
            {message}
          </p>
        )}

        <label className="block">
          <span className="sr-only">Title</span>
          <input
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugEdited) setSlug(slugify(e.target.value));
            }}
            placeholder="Story title"
            required
            className="w-full border-0 border-b border-line bg-transparent pb-4 font-serif text-4xl tracking-tight text-bone placeholder:text-mute/60 focus:border-gold focus:outline-none sm:text-5xl"
          />
        </label>

        <label className="block">
          <span className="eyebrow">Excerpt</span>
          <textarea
            name="excerpt"
            defaultValue={story?.excerpt}
            rows={2}
            maxLength={280}
            placeholder="One or two sentences. Shown on cards, in Google results and in subscriber emails."
            className={cn(field, "mt-2 resize-none")}
          />
        </label>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div role="tablist" className="flex gap-1 rounded-full border border-line p-1">
              {(["write", "preview"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "h-8 rounded-full px-4 text-xs capitalize transition-colors",
                    tab === t ? "bg-bone text-ink" : "text-bone-2 hover:text-bone",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs text-mute">
              <span>
                {words} words · {Math.max(1, Math.round(words / 220))} min read
              </span>
              <label className="cursor-pointer text-bone-2 hover:text-bone">
                {uploading === "inline" ? "Uploading…" : "+ Insert photo"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  className="sr-only"
                  onChange={(e) => {
                    onInlineImage(e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
          </div>

          <textarea
            ref={textarea}
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={"Write in Markdown.\n\n## A heading\n\nA paragraph with **bold**, _italics_ and a [link](https://example.com).\n\n> A quote worth remembering."}
            className={cn(field, "mt-3 min-h-[28rem] resize-y font-mono text-[0.8125rem] leading-relaxed", tab === "preview" && "hidden")}
          />
          {tab === "preview" && (
            <div className="mt-3 min-h-[28rem] rounded-xl border border-line bg-ink p-5 sm:p-8">
              {content.trim() ? <Markdown>{content}</Markdown> : <p className="text-sm text-mute">Nothing to preview yet.</p>}
            </div>
          )}
        </div>
      </div>

      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-line bg-ink/90 p-3 backdrop-blur-xl lg:static lg:flex-col lg:rounded-2xl lg:border lg:bg-ink-2 lg:p-4">
          <button
            type="submit"
            name="intent"
            value="publish"
            disabled={pending}
            className="h-11 flex-1 rounded-full bg-bone text-sm font-medium text-ink transition-colors hover:bg-gold disabled:opacity-60 lg:flex-none"
          >
            {pending ? "Saving…" : story?.status === "published" ? "Update live story" : "Publish"}
          </button>
          <button
            type="submit"
            name="intent"
            value="draft"
            disabled={pending}
            className="h-11 flex-1 rounded-full border border-line-strong text-sm text-bone transition-colors hover:border-bone disabled:opacity-60 lg:flex-none"
          >
            {story?.status === "published" ? "Unpublish to draft" : "Save draft"}
          </button>
          <p className="hidden text-center text-xs text-mute lg:block">
            {dirty ? "Unsaved changes" : story ? `Status: ${story.status}` : "Not saved yet"}
          </p>
        </div>

        <div className="space-y-5 rounded-2xl border border-line p-4">
          <label className="block">
            <span className="eyebrow">Category</span>
            <select
              name="category"
              defaultValue={story?.category ?? "tech"}
              className={cn(
                field,
                "mt-2 appearance-none bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238e8b85' stroke-width='1.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")] bg-size-[1rem] bg-position-[right_1rem_center] bg-no-repeat pr-10",
              )}
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="eyebrow">Date</span>
            <input
              type="date"
              name="date"
              defaultValue={(story?.date ?? new Date().toISOString()).slice(0, 10)}
              className={cn(field, "mt-2 [color-scheme:dark]")}
            />
          </label>

          <label className="block">
            <span className="eyebrow">URL</span>
            <div className="mt-2 flex items-center rounded-xl border border-line-strong bg-ink-2 focus-within:border-gold">
              <span className="pl-4 text-sm text-mute">/stories/</span>
              <input
                name="slug"
                value={slug}
                onChange={(e) => {
                  setSlug(slugify(e.target.value));
                  setSlugEdited(true);
                }}
                className="min-w-0 flex-1 bg-transparent py-3 pr-4 text-sm text-bone focus:outline-none"
              />
            </div>
          </label>
        </div>

        <div className="space-y-4 rounded-2xl border border-line p-4">
          <p className="eyebrow">Cover photo</p>
          {cover ? (
            <div className="relative overflow-hidden rounded-xl border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cover} alt="" className="aspect-4/3 w-full object-cover" />
              <button
                type="button"
                onClick={() => {
                  setCover("");
                  setDirty(true);
                }}
                className="absolute right-2 top-2 rounded-full bg-ink/80 px-3 py-1 text-xs text-bone backdrop-blur hover:bg-ink"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="grid aspect-4/3 cursor-pointer place-items-center rounded-xl border border-dashed border-line-strong text-center text-sm text-mute transition-colors hover:border-gold hover:text-bone">
              <span>
                {uploading === "cover" ? "Uploading…" : "Choose a photo"}
                <span className="mt-1 block text-xs text-mute">JPG, PNG or WebP · up to 8 MB</span>
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                className="sr-only"
                onChange={(e) => onCover(e.target.files?.[0])}
              />
            </label>
          )}
          <label className="block">
            <span className="eyebrow">Describe the photo</span>
            <input name="coverAlt" defaultValue={story?.coverAlt} placeholder="For screen readers and Google" className={cn(field, "mt-2")} />
          </label>
          {uploadError && (
            <p role="alert" className="text-sm text-red-300">
              {uploadError}
            </p>
          )}
        </div>

        {story && (
          <button
            type="submit"
            formAction={removeStory}
            formNoValidate
            onClick={(e) => {
              if (!confirm(`Delete “${story.title}” for good? This can't be undone.`)) e.preventDefault();
            }}
            className="w-full rounded-full px-4 py-2 text-sm text-red-300/80 transition-colors hover:bg-red-400/10 hover:text-red-200"
          >
            Delete story
          </button>
        )}
      </aside>
    </form>
  );
}
