import { createClient } from "contentful";

export const createContentClient = () => {
  return createClient({
    space: process.env.CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
  });
};
const client = createContentClient();

export const getBlogPosts = async () => {
  const results = await client.getEntries({
    content_type: "pageBlogPost",
    include: 0, // Not getting unused data
  });

  const blogPosts = results.items.map((blog) => blog.fields);
  return blogPosts;
};
