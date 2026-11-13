// Measurement IDs come from the environment, so nothing loads until they are set in Vercel.
export const gaId = process.env.NEXT_PUBLIC_GA_ID;
export const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type Tracked = Window & { gtag?: (...args: unknown[]) => void; fbq?: (...args: unknown[]) => void };

/** Reports a lead to GA4 and the Meta Pixel. Does nothing until the visitor has accepted tracking. */
export function trackLead(source: string) {
  const w = window as Tracked;
  w.gtag?.("event", "generate_lead", { lead_source: source });
  w.fbq?.("track", "Lead", { content_name: source });
}
