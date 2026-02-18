import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const LeadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().optional().or(z.literal("")),
  whatsapp: z.string().max(80).optional().or(z.literal("")),
  eventDate: z.string().optional().or(z.literal("")),
  location: z.string().max(140).optional().or(z.literal("")),
  inquiryType: z
    .enum(["WEDDING", "ENGAGEMENT", "COUPLE", "EVENT", "FILM", "OTHER"])
    .optional()
    .default("OTHER"),
  message: z.string().min(5).max(4000),
});

async function sendResendEmail(subject: string, text: string) {
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
  });
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = LeadSchema.parse(json);

    const lead = await prisma.lead.create({
      data: {
        name: parsed.name,
        email: parsed.email || "",
        whatsapp: parsed.whatsapp || "",
        eventDate: parsed.eventDate ? new Date(parsed.eventDate) : null,
        location: parsed.location || "",
        inquiryType: parsed.inquiryType,
        message: parsed.message,
      },
    });

    const subject = `New booking inquiry: ${lead.name}`;
    const text = [
      `Name: ${lead.name}`,
      `Email: ${lead.email || "-"}`,
      `WhatsApp: ${lead.whatsapp || "-"}`,
      `Date: ${lead.eventDate ? lead.eventDate.toISOString().slice(0, 10) : "-"}`,
      `Location: ${lead.location || "-"}`,
      `Type: ${lead.inquiryType}`,
      "",
      lead.message,
    ].join("\n");

    await sendResendEmail(subject, text).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Bad request" },
      { status: 400 },
    );
  }
}

