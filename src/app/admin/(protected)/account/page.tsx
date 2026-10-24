import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";
import { Card, Field, Notice, PageTitle, inputClass } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/ConfirmButton";

const ERRORS: Record<string, string> = {
  current: "Le mot de passe actuel est incorrect.",
  short: "Le nouveau mot de passe doit contenir au moins 10 caractères.",
  mismatch: "Les deux nouveaux mots de passe ne correspondent pas.",
  email: "Adresse email invalide.",
  taken: "Cette adresse email est déjà utilisée.",
};

async function updateAccount(formData: FormData) {
  "use server";
  const admin = await requireAdmin();

  const current = String(formData.get("current") || "");
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const next = String(formData.get("password") || "");
  const confirm = String(formData.get("confirm") || "");

  if (!(await bcrypt.compare(current, admin.passwordHash))) redirect("/admin/account?error=current");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) redirect("/admin/account?error=email");
  if (next && next.length < 10) redirect("/admin/account?error=short");
  if (next !== confirm) redirect("/admin/account?error=mismatch");

  if (email !== admin.email) {
    const taken = await prisma.adminUser.findUnique({ where: { email } });
    if (taken) redirect("/admin/account?error=taken");
  }

  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { email, ...(next ? { passwordHash: await bcrypt.hash(next, 12) } : {}) },
  });
  redirect("/admin/account?saved=1");
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams: { saved?: string; error?: string };
}) {
  const admin = await requireAdmin();
  const usingDefault = await bcrypt.compare("Admin123!", admin.passwordHash);

  return (
    <div className="max-w-2xl">
      <PageTitle kicker="Compte" title="Identifiants" />

      <div className="mt-6 grid gap-3">
        {usingDefault ? (
          <Notice tone="error">
            Vous utilisez encore le mot de passe par défaut. Changez-le maintenant pour sécuriser l&apos;espace admin.
          </Notice>
        ) : null}
        {searchParams.saved ? <Notice>Identifiants mis à jour.</Notice> : null}
        {searchParams.error && ERRORS[searchParams.error] ? (
          <Notice tone="error">{ERRORS[searchParams.error]}</Notice>
        ) : null}
      </div>

      <form action={updateAccount} className="mt-8">
        <Card>
          <div className="grid gap-5">
            <Field label="Email de connexion">
              <input name="email" type="email" defaultValue={admin.email} required className={inputClass} autoComplete="username" />
            </Field>
            <Field label="Nouveau mot de passe" hint="Laissez vide pour le conserver. 10 caractères minimum.">
              <input name="password" type="password" className={inputClass} autoComplete="new-password" />
            </Field>
            <Field label="Confirmer le nouveau mot de passe">
              <input name="confirm" type="password" className={inputClass} autoComplete="new-password" />
            </Field>
            <Field label="Mot de passe actuel (obligatoire)">
              <input name="current" type="password" required className={inputClass} autoComplete="current-password" />
            </Field>
          </div>
          <div className="mt-6 flex justify-end">
            <SubmitButton>Enregistrer</SubmitButton>
          </div>
        </Card>
      </form>
    </div>
  );
}
