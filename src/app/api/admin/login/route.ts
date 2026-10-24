import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { createAdminSession } from "@/lib/adminAuth";

const LoginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(200),
});

export async function POST(req: Request) {
  try {
    const parsed = LoginSchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json({ error: "Email ou mot de passe invalide" }, { status: 400 });
    }
    const { email, password } = parsed.data;

    const user = await prisma.adminUser.findUnique({ where: { email } });
    const ok = user ? await bcrypt.compare(password, user.passwordHash) : false;
    if (!user || !ok) {
      return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401 });
    }

    await createAdminSession(user.id);

    // Best-effort cleanup of expired sessions.
    await prisma.adminSession.deleteMany({ where: { expiresAt: { lt: new Date() } } }).catch(
      () => {},
    );

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("Admin login failed", e);
    return NextResponse.json({ error: "Erreur serveur, réessayez." }, { status: 500 });
  }
}
