"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        throw new Error(j?.error || "Échec de l'envoi");
      }
      setStatus("sent");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Une erreur est survenue");
    }
  }

  const inputClass =
    "w-full border-b border-line bg-transparent py-3 text-sm text-ivory outline-none transition-colors placeholder:text-ivory/30 focus:border-ivory/40";

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      {/* Honeypot anti-spam : invisible pour les visiteurs */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Société
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-ivory/35 block mb-2">Nom</label>
          <input name="name" placeholder="Votre nom" required minLength={2} maxLength={120} autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-ivory/35 block mb-2">Email</label>
          <input name="email" type="email" placeholder="votre@email.com" autoComplete="email" className={inputClass} />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-ivory/35 block mb-2">T&eacute;l&eacute;phone / WhatsApp</label>
          <input name="whatsapp" type="tel" placeholder="+243..." autoComplete="tel" className={inputClass} />
        </div>
        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-ivory/35 block mb-2">Date du mariage</label>
          <input name="eventDate" type="date" className={inputClass} />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-ivory/35 block mb-2">Lieu</label>
          <input name="location" placeholder="Ville, Pays" className={inputClass} />
        </div>
        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-ivory/35 block mb-2">Type</label>
          <select
            name="inquiryType"
            className={`${inputClass} cursor-pointer`}
            defaultValue="WEDDING"
          >
            <option value="WEDDING">Mariage</option>
            <option value="ENGAGEMENT">Fian&ccedil;ailles</option>
            <option value="COUPLE">S&eacute;ance couple</option>
            <option value="EVENT">&Eacute;v&eacute;nement</option>
            <option value="FILM">Film</option>
            <option value="OTHER">Autre</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-[10px] tracking-[0.2em] uppercase text-ivory/35 block mb-2">Message</label>
        <textarea
          name="message"
          placeholder="Parlez-nous de votre histoire..."
          required
          minLength={5}
          maxLength={4000}
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between pt-4">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Envoi en cours..." : "Envoyer"}
        </Button>
        {status === "sent" && (
          <div className="text-sm text-ivory/50">
            Merci. Nous vous r&eacute;pondrons rapidement.
          </div>
        )}
        {status === "error" && (
          <div className="text-sm text-red-400/80">{error}</div>
        )}
      </div>
    </form>
  );
}
