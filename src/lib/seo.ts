import type { Metadata } from "next";
import { site, studio } from "@/content/site";

export const absoluteUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

type PageMeta = {
  title?: string;
  description?: string;
  path: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
};

export function pageMetadata({ title, description = site.description, path, type = "website", publishedTime }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type,
      url: absoluteUrl(path),
      title: title ?? `${site.name} · ${site.role}`,
      description,
      siteName: site.name,
      locale: "en_US",
      ...(type === "article" && publishedTime ? { publishedTime, authors: [site.url] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      creator: site.twitter,
      title: title ?? `${site.name} · ${site.role}`,
      description,
    },
  };
}

export const personId = `${site.url}/#person`;
export const websiteId = `${site.url}/#website`;
/** Shared with karachisol.com so both sites describe the same organization. */
export const studioId = `${studio.url}/#organization`;

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": personId,
    name: site.name,
    url: site.url,
    image: absoluteUrl(site.photo),
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    description: site.description,
    homeLocation: { "@type": "Place", name: site.location },
    worksFor: [
      { "@type": "Organization", name: site.currently.company, url: "https://insurancemarket.ae" },
      { "@id": studioId },
    ],
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of Karachi" },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Frontend engineering",
      "Web performance",
      "Technical SEO",
      "Shopify app development",
      "Wix app development",
      "Data dashboards",
      "AI-assisted software engineering",
    ],
    sameAs: site.social.map((s) => s.href),
  };
}

export function studioJsonLd() {
  return {
    "@type": "Organization",
    "@id": studioId,
    name: studio.name,
    url: studio.url,
    description: studio.description,
    founder: { "@id": personId },
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": personId },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
