export const CHARACTER_FILES = [
  { name: "portrait.webp", required: true, accept: "image/webp,image/jpeg,image/png" },
  { name: "body.webp", required: true, accept: "image/webp,image/jpeg,image/png" },
  { name: "ref.webp", required: false, accept: "image/webp,image/jpeg,image/png" },
];

export const CARD_FILES = [
  { name: "art.webp", required: true, accept: "image/webp,image/jpeg,image/png" },
  { name: "icon.webp", required: false, accept: "image/webp,image/jpeg,image/png" },
];

export const VIDEO_FILES = [
  { name: "poster.jpg", required: true, accept: "image/jpeg,image/webp,image/png" },
  { name: "master.mp4", required: true, accept: "video/mp4" },
  { name: "loop.webp", required: false, accept: "image/webp" },
];

export const SUGGESTED_VIDEO_KEYS = [
  "hero_warrior_f.quick_slash.chest.hit",
  "hero_warrior_f.quick_slash.chest.crit",
  "monster_tentacle.tentacle_lash.hit",
  "monster_tentacle.tentacle_lash.crit",
  "bond.hero_warrior_f.hit",
];

const ID_RE = /^[a-z0-9][a-z0-9_-]{1,80}$/;
const VIDEO_KEY_RE = /^[a-z0-9][a-z0-9._-]{1,160}$/;

export function assertId(kind, id) {
  if (kind === "video") {
    if (!VIDEO_KEY_RE.test(id)) {
      throw new Error("video_key non valido. Usa minuscole, numeri, punto, trattino.");
    }
    return id;
  }
  if (!ID_RE.test(id)) {
    throw new Error("id non valido. Deve coincidere con un file in data/.");
  }
  return id;
}

export function objectKey(kind, id, filename) {
  if (kind === "character") return `characters/${id}/${filename}`;
  if (kind === "card") return `cards/${id}/${filename}`;
  if (kind === "video") return `videos/${id}/${filename}`;
  throw new Error("tipo sconosciuto");
}
