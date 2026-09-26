import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

// Search engines and AI assistants are explicitly welcome: being cited is the point.
const aiCrawlers = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/admin"] },
      { userAgent: aiCrawlers, allow: "/", disallow: ["/api/", "/admin"] },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
