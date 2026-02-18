import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { createAdminSession } from "@/lib/adminAuth";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(200),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { email, password } = LoginSchema.parse(json);

    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    await createAdminSession(user.id);

    // Best-effort cleanup of expired sessions.
    await prisma.adminSession.deleteMany({ where: { expiresAt: { lt: new Date() } } }).catch(
      () => {},
    );

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Bad request" },
      { status: 400 },
    );
  }
}

