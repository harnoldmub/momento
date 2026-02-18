"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (!res.ok) {
      const j = await res.json().catch(() => null);
      setError(j?.error || "Login failed");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-dvh bg-charcoal">
      <div className="mx-auto flex min-h-dvh max-w-md items-center px-5 py-16">
        <div className="w-full rounded-3xl border border-line bg-white/3 p-10 grain">
          <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
            Admin
          </div>
          <h1 className="mt-3 font-[var(--font-display)] text-3xl tracking-[0.08em] uppercase">
            Momento Backoffice
          </h1>
          <p className="mt-4 text-sm text-ivory/65">
            Login to manage projects, media, and leads.
          </p>

          <form className="mt-8 grid gap-5" onSubmit={onSubmit}>
            <Input
              name="email"
              type="email"
              label="Email"
              defaultValue="admin@momento.rdc"
              required
            />
            <Input
              name="password"
              type="password"
              label="Password"
              defaultValue="Admin123!"
              required
            />

            {error ? <div className="text-sm text-red-300">{error}</div> : null}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

