import { Metadata } from "next";

export function constructMetadata({
  title = "Ubaid Hussain",
  description = "Crafting apps that do more than dazzle—they deliver. Let’s turn your vision into code that converts. 🚀",
  image = "/me.jpg",
  icons = "/app-icon.png",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@chrislonzo",
    },
    icons,
    metadataBase: new URL("https://madebyubaid.web.app"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
