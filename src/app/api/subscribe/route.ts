import { NextResponse } from "next/server";

/**
 * Adds a reader to the Buttondown newsletter. Buttondown sends the double opt-in email
 * and can mail every new story automatically from /feed.xml (Settings → RSS-to-email).
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = body?.email;
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  const key = process.env.BUTTONDOWN_API_KEY;
  if (!key) {
    console.error("Subscribe: BUTTONDOWN_API_KEY is not set");
    return NextResponse.json({ error: "Subscriptions are not configured" }, { status: 503 });
  }

  const res = await fetch("https://api.buttondown.com/v1/subscribers", {
    method: "POST",
    headers: { Authorization: `Token ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email_address: email, tags: ["website"] }),
  }).catch(() => null);

  // An already-subscribed address is still a success from the reader's point of view.
  if (res && (res.ok || res.status === 409)) return NextResponse.json({ ok: true });
  if (res?.status === 400) {
    const detail = await res.text();
    if (detail.includes("already")) return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Could not subscribe" }, { status: 502 });
}
