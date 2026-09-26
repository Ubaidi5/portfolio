import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const escape = (value: unknown) =>
  String(value ?? "")
    .slice(0, 5000)
    .replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const isEmail = (v: unknown): v is string => typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length < 255;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  // Honeypot field: real visitors never fill it.
  if (body.company) return NextResponse.json({ ok: true });

  const { name, email, message, timeZone } = body;
  if (!name || !message || !isEmail(email)) {
    return NextResponse.json({ error: "Name, a valid email and a message are required" }, { status: 400 });
  }

  const { EMAIL_USER, EMAIL_PASSWORD, CONTACT_EMAIL } = process.env;
  if (!EMAIL_USER || !EMAIL_PASSWORD || !CONTACT_EMAIL) {
    console.error("Contact form: EMAIL_USER, EMAIL_PASSWORD or CONTACT_EMAIL is not set");
    return NextResponse.json({ error: "Contact form is not configured" }, { status: 503 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD },
  });

  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `New message from ${String(name).slice(0, 80)}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <p style="color:#666;margin:0 0 16px">From <strong>${escape(name)}</strong> &lt;${escape(email)}&gt;${timeZone ? ` · ${escape(timeZone)}` : ""}</p>
          <p style="white-space:pre-wrap;line-height:1.6;background:#f7f7f5;padding:16px;border-radius:8px">${escape(message)}</p>
        </div>`,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form: failed to send", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
