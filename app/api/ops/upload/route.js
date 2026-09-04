import { NextResponse } from "next/server";
import { isOpsAuthed } from "@/lib/auth";
import { hasCatalogId } from "@/lib/catalog";
import { putObject, storageMode } from "@/lib/storage";
import { CARD_FILES, CHARACTER_FILES, VIDEO_FILES, assertId, objectKey } from "@/lib/slots";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SLOTS = {
  character: CHARACTER_FILES,
  card: CARD_FILES,
  video: VIDEO_FILES,
};

const KIND_MAP = {
  character: "character",
  card: "card",
  video: "video",
};

export async function POST(request) {
  if (!(await isOpsAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const kind = KIND_MAP[String(form.get("kind") || "")];
  if (!kind) {
    return NextResponse.json({ error: "tipo sconosciuto" }, { status: 400 });
  }

  let id;
  try {
    id = assertId(kind, String(form.get("id") || "").trim());
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (kind !== "video") {
    const known = await hasCatalogId(kind, id);
    if (!known) {
      return NextResponse.json(
        { error: `id ${id} assente dal catalogo JSON. Aggiungi data/${kind}s/${id}.json prima.` },
        { status: 400 },
      );
    }
  }

  const allowed = SLOTS[kind];
  const saved = [];

  for (const slot of allowed) {
    const file = form.get(slot.name);
    if (!file || typeof file === "string" || !file.size) {
      if (slot.required) {
        return NextResponse.json({ error: `Manca ${slot.name}` }, { status: 400 });
      }
      continue;
    }
    if (file.size > 4_200_000) {
      return NextResponse.json(
        { error: `${slot.name} supera 4,2 MB (limite Hobby Vercel)` },
        { status: 413 },
      );
    }
    const buf = Buffer.from(await file.arrayBuffer());
    const key = objectKey(kind, id, slot.name);
    await putObject(key, buf, file.type || "application/octet-stream");
    saved.push(key);
  }

  if (saved.length === 0) {
    return NextResponse.json({ error: "Nessun file inviato" }, { status: 400 });
  }

  return NextResponse.json({
    ok: `Salvati ${saved.length} file`,
    mode: storageMode(),
    keys: saved,
  });
}
