import type { Metadata } from "next/types";

type MetadataProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  pathname?: string;
  type?: "website" | "article";
  locale?: string;
  publishedTime?: string;
  authors?: string[];
  noIndex?: boolean;
  themeColor?: string;
  twitterHandle?: string;
  siteName?: string;
  alternates?: Record<string, string>;
};

export function generateBaseMetadata(props: MetadataProps): Metadata {
  const {
    title,
    description,
    image,
    pathname = "/",
    type = "website",
    locale = "en_US",
    noIndex = false,
    twitterHandle = "@ubaidnext",
    siteName = "Ubaid Hussain",
  } = props;

  // Construct the absolute URL
  const baseUrl = process.env.BASE_URL || "";
  const url = `${baseUrl}${pathname}`;

  // Construct the absolute image URL if provided
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${baseUrl}${image}`
    : `${baseUrl}/favicons/og-image.png`;

  // Construct the full title with site name
  const fullTitle = title || siteName;

  return {
    // Basic metadata
    title: title,
    description: description,

    // Canonical URL
    alternates: {
      canonical: url,
    },

    // Robots directives
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },

    // Open Graph metadata
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || siteName,
        },
      ],
      locale,
      type,
    },

    // Twitter metadata
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: twitterHandle,
      images: [ogImage],
    },
  };
}

export function getLayoutMetadata() {
  const commonMetadata = generateBaseMetadata({});

  const metadata = {
    ...commonMetadata,
    title: {
      default: "Ubaid Hussain",
      template: "%s | Ubaid Hussain",
    },
    applicationName: "Ubaid Hussain",
    icons: {
      icon: "/favicons/favicon.ico",
      shortcut: "/favicons/16x16.png",
      apple: "/favicons/apple-touch-icon.png",
      other: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          url: "/favicons/16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          url: "/favicons/32x32.png",
        },
        {
          rel: "mask-icon",
          url: "/favicons/safari-pinned-tab.svg",
          color: "#263a5e",
        },
      ],
    },

    // Manifest
    manifest: "/manifest.json",
  };

  return metadata;
}
