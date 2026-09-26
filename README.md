# ubaidhussain.me

Personal site of Ubaid Hussain: a short, living story rather than a template portfolio.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lenis · MDX

## Content

| What | Where |
| --- | --- |
| Profile, facts, work, experience, skills, testimonials | `src/content/site.ts` |
| Stories (travel / tech / life) | `content/stories/*.mdx` |
| Photos for stories | `public/stories/` |

Story frontmatter:

```yaml
title: "Title"
excerpt: "One or two sentences for cards, SEO and the RSS feed."
category: travel # travel | tech | life
date: 2026-09-20
cover: /stories/photo.jpg   # optional
coverAlt: "What the photo shows"
draft: true                 # drafts show in development only
```

Testimonials marked `placeholder: true` and stories marked `draft: true` never render in production.

## Environment

Copy `.env.example` to `.env.local` and fill it in:

- `NEXT_PUBLIC_SITE_URL`: canonical URL, used for metadata, sitemap and JSON-LD
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
