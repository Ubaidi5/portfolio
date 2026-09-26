import { renderOg, ogSize } from "@/lib/og";
import { site } from "@/content/site";

export const alt = `${site.name}, ${site.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ eyebrow: site.role, title: "I build the part of your product people", accent: "remember." });
}
