import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";
import { Button } from "@/components/ui/Button";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

async function create(formData: FormData) {
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

  const created = await prisma.project.create({
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
  redirect(`/admin/projects/${created.id}`);
}

export default function NewProjectPage() {
  return (
    <div className="max-w-3xl">
      <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
        New project
      </div>
      <h1 className="mt-3 font-[var(--font-display)] text-3xl tracking-[0.08em] uppercase">
        Create
      </h1>

      <form action={create} className="mt-10 grid gap-5 rounded-3xl border border-line bg-white/3 p-8">
        <label className="grid gap-2 text-sm">
          <span className="text-ivory/80">Title</span>
          <input
            name="title"
            required
            className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
            placeholder="Amina & Theo"
          />
        </label>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm">
            <span className="text-ivory/80">Slug</span>
            <input
              name="slug"
              className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
              placeholder="amina-theo-kinshasa"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-ivory/80">Category</span>
            <select
              name="category"
              className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
              defaultValue="WEDDING"
            >
              <option value="WEDDING">Wedding</option>
              <option value="ENGAGEMENT">Engagement</option>
              <option value="COUPLE">Couple</option>
              <option value="EVENTS">Events</option>
              <option value="FILMS">Films</option>
            </select>
          </label>
        </div>
        <label className="grid gap-2 text-sm">
          <span className="text-ivory/80">Cover URL</span>
          <input
            name="coverUrl"
            required
            className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
            placeholder="https://..."
          />
        </label>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm">
            <span className="text-ivory/80">Location</span>
            <input
              name="location"
              className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
              placeholder="Kinshasa, RDC"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-ivory/80">Date</span>
            <input
              name="date"
              type="date"
              className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm">
          <span className="text-ivory/80">Tags (comma-separated)</span>
          <input
            name="tags"
            className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
            placeholder="wedding,luxury,kinshasa"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="text-ivory/80">Description</span>
          <textarea
            name="description"
            className="min-h-28 rounded-xl border border-line bg-white/5 px-4 py-3 text-ivory outline-none focus:border-ivory/30"
          />
        </label>

        <label className="flex items-center gap-3 text-sm text-ivory/80">
          <input type="checkbox" name="featured" className="h-4 w-4 accent-[color:var(--accent)]" />
          Featured on home
        </label>

        <div className="flex items-center justify-end gap-3">
          <Button href="/admin/projects" variant="ghost">
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
}

