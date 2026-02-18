import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";
import { Button } from "@/components/ui/Button";
import { MediaManager } from "@/components/admin/MediaManager";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

async function updateProject(id: string, formData: FormData) {
  "use server";
  await requireAdmin();

  const title = String(formData.get("title") || "").trim();
  const slugRaw = String(formData.get("slug") || "").trim();
  const slug = slugRaw ? slugify(slugRaw) : slugify(title);
  const category = String(formData.get("category") || "WEDDING");
  const coverUrl = String(formData.get("coverUrl") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const dateRaw = String(formData.get("date") || "").trim();
  const tags = String(formData.get("tags") || "").trim();
  const featured = formData.get("featured") === "on";
  const description = String(formData.get("description") || "").trim();

  if (!title) throw new Error("Title required");
  if (!coverUrl) throw new Error("Cover URL required");

  await prisma.project.update({
    where: { id },
    data: {
      title,
      slug,
      category: category as any,
      coverUrl,
      location,
      date: dateRaw ? new Date(dateRaw) : null,
      tags,
      featured,
      description,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}`);
  revalidatePath("/portfolio");
}

async function deleteProject(id: string) {
  "use server";
  await requireAdmin();
  const p = await prisma.project.findUnique({ where: { id }, select: { slug: true } });
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
  if (p?.slug) revalidatePath(`/portfolio/${p.slug}`);
  redirect("/admin/projects");
}

export default async function AdminProjectEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { media: { orderBy: { order: "asc" } } },
  });
  if (!project) return notFound();

  const date = project.date ? project.date.toISOString().slice(0, 10) : "";

  return (
    <div className="grid gap-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
            Edit project
          </div>
          <h1 className="mt-3 font-[var(--font-display)] text-3xl tracking-[0.08em] uppercase md:text-4xl">
            {project.title}
          </h1>
          <div className="mt-3 text-sm text-ivory/60">
            Public:{" "}
            <Link
              className="text-ivory hover:text-white"
              href={`/portfolio/${project.slug}`}
              target="_blank"
            >
              /portfolio/{project.slug}
            </Link>
          </div>
        </div>
        <form action={deleteProject.bind(null, project.id)}>
          <Button variant="outline" type="submit">
            Delete project
          </Button>
        </form>
      </div>

      <form
        action={updateProject.bind(null, project.id)}
        className="grid gap-5 rounded-3xl border border-line bg-white/3 p-8"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm">
            <span className="text-ivory/80">Title</span>
            <input
              name="title"
              required
              defaultValue={project.title}
              className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-ivory/80">Slug</span>
            <input
              name="slug"
              defaultValue={project.slug}
              className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
            />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm">
            <span className="text-ivory/80">Category</span>
            <select
              name="category"
              defaultValue={project.category}
              className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
            >
              <option value="WEDDING">Wedding</option>
              <option value="ENGAGEMENT">Engagement</option>
              <option value="COUPLE">Couple</option>
              <option value="EVENTS">Events</option>
              <option value="FILMS">Films</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-ivory/80">Cover URL</span>
            <input
              name="coverUrl"
              required
              defaultValue={project.coverUrl}
              className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
            />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <label className="grid gap-2 text-sm md:col-span-1">
            <span className="text-ivory/80">Location</span>
            <input
              name="location"
              defaultValue={project.location}
              className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
            />
          </label>
          <label className="grid gap-2 text-sm md:col-span-1">
            <span className="text-ivory/80">Date</span>
            <input
              name="date"
              type="date"
              defaultValue={date}
              className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
            />
          </label>
          <label className="grid gap-2 text-sm md:col-span-1">
            <span className="text-ivory/80">Tags</span>
            <input
              name="tags"
              defaultValue={project.tags}
              className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm">
          <span className="text-ivory/80">Description</span>
          <textarea
            name="description"
            defaultValue={project.description}
            className="min-h-28 rounded-xl border border-line bg-white/5 px-4 py-3 text-ivory outline-none focus:border-ivory/30"
          />
        </label>

        <label className="flex items-center gap-3 text-sm text-ivory/80">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={project.featured}
            className="h-4 w-4 accent-[color:var(--accent)]"
          />
          Featured on home
        </label>

        <div className="flex items-center justify-end gap-3">
          <Button href="/admin/projects" variant="ghost">
            Back
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>

      <MediaManager projectId={project.id} initialMedia={project.media} />
    </div>
  );
}
