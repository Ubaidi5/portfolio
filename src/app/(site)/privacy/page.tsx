import { site } from "@/content/site";
import { CookieChoiceButton } from "@/components/analytics/Tracking";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "What ubaidhussain.me collects, which cookies it uses and how to change your choice.",
  path: "/privacy",
});

const UPDATED = "13 November 2026";

export default function PrivacyPage() {
  return (
    <section className="container-page pb-24 pt-36 sm:pb-32 sm:pt-44">
      <p className="eyebrow">Privacy</p>
      <h1 className="mt-6 max-w-[14ch] font-serif text-display">
        What this site <em className="text-gold">collects.</em>
      </h1>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-mute">Last updated {UPDATED}</p>

      <div className="mt-14 max-w-[68ch] space-y-10 text-base leading-relaxed text-bone-2 sm:mt-20 sm:text-lg">
        <div className="space-y-4">
          <h2 className="font-serif text-3xl tracking-tight text-bone sm:text-4xl">Messages and subscriptions</h2>
          <p>
            If you use the contact form I receive your name, email address, time zone and what you write, and I use it
            only to reply. If you subscribe to new stories, your email address is stored with my newsletter provider
            and every email has an unsubscribe link.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-3xl tracking-tight text-bone sm:text-4xl">Analytics and cookies</h2>
          <p>
            Page views are counted with cookieless analytics from my hosting provider, which does not follow you to
            other websites.
          </p>
          <p>
            Google Analytics and the Meta Pixel load only if you choose &ldquo;Accept&rdquo; on the cookie banner. They
            set cookies and send Google and Meta your IP address, device and browser details and the pages you view, so
            I can see which pages are useful and measure any advertising for this site. If you decline, or your browser
            sends the Global Privacy Control signal, neither one loads.
          </p>
          <p>
            You can change your mind at any time: <CookieChoiceButton />.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-3xl tracking-tight text-bone sm:text-4xl">Your data</h2>
          <p>
            I do not sell personal data. To see, correct or delete anything I hold about you, email{" "}
            <a href={`mailto:${site.email}`} className="text-gold underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
