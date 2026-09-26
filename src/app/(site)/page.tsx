import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { Crafts } from "@/components/sections/Crafts";
import { StoriesSection } from "@/components/sections/StoriesSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/JsonLd";
import { personId, websiteId } from "@/lib/seo";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@type": "ProfilePage",
          "@id": `${site.url}/#profile`,
          url: site.url,
          name: `${site.name} · ${site.role}`,
          isPartOf: { "@id": websiteId },
          mainEntity: { "@id": personId },
        }}
      />
      <Hero />
      <Story />
      <Crafts />
      <StoriesSection />
      <Testimonials />
      <Contact />
    </>
  );
}
