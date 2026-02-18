import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";
import { saveToLocalUploads } from "@/lib/storage";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await requireAdmin();
    const { id } = params;

    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const fd = await req.formData();
    const files = fd.getAll("files").filter((x): x is File => x instanceof File);
    if (!files.length) return NextResponse.json({ error: "No files" }, { status: 400 });

    const last = await prisma.media.findFirst({
      where: { projectId: id },
      orderBy: { order: "desc" },
      select: { order: true },
    });
    let order = (last?.order ?? -1) + 1;

    const created = [];
    for (const file of files) {
      const { url } = await saveToLocalUploads({ projectId: id, file });
      const m = await prisma.media.create({
        data: {
          projectId: id,
          type: "IMAGE",
          url,
          alt: project.title,
          order: order++,
        },
      });
      created.push(m);
    }

    return NextResponse.json({ ok: true, created });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: e?.message || "Bad request" }, { status: 400 });
  }
}
