import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { hasDatabase } from "@/lib/db";
import { categoryLabel, formatDate, listAllStories } from "@/lib/stories";
import { cn } from "@/lib/cn";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  await requireAdmin();
  if (!hasDatabase()) {
    return (
      <div className="rounded-2xl border border-gold/30 bg-gold-soft p-6">
        <p className="font-medium text-bone">Connect the database</p>
        <p className="mt-2 text-sm text-bone-2">
          Add <code className="text-bone">MONGODB_URI</code> to <code className="text-bone">.env.local</code> and to the Vercel project&rsquo;s
          environment variables, then reload.
        </p>
      </div>
    );
  }

  const stories = await listAllStories();
  const published = stories.filter((s) => s.status === "published").length;

  return (
    <>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-5xl tracking-tight">Stories</h1>
          <p className="mt-2 text-sm text-mute">
            {published} published · {stories.length - published} drafts
          </p>
        </div>
        <Link
          href="/admin/stories/new"
          className="inline-flex h-11 w-fit items-center rounded-full bg-bone px-5 text-sm font-medium text-ink transition-colors hover:bg-gold"
        >
          New story
        </Link>
      </div>

      {stories.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line-strong p-10 text-center">
          <p className="font-serif text-3xl">Nothing written yet.</p>
          <p className="mt-2 text-sm text-mute">Your first story is one click away.</p>
        </div>
      ) : (
        <ul className="mt-10 divide-y divide-line overflow-hidden rounded-2xl border border-line">
          {stories.map((s) => (
            <li key={s.id}>
              <Link
                href={`/admin/stories/${s.id}`}
                className="grid gap-2 p-4 transition-colors hover:bg-ink-2 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6 sm:p-5"
              >
                <div className="min-w-0">
                  <p className="truncate text-base text-bone">{s.title}</p>
                  <p className="mt-1 truncate text-sm text-mute">/stories/{s.slug}</p>
                </div>
                <div className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-mute">
                  <span className="text-gold">{categoryLabel[s.category]}</span>
                  <span>{formatDate(s.date)}</span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1",
                      s.status === "published" ? "bg-emerald-400/10 text-emerald-300" : "bg-white/5 text-bone-2",
                    )}
                  >
                    {s.status}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
