// Thin wrapper around the Meta Pixel global (`fbq`) so pixel calls are made
// from one place and never fire before the pixel base code has loaded.
//
// Supported events (per project brief):
//   PageView   — fired automatically by the pixel base code on every load
//   ViewContent — fire on meaningful section views if/when you want that detail
//   Lead        — fire ONLY after a successful lead form submission
//
// IMPORTANT: Do not call trackLead() from anywhere except the successful
// submit handler in components/LeadForm.tsx. Firing it elsewhere (e.g. on
// button clicks, page views) will corrupt your ad conversion data.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackViewContent(contentName: string): void {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "ViewContent", { content_name: contentName });
}

export function trackLead(payload?: Record<string, unknown>): void {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "Lead", payload ?? {});
}
