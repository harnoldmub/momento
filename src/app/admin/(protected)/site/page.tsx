import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";
import { Button } from "@/components/ui/Button";

async function save(formData: FormData) {
  "use server";
  await requireAdmin();

  const data = {
    heroTitle: String(formData.get("heroTitle") || ""),
    heroSubtitle: String(formData.get("heroSubtitle") || ""),
    heroCtaText: String(formData.get("heroCtaText") || ""),
    heroCtaHref: String(formData.get("heroCtaHref") || ""),
    heroVideoUrl: String(formData.get("heroVideoUrl") || ""),
    heroImageUrl: String(formData.get("heroImageUrl") || ""),
    nowBookingText: String(formData.get("nowBookingText") || ""),
    contactPhoneCongo: String(formData.get("contactPhoneCongo") || ""),
    contactPhoneFrance: String(formData.get("contactPhoneFrance") || ""),
    instagramHandle: String(formData.get("instagramHandle") || ""),
    brandPresentation: String(formData.get("brandPresentation") || ""),
    brandPromise: String(formData.get("brandPromise") || ""),
    microText1: String(formData.get("microText1") || ""),
    microText2: String(formData.get("microText2") || ""),
    microText3: String(formData.get("microText3") || ""),
    microText4: String(formData.get("microText4") || ""),
    microText5: String(formData.get("microText5") || ""),
    aboutMarkdown: String(formData.get("aboutMarkdown") || ""),
    legalMarkdown: String(formData.get("legalMarkdown") || ""),
  };

  await prisma.siteContent.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/legal");
}

export default async function AdminSiteContentPage() {
  const content = await prisma.siteContent.findUnique({ where: { id: 1 } });

  return (
    <div className="max-w-4xl">
      <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
        Site content
      </div>
      <h1 className="mt-3 font-[var(--font-display)] text-3xl tracking-[0.08em] uppercase md:text-4xl">
        Editable sections
      </h1>

      <form action={save} className="mt-10 grid gap-8">
        <div className="rounded-3xl border border-line bg-white/3 p-8">
          <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
            Hero
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span className="text-ivory/80">Title</span>
              <input
                name="heroTitle"
                defaultValue={content?.heroTitle || ""}
                className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-ivory/80">Subtitle</span>
              <input
                name="heroSubtitle"
                defaultValue={content?.heroSubtitle || ""}
                className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
              />
            </label>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span className="text-ivory/80">CTA text</span>
              <input
                name="heroCtaText"
                defaultValue={content?.heroCtaText || ""}
                className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-ivory/80">CTA link</span>
              <input
                name="heroCtaHref"
                defaultValue={content?.heroCtaHref || ""}
                className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
              />
            </label>
          </div>
          <div className="mt-5 grid gap-5">
            <label className="grid gap-2 text-sm">
              <span className="text-ivory/80">Hero image URL (fallback)</span>
              <input
                name="heroImageUrl"
                defaultValue={content?.heroImageUrl || ""}
                className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-ivory/80">Hero video URL (optional)</span>
              <input
                name="heroVideoUrl"
                defaultValue={content?.heroVideoUrl || ""}
                className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
              />
              <span className="text-xs text-ivory/55">
                Use an MP4/WebM URL from S3/Cloudinary. If empty, image fallback is used.
              </span>
            </label>
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-white/3 p-8">
          <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
            Textes officiels Momento
          </div>
          <div className="mt-5 grid gap-5">
            <label className="grid gap-2 text-sm">
              <span className="text-ivory/80">Texte de présentation</span>
              <textarea
                name="brandPresentation"
                defaultValue={content?.brandPresentation || ""}
                className="min-h-36 rounded-2xl border border-line bg-white/5 px-4 py-4 text-sm text-ivory outline-none focus:border-ivory/30"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-ivory/80">Texte promesse / closing</span>
              <textarea
                name="brandPromise"
                defaultValue={content?.brandPromise || ""}
                className="min-h-36 rounded-2xl border border-line bg-white/5 px-4 py-4 text-sm text-ivory outline-none focus:border-ivory/30"
              />
            </label>
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-white/3 p-8">
          <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
            Micro-textes signature
          </div>
          <div className="mt-5 grid gap-5">
            <label className="grid gap-2 text-sm">
              <span className="text-ivory/80">Micro-texte 1</span>
              <input
                name="microText1"
                defaultValue={content?.microText1 || ""}
                className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-ivory/80">Micro-texte 2</span>
              <input
                name="microText2"
                defaultValue={content?.microText2 || ""}
                className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-ivory/80">Micro-texte 3</span>
              <input
                name="microText3"
                defaultValue={content?.microText3 || ""}
                className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-ivory/80">Micro-texte 4</span>
              <input
                name="microText4"
                defaultValue={content?.microText4 || ""}
                className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-ivory/80">Micro-texte 5</span>
              <input
                name="microText5"
                defaultValue={content?.microText5 || ""}
                className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
              />
            </label>
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-white/3 p-8">
          <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
            Booking + contacts
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span className="text-ivory/80">Now booking text</span>
              <input
                name="nowBookingText"
                defaultValue={content?.nowBookingText || ""}
                className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-ivory/80">Instagram handle</span>
              <input
                name="instagramHandle"
                defaultValue={content?.instagramHandle || ""}
                className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
              />
            </label>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span className="text-ivory/80">Phone (RDC)</span>
              <input
                name="contactPhoneCongo"
                defaultValue={content?.contactPhoneCongo || ""}
                className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-ivory/80">Phone (France)</span>
              <input
                name="contactPhoneFrance"
                defaultValue={content?.contactPhoneFrance || ""}
                className="h-12 rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30"
              />
            </label>
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-white/3 p-8">
          <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
            About (Markdown)
          </div>
          <textarea
            name="aboutMarkdown"
            defaultValue={content?.aboutMarkdown || ""}
            className="mt-5 min-h-56 w-full rounded-2xl border border-line bg-white/5 px-4 py-4 text-sm text-ivory outline-none focus:border-ivory/30"
          />
        </div>

        <div className="rounded-3xl border border-line bg-white/3 p-8">
          <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
            Legal (Markdown)
          </div>
          <textarea
            name="legalMarkdown"
            defaultValue={content?.legalMarkdown || ""}
            className="mt-5 min-h-56 w-full rounded-2xl border border-line bg-white/5 px-4 py-4 text-sm text-ivory outline-none focus:border-ivory/30"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
