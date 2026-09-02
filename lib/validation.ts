import type { LeadFormData } from "@/types/lead";

export type FormErrors = Partial<Record<keyof LeadFormData, string>>;

// Accepts common Australian mobile/landline formats:
// 04XX XXX XXX, +61 4XX XXX XXX, 61 4XX XXX XXX, (02) XXXX XXXX, with or
// without spaces/hyphens. Intentionally permissive rather than strict,
// since real-world input varies (spaces, dashes, brackets).
const AU_PHONE_REGEX = /^(?:\+?61|0)[2-478](?:[ -]?\d){8}$/;

function normalisePhone(value: string): string {
  return value.replace(/[()\s-]/g, "");
}

export function isValidAuPhone(value: string): boolean {
  const cleaned = normalisePhone(value);
  return AU_PHONE_REGEX.test(cleaned);
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateLeadForm(data: LeadFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    errors.fullName = "Enter your full name.";
  }

  if (!data.businessName.trim()) {
    errors.businessName = "Enter your business name.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Enter a phone number.";
  } else if (!isValidAuPhone(data.phone)) {
    errors.phone = "Enter a valid Australian phone number.";
  }

  if (!data.industry) {
    errors.industry = "Select an industry.";
  }

  if (data.email && data.email.trim() && !isValidEmail(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
}
