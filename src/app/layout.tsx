import "./globals.css";
import { constructMetadata } from "@/lib/metadata";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
