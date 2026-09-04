import { NextResponse } from "next/server";
import { clearOpsCookie } from "@/lib/auth";

export async function POST() {
  await clearOpsCookie();
  return NextResponse.json({ ok: true });
}
