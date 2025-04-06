import { getBlogPosts } from "@/lib/contentful";

export default async function Page() {
  const blogs = await getBlogPosts();

  return (
    <div>
      <h1>This is a blog page</h1>
    </div>
  );
}
