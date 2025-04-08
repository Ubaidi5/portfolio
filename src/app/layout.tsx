import "./globals.css";
import { getLayoutMetadata } from "@/lib/metadata";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/Footer";

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
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
