import Link from "next/link";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/Button";
import { CATEGORY_LABEL } from "@/components/portfolio/category";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { media: true } } },
  });

  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
            Projects
          </div>
          <h1 className="mt-3 font-[var(--font-display)] text-3xl tracking-[0.08em] uppercase md:text-4xl">
            Manage portfolio
          </h1>
        </div>
        <Button href="/admin/projects/new">New project</Button>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-line">
        <div className="grid grid-cols-12 bg-white/3 px-5 py-3 text-xs tracking-[0.22em] uppercase text-ivory/55">
          <div className="col-span-5">Title</div>
          <div className="col-span-3">Category</div>
          <div className="col-span-2">Media</div>
          <div className="col-span-2 text-right">Edit</div>
        </div>
        <div className="divide-y divide-line">
          {projects.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-12 items-center px-5 py-4 text-sm"
            >
              <div className="col-span-5">
                <div className="text-ivory">{p.title}</div>
                <div className="mt-1 text-xs text-ivory/55">/{p.slug}</div>
              </div>
              <div className="col-span-3 text-ivory/75">
                {CATEGORY_LABEL[p.category]}
              </div>
              <div className="col-span-2 text-ivory/75">{p._count.media}</div>
              <div className="col-span-2 text-right">
                <Link
                  className="text-xs tracking-[0.22em] uppercase text-ivory hover:text-white"
                  href={`/admin/projects/${p.id}`}
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
          {projects.length === 0 ? (
            <div className="px-5 py-10 text-sm text-ivory/65">
              No projects yet.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

