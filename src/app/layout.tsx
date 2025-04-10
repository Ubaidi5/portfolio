import "./globals.css";
import { getLayoutMetadata } from "@/lib/metadata";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/lib/analytics";

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
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
