"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        throw new Error(j?.error || "Failed to send");
      }
      setStatus("sent");
      e.currentTarget.reset();
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Input name="name" label="Name" placeholder="Your name" required />
        <Input name="email" label="Email" placeholder="you@email.com" />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          name="whatsapp"
          label="WhatsApp"
          placeholder="+243..."
          hint="If you prefer WhatsApp, include your number."
        />
        <Input name="eventDate" label="Date" type="date" />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Input name="location" label="Location" placeholder="City, Country" />
        <label className="grid gap-2 text-sm">
          <span className="text-ivory/80">Type</span>
          <select
            name="inquiryType"
            className="h-12 w-full rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none transition focus:border-ivory/30 focus:bg-white/7"
            defaultValue="WEDDING"
          >
            <option value="WEDDING">Wedding</option>
            <option value="ENGAGEMENT">Engagement</option>
            <option value="COUPLE">Couple</option>
            <option value="EVENT">Event</option>
            <option value="FILM">Film</option>
            <option value="OTHER">Other</option>
          </select>
        </label>
      </div>
      <Textarea
        name="message"
        label="Message"
        placeholder="Tell us about your story..."
        required
      />

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send inquiry"}
        </Button>
        {status === "sent" ? (
          <div className="text-sm text-ivory/70">
            Thank you. We will reply shortly.
          </div>
        ) : null}
        {status === "error" ? (
          <div className="text-sm text-red-300">{error}</div>
        ) : null}
      </div>
    </form>
  );
}

