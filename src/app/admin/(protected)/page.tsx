import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageTitle } from "@/components/admin/fields";
import { INQUIRY_LABEL } from "@/components/admin/labels";

export default async function AdminDashboardPage() {
  const [projectCount, mediaCount, testimonialCount, leadCount, newLeadCount, latestLeads] =
    await Promise.all([
      prisma.project.count(),
      prisma.media.count(),
      prisma.testimonial.count(),
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const cards = [
    { label: "Projets", value: projectCount, href: "/admin/projects" },
    { label: "Médias", value: mediaCount, href: "/admin/projects" },
    { label: "Témoignages", value: testimonialCount, href: "/admin/testimonials" },
    { label: "Demandes", value: leadCount, href: "/admin/leads" },
    { label: "Nouvelles demandes", value: newLeadCount, href: "/admin/leads?status=NEW" },
  ];

  return (
    <div>
      <PageTitle kicker="Tableau de bord" title="Espace Momento" />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-line bg-white/3 p-6 transition hover:border-ivory/30"
          >
            <div className="text-xs tracking-[0.22em] uppercase text-ivory/55">{c.label}</div>
            <div className="mt-3 text-3xl text-ivory">{c.value}</div>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xs tracking-[0.28em] uppercase text-ivory/55">Dernières demandes</h2>
          <Link href="/admin/leads" className="text-xs tracking-[0.22em] uppercase text-ivory/70 hover:text-ivory">
            Tout voir →
          </Link>
        </div>
        <div className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line">
          {latestLeads.map((l) => (
            <div key={l.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm">
              <div>
                <div className="text-ivory">{l.name}</div>
                <div className="mt-1 text-xs text-ivory/55">
                  {INQUIRY_LABEL[l.inquiryType]} · {l.location || "Lieu non précisé"}
                </div>
              </div>
              <div className="text-xs text-ivory/55">
                {l.createdAt.toLocaleDateString("fr-FR")}
                {l.status === "NEW" ? <span className="ml-3 rounded-full bg-ivory px-2 py-0.5 text-charcoal">Nouveau</span> : null}
              </div>
            </div>
          ))}
          {latestLeads.length === 0 ? (
            <div className="px-5 py-8 text-sm text-ivory/60">Aucune demande pour le moment.</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
