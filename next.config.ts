import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: "/blog/:path*",
        destination: "/blogs/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
