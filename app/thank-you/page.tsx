import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "You're in | Virelli Systems",
  robots: { index: false, follow: false },
};

// The Lead pixel event has already fired in components/LeadForm.tsx at the
// moment of successful submission, before the redirect to this page. This
// page is the destination you can point a Meta Ads "Conversion Location"
// or a Meta Pixel URL-based custom conversion at, if you'd prefer that
// method instead of (or alongside) the event-based Lead trigger.
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "#";

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main>
        <section className="container-content flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
          <h1 className="text-3xl tracking-tight text-ink sm:text-4xl lg:text-5xl">
            You&apos;re in.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            We&apos;ve received your request. We&apos;ll get in touch to
            learn a little more about your business and show you what
            Virelli could sound like answering your calls.
          </p>

          <div className="mt-12 w-full max-w-sm rounded-2xl border border-hairline bg-surface p-8">
            <p className="text-sm font-medium uppercase tracking-wide text-mutedDark">
              Want to skip the wait?
            </p>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target mt-5 inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-bright sm:text-base"
            >
              Book a quick call
            </a>
          </div>

          <p className="mt-8 text-sm text-mutedDark">
            Prefer to wait? No problem — we&apos;ll be in touch.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
