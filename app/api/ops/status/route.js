import { NextResponse } from "next/server";
import { isOpsAuthed, opsConfigured } from "@/lib/auth";
import { getCatalog } from "@/lib/catalog";
import { listPrefix, storageMode } from "@/lib/storage";
import { CARD_FILES, CHARACTER_FILES, SUGGESTED_VIDEO_KEYS, VIDEO_FILES } from "@/lib/slots";

export const dynamic = "force-dynamic";

export async function GET() {
  const configured = opsConfigured();
  const authed = await isOpsAuthed();
  if (!authed) {
    return NextResponse.json({ configured, authed: false });
  }
  const catalog = await getCatalog();
  const [characters, cards, videos] = await Promise.all([
    listPrefix("characters/"),
    listPrefix("cards/"),
    listPrefix("videos/"),
  ]);
  return NextResponse.json({
    configured,
    authed: true,
    mode: storageMode(),
    catalog,
    slots: {
      character: CHARACTER_FILES,
      card: CARD_FILES,
      video: VIDEO_FILES,
    },
    suggestedVideoKeys: SUGGESTED_VIDEO_KEYS,
    objects: [...characters, ...cards, ...videos],
  });
}
