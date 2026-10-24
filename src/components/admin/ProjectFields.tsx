import type { Project } from "@prisma/client";
import { CATEGORY_LABEL, CATEGORY_ORDER } from "@/components/portfolio/category";
import { Field, inputClass, textareaClass } from "@/components/admin/fields";

export function ProjectFields({ project }: { project?: Project }) {
  const date = project?.date ? project.date.toISOString().slice(0, 10) : "";
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Titre">
          <input name="title" required defaultValue={project?.title} className={inputClass} placeholder="Amina & Theo" />
        </Field>
        <Field label="Adresse de la page (slug)" hint="Générée à partir du titre si vide.">
          <input name="slug" defaultValue={project?.slug} className={inputClass} placeholder="amina-theo-kinshasa" />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Catégorie">
          <select name="category" defaultValue={project?.category || "WEDDING"} className={inputClass}>
            {CATEGORY_ORDER.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABEL[c]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Image de couverture (URL ou chemin)" hint="Optionnel : la première photo importée est utilisée sinon.">
          <input name="coverUrl" defaultValue={project?.coverUrl} className={inputClass} placeholder="https://… ou /portfolio/…" />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <Field label="Lieu">
          <input name="location" defaultValue={project?.location} className={inputClass} placeholder="Paris, France" />
        </Field>
        <Field label="Date">
          <input name="date" type="date" defaultValue={date} className={inputClass} />
        </Field>
        <Field label="Mots-clés (séparés par des virgules)">
          <input name="tags" defaultValue={project?.tags} className={inputClass} placeholder="mariage,paris,luxe" />
        </Field>
      </div>

      <Field label="Description" hint="Affichée sur la page du projet et utilisée pour le référencement Google.">
        <textarea name="description" defaultValue={project?.description} className={textareaClass} />
      </Field>

      <label className="flex items-center gap-3 text-sm text-ivory/80">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={project?.featured}
          className="h-4 w-4 accent-[color:var(--accent)]"
        />
        Mettre en avant (affiché en premier dans le portfolio)
      </label>
    </div>
  );
}
