"use server";

import { createClient } from "contentful";

function createContentClient() {
  return createClient({
    space: process.env.CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
  });
}
const client = createContentClient();

export async function getBlogPosts() {
  const results = await client.getEntries({
    content_type: "pageBlogPost",
  });

  const blogPosts = results.items.map((blog) => blog.fields);
  return blogPosts;
}

export async function getBlogPostBySlug(slug: string) {
  const results = await client.getEntries({
    content_type: "pageBlogPost",
    "fields.slug": slug,
    limit: 1,
  });

  if (results.items.length === 0) {
    return null;
  }

  return results.items[0].fields;
}

export async function getTest(slug: string) {
  const results = await client.getEntries({
    content_type: "pageBlogPost",
    "fields.slug": slug,
    limit: 1,
  });

  if (results.items.length === 0) {
    return null;
  }

  return results.items[0].fields;
}
