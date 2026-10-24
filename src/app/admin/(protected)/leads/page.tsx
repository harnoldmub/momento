import Link from "next/link";
import { revalidatePath } from "next/cache";
import type { LeadStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";
import { PageTitle } from "@/components/admin/fields";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { INQUIRY_LABEL, STATUS_LABEL } from "@/components/admin/labels";
import { cn } from "@/lib/utils";

const STATUSES = Object.keys(STATUS_LABEL) as LeadStatus[];

async function updateStatus(id: string, formData: FormData) {
  "use server";
  await requireAdmin();
  const status = String(formData.get("status") || "NEW") as LeadStatus;
  if (!STATUSES.includes(status)) return;
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin", "layout");
}

async function removeLead(id: string) {
  "use server";
  await requireAdmin();
  await prisma.lead.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin", "layout");
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const filter = STATUSES.includes(searchParams.status as LeadStatus)
    ? (searchParams.status as LeadStatus)
    : undefined;

  const [leads, counts] = await Promise.all([
    prisma.lead.findMany({
      where: filter ? { status: filter } : undefined,
      orderBy: { createdAt: "desc" },
      take: 300,
    }),
    prisma.lead.groupBy({ by: ["status"], _count: true }),
  ]);
  const countOf = (s: LeadStatus) => counts.find((c) => c.status === s)?._count ?? 0;
  const total = counts.reduce((n, c) => n + c._count, 0);

  const tab = (active: boolean) =>
    cn(
      "rounded-full border px-4 py-2 text-[11px] tracking-[0.18em] uppercase transition",
      active ? "border-ivory/50 text-ivory" : "border-line text-ivory/60 hover:text-ivory",
    );

  return (
    <div>
      <PageTitle kicker="Demandes" title="Demandes de réservation" />

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/leads" className={tab(!filter)}>
          Toutes ({total})
        </Link>
        {STATUSES.map((s) => (
          <Link key={s} href={`/admin/leads?status=${s}`} className={tab(filter === s)}>
            {STATUS_LABEL[s]} ({countOf(s)})
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-5">
        {leads.map((l) => (
          <div key={l.id} className="rounded-2xl border border-line bg-white/3 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-xs tracking-[0.22em] uppercase text-ivory/55">
                  {INQUIRY_LABEL[l.inquiryType]} · reçue le{" "}
                  {l.createdAt.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                </div>
                <div className="mt-2 text-xl text-ivory">{l.name}</div>
                <div className="mt-2 text-sm text-ivory/65">
                  {l.location || "Lieu non précisé"}
                  {l.eventDate
                    ? ` · événement le ${l.eventDate.toLocaleDateString("fr-FR", { timeZone: "UTC" })}`
                    : ""}
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  {l.email ? (
                    <a className="text-ivory/80 underline-offset-4 hover:text-ivory hover:underline" href={`mailto:${l.email}`}>
                      {l.email}
                    </a>
                  ) : null}
                  {l.whatsapp ? (
                    <a
                      className="text-ivory/80 underline-offset-4 hover:text-ivory hover:underline"
                      href={`https://wa.me/${l.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp {l.whatsapp}
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <form action={updateStatus.bind(null, l.id)} className="flex items-center gap-3">
                  <select
                    name="status"
                    defaultValue={l.status}
                    className="h-11 rounded-xl border border-line bg-white/5 px-3 text-sm text-ivory outline-none"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABEL[s]}
                      </option>
                    ))}
                  </select>
                  <button className="rounded-full border border-line px-4 py-2 text-xs tracking-[0.18em] uppercase text-ivory/80 hover:bg-white/5">
                    Enregistrer
                  </button>
                </form>
                <form action={removeLead.bind(null, l.id)}>
                  <ConfirmButton message={`Supprimer la demande de ${l.name} ?`}>Supprimer</ConfirmButton>
                </form>
              </div>
            </div>

            <div className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-ivory/70">
              {l.message}
            </div>
          </div>
        ))}

        {leads.length === 0 ? (
          <div className="rounded-2xl border border-line bg-white/3 p-8 text-sm text-ivory/65">
            Aucune demande{filter ? " avec ce statut" : ""}.
          </div>
        ) : null}
      </div>
    </div>
  );
}
