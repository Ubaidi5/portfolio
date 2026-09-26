# ubaidhussain.me

Personal site of Ubaid Hussain: a short, living story rather than a template portfolio.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lenis · MongoDB · Vercel Blob

## Content

| What | Where |
| --- | --- |
| Profile, facts, work, experience, skills, testimonials | `src/content/site.ts` |
| Stories (travel / tech / life) | `/admin`, stored in MongoDB |
| Story photos | Uploaded from `/admin` to Vercel Blob |

Testimonials marked `placeholder: true` never render in production. Only published stories appear on the site; publishing or editing a story refreshes the cached pages, sitemap, RSS and `llms.txt` immediately.

### Admin

Sign in at `/admin/login` with `ADMIN_PASSWORD`. Stories are written in Markdown with a live preview. Cover photos and inline photos upload to Vercel Blob.

To import the draft outlines in `content/stories/` once:

```bash
node --env-file=.env.local scripts/seed-stories.mjs
```

## Environment

Copy `.env.example` to `.env.local` and fill it in:

- `NEXT_PUBLIC_SITE_URL`: canonical URL, used for metadata, sitemap and JSON-LD
- `ADMIN_PASSWORD`, `SESSION_SECRET`: admin sign-in (secret must be 32+ random characters)
- `MONGODB_URI`, `MONGODB_DB`: stories database
- `BLOB_READ_WRITE_TOKEN`: photo uploads (Vercel → Storage → Blob → connect to this project)
- `EMAIL_USER`, `EMAIL_PASSWORD`, `CONTACT_EMAIL`: Zoho SMTP for the contact form
- `BUTTONDOWN_API_KEY`: newsletter subscriptions. In Buttondown, enable RSS-to-email on `/feed.xml` so subscribers get every new story automatically.

## SEO and AI discoverability

- Per-page metadata, canonical URLs and generated Open Graph images
- JSON-LD: `Person` (with `sameAs`), `WebSite`, `ProfilePage`, `Blog`, `BlogPosting`, `BreadcrumbList`
- `/sitemap.xml`, `/robots.txt` (AI crawlers allowed), `/feed.xml`, `/llms.txt`
- Old URLs (`/blog`, `/blogs/*`, `/projects`, `/privacy`, `/terms`) permanently redirect

## Scripts

```bash
npm run dev        # local development
npm run typecheck
npm run lint
npm run build
```
