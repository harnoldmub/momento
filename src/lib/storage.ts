import path from "path";
import fs from "fs/promises";
import crypto from "crypto";

export async function saveToLocalUploads(opts: {
  projectId: string;
  file: File;
}): Promise<{ url: string }> {
  const arrayBuffer = await opts.file.arrayBuffer();
  const buf = Buffer.from(arrayBuffer);

  const extRaw = path.extname(opts.file.name || "");
  const ext = extRaw && extRaw.length <= 10 ? extRaw.toLowerCase() : "";
  const name = `${crypto.randomBytes(12).toString("hex")}${ext}`;

  const relDir = path.join("uploads", opts.projectId);
  const absDir = path.join(process.cwd(), "public", relDir);
  await fs.mkdir(absDir, { recursive: true });

  const absPath = path.join(absDir, name);
  await fs.writeFile(absPath, buf);

  return { url: `/${relDir}/${name}` };
}

