import { redirect } from "next/navigation";
import { getAdminFromCookies } from "@/lib/adminAuth";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminFromCookies();
  if (!admin) redirect("/admin/login");

  return (
    <div className="min-h-dvh bg-charcoal">
      <AdminNav />
      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>
    </div>
  );
}

