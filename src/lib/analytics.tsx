"use client";

import dynamic from "next/dynamic";

const Analytics = dynamic(() =>
  import("@next/third-parties/google").then((mod) => mod.GoogleAnalytics)
);

export const GoogleAnalytics = () => {
  return <Analytics gaId="G-NLHEQG3F2E" />;
};
