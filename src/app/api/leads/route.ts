import { NextResponse } from "next/server";

/**
 * POST /api/leads — Project intake form submission
 *
 * Accepts the brief intake form from the homepage ContactCTASection.
 * Currently logs and returns success — wire to email/CRM later.
 */

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic shape validation
    const required = ["name", "contact", "projectType", "budget", "timeline", "story"];
    for (const field of required) {
      if (!body?.[field] || typeof body[field] !== "string" || body[field].trim().length === 0) {
        return NextResponse.json(
          { ok: false, error: `Missing field: ${field}` },
          { status: 400 }
        );
      }
    }

    // In production: persist to DB, send email, push to CRM.
    // For now: log to server console for the operator to pick up.
    console.log("[lead] New project brief received:", {
      name: body.name,
      company: body.company ?? "",
      contact: body.contact,
      projectType: body.projectType,
      budget: body.budget,
      timeline: body.timeline,
      story: body.story,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/leads",
    method: "POST",
    description: "Project intake form submission endpoint.",
  });
}
