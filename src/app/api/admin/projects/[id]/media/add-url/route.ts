import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";

const Schema = z.object({
  type: z.enum(["IMAGE", "VIDEO"]).default("IMAGE"),
  url: z.string().url(),
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
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const json = await req.json();
    const data = Schema.parse(json);

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

    return NextResponse.json({ ok: true, created });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: e?.message || "Bad request" }, { status: 400 });
  }
}
