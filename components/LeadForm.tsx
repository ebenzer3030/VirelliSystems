"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { FormErrors } from "@/lib/validation";
import { validateLeadForm } from "@/lib/validation";
import { getStoredUtmParams } from "@/lib/utm";
import { trackLead } from "@/lib/pixel";
import type { Industry, LeadFormData } from "@/types/lead";

const industries: Industry[] = [
  "Trades",
  "Health / Dental",
  "Professional Services",
  "Property / Real Estate",
  "Other",
];

const initialForm: LeadFormData = {
  fullName: "",
  businessName: "",
  phone: "",
  industry: "",
  email: "",
};

export default function LeadForm() {
  const router = useRouter();
  const [form, setForm] = useState<LeadFormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  // Honeypot — hidden from real users via CSS, invisible to screen readers.
  // Bots that auto-fill every field will populate this and be silently
  // dropped server-side. See app/api/lead/route.ts.
  const honeypotRef = useRef<HTMLInputElement>(null);

  function updateField<K extends keyof LeadFormData>(key: K, value: LeadFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    const validationErrors = validateLeadForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          attribution: getStoredUtmParams(),
          submittedAt: new Date().toISOString(),
          website: honeypotRef.current?.value || "",
        }),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      // Fire Lead exactly once, only after a confirmed successful submit.
      trackLead({ industry: form.industry });

      router.push("/thank-you");
    } catch {
      setStatus("error");
      setServerError(
        "Something went wrong sending your details. Please try again, or call us directly."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot field — kept off-screen, not display:none, so it still
          registers with unsophisticated bots that skip hidden inputs. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input
          ref={honeypotRef}
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field
        label="Full name"
        htmlFor="fullName"
        error={errors.fullName}
      >
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          value={form.fullName}
          onChange={(e) => updateField("fullName", e.target.value)}
          className={inputClass(!!errors.fullName)}
        />
      </Field>

      <Field
        label="Business name"
        htmlFor="businessName"
        error={errors.businessName}
      >
        <input
          id="businessName"
          name="businessName"
          type="text"
          autoComplete="organization"
          value={form.businessName}
          onChange={(e) => updateField("businessName", e.target.value)}
          className={inputClass(!!errors.businessName)}
        />
      </Field>

      <Field
        label="Phone number"
        htmlFor="phone"
        error={errors.phone}
      >
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="04XX XXX XXX"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className={inputClass(!!errors.phone)}
        />
      </Field>

      <Field
        label="Industry"
        htmlFor="industry"
        error={errors.industry}
      >
        <select
          id="industry"
          name="industry"
          value={form.industry}
          onChange={(e) => updateField("industry", e.target.value as Industry)}
          className={inputClass(!!errors.industry)}
        >
          <option value="" disabled>
            Select your industry
          </option>
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Email (optional)"
        htmlFor="email"
        error={errors.email}
      >
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          className={inputClass(!!errors.email)}
        />
      </Field>

      {serverError && (
        <p role="alert" className="text-sm text-red-400">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="tap-target w-full rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
      >
        {status === "submitting" ? "Sending..." : "Get my free demo"}
      </button>

      <p className="text-center text-xs text-mutedDark">
        No commitment. We&apos;ll contact you about your Virelli demo.
      </p>
    </form>
  );
}

function inputClass(hasError: boolean): string {
  return [
    "tap-target w-full rounded-lg border bg-surfaceAlt px-4 py-3 text-sm text-ink",
    "placeholder:text-mutedDark focus:border-accent",
    "sm:text-base",
    hasError ? "border-red-400/70" : "border-hairline",
  ].join(" ");
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
