import { experience, recommendationsUrl, site, studio, testimonials } from "@/content/site";
import { getStories } from "@/lib/stories";
import { absoluteUrl } from "@/lib/seo";

// Rebuilt in the background at most hourly, and on every admin save, so crawlers never wait on the database.
export const revalidate = 3600;

/** A plain-text summary for AI assistants and answer engines (llmstxt.org). */
export async function GET() {
  const stories = await getStories();
  const body = `# ${site.name}

> ${site.role} based in ${site.location}. ${site.description}

Currently ${site.currently.role} at ${site.currently.company} (${site.currently.city}).

## Pages

- [Home](${site.url}): who Ubaid is, what he builds, testimonials and contact
- [Work](${absoluteUrl("/work")}): career timeline and résumé
- [Stories](${absoluteUrl("/stories")}): travel, tech and life writing
- [Résumé (PDF)](${absoluteUrl(encodeURI(site.resume))})

## Experience

${experience.map((e) => `- ${e.role}, ${e.company} (${e.period})`).join("\n")}

## Studio

Founder of [${studio.name}](${studio.url}). ${studio.description} Products, case studies and technical write-ups: ${studio.work}
${stories.length ? `\n## Stories\n\n${stories.map((s) => `- [${s.title}](${absoluteUrl(`/stories/${s.slug}`)}): ${s.excerpt}`).join("\n")}\n` : ""}
## Recommendations (LinkedIn: ${recommendationsUrl})

${testimonials.map((t) => `- ${t.name}, ${t.title} (${t.relation}): "${t.quote[0]}"`).join("\n")}

## Contact

- Email: ${site.email}
${site.social.map((s) => `- ${s.label}: ${s.href}`).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
