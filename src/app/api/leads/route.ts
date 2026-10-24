import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const LeadSchema = z
  .object({
    name: z.string().trim().min(2, "Merci d'indiquer votre nom.").max(120),
    email: z.string().trim().email("Adresse email invalide.").optional().or(z.literal("")),
    whatsapp: z.string().trim().max(80).optional().or(z.literal("")),
    eventDate: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine((d) => !d || !Number.isNaN(new Date(d).getTime()), "Date invalide."),
    location: z.string().trim().max(140).optional().or(z.literal("")),
    inquiryType: z
      .enum(["WEDDING", "ENGAGEMENT", "COUPLE", "EVENT", "FILM", "OTHER"])
      .optional()
      .default("OTHER"),
    message: z
      .string()
      .trim()
      .min(5, "Votre message est un peu court.")
      .max(4000, "Votre message est trop long (4000 caractères max)."),
    // Honeypot: hidden field that humans leave empty.
    company: z.string().optional(),
  })
  .refine((d) => Boolean(d.email || d.whatsapp), {
    message: "Indiquez un email ou un numéro WhatsApp pour que nous puissions vous répondre.",
  });

const INQUIRY_LABEL: Record<string, string> = {
  WEDDING: "Mariage",
  ENGAGEMENT: "Fiançailles",
  COUPLE: "Séance couple",
  EVENT: "Événement",
  FILM: "Film",
  OTHER: "Autre",
};

async function sendResendEmail(subject: string, text: string, replyTo?: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.LEADS_TO_EMAIL;
  if (!apiKey || !from || !to) return;

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to,
    subject,
    text,
    ...(replyTo ? { replyTo } : {}),
  });
}

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = LeadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Formulaire invalide." },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // Bots fill the honeypot: pretend success, store nothing.
  if (data.company) return NextResponse.json({ ok: true });

  try {
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email || "",
        whatsapp: data.whatsapp || "",
        eventDate: data.eventDate ? new Date(data.eventDate) : null,
        location: data.location || "",
        inquiryType: data.inquiryType,
        message: data.message,
      },
    });

    const subject = `Nouvelle demande : ${lead.name}`;
    const text = [
      `Nom : ${lead.name}`,
      `Email : ${lead.email || "-"}`,
      `WhatsApp : ${lead.whatsapp || "-"}`,
      `Date : ${lead.eventDate ? lead.eventDate.toISOString().slice(0, 10) : "-"}`,
      `Lieu : ${lead.location || "-"}`,
      `Type : ${INQUIRY_LABEL[lead.inquiryType] || lead.inquiryType}`,
      "",
      lead.message,
    ].join("\n");

    await sendResendEmail(subject, text, lead.email || undefined).catch((e) =>
      console.error("Resend email failed", e),
    );

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Lead creation failed", e);
    return NextResponse.json(
      { error: "Une erreur est survenue. Réessayez ou contactez-nous par WhatsApp." },
      { status: 500 },
    );
  }
}
