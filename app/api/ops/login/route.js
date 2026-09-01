import { NextResponse } from "next/server";
import { checkPassword, opsConfigured, setOpsCookie } from "@/lib/auth";

export async function POST(request) {
  if (!opsConfigured()) {
    return NextResponse.json({ error: "OPS_PASSWORD non configurata" }, { status: 503 });
  }
  const body = await request.json().catch(() => ({}));
  if (!checkPassword(body.password || "")) {
    return NextResponse.json({ error: "Password errata" }, { status: 401 });
  }
  await setOpsCookie();
  return NextResponse.json({ ok: true });
}
