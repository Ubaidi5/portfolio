"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/content/site";

const format = () =>
  new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: site.timeZone }).format(new Date());

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

/** Live local time in Karachi. Renders a placeholder on the server to avoid hydration mismatch. */
export function LocalTime() {
  const time = useSyncExternalStore(subscribe, format, () => "--:--");
  return <time suppressHydrationWarning>{time}</time>;
}
