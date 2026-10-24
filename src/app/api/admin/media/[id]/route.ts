import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";
import { deleteLocalUpload } from "@/lib/storage";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await requireAdmin();
    const media = await prisma.media.findUnique({ where: { id: params.id } });
    if (!media) return NextResponse.json({ error: "Média introuvable" }, { status: 404 });

    await prisma.media.delete({ where: { id: media.id } });
    const stillUsed = await prisma.project.count({ where: { coverUrl: media.url } });
    if (!stillUsed) await deleteLocalUpload(media.url);

    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    return NextResponse.json({ error: e?.message || "Requête invalide" }, { status: 400 });
  }
}
