"use client";

import clsx from "clsx";
import { useId, useState, type FormEvent } from "react";
import { enquiry } from "@/data/content";
import { validateEnquiry, type EnquiryErrors, type EnquiryFields } from "@/lib/enquiry";
import { Button } from "./Button";
import { ChevronDown } from "./icons";

type Layout = "inline" | "grid" | "stacked";

type EnquiryFormProps = {
  /**
   * inline: one row of 4 fields + button (lg), 2×2 grid + button row (md), stacked (mobile)
   * grid:   2×2 grid, centred button below (md+), stacked (mobile)
   * stacked: single column at every width
   */
  layout: Layout;
  submitLabel?: string;
  /** Sent with the lead to identify which form it came from */
  source: string;
  className?: string;
};

const empty: EnquiryFields = { name: "", email: "", phone: "", budget: "", consent: false };

const fieldClass =
  "h-11 w-full border-0 border-b border-ivory/70 bg-transparent px-0 font-body text-[16px] text-ivory placeholder:text-ivory outline-none transition-colors focus:border-gold md:text-body";

export function EnquiryForm({
  layout,
  submitLabel = enquiry.submitLabel,
  source,
  className,
}: EnquiryFormProps) {
  const id = useId();
  const [values, setValues] = useState<EnquiryFields>(empty);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = <K extends keyof EnquiryFields>(key: K, value: EnquiryFields[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }

    setStatus("loading");
    const params = new URLSearchParams(window.location.search);
    const honeypot = new FormData(event.currentTarget).get("website");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          source,
          utm_source: params.get("utm_source") ?? undefined,
          utm_medium: params.get("utm_medium") ?? undefined,
          utm_campaign: params.get("utm_campaign") ?? undefined,
          website: typeof honeypot === "string" ? honeypot : "",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className={clsx("py-6 text-center text-body text-ivory", className)}>
        {enquiry.success}
      </p>
    );
  }

  const errorText = (key: keyof EnquiryFields) => {
    const code = errors[key];
    return code ? enquiry.errors[code] : undefined;
  };

  const field = (key: "name" | "email" | "phone", type: string, autoComplete: string) => {
    const err = errorText(key);
    return (
      <div>
        <label htmlFor={`${id}-${key}`} className="sr-only">
          {enquiry.fields[key]}
        </label>
        <input
          id={`${id}-${key}`}
          name={key}
          type={type}
          inputMode={key === "phone" ? "tel" : undefined}
          autoComplete={autoComplete}
          placeholder={enquiry.fields[key]}
          value={values[key]}
          onChange={(e) => set(key, e.target.value)}
          aria-invalid={!!err}
          aria-describedby={err ? `${id}-${key}-error` : undefined}
          className={fieldClass}
        />
        {err && (
          <p id={`${id}-${key}-error`} className="mt-1 text-[12px] text-error">
            {err}
          </p>
        )}
      </div>
    );
  };

  const budgetError = errorText("budget");
  const consentError = errorText("consent");

  const grid = {
    inline: "grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] gap-x-5 gap-y-5 lg:gap-x-6",
    grid: "grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 md:gap-y-6",
    stacked: "grid-cols-1 gap-y-5",
  }[layout];

  return (
    <form noValidate onSubmit={onSubmit} className={clsx("relative", className)} aria-label="Enquiry form">
      {/* Honeypot (spam protection): hidden from people, left empty by them */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={clsx("grid items-start", grid)}>
        {field("name", "text", "name")}
        {field("email", "email", "email")}
        {field("phone", "tel", "tel")}

        <div>
          <label htmlFor={`${id}-budget`} className="sr-only">
            {enquiry.fields.budget}
          </label>
          <div className="relative">
            <select
              id={`${id}-budget`}
              name="budget"
              value={values.budget}
              onChange={(e) => set("budget", e.target.value)}
              aria-invalid={!!budgetError}
              aria-describedby={budgetError ? `${id}-budget-error` : undefined}
              className={clsx(fieldClass, "cursor-pointer appearance-none pr-8")}
            >
              <option value="" disabled className="bg-navy-900">
                {enquiry.fields.budget}
              </option>
              {enquiry.budgetOptions.map((option) => (
                <option key={option} value={option} className="bg-navy-900">
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-1 size-4 -translate-y-1/2" />
          </div>
          {budgetError && (
            <p id={`${id}-budget-error`} className="mt-1 text-[12px] text-error">
              {budgetError}
            </p>
          )}
        </div>

        {layout === "inline" && (
          <SubmitButton
            label={submitLabel}
            loading={status === "loading"}
            className="w-full md:col-span-2 md:w-auto md:justify-self-end lg:col-span-1 lg:mt-1 lg:self-start"
          />
        )}
      </div>

      <div className={clsx("mt-5", layout === "grid" ? "md:mt-8" : "md:mt-4")}>
        <div className="flex items-start gap-3">
          <input
            id={`${id}-consent`}
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={!!consentError}
            aria-describedby={consentError ? `${id}-consent-error` : undefined}
            className="mt-0.5 size-3.5 shrink-0 cursor-pointer accent-gold"
          />
          <label htmlFor={`${id}-consent`} className="cursor-pointer text-micro text-ivory/80">
            {enquiry.consent}
          </label>
        </div>
        {consentError && (
          <p id={`${id}-consent-error`} className="mt-1 pl-6.5 text-[12px] text-error">
            {consentError}
          </p>
        )}
      </div>

      {layout !== "inline" && (
        <div className="mt-6 flex justify-center md:mt-8">
          <SubmitButton label={submitLabel} loading={status === "loading"} className="w-full md:w-auto" />
        </div>
      )}

      {status === "error" && (
        <p role="alert" className="mt-4 text-[12px] text-error">
          {enquiry.errors.submit}
        </p>
      )}
    </form>
  );
}

function SubmitButton({ label, loading, className }: { label: string; loading: boolean; className?: string }) {
  return (
    <Button type="submit" disabled={loading} aria-busy={loading} className={className}>
      {loading ? enquiry.sending : label}
    </Button>
  );
}
