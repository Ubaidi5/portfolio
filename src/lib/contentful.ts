import { createClient } from "contentful";

export const createContentClient = () => {
  return createClient({
    space:
      process.env.CONTENTFUL_SPACE_ID ||
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ||
      "",
    accessToken:
      process.env.CONTENTFUL_ACCESS_TOKEN ||
      process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ||
      "",
  });
};
const client = createContentClient();

export const getBlogPosts = async () => {
  const results = await client.getEntries({
    content_type: "pageBlogPost",
  });

  const blogPosts = results.items.map((blog) => blog.fields);
  return blogPosts;
};

export const getBlogPostBySlug = async (slug: string) => {
  const results = await client.getEntries({
    content_type: "pageBlogPost",
    "fields.slug": slug,
    limit: 1,
  });

  if (results.items.length === 0) {
    return null;
  }

  return results.items[0].fields;
};

export const getTest = async (slug: string) => {
  const results = await client.getEntries({
    content_type: "pageBlogPost",
    "fields.slug": slug,
    limit: 1,
  });

  if (results.items.length === 0) {
    return null;
  }

  return results.items[0].fields;
};
