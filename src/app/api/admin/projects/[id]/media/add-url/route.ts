import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";

const Schema = z.object({
  type: z.enum(["IMAGE", "VIDEO"]).default("IMAGE"),
  url: z
    .string()
    .trim()
    .refine((u) => u.startsWith("/") || /^https?:\/\//i.test(u), {
      message: "URL invalide (https://… ou chemin commençant par /)",
    }),
  alt: z.string().max(200).optional().default(""),
});

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await requireAdmin();
    const { id } = params;
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return NextResponse.json({ error: "Projet introuvable" }, { status: 404 });

    const parsed = Schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Données invalides" },
        { status: 400 },
      );
    }
    const data = parsed.data;

    const last = await prisma.media.findFirst({
      where: { projectId: id },
      orderBy: { order: "desc" },
      select: { order: true },
    });
    const order = (last?.order ?? -1) + 1;

    const created = await prisma.media.create({
      data: {
        projectId: id,
        type: data.type,
        url: data.url,
        alt: data.alt || project.title,
        order,
      },
    });

    let coverUrl = project.coverUrl;
    if (!coverUrl && created.type === "IMAGE") {
      coverUrl = created.url;
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
