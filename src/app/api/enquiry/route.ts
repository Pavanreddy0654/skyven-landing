import { normalisePhone, validateEnquiry, type EnquiryPayload } from "@/lib/enquiry";
import { deliverLead, type Lead } from "@/lib/leads";

const MAX_LENGTH = 200;

export async function POST(request: Request) {
  let body: Partial<EnquiryPayload>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const text = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, MAX_LENGTH) : "");
  const fields = {
    name: text(body.name),
    email: text(body.email),
    phone: text(body.phone),
    budget: text(body.budget),
    consent: body.consent === true,
  };

  // Honeypot filled in: almost certainly a bot. Answer as if it worked so it doesn't retry.
  if (text(body.website)) return Response.json({ ok: true });

  const errors = validateEnquiry(fields);
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const lead: Lead = {
    ...fields,
    phone: normalisePhone(fields.phone),
    source: text(body.source) || "unknown",
    utm_source: text(body.utm_source) || undefined,
    utm_medium: text(body.utm_medium) || undefined,
    utm_campaign: text(body.utm_campaign) || undefined,
    page: text(request.headers.get("referer")) || undefined,
    submittedAt: new Date().toISOString(),
  };

  // Google Sheets, CRM and email (Q11): each one runs only if its environment variables are set
  const results = await deliverLead(lead);
  console.info("[enquiry]", lead.source, lead.submittedAt, results.map((r) => `${r.destination}:${r.ok ? "ok" : "failed"}`));

  if (results.length === 0) {
    // No destination configured (local / staging): keep the lead in the server log
    console.info("[enquiry] no destinations configured; lead:", lead);
  } else if (!results.some((r) => r.ok)) {
    // Every destination failed: tell the visitor so they can try again or call
    return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
