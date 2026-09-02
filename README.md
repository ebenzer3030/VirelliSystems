# Virelli Systems — AI Reception landing page

A conversion-focused landing page and lead funnel for Virelli Systems' AI
Reception product, built for paid Facebook/Instagram traffic.

Stack: Next.js 14 (App Router) + TypeScript + Tailwind CSS.

---

## 1. Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values you have (see section 8-10)
npm run dev
```

Open http://localhost:3000.

---

## 2. Deploy to Vercel

1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — no build settings need changing.
4. Add the environment variables from `.env.example` under
   **Project → Settings → Environment Variables** (Production, and Preview
   if you want tracking active on preview deploys too).
5. Deploy.

---

## 3. Connect your domain

In Vercel: **Project → Settings → Domains** → add your domain (e.g.
`virellisystems.com`) and follow the DNS instructions shown (usually an A
record or CNAME at your domain registrar). Vercel issues SSL automatically.

---

## 4. Where to add your Virelli logo

- Replace `public/images/logo-placeholder.svg` with your real logo file.
- Update `components/Header.tsx` to render it (currently a text wordmark) —
  e.g. swap the `<span>` elements for a `next/image` pointing at your logo.
- The favicon at `public/favicon.ico` is also a placeholder — replace it
  with your real favicon (32×32 or 48×48 `.ico`).

---

## 5. Where to add the demo audio

Add your recording at:

```
public/audio/demo-plumbing.mp3
```

The player in `components/DemoSection.tsx` points at this path already. If
you'd rather use a different filename, update the `src` prop there. Until a
real file exists, the player shows a "demo audio coming soon" state instead
of breaking.

---

## 6. Where to add the form webhook / API

Lead submissions post to `app/api/lead/route.ts`, which forwards them to
whatever URL you set as `LEAD_WEBHOOK_URL` (in `.env.local` locally, or in
Vercel's environment variables for production). This can be:

- A CRM's inbound webhook URL
- A Zapier / Make.com "Catch Hook" URL
- An n8n webhook
- Any endpoint that accepts a JSON POST

If `LEAD_WEBHOOK_URL` is not set, submissions are only logged to the server
console (visible in Vercel's function logs) — useful while you're still
setting up your CRM, but you should set this before running real ad spend.

The payload shape sent to your webhook:

```json
{
  "fullName": "Jane Smith",
  "businessName": "Smith Plumbing",
  "phone": "0412 345 678",
  "industry": "Trades",
  "email": "jane@smithplumbing.com.au",
  "attribution": {
    "utm_source": "facebook",
    "utm_medium": "cpc",
    "utm_campaign": "ai-reception-launch",
    "fbclid": "..."
  },
  "submittedAt": "2026-08-31T04:00:00.000Z",
  "source": "virelli-landing-page"
}
```

---

## 7. Where to add your Cal.com booking link

Set `NEXT_PUBLIC_BOOKING_URL` in your environment variables to your
Cal.com (or other booking tool) link. It's used by the "Book a quick call"
button on `app/thank-you/page.tsx`.

---

## 8. Where to add your Meta Pixel ID

Set `NEXT_PUBLIC_META_PIXEL_ID` in your environment variables. The pixel
base code (in `components/MetaPixel.tsx`) will not load at all until this
is set — no ID is invented or hardcoded.

---

## 9. How Lead conversion tracking works

- **PageView** fires automatically on every page load once the pixel base
  code loads (standard Meta Pixel behaviour).
- **Lead** fires exactly once, only inside the successful-submit branch of
  `components/LeadForm.tsx`, immediately before redirecting to
  `/thank-you`. It never fires on page views, button clicks, or failed
  submissions — this keeps your ad conversion data accurate.
- `/thank-you` is also a safe page to use as a **URL-based custom
  conversion** in Meta Ads Manager if you prefer that method instead of (or
  alongside) the event-based Lead trigger — see the comment at the top of
  `app/thank-you/page.tsx`.
- **UTM parameters and `fbclid`** are captured on landing (see `lib/utm.ts`)
  and attached to every lead submission under `attribution`, so you can see
  which ad/campaign/ad set produced which lead in your CRM.
- **Google Analytics**: not wired up yet by design (per the brief). When
  you're ready, set `NEXT_PUBLIC_GA_ID` and add the GA4 script in
  `app/layout.tsx` next to `<MetaPixel />` — the env var placeholder is
  already in `.env.example`.

---

## 10. Where to change website copy

All copy lives directly in the section components under `components/`:

| Section | File |
|---|---|
| Header / nav | `components/Header.tsx` |
| Hero | `components/Hero.tsx` |
| Problem section | `components/ProblemSection.tsx` |
| Demo player | `components/DemoSection.tsx`, `components/AudioPlayer.tsx` |
| How it works | `components/HowItWorks.tsx` |
| Features | `components/Features.tsx` |
| Industries | `components/Industries.tsx` |
| Mid-page CTA | `components/MidCTA.tsx` |
| Lead form | `components/LeadFormSection.tsx`, `components/LeadForm.tsx` |
| FAQ | `components/FAQ.tsx` |
| Final CTA / mini-footer | `components/FinalCTA.tsx` |
| Footer links | `components/Footer.tsx` |
| Thank-you page | `app/thank-you/page.tsx` |
| SEO metadata (title/description) | `app/layout.tsx` |

---

## Project structure

```
app/
  layout.tsx          Root layout: fonts, SEO metadata, Meta Pixel, UTM capture
  page.tsx             Home page — assembles all sections
  thank-you/page.tsx    Post-submit confirmation + booking CTA
  privacy/, terms/, contact/   Placeholder pages linked from the footer
  api/lead/route.ts     Lead submission endpoint (forwards to your webhook)
components/            All page sections + form + audio player
lib/                   utm.ts, pixel.ts, validation.ts — small focused helpers
types/                 Shared TypeScript types
public/                Logo, favicon, demo audio, robots.txt
```

## Notes

- No fake testimonials, client logos, review counts, or stats are included
  anywhere on the site, per the brief — add genuine social proof once
  Virelli has it.
- The lead form's phone validation targets Australian numbers
  (mobile and landline formats). Adjust the regex in `lib/validation.ts` if
  you expand beyond Australia.
- Reduced-motion is respected site-wide (`prefers-reduced-motion`), and all
  interactive elements have visible keyboard focus states.
