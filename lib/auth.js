import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE = "fe_ops";

function secret() {
  return process.env.OPS_PASSWORD || "";
}

function tokenFor(password) {
  return createHmac("sha256", password).update("fantasy-empire-ops").digest("hex");
}

export function opsConfigured() {
  return Boolean(secret());
}

export function checkPassword(password) {
  const expected = secret();
  if (!expected || typeof password !== "string") return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isOpsAuthed() {
  if (!opsConfigured()) return false;
  const jar = await cookies();
  const value = jar.get(COOKIE)?.value;
  if (!value) return false;
  const expected = tokenFor(secret());
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function setOpsCookie() {
  const jar = await cookies();
  jar.set(COOKIE, tokenFor(secret()), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearOpsCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
