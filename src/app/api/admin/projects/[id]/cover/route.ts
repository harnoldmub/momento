import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";

const Schema = z.object({ url: z.string().min(1).max(2000) });

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    const parsed = Schema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return NextResponse.json({ error: "URL invalide" }, { status: 400 });

    await prisma.project.update({ where: { id: params.id }, data: { coverUrl: parsed.data.url } });
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    return NextResponse.json({ error: e?.message || "Requête invalide" }, { status: 400 });
  }
}
