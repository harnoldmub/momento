import path from "path";
import fs from "fs/promises";
import crypto from "crypto";

// Uploaded files live outside `public/` because Next.js only serves files that
// exist in `public/` at build time. They are served by `src/app/uploads/[...path]/route.ts`.
export const UPLOAD_URL_PREFIX = "/uploads/";

export function getUploadRoot() {
  return path.resolve(process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads"));
}

const MIME_BY_EXT: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
};

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "video/quicktime": ".mov",
};

export const MAX_IMAGE_BYTES = 25 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 500 * 1024 * 1024;

export function mimeForPath(p: string) {
  return MIME_BY_EXT[path.extname(p).toLowerCase()] || "application/octet-stream";
}

export function mediaTypeForFile(file: File): "IMAGE" | "VIDEO" | null {
  if (!EXT_BY_MIME[file.type]) return null;
  return file.type.startsWith("video/") ? "VIDEO" : "IMAGE";
}

/** Resolves a public `/uploads/...` URL to an absolute path inside the upload root, or null. */
export function resolveUploadPath(url: string): string | null {
  if (!url.startsWith(UPLOAD_URL_PREFIX)) return null;
  const root = getUploadRoot();
  const abs = path.resolve(root, url.slice(UPLOAD_URL_PREFIX.length));
  if (!abs.startsWith(root + path.sep)) return null;
  return abs;
}

export async function saveToLocalUploads(opts: {
  projectId: string;
  file: File;
}): Promise<{ url: string }> {
  const buf = Buffer.from(await opts.file.arrayBuffer());

  const ext = EXT_BY_MIME[opts.file.type] || "";
  const name = `${crypto.randomBytes(12).toString("hex")}${ext}`;
  const dir = opts.projectId.replace(/[^a-zA-Z0-9_-]/g, "");

  const absDir = path.join(getUploadRoot(), dir);
  await fs.mkdir(absDir, { recursive: true });
  await fs.writeFile(path.join(absDir, name), buf);

  return { url: `${UPLOAD_URL_PREFIX}${dir}/${name}` };
}

export async function deleteLocalUpload(url: string) {
  const abs = resolveUploadPath(url);
  if (!abs) return;
  await fs.unlink(abs).catch(() => {});
}
