"use client";

import { getBlogPosts } from "@/lib/contentful";
import { useEffect } from "react";

export default function BlogsPage() {
  useEffect(() => {
    (async () => {
      const blogs = await getBlogPosts();
      console.log(blogs);
    })();
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <div className="container max-w-screen-xl mx-auto px-4 py-8">
        <p>See console</p>
      </div>
    </div>
  );
}
