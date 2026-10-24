import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Testimonial } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";
import { Card, Field, Notice, PageTitle, inputClass, textareaClass } from "@/components/admin/fields";
import { ConfirmButton, SubmitButton } from "@/components/admin/ConfirmButton";

const PATH = "/admin/testimonials";

function readForm(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const detail = String(formData.get("detail") || "").trim();
  const orderNum = Number(formData.get("order") || 0);
  const ratingRaw = String(formData.get("rating") || "").trim();
  const ratingNum = Number(ratingRaw);
  return {
    name,
    message,
    detail,
    order: Number.isFinite(orderNum) ? Math.round(orderNum) : 0,
    rating: ratingRaw && Number.isFinite(ratingNum) ? Math.max(1, Math.min(5, Math.round(ratingNum))) : null,
    featured: formData.get("featured") === "on",
  };
}

async function done(msg: string, tone: "ok" | "error" = "ok"): Promise<never> {
  revalidatePath("/", "layout");
  redirect(`${PATH}?${tone}=${encodeURIComponent(msg)}`);
}

function isUniqueError(e: unknown) {
  return typeof e === "object" && e !== null && (e as { code?: string }).code === "P2002";
}

async function create(formData: FormData) {
  "use server";
  await requireAdmin();
  const data = readForm(formData);
  if (!data.name || !data.message) return done("Le nom et le message sont obligatoires.", "error");
  try {
    await prisma.testimonial.create({ data });
  } catch (e) {
    if (isUniqueError(e)) return done("Un témoignage avec ce nom et ce détail existe déjà.", "error");
    throw e;
  }
  return done("Témoignage ajouté.");
}

async function update(id: string, formData: FormData) {
  "use server";
  await requireAdmin();
  const data = readForm(formData);
  if (!data.name || !data.message) return done("Le nom et le message sont obligatoires.", "error");
  try {
    await prisma.testimonial.update({ where: { id }, data });
  } catch (e) {
    if (isUniqueError(e)) return done("Un témoignage avec ce nom et ce détail existe déjà.", "error");
    throw e;
  }
  return done("Témoignage mis à jour.");
}

async function remove(id: string) {
  "use server";
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id } }).catch(() => {});
  return done("Témoignage supprimé.");
}

function TestimonialFields({ t }: { t?: Testimonial }) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nom">
          <input name="name" defaultValue={t?.name} className={inputClass} required />
        </Field>
        <Field label="Détail (lieu · type)">
          <input name="detail" defaultValue={t?.detail} className={inputClass} placeholder="Kinshasa · Mariage" />
        </Field>
      </div>
      <Field label="Message">
        <textarea name="message" defaultValue={t?.message} className={textareaClass} required />
      </Field>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Ordre d'affichage">
          <input name="order" type="number" defaultValue={t?.order ?? 0} className={inputClass} />
        </Field>
        <Field label="Note (1-5, optionnelle)">
          <input name="rating" type="number" min={1} max={5} defaultValue={t?.rating ?? ""} className={inputClass} />
        </Field>
        <label className="flex items-center gap-3 text-sm text-ivory/80 md:pt-8">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={t ? t.featured : true}
            className="h-4 w-4 accent-[color:var(--accent)]"
          />
          Afficher sur l&apos;accueil
        </label>
      </div>
    </div>
  );
}

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams: { ok?: string; error?: string };
}) {
  const items = await prisma.testimonial.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });

  return (
    <div className="max-w-4xl">
      <PageTitle kicker="Témoignages" title="Avis des couples" />
      <p className="mt-4 text-sm text-ivory/60">
        Les témoignages cochés « Afficher sur l&apos;accueil » apparaissent dans le carrousel de la page d&apos;accueil (6 maximum, triés par ordre).
      </p>

      <div className="mt-6 grid gap-3">
        {searchParams.ok ? <Notice>{searchParams.ok}</Notice> : null}
        {searchParams.error ? <Notice tone="error">{searchParams.error}</Notice> : null}
      </div>

      <form action={create} className="mt-8">
        <Card title="Ajouter un témoignage">
          <TestimonialFields />
          <div className="mt-5 flex justify-end">
            <SubmitButton>Ajouter</SubmitButton>
          </div>
        </Card>
      </form>

      <div className="mt-10 grid gap-5">
        {items.map((t) => (
          <details key={t.id} className="group rounded-2xl border border-line bg-white/3 p-6">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
              <div>
                <div className="text-xs tracking-[0.22em] uppercase text-ivory/55">
                  Ordre {t.order} · {t.featured ? "Affiché sur l'accueil" : "Masqué"}
                  {t.rating ? ` · ${t.rating}/5` : ""}
                </div>
                <div className="mt-2 text-lg text-ivory">{t.name}</div>
                {t.detail ? <div className="mt-1 text-sm text-ivory/60">{t.detail}</div> : null}
                <div className="mt-3 text-sm leading-relaxed text-ivory/70">“{t.message}”</div>
              </div>
              <span className="shrink-0 rounded-full border border-line px-4 py-2 text-xs tracking-[0.18em] uppercase text-ivory/70 group-open:hidden">
                Modifier
              </span>
            </summary>
            <form action={update.bind(null, t.id)} className="mt-6 border-t border-line pt-6">
              <TestimonialFields t={t} />
              <div className="mt-5 flex justify-end">
                <SubmitButton>Enregistrer</SubmitButton>
              </div>
            </form>
            <form action={remove.bind(null, t.id)} className="mt-3 flex justify-end">
              <ConfirmButton message={`Supprimer le témoignage de ${t.name} ?`}>Supprimer</ConfirmButton>
            </form>
          </details>
        ))}

        {items.length === 0 ? (
          <div className="rounded-2xl border border-line bg-white/3 p-8 text-sm text-ivory/65">
            Aucun témoignage pour le moment.
          </div>
        ) : null}
      </div>
    </div>
  );
}
