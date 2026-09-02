// Captures advertising attribution parameters from the URL on first landing
// and preserves them in sessionStorage for the duration of the visit, so
// they can be attached to the lead form when it's submitted — even if the
// person browses several pages before converting.

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

export type UtmData = Partial<Record<(typeof UTM_KEYS)[number], string>>;

const STORAGE_KEY = "virelli_attribution";

export function captureUtmParams(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const found: UtmData = {};

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) found[key] = value;
  });

  if (Object.keys(found).length === 0) return;

  // Merge with any attribution already captured earlier in the session,
  // preferring the newest values (most recent ad click wins).
  const existing = getStoredUtmParams();
  const merged = { ...existing, ...found };
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
}

export function getStoredUtmParams(): UtmData {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmData) : {};
  } catch {
    return {};
  }
}
