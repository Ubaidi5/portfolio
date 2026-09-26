import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Ubaid",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0c",
    theme_color: "#0b0b0c",
    icons: [
      { src: "/favicons/192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicons/512x512.webp", sizes: "512x512", type: "image/webp" },
    ],
  };
}
