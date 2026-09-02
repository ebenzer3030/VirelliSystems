import type { UtmData } from "@/lib/utm";

export type Industry =
  | "Trades"
  | "Health / Dental"
  | "Professional Services"
  | "Property / Real Estate"
  | "Other";

export interface LeadFormData {
  fullName: string;
  businessName: string;
  phone: string;
  industry: Industry | "";
  email?: string;
}

export interface LeadSubmission extends LeadFormData {
  attribution: UtmData;
  submittedAt: string;
  // Honeypot field — should always arrive empty from real users.
  // See lib/validation.ts and app/api/lead/route.ts.
  website?: string;
}
