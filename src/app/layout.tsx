import "./globals.css";
import { getLayoutMetadata } from "@/lib/metadata";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = getLayoutMetadata();

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
