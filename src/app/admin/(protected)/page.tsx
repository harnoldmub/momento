import { prisma } from "@/lib/db";

export default async function AdminDashboardPage() {
  const [projectCount, mediaCount, leadCount, newLeadCount] = await Promise.all([
    prisma.project.count(),
    prisma.media.count(),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
  ]);

  const cards = [
    { label: "Projects", value: projectCount },
    { label: "Media", value: mediaCount },
    { label: "Leads", value: leadCount },
    { label: "New leads", value: newLeadCount },
  ];

  return (
    <div>
      <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
        Dashboard
      </div>
      <h1 className="mt-3 font-[var(--font-display)] text-3xl tracking-[0.08em] uppercase md:text-4xl">
        Momento Backoffice
      </h1>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-line bg-white/3 p-6"
          >
            <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
              {c.label}
            </div>
            <div className="mt-3 text-3xl text-ivory">{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

