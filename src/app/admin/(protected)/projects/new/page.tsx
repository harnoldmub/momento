import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";
import { readProjectForm, uniqueSlug } from "@/lib/projects";
import { Button } from "@/components/ui/Button";
import { Card, Notice, PageTitle } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/ConfirmButton";
import { ProjectFields } from "@/components/admin/ProjectFields";

async function create(formData: FormData) {
  "use server";
  await requireAdmin();

  const { slugInput, ...data } = readProjectForm(formData);
  if (!data.title) redirect("/admin/projects/new?error=title");

  const created = await prisma.project.create({
    data: { ...data, slug: await uniqueSlug(slugInput) },
  });

  revalidatePath("/", "layout");
  redirect(`/admin/projects/${created.id}?created=1`);
}

export default function NewProjectPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="max-w-3xl">
      <PageTitle kicker="Nouveau projet" title="Créer un reportage" />
      <p className="mt-4 text-sm text-ivory/60">
        Après la création, vous pourrez importer les photos et ajouter des films.
      </p>

      {searchParams.error ? (
        <div className="mt-6">
          <Notice tone="error">Le titre est obligatoire.</Notice>
        </div>
      ) : null}

      <form action={create} className="mt-8">
        <Card>
          <ProjectFields />
          <div className="mt-6 flex items-center justify-end gap-3">
            <Button href="/admin/projects" variant="ghost">
              Annuler
            </Button>
            <SubmitButton>Créer</SubmitButton>
          </div>
        </Card>
      </form>
    </div>
  );
}
