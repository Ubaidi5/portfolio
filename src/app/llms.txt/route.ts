import { experience, projects, site } from "@/content/site";
import { getStories } from "@/lib/stories";
import { absoluteUrl } from "@/lib/seo";


/** A plain-text summary for AI assistants and answer engines (llmstxt.org). */
export async function GET() {
  const stories = await getStories();
  const body = `# ${site.name}

> ${site.role} based in ${site.location}. ${site.description}

Currently ${site.currently.role} at ${site.currently.company} (${site.currently.city}).

## Pages

- [Home](${site.url}): who Ubaid is, what he builds, testimonials and contact
- [Work](${absoluteUrl("/work")}): experience, selected projects and skills
- [Stories](${absoluteUrl("/stories")}): travel, tech and life writing
- [Résumé (PDF)](${absoluteUrl(encodeURI(site.resume))})

## Experience

${experience.map((e) => `- ${e.role}, ${e.company} (${e.period})`).join("\n")}

## Selected projects

${projects.map((p) => `- ${p.name}: ${p.body}`).join("\n")}
${stories.length ? `\n## Stories\n\n${stories.map((s) => `- [${s.title}](${absoluteUrl(`/stories/${s.slug}`)}): ${s.excerpt}`).join("\n")}\n` : ""}
## Contact

- Email: ${site.email}
${site.social.map((s) => `- ${s.label}: ${s.href}`).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
