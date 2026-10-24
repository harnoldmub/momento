import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";
import { readProjectForm, uniqueSlug } from "@/lib/projects";
import { deleteLocalUpload } from "@/lib/storage";
import { Button } from "@/components/ui/Button";
import { Card, Notice, PageTitle } from "@/components/admin/fields";
import { ConfirmButton, SubmitButton } from "@/components/admin/ConfirmButton";
import { ProjectFields } from "@/components/admin/ProjectFields";
import { MediaManager } from "@/components/admin/MediaManager";

async function updateProject(id: string, formData: FormData) {
  "use server";
  await requireAdmin();

  const { slugInput, ...data } = readProjectForm(formData);
  if (!data.title) redirect(`/admin/projects/${id}?error=title`);

  await prisma.project.update({
    where: { id },
    data: { ...data, slug: await uniqueSlug(slugInput, id) },
  });

  revalidatePath("/", "layout");
  redirect(`/admin/projects/${id}?saved=1`);
}

async function deleteProject(id: string) {
  "use server";
  await requireAdmin();
  const media = await prisma.media.findMany({ where: { projectId: id }, select: { url: true } });
  const project = await prisma.project.findUnique({ where: { id }, select: { coverUrl: true } });
  await prisma.project.delete({ where: { id } }).catch(() => {});
  for (const url of new Set([...media.map((m) => m.url), project?.coverUrl || ""])) {
    await deleteLocalUpload(url);
  }
  revalidatePath("/", "layout");
  redirect("/admin/projects");
}

export default async function AdminProjectEditPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { saved?: string; created?: string; error?: string };
}) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { media: { orderBy: { order: "asc" } } },
  });
  if (!project) return notFound();

  return (
    <div className="grid gap-8">
      <PageTitle kicker="Modifier le projet" title={project.title}>
        <form action={deleteProject.bind(null, project.id)}>
          <ConfirmButton message={`Supprimer définitivement « ${project.title} » et tous ses médias ?`}>
            Supprimer le projet
          </ConfirmButton>
        </form>
      </PageTitle>
      <div className="-mt-4 text-sm text-ivory/60">
        Page publique :{" "}
        <Link className="text-ivory underline-offset-4 hover:underline" href={`/portfolio/${project.slug}`} target="_blank">
          /portfolio/{project.slug} ↗
        </Link>
      </div>

      {searchParams.created ? <Notice>Projet créé. Ajoutez maintenant les photos ci-dessous.</Notice> : null}
      {searchParams.saved ? <Notice>Modifications enregistrées.</Notice> : null}
      {searchParams.error ? <Notice tone="error">Le titre est obligatoire.</Notice> : null}

      <form action={updateProject.bind(null, project.id)}>
        <Card title="Informations">
          <ProjectFields project={project} />
          <div className="mt-6 flex items-center justify-end gap-3">
            <Button href="/admin/projects" variant="ghost">
              Retour
            </Button>
            <SubmitButton>Enregistrer</SubmitButton>
          </div>
        </Card>
      </form>

      <MediaManager projectId={project.id} initialMedia={project.media} initialCoverUrl={project.coverUrl} />
    </div>
  );
}
