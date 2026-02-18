import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";
import { Button } from "@/components/ui/Button";

async function create(formData: FormData) {
  "use server";
  await requireAdmin();

  const name = String(formData.get("name") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const detail = String(formData.get("detail") || "").trim();
  const orderRaw = String(formData.get("order") || "0");
  const ratingRaw = String(formData.get("rating") || "").trim();
  const order = Number.isFinite(Number(orderRaw)) ? Number(orderRaw) : 0;
  const ratingNum = Number(ratingRaw);
  const rating =
    ratingRaw && Number.isFinite(ratingNum)
      ? Math.max(1, Math.min(5, Math.round(ratingNum)))
      : null;
  const featured = formData.get("featured") === "on";
  if (!name || !message) throw new Error("Name and message required");

  await prisma.testimonial.create({
    data: { name, message, detail, order, rating, featured },
  });
  revalidatePath("/admin/testimonials");
}

async function remove(id: string) {
  "use server";
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
}

export default async function AdminTestimonialsPage() {
  const items = await prisma.testimonial.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });

  return (
    <div className="max-w-4xl">
      <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
        Testimonials
      </div>
      <h1 className="mt-3 font-[var(--font-display)] text-3xl tracking-[0.08em] uppercase md:text-4xl">
        Social proof
      </h1>

      <div className="mt-10 grid gap-5">
        {items.map((t) => (
          <div key={t.id} className="rounded-2xl border border-line bg-white/3 p-6">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
                  Order {t.order}
                </div>
                <div className="mt-2 text-lg text-ivory">{t.name}</div>
                {t.detail ? <div className="mt-1 text-sm text-ivory/60">{t.detail}</div> : null}
                <div className="mt-1 text-xs tracking-[0.2em] uppercase text-ivory/50">
                  {t.featured ? "Featured" : "Hidden on home"}
                  {t.rating ? ` · ${t.rating}/5` : ""}
                </div>
              </div>
              <form action={remove.bind(null, t.id)}>
                <Button variant="outline" type="submit">
                  Delete
                </Button>
              </form>
            </div>
            <div className="mt-5 text-sm leading-relaxed text-ivory/70">“{t.message}”</div>
          </div>
        ))}

        {items.length === 0 ? (
          <div className="rounded-2xl border border-line bg-white/3 p-8 text-sm text-ivory/65">
            No testimonials yet.
          </div>
        ) : null}
      </div>

      <form action={create} className="mt-10 grid gap-4 rounded-3xl border border-line bg-white/3 p-8">
        <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">Add testimonial</div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm">
            <span className="text-ivory/80">Name</span>
            <input
              name="name"
              className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
              required
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-ivory/80">Detail</span>
            <input
              name="detail"
              className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
              placeholder="Kinshasa · Wedding"
            />
          </label>
        </div>
        <label className="grid gap-2 text-sm">
          <span className="text-ivory/80">Message</span>
          <textarea
            name="message"
            className="min-h-24 rounded-xl border border-line bg-white/5 px-4 py-3 text-ivory outline-none focus:border-ivory/30"
            required
          />
        </label>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm">
            <span className="text-ivory/80">Order</span>
            <input
              name="order"
              type="number"
              defaultValue={0}
              className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-ivory/80">Rating (1-5, optional)</span>
            <input
              name="rating"
              type="number"
              min={1}
              max={5}
              className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
            />
          </label>
          <label className="flex items-center gap-3 text-sm text-ivory/80 md:pt-8">
            <input
              type="checkbox"
              name="featured"
              defaultChecked
              className="h-4 w-4 accent-[color:var(--accent)]"
            />
            Show on Home
          </label>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Add</Button>
        </div>
      </form>
    </div>
  );
}
