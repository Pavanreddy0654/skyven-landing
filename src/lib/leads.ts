// Server-only: delivers an enquiry to Google Sheets, the CRM and email (Q11).
// Each destination is enabled by its environment variables (see .env.example / README);
// unset destinations are skipped, so local and staging builds work without credentials.
import nodemailer from "nodemailer";

export type Lead = {
  name: string;
  email: string;
  phone: string;
  budget: string;
  consent: boolean;
  source: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  page?: string;
  submittedAt: string; // ISO 8601, UTC
};

type Destination = "sheets" | "crm" | "email";
export type DeliveryResult = { destination: Destination; ok: boolean; error?: string };

const TIMEOUT_MS = 10_000;
const env = (name: string) => process.env[name]?.trim() || undefined;

/** Submission time in India, for people reading the sheet and the email */
const istTime = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

async function postJson(url: string, body: unknown, headers: Record<string, string> = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    redirect: "follow", // Apps Script web apps answer with a redirect
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

/** Google Sheets via an Apps Script web app (docs/google-sheets-apps-script.gs) */
async function toSheets(lead: Lead) {
  const url = env("GOOGLE_SHEETS_WEBHOOK_URL");
  if (!url) return false;
  await postJson(url, {
    secret: env("GOOGLE_SHEETS_WEBHOOK_SECRET"),
    ...lead,
    submittedAtIST: istTime(lead.submittedAt),
  });
  return true;
}

/** CRM via a JSON webhook. Field names can be matched to a specific CRM later. */
async function toCrm(lead: Lead) {
  const url = env("CRM_WEBHOOK_URL");
  if (!url) return false;
  const headerName = env("CRM_AUTH_HEADER") ?? "Authorization";
  const token = env("CRM_AUTH_TOKEN");
  await postJson(
    url,
    {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      budget: lead.budget,
      consent: lead.consent,
      project: "Skyven Residences",
      source: lead.source,
      utm_source: lead.utm_source,
      utm_medium: lead.utm_medium,
      utm_campaign: lead.utm_campaign,
      page: lead.page,
      submitted_at: lead.submittedAt,
    },
    token ? { [headerName]: token } : {},
  );
  return true;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Notification email to the sales team over SMTP */
async function toEmail(lead: Lead) {
  const host = env("SMTP_HOST");
  const to = env("LEAD_EMAIL_TO");
  if (!host || !to) return false;

  const port = Number(env("SMTP_PORT") ?? 587);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: env("SMTP_USER") ? { user: env("SMTP_USER")!, pass: env("SMTP_PASS") ?? "" } : undefined,
    connectionTimeout: TIMEOUT_MS,
    greetingTimeout: TIMEOUT_MS,
    socketTimeout: TIMEOUT_MS,
  });

  const rows: [string, string | undefined][] = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Budget", lead.budget],
    ["Form", lead.source],
    ["Submitted (IST)", istTime(lead.submittedAt)],
    ["UTM source / medium / campaign", [lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(Boolean).join(" / ")],
    ["Page", lead.page],
    ["Consent to contact", lead.consent ? "Yes" : "No"],
  ];
  const filled = rows.filter(([, v]) => v);

  await transporter.sendMail({
    from: env("LEAD_EMAIL_FROM") ?? env("SMTP_USER"),
    to: to.split(",").map((a) => a.trim()),
    replyTo: lead.email,
    subject: `New Skyven enquiry: ${lead.name} (${lead.budget})`,
    text: filled.map(([k, v]) => `${k}: ${v}`).join("\n"),
    html: `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${filled
      .map(([k, v]) => `<tr><td style="color:#555">${k}</td><td><strong>${escapeHtml(v!)}</strong></td></tr>`)
      .join("")}</table>`,
  });
  return true;
}

const destinations: [Destination, (lead: Lead) => Promise<boolean>][] = [
  ["sheets", toSheets],
  ["crm", toCrm],
  ["email", toEmail],
];

/**
 * Sends the lead to every configured destination in parallel. One failing destination never
 * blocks the others; each failure is logged.
 */
export async function deliverLead(lead: Lead): Promise<DeliveryResult[]> {
  const settled = await Promise.allSettled(destinations.map(([, send]) => send(lead)));
  const results: DeliveryResult[] = [];
  settled.forEach((r, i) => {
    const destination = destinations[i][0];
    if (r.status === "rejected") {
      const error = r.reason instanceof Error ? r.reason.message : String(r.reason);
      console.error(`[enquiry] ${destination} delivery failed:`, error);
      results.push({ destination, ok: false, error });
    } else if (r.value) {
      results.push({ destination, ok: true });
    }
  });
  return results;
}
