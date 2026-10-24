import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";
import {
  MAX_IMAGE_BYTES,
  MAX_VIDEO_BYTES,
  mediaTypeForFile,
  saveToLocalUploads,
} from "@/lib/storage";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await requireAdmin();
    const { id } = params;

    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return NextResponse.json({ error: "Projet introuvable" }, { status: 404 });

    const fd = await req.formData();
    const files = fd.getAll("files").filter((x): x is File => x instanceof File);
    if (!files.length) return NextResponse.json({ error: "Aucun fichier" }, { status: 400 });

    for (const file of files) {
      const type = mediaTypeForFile(file);
      if (!type) {
        return NextResponse.json(
          { error: `Format non supporté : ${file.name} (JPG, PNG, WebP, GIF, AVIF, MP4, WebM, MOV)` },
          { status: 400 },
        );
      }
      const max = type === "VIDEO" ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
      if (file.size > max) {
        return NextResponse.json(
          { error: `Fichier trop volumineux : ${file.name} (max ${Math.round(max / 1024 / 1024)} Mo)` },
          { status: 400 },
        );
      }
    }

    const last = await prisma.media.findFirst({
      where: { projectId: id },
      orderBy: { order: "desc" },
      select: { order: true },
    });
    let order = (last?.order ?? -1) + 1;

    const created = [];
    for (const file of files) {
      const type = mediaTypeForFile(file)!;
      const { url } = await saveToLocalUploads({ projectId: id, file });
      const m = await prisma.media.create({
        data: { projectId: id, type, url, alt: project.title, order: order++ },
      });
      created.push(m);
    }

    // A project without cover gets its first uploaded image.
    let coverUrl = project.coverUrl;
    const firstImage = created.find((m) => m.type === "IMAGE");
    if (!coverUrl && firstImage) {
      coverUrl = firstImage.url;
      await prisma.project.update({ where: { id }, data: { coverUrl } });
    }

    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, created, coverUrl });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    return NextResponse.json({ error: e?.message || "Requête invalide" }, { status: 400 });
  }
}
