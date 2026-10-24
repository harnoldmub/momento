"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Media } from "@prisma/client";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

async function call(url: string, init: RequestInit) {
  const res = await fetch(url, init).catch(() => null);
  const j = await res?.json().catch(() => null);
  if (!res || !res.ok) throw new Error(j?.error || "L'opération a échoué");
  return j;
}

export function MediaManager({
  projectId,
  initialMedia,
  initialCoverUrl,
}: {
  projectId: string;
  initialMedia: Media[];
  initialCoverUrl: string;
}) {
  const router = useRouter();
  const [media, setMedia] = useState<Media[]>(
    initialMedia.slice().sort((a, b) => a.order - b.order),
  );
  const [coverUrl, setCoverUrl] = useState(initialCoverUrl);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [orderDirty, setOrderDirty] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);

  async function run(fn: () => Promise<void>, success?: string) {
    setBusy(true);
    setError("");
    setInfo("");
    try {
      await fn();
      if (success) setInfo(success);
      router.refresh();
    } catch (e: any) {
      setError(e?.message || "L'opération a échoué");
    } finally {
      setBusy(false);
    }
  }

  function upload(input: HTMLInputElement) {
    const files = input.files;
    if (!files || files.length === 0) return;
    void run(async () => {
      const fd = new FormData();
      for (const f of Array.from(files)) fd.append("files", f);
      const j = await call(`/api/admin/projects/${projectId}/media/upload`, { method: "POST", body: fd });
      setMedia((m) => [...m, ...(j.created as Media[])]);
      if (j.coverUrl) setCoverUrl(j.coverUrl);
      input.value = "";
    }, `${files.length} fichier(s) importé(s).`);
  }

  function addUrl(form: HTMLFormElement) {
    const fd = new FormData(form);
    void run(async () => {
      const j = await call(`/api/admin/projects/${projectId}/media/add-url`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          type: String(fd.get("type") || "IMAGE"),
          url: String(fd.get("url") || ""),
          alt: String(fd.get("alt") || ""),
        }),
      });
      setMedia((m) => [...m, j.created as Media]);
      if (j.coverUrl) setCoverUrl(j.coverUrl);
      form.reset();
    }, "Média ajouté.");
  }

  function saveOrder() {
    void run(async () => {
      await call("/api/admin/media/reorder", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ projectId, orderedIds: media.map((m) => m.id) }),
      });
      setOrderDirty(false);
    }, "Ordre enregistré.");
  }

  function remove(m: Media) {
    if (!window.confirm("Supprimer ce média ?")) return;
    void run(async () => {
      await call(`/api/admin/media/${m.id}`, { method: "DELETE" });
      setMedia((list) => list.filter((x) => x.id !== m.id));
    }, "Média supprimé.");
  }

  function setCover(m: Media) {
    void run(async () => {
      await call(`/api/admin/projects/${projectId}/cover`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: m.url }),
      });
      setCoverUrl(m.url);
    }, "Couverture mise à jour.");
  }

  function move(from: number, to: number) {
    if (to < 0 || to >= media.length || from === to) return;
    setMedia((prev) => {
      const copy = prev.slice();
      const [item] = copy.splice(from, 1);
      copy.splice(to, 0, item);
      return copy;
    });
    setOrderDirty(true);
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-3xl border border-line bg-white/3 p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
              Médias ({media.length})
            </div>
            <div className="mt-2 max-w-xl text-sm text-ivory/70">
              Importez des photos (JPG, PNG, WebP…) ou des vidéos (MP4, WebM), ou ajoutez un lien
              YouTube / Vimeo. Glissez-déposez ou utilisez les flèches pour réordonner, puis cliquez sur
              « Enregistrer l&apos;ordre ».
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className={cn("cursor-pointer", busy ? "pointer-events-none opacity-60" : "")}>
              <input
                type="file"
                className="hidden"
                multiple
                accept="image/jpeg,image/png,image/webp,image/gif,image/avif,video/mp4,video/webm,video/quicktime"
                onChange={(e) => upload(e.currentTarget)}
              />
              <span className="inline-flex items-center justify-center bg-ivory px-7 py-3 text-[11px] tracking-[0.25em] uppercase text-charcoal hover:opacity-85">
                {busy ? "Patientez..." : "Importer des fichiers"}
              </span>
            </label>
            <Button variant="outline" disabled={busy || !orderDirty} onClick={saveOrder}>
              Enregistrer l&apos;ordre
            </Button>
          </div>
        </div>

        {error ? <div className="mt-4 text-sm text-red-600 dark:text-red-300">{error}</div> : null}
        {info ? <div className="mt-4 text-sm text-emerald-700 dark:text-emerald-300">{info}</div> : null}

        <form
          className="mt-6 grid gap-3 rounded-2xl border border-line bg-black/[0.03] p-5 md:grid-cols-6"
          onSubmit={(e) => {
            e.preventDefault();
            addUrl(e.currentTarget);
          }}
        >
          <select
            name="type"
            className="h-11 w-full rounded-xl border border-line bg-white/5 px-3 text-sm text-ivory outline-none md:col-span-1"
            defaultValue="VIDEO"
          >
            <option value="VIDEO">Vidéo</option>
            <option value="IMAGE">Image</option>
          </select>
          <input
            name="url"
            placeholder="https://youtube.com/… ou https://vimeo.com/… ou URL d'image"
            className="h-11 w-full rounded-xl border border-line bg-white/5 px-4 text-sm text-ivory outline-none md:col-span-3"
            required
          />
          <input
            name="alt"
            placeholder="Description (optionnelle)"
            className="h-11 w-full rounded-xl border border-line bg-white/5 px-4 text-sm text-ivory outline-none md:col-span-2"
          />
          <div className="flex justify-end md:col-span-6">
            <Button type="submit" variant="outline" disabled={busy}>
              Ajouter par lien
            </Button>
          </div>
        </form>
      </div>

      <div className="grid gap-3">
        {media.map((m, idx) => {
          const isCover = coverUrl === m.url;
          return (
            <div
              key={m.id}
              draggable
              onDragStart={() => setDragId(m.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragId) move(media.findIndex((x) => x.id === dragId), idx);
                setDragId(null);
              }}
              className={cn(
                "grid grid-cols-12 items-center gap-4 rounded-2xl border bg-white/3 p-3 md:p-4",
                isCover ? "border-ivory/40" : "border-line",
                dragId === m.id ? "opacity-50" : "",
              )}
            >
              <div className="col-span-4 overflow-hidden rounded-xl border border-line bg-black/20 md:col-span-2">
                {m.type === "IMAGE" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.url} alt={m.alt || "Média"} className="h-20 w-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex h-20 items-center justify-center text-xs tracking-[0.22em] uppercase text-ivory/60">
                    ▶ Vidéo
                  </div>
                )}
              </div>
              <div className="col-span-8 min-w-0 md:col-span-5">
                <div className="text-xs tracking-[0.22em] uppercase text-ivory/55">
                  #{idx + 1} · {m.type === "IMAGE" ? "Photo" : "Vidéo"}
                  {isCover ? " · Couverture" : ""}
                </div>
                <div className="mt-1 truncate text-sm text-ivory/80">{m.url}</div>
              </div>
              <div className="col-span-12 flex flex-wrap items-center justify-end gap-2 md:col-span-5">
                <button
                  type="button"
                  aria-label="Monter"
                  disabled={busy || idx === 0}
                  onClick={() => move(idx, idx - 1)}
                  className="h-9 w-9 rounded-full border border-line text-ivory/70 hover:bg-white/5 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  aria-label="Descendre"
                  disabled={busy || idx === media.length - 1}
                  onClick={() => move(idx, idx + 1)}
                  className="h-9 w-9 rounded-full border border-line text-ivory/70 hover:bg-white/5 disabled:opacity-30"
                >
                  ↓
                </button>
                {m.type === "IMAGE" && !isCover ? (
                  <Button variant="ghost" disabled={busy} onClick={() => setCover(m)}>
                    Couverture
                  </Button>
                ) : null}
                <Button variant="ghost" disabled={busy} onClick={() => remove(m)} className="text-red-600 dark:text-red-300">
                  Supprimer
                </Button>
              </div>
            </div>
          );
        })}
        {media.length === 0 ? (
          <div className="rounded-2xl border border-line bg-white/3 p-8 text-sm text-ivory/65">
            Aucun média pour le moment.
          </div>
        ) : null}
      </div>
    </div>
  );
}
