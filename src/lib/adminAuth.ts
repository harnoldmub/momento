import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { getRequiredEnv } from "@/lib/env";

const COOKIE_NAME = "momento_admin";
const SESSION_DAYS = 14;

function nowPlusDays(days: number) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

function signToken(raw: string) {
  const secret = getRequiredEnv("ADMIN_SESSION_SECRET");
  const mac = crypto.createHmac("sha256", secret).update(raw).digest("hex");
  return `${raw}.${mac}`;
}

function verifyToken(token: string) {
  const [raw, mac] = token.split(".");
  if (!raw || !mac) return null;
  const expected = signToken(raw).split(".")[1];
  if (mac.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return null;
  return raw;
}

export async function createAdminSession(adminUserId: string) {
  const raw = crypto.randomBytes(32).toString("hex");
  const token = signToken(raw);
  const expiresAt = nowPlusDays(SESSION_DAYS);

  await prisma.adminSession.create({
    data: { token, adminUserId, expiresAt },
  });

  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroyAdminSession() {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (token) {
    await prisma.adminSession.deleteMany({ where: { token } });
  }
  jar.set(COOKIE_NAME, "", { path: "/", expires: new Date(0) });
}

export async function getAdminFromCookies() {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const raw = verifyToken(token);
  if (!raw) return null;

  const session = await prisma.adminSession.findUnique({
    where: { token },
    include: { adminUser: true },
  });
  if (!session) return null;
  if (session.expiresAt.getTime() < Date.now()) {
    await prisma.adminSession.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }
  return session.adminUser;
}

export async function requireAdmin() {
  const admin = await getAdminFromCookies();
  if (!admin) throw new Error("UNAUTHORIZED");
  return admin;
}
