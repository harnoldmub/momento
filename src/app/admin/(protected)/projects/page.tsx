import Link from "next/link";
import { prisma } from "@/lib/db";
import { coverOf } from "@/lib/siteContent";
import { Button } from "@/components/ui/Button";
import { PageTitle } from "@/components/admin/fields";
import { CATEGORY_LABEL } from "@/components/portfolio/category";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { media: true } },
      media: { where: { type: "IMAGE" }, orderBy: { order: "asc" }, take: 1 },
    },
  });

  return (
    <div>
      <PageTitle kicker="Projets" title="Portfolio">
        <Button href="/admin/projects/new">Nouveau projet</Button>
      </PageTitle>

      <div className="mt-10 overflow-hidden rounded-2xl border border-line">
        <div className="hidden grid-cols-12 bg-white/3 px-5 py-3 text-xs tracking-[0.22em] uppercase text-ivory/55 md:grid">
          <div className="col-span-6">Titre</div>
          <div className="col-span-2">Catégorie</div>
          <div className="col-span-2">Médias</div>
          <div className="col-span-2 text-right">Action</div>
        </div>
        <div className="divide-y divide-line">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/admin/projects/${p.id}`}
              className="grid grid-cols-12 items-center gap-3 px-5 py-4 text-sm transition hover:bg-white/3"
            >
              <div className="col-span-12 flex items-center gap-4 md:col-span-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverOf(p)} alt="" className="h-14 w-12 shrink-0 rounded-lg object-cover" />
                <div>
                  <div className="text-ivory">
                    {p.title}
                    {p.featured ? <span className="ml-2 text-xs text-ivory/50">★ mis en avant</span> : null}
                  </div>
                  <div className="mt-1 text-xs text-ivory/55">/portfolio/{p.slug}</div>
                </div>
              </div>
              <div className="col-span-5 text-ivory/75 md:col-span-2">{CATEGORY_LABEL[p.category]}</div>
              <div className="col-span-4 text-ivory/75 md:col-span-2">{p._count.media} média(s)</div>
              <div className="col-span-3 text-right text-xs tracking-[0.22em] uppercase text-ivory md:col-span-2">
                Modifier
              </div>
            </Link>
          ))}
          {projects.length === 0 ? (
            <div className="px-5 py-10 text-sm text-ivory/65">Aucun projet pour le moment.</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
