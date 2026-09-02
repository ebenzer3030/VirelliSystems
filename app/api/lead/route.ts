import { NextRequest, NextResponse } from "next/server";
import type { LeadSubmission } from "@/types/lead";

// -----------------------------------------------------------------------
// LEAD SUBMISSION ENDPOINT
// -----------------------------------------------------------------------
// This route receives lead form submissions from components/LeadForm.tsx.
//
// >>> ADD YOUR CRM / WEBHOOK / AUTOMATION ENDPOINT HERE <<<
// Set LEAD_WEBHOOK_URL in .env.local / Vercel environment variables to a
// webhook URL (CRM, Zapier, Make, n8n, a Google Sheet via webhook, an email
// notification service, etc). This route will forward the lead payload to
// that URL. If LEAD_WEBHOOK_URL is not set, the lead is only logged to the
// server console so nothing is silently lost during development.
// -----------------------------------------------------------------------

export async function POST(request: NextRequest) {
  let body: LeadSubmission;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot spam check — a real visitor never fills the hidden "website"
  // field. If it's populated, silently accept but drop the submission so
  // bots don't learn their submission failed.
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Minimal server-side validation, mirroring lib/validation.ts, since
  // client-side validation can always be bypassed.
  if (!body.fullName?.trim() || !body.businessName?.trim() || !body.phone?.trim() || !body.industry) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const payload = {
    fullName: body.fullName.trim(),
    businessName: body.businessName.trim(),
    phone: body.phone.trim(),
    industry: body.industry,
    email: body.email?.trim() || undefined,
    attribution: body.attribution ?? {},
    submittedAt: body.submittedAt ?? new Date().toISOString(),
    source: "virelli-landing-page",
  };

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("Lead webhook responded with an error:", res.status);
        return NextResponse.json(
          { error: "Could not forward lead to CRM." },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error("Failed to reach lead webhook:", err);
      return NextResponse.json(
        { error: "Could not reach lead destination." },
        { status: 502 }
      );
    }
  } else {
    // No webhook configured yet — log so the lead is visible during setup.
    console.log("New Virelli lead (no LEAD_WEBHOOK_URL configured):", payload);
  }

  return NextResponse.json({ ok: true });
}
