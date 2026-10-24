import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminFromCookies } from "@/lib/adminAuth";
import { prisma } from "@/lib/db";
import { AdminNav } from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminFromCookies();
  if (!admin) redirect("/admin/login");

  const newLeads = await prisma.lead.count({ where: { status: "NEW" } });

  return (
    <div className="min-h-dvh bg-charcoal">
      <AdminNav newLeads={newLeads} />
      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>
    </div>
  );
}
