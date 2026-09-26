import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

const font = (file: string) => fs.readFile(path.join(process.cwd(), "assets", "fonts", file));

/** Shared OG card: dark ink, serif headline, gold accent. */
export async function renderOg({ eyebrow, title, accent }: { eyebrow: string; title: string; accent?: string }) {
  const [regular, italic] = await Promise.all([
    font("instrument-serif-latin-400-normal.woff"),
    font("instrument-serif-latin-400-italic.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 80% 0%, rgba(217,183,126,0.18), transparent 55%), #0b0b0c",
          color: "#edebe6",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#8e8b85" }}>
          {eyebrow}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", fontFamily: "Instrument Serif", fontSize: title.length > 60 ? 72 : 92, lineHeight: 1, letterSpacing: -2, maxWidth: 1000 }}>
          {title}
          {accent && <span style={{ fontStyle: "italic", color: "#d9b77e", marginLeft: 20 }}>{accent}</span>}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 24, color: "#c9c6bf" }}>
          <span style={{ fontFamily: "Instrument Serif", fontSize: 40, color: "#edebe6" }}>{site.name}</span>
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Instrument Serif", data: regular, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: italic, style: "italic", weight: 400 },
      ],
    },
  );
}
