import { renderOg, ogSize } from "@/lib/og";
import { site } from "@/content/site";

export const alt = `${site.name}: work and experience`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ eyebrow: "Work · 6+ years", title: "Six years of making hard things", accent: "feel simple." });
}
