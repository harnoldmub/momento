import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";

const Schema = z.object({
  projectId: z.string().min(1),
  orderedIds: z.array(z.string().min(1)).min(1),
});

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const json = await req.json();
    const { projectId, orderedIds } = Schema.parse(json);

    const existing = await prisma.media.findMany({
      where: { projectId },
      select: { id: true },
    });
    const set = new Set(existing.map((m) => m.id));
    for (const id of orderedIds) if (!set.has(id)) return NextResponse.json({ error: "Invalid order" }, { status: 400 });

    await prisma.$transaction(
      orderedIds.map((id, idx) =>
        prisma.media.update({ where: { id }, data: { order: idx } }),
      ),
    );

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: e?.message || "Bad request" }, { status: 400 });
  }
}

