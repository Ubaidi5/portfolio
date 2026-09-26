import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAdmin } from "@/lib/auth";

const MAX_BYTES = 8 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Image uploads need Vercel Blob. Set BLOB_READ_WRITE_TOKEN." }, { status: 503 });
  }

  const file = (await request.formData()).get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file received" }, { status: 400 });
  if (!TYPES.includes(file.type)) return NextResponse.json({ error: "Use a JPG, PNG, WebP or AVIF image" }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "Keep images under 8 MB" }, { status: 400 });

  const name = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const blob = await put(`stories/${name}`, file, { access: "public", addRandomSuffix: true, contentType: file.type });
  return NextResponse.json({ url: blob.url });
}
