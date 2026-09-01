import { mkdir, readdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { S3Client, PutObjectCommand, HeadObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

function r2Ready() {
  return Boolean(
    process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      (process.env.R2_ENDPOINT || process.env.R2_ACCOUNT_ID) &&
      (process.env.R2_BUCKET || "fe-media"),
  );
}

function endpoint() {
  if (process.env.R2_ENDPOINT) return process.env.R2_ENDPOINT;
  return `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
}

function client() {
  return new S3Client({
    region: "auto",
    endpoint: endpoint(),
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
}

function bucket() {
  return process.env.R2_BUCKET || "fe-media";
}

function localRoot() {
  return path.join(process.cwd(), ".data", "fe-media");
}

export function storageMode() {
  return r2Ready() ? "r2" : "local";
}

export async function putObject(key, body, contentType) {
  if (r2Ready()) {
    await client().send(
      new PutObjectCommand({
        Bucket: bucket(),
        Key: key,
        Body: body,
        ContentType: contentType,
      }),
    );
    return { mode: "r2", key };
  }
  const abs = path.join(localRoot(), key);
  await mkdir(path.dirname(abs), { recursive: true });
  await writeFile(abs, body);
  return { mode: "local", key };
}

export async function hasObject(key) {
  if (r2Ready()) {
    try {
      await client().send(new HeadObjectCommand({ Bucket: bucket(), Key: key }));
      return true;
    } catch {
      return false;
    }
  }
  try {
    await access(path.join(localRoot(), key));
    return true;
  } catch {
    return false;
  }
}

export async function listPrefix(prefix) {
  if (r2Ready()) {
    const out = await client().send(
      new ListObjectsV2Command({
        Bucket: bucket(),
        Prefix: prefix,
        MaxKeys: 200,
      }),
    );
    return (out.Contents || []).map((o) => o.Key).filter(Boolean);
  }
  const abs = path.join(localRoot(), prefix);
  try {
    const names = await readdir(abs, { recursive: true });
    return names.map((n) => `${prefix.replace(/\/$/, "")}/${n}`.replaceAll("\\", "/"));
  } catch {
    return [];
  }
}
