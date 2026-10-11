import { normalisePhone, validateEnquiry, type EnquiryPayload } from "@/lib/enquiry";

const MAX_LENGTH = 200;

export async function POST(request: Request) {
  let body: Partial<EnquiryPayload>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const text = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, MAX_LENGTH) : "");
  const lead = {
    name: text(body.name),
    email: text(body.email),
    phone: text(body.phone),
    budget: text(body.budget),
    consent: body.consent === true,
    source: text(body.source) || "unknown",
    utm_source: text(body.utm_source) || undefined,
    utm_medium: text(body.utm_medium) || undefined,
    utm_campaign: text(body.utm_campaign) || undefined,
  };

  // Honeypot filled in: almost certainly a bot. Answer as if it worked so it doesn't retry.
  if (text(body.website)) return Response.json({ ok: true });

  const errors = validateEnquiry(lead);
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  // TODO(Q11): send the lead to the CRM / email / Google Sheet once the client confirms the destination.
  console.info("[enquiry]", { ...lead, phone: normalisePhone(lead.phone), receivedAt: new Date().toISOString() });

  return Response.json({ ok: true });
}
