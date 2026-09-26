import { JsonLd } from "@/components/JsonLd";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SubscribeProvider } from "@/components/Subscribe";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
      <SmoothScroll>
        <SubscribeProvider enabled={Boolean(process.env.BUTTONDOWN_API_KEY)}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-bone focus:px-4 focus:py-2 focus:text-ink"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SubscribeProvider>
      </SmoothScroll>
    </>
  );
}
