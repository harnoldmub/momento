import fs from "fs/promises";
import { mimeForPath, resolveUploadPath } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { path: string[] } }) {
  const abs = resolveUploadPath(`/uploads/${params.path.join("/")}`);
  if (!abs) return new Response("Not found", { status: 404 });

  try {
    const data = await fs.readFile(abs);
    return new Response(new Uint8Array(data), {
      headers: {
        "content-type": mimeForPath(abs),
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
