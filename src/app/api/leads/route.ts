import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/cms/db";

const briefSchema = z.object({
  name: z.string().trim().min(2).max(100),
  contact: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional().default(""),
  company: z.string().trim().max(160).optional(),
  projectType: z.string().trim().min(2).max(120),
  budget: z.string().trim().max(120).optional().default(""),
  timeline: z.string().trim().max(120).optional().default(""),
  story: z.string().trim().min(20).max(6000),
});

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  if (origin) {
    try {
      // Next.js may use an internal hostname in req.url behind a proxy.
      const requestHost = req.headers.get("host") ?? new URL(req.url).host;
      if (new URL(origin).host.toLowerCase() !== requestHost.toLowerCase())
        return NextResponse.json(
          { ok: false, error: "Permintaan dari halaman lain tidak diizinkan." },
          { status: 403 },
        );
    } catch {
      return NextResponse.json(
        { ok: false, error: "Origin tidak valid." },
        { status: 403 },
      );
    }
  }
  if (
    !req.headers.get("content-type")?.toLowerCase().includes("application/json")
  )
    return NextResponse.json(
      { ok: false, error: "Gunakan format JSON." },
      { status: 415 },
    );
  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Permintaan tidak dapat dibaca." },
      { status: 400 },
    );
  }
  if (new TextEncoder().encode(raw).length > 16000)
    return NextResponse.json(
      { ok: false, error: "Brief terlalu panjang." },
      { status: 413 },
    );
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Format JSON tidak valid." },
      { status: 400 },
    );
  }
  const result = briefSchema.safeParse(body);
  if (!result.success)
    return NextResponse.json(
      {
        ok: false,
        error:
          "Periksa nama, email, jenis proyek, dan brief minimal 20 karakter.",
      },
      { status: 400 },
    );
  const brief = result.data;
  try {
    await prisma.lead.create({
      data: {
        name: brief.name,
        email: brief.contact,
        phone: brief.phone || null,
        company: brief.company || null,
        service: brief.projectType,
        message: brief.story,
        notes: [
          `Anggaran: ${brief.budget || "Belum ditentukan"}`,
          `Target: ${brief.timeline || "Belum ditentukan"}`,
        ].join("\n"),
      },
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    console.error("[leads] Project brief could not be persisted.");
    return NextResponse.json(
      {
        ok: false,
        error:
          "Brief belum tersimpan. Coba lagi atau lanjutkan melalui WhatsApp.",
      },
      { status: 503 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/leads",
    method: "POST",
    description: "Simpan brief proyek untuk ditindaklanjuti Nauka Motion.",
  });
}
