"use client";

import Link from "next/link";
import Script from "next/script";
import { gaId, pixelId } from "@/lib/analytics";
import { setConsent, useConsent } from "./consent";

const vendors = [gaId && "Google Analytics", pixelId && "Meta"].filter(Boolean).join(" and ");

/** Google Analytics 4 and the Meta Pixel, loaded only after the visitor accepts. */
export function Tracking() {
  const consent = useConsent();
  if (!gaId && !pixelId) return null;

  if (consent === "granted") {
    return (
      <>
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <Script id="ga4">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
        {pixelId && (
          <Script id="meta-pixel">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`}
          </Script>
        )}
      </>
    );
  }

  if (consent !== "unset") return null;

  return (
    <section
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-line-strong bg-ink-2 p-5 shadow-2xl shadow-black/60 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-96"
    >
      <p className="text-sm leading-relaxed text-bone-2">
        I would like to use cookies from {vendors} to see which pages are worth your time. Nothing loads unless you
        accept.{" "}
        <Link href="/privacy" className="text-gold underline underline-offset-4">
          Privacy
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setConsent("granted")}
          className="h-11 rounded-full bg-bone px-5 text-sm font-medium text-ink transition-colors hover:bg-gold"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => setConsent("denied")}
          className="h-11 rounded-full border border-line-strong px-5 text-sm text-bone transition-colors hover:border-bone"
        >
          Decline
        </button>
      </div>
    </section>
  );
}

/** Lets a visitor change their mind from the privacy policy. Reloads so already-loaded tags are dropped. */
export function CookieChoiceButton() {
  return (
    <button
      type="button"
      onClick={() => {
        setConsent("unset");
        window.location.reload();
      }}
      className="text-gold underline underline-offset-4"
    >
      Change your cookie choice
    </button>
  );
}
