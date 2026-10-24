import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";
import { heroImageOf } from "@/lib/siteContent";
import { Card, Field, Notice, PageTitle, inputClass, textareaClass } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/ConfirmButton";

async function save(formData: FormData) {
  "use server";
  await requireAdmin();

  const str = (k: string) => String(formData.get(k) || "").trim();
  const data = {
    heroImageUrl: str("heroImageUrl") || "/hero/hero.jpg",
    heroVideoUrl: str("heroVideoUrl"),
    contactPhoneCongo: str("contactPhoneCongo"),
    contactPhoneFrance: str("contactPhoneFrance"),
    instagramHandle: str("instagramHandle").replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/$/, ""),
    legalMarkdown: String(formData.get("legalMarkdown") || ""),
  };

  await prisma.siteContent.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });

  revalidatePath("/", "layout");
  redirect("/admin/site?saved=1");
}

export default async function AdminSiteContentPage({
  searchParams,
}: {
  searchParams: { saved?: string };
}) {
  const content = await prisma.siteContent.findUnique({ where: { id: 1 } });

  return (
    <div className="max-w-4xl">
      <PageTitle kicker="Contenu du site" title="Textes & coordonnées" />

      {searchParams.saved ? (
        <div className="mt-6">
          <Notice>Modifications enregistrées et publiées sur le site.</Notice>
        </div>
      ) : null}

      <form action={save} className="mt-10 grid gap-8">
        <Card title="Accueil — visuel principal">
          <div className="grid gap-5">
            <Field label="Image d'accueil (URL ou chemin)" hint="Par défaut : /hero/hero.jpg">
              <input name="heroImageUrl" defaultValue={heroImageOf(content?.heroImageUrl)} className={inputClass} />
            </Field>
            <Field
              label="Vidéo d'accueil (optionnelle)"
              hint="Lien direct vers un fichier MP4/WebM. Si vide, l'image est affichée."
            >
              <input name="heroVideoUrl" defaultValue={content?.heroVideoUrl || ""} className={inputClass} placeholder="https://…/film.mp4" />
            </Field>
          </div>
        </Card>

        <Card title="Coordonnées (pied de page + page contact)">
          <div className="grid gap-5 md:grid-cols-3">
            <Field label="Téléphone RDC (aussi utilisé pour WhatsApp)">
              <input name="contactPhoneCongo" defaultValue={content?.contactPhoneCongo || ""} className={inputClass} />
            </Field>
            <Field label="Téléphone France">
              <input name="contactPhoneFrance" defaultValue={content?.contactPhoneFrance || ""} className={inputClass} />
            </Field>
            <Field label="Compte Instagram">
              <input name="instagramHandle" defaultValue={content?.instagramHandle || ""} className={inputClass} placeholder="momento_rdc" />
            </Field>
          </div>
        </Card>

        <Card title="Mentions légales">
          <Field
            label="Contenu de la page /legal"
            hint="Format simple : « ## Titre », « ### Sous-titre », « - élément de liste », paragraphes séparés par une ligne vide."
          >
            <textarea name="legalMarkdown" defaultValue={content?.legalMarkdown || ""} className={`${textareaClass} min-h-80 font-mono text-xs`} />
          </Field>
        </Card>

        <div className="flex justify-end">
          <SubmitButton>Enregistrer</SubmitButton>
        </div>
      </form>
    </div>
  );
}
