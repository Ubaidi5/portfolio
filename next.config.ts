import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Story covers uploaded from the admin live in Vercel Blob.
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  async redirects() {
    return [
      { source: "/blog", destination: "/stories", permanent: true },
      { source: "/blogs", destination: "/stories", permanent: true },
      // Old template posts are gone; send any indexed URLs to the new stories page.
      { source: "/blogs/:slug*", destination: "/stories", permanent: true },
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/privacy", destination: "/", permanent: true },
      { source: "/terms", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
