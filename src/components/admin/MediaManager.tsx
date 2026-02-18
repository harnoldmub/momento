"use client";

import { useMemo, useState } from "react";
import type { Media } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function MediaManager({
  projectId,
  initialMedia,
}: {
  projectId: string;
  initialMedia: Media[];
}) {
  const [media, setMedia] = useState<Media[]>(
    initialMedia.slice().sort((a, b) => a.order - b.order),
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [dragId, setDragId] = useState<string | null>(null);

  const orderedIds = useMemo(() => media.map((m) => m.id), [media]);

  async function upload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError("");
    try {
      const fd = new FormData();
      for (const f of Array.from(files)) fd.append("files", f);
      const res = await fetch(`/api/admin/projects/${projectId}/media/upload`, {
        method: "POST",
        body: fd,
      });
      const j = await res.json().catch(() => null);
      if (!res.ok) throw new Error(j?.error || "Upload failed");
      setMedia((m) =>
        [...m, ...(j.created as Media[])].slice().sort((a, b) => a.order - b.order),
      );
    } catch (e: any) {
      setError(e?.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function addUrl(form: HTMLFormElement) {
    setBusy(true);
    setError("");
    try {
      const fd = new FormData(form);
      const payload = {
        type: String(fd.get("type") || "IMAGE"),
        url: String(fd.get("url") || ""),
        alt: String(fd.get("alt") || ""),
      };
      const res = await fetch(`/api/admin/projects/${projectId}/media/add-url`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await res.json().catch(() => null);
      if (!res.ok) throw new Error(j?.error || "Failed");
      setMedia((m) => [...m, j.created as Media].slice().sort((a, b) => a.order - b.order));
      form.reset();
    } catch (e: any) {
      setError(e?.message || "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function saveOrder() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/media/reorder", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ projectId, orderedIds }),
      });
      const j = await res.json().catch(() => null);
      if (!res.ok) throw new Error(j?.error || "Failed");
    } catch (e: any) {
      setError(e?.message || "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
      const j = await res.json().catch(() => null);
      if (!res.ok) throw new Error(j?.error || "Delete failed");
      setMedia((m) => m.filter((x) => x.id !== id));
    } catch (e: any) {
      setError(e?.message || "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-line bg-white/3 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
              Media
            </div>
            <div className="mt-2 text-sm text-ivory/70">
              Upload images or add a video link (Vimeo/YouTube). Drag items to reorder,
              then click Save order.
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className={cn("cursor-pointer", busy ? "opacity-60 pointer-events-none" : "")}>
              <input
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={(e) => upload(e.target.files)}
              />
              <span className="inline-flex items-center justify-center rounded-full border border-line px-5 py-3 text-xs tracking-[0.22em] uppercase text-ivory/80 hover:bg-white/5">
                Upload
              </span>
            </label>
            <Button variant="outline" disabled={busy || media.length < 2} onClick={saveOrder}>
              Save order
            </Button>
          </div>
        </div>

        {error ? <div className="mt-4 text-sm text-red-300">{error}</div> : null}

        <form
          className="mt-6 grid gap-3 rounded-2xl border border-line bg-black/20 p-5 md:grid-cols-6"
          onSubmit={(e) => {
            e.preventDefault();
            void addUrl(e.currentTarget);
          }}
        >
          <div className="md:col-span-1">
            <select
              name="type"
              className="h-11 w-full rounded-xl border border-line bg-white/5 px-3 text-sm text-ivory outline-none"
              defaultValue="VIDEO"
            >
              <option value="VIDEO">Video</option>
              <option value="IMAGE">Image</option>
            </select>
          </div>
          <div className="md:col-span-3">
            <input
              name="url"
              placeholder="https://vimeo.com/... or https://images..."
              className="h-11 w-full rounded-xl border border-line bg-white/5 px-4 text-sm text-ivory outline-none"
              required
            />
          </div>
          <div className="md:col-span-2">
            <input
              name="alt"
              placeholder="Alt text (optional)"
              className="h-11 w-full rounded-xl border border-line bg-white/5 px-4 text-sm text-ivory outline-none"
            />
          </div>
          <div className="md:col-span-6 flex justify-end">
            <Button type="submit" disabled={busy}>
              Add
            </Button>
          </div>
        </form>
      </div>

      <div className="grid gap-4">
        {media.map((m) => (
          <div
            key={m.id}
            draggable
            onDragStart={() => setDragId(m.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (!dragId || dragId === m.id) return;
              setMedia((prev) => {
                const copy = prev.slice();
                const from = copy.findIndex((x) => x.id === dragId);
                const to = copy.findIndex((x) => x.id === m.id);
                if (from === -1 || to === -1) return prev;
                const [item] = copy.splice(from, 1);
                copy.splice(to, 0, item);
                // keep local order values in sync for UI
                return copy.map((x, idx) => ({ ...x, order: idx }));
              });
              setDragId(null);
            }}
            className="grid grid-cols-12 items-center gap-4 rounded-2xl border border-line bg-white/3 p-4"
          >
            <div className="col-span-3 overflow-hidden rounded-xl border border-line bg-black/20">
              {m.type === "IMAGE" ? (
                <Image
                  src={m.url}
                  alt={m.alt || "Media"}
                  width={480}
                  height={320}
                  className="h-20 w-full object-cover"
                />
              ) : (
                <div className="flex h-20 items-center justify-center text-xs tracking-[0.22em] uppercase text-ivory/60">
                  Video
                </div>
              )}
            </div>
            <div className="col-span-7">
              <div className="text-xs tracking-[0.22em] uppercase text-ivory/55">
                {m.type}
              </div>
              <div className="mt-1 truncate text-sm text-ivory/80">{m.url}</div>
            </div>
            <div className="col-span-2 flex justify-end">
              <Button variant="ghost" disabled={busy} onClick={() => remove(m.id)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
        {media.length === 0 ? (
          <div className="rounded-2xl border border-line bg-white/3 p-8 text-sm text-ivory/65">
            No media yet.
          </div>
        ) : null}
      </div>
    </div>
  );
}

