// Shared by the EnquiryForm (client) and /api/enquiry (server) so both validate the same way.

export type EnquiryFields = {
  name: string;
  email: string;
  phone: string;
  budget: string;
  consent: boolean;
};

export type EnquiryPayload = EnquiryFields & {
  source: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  /** Honeypot: must stay empty */
  website?: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryFields, "required" | "email" | "phone" | "consent">>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** 10-digit Indian mobile, optional +91 / 91 / 0 prefix; spaces and dashes ignored */
const INDIAN_MOBILE = /^(?:\+?91|0)?[6-9]\d{9}$/;

export function normalisePhone(phone: string) {
  return phone.replace(/[\s-]/g, "");
}

export function validateEnquiry(fields: EnquiryFields): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (!fields.name.trim()) errors.name = "required";
  if (!fields.email.trim()) errors.email = "required";
  else if (!EMAIL.test(fields.email.trim())) errors.email = "email";
  if (!fields.phone.trim()) errors.phone = "required";
  else if (!INDIAN_MOBILE.test(normalisePhone(fields.phone))) errors.phone = "phone";
  if (!fields.budget) errors.budget = "required";
  if (!fields.consent) errors.consent = "consent";
  return errors;
}
