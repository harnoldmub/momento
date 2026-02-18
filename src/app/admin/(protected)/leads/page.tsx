import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";

async function updateStatus(id: string, formData: FormData) {
  "use server";
  await requireAdmin();
  const status = String(formData.get("status") || "NEW");
  await prisma.lead.update({ where: { id }, data: { status: status as any } });
  revalidatePath("/admin/leads");
}

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <div>
      <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
        Leads
      </div>
      <h1 className="mt-3 font-[var(--font-display)] text-3xl tracking-[0.08em] uppercase md:text-4xl">
        Booking inquiries
      </h1>

      <div className="mt-10 grid gap-5">
        {leads.map((l) => (
          <div key={l.id} className="rounded-2xl border border-line bg-white/3 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
                  {l.inquiryType} · {l.createdAt.toISOString().slice(0, 10)}
                </div>
                <div className="mt-2 text-xl text-ivory">{l.name}</div>
                <div className="mt-2 text-sm text-ivory/65">
                  {l.location || "—"} {l.eventDate ? `· ${l.eventDate.toISOString().slice(0, 10)}` : ""}
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  {l.email ? (
                    <a className="text-ivory/80 hover:text-ivory" href={`mailto:${l.email}`}>
                      {l.email}
                    </a>
                  ) : null}
                  {l.whatsapp ? (
                    <a
                      className="text-ivory/80 hover:text-ivory"
                      href={`https://wa.me/${l.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp
                    </a>
                  ) : null}
                </div>
              </div>

              <form action={updateStatus.bind(null, l.id)} className="flex items-center gap-3">
                <select
                  name="status"
                  defaultValue={l.status}
                  className="h-11 rounded-xl border border-line bg-white/5 px-3 text-sm text-ivory outline-none"
                >
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="BOOKED">Booked</option>
                </select>
                <button className="rounded-full border border-line px-4 py-2 text-xs tracking-[0.22em] uppercase text-ivory/80 hover:bg-white/5">
                  Save
                </button>
              </form>
            </div>

            <div className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-ivory/70">
              {l.message}
            </div>
          </div>
        ))}

        {leads.length === 0 ? (
          <div className="rounded-2xl border border-line bg-white/3 p-8 text-sm text-ivory/65">
            No leads yet.
          </div>
        ) : null}
      </div>
    </div>
  );
}

