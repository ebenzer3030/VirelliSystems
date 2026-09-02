import LeadForm from "@/components/LeadForm";

export default function LeadFormSection() {
  return (
    <section id="lead-form" className="hairline-top scroll-mt-16 bg-surface/40">
      <div className="container-content grid gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-2xl leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
            Hear Virelli built around your business.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Tell us a little about your business and we&apos;ll show you what
            an AI Reception setup could sound like for you.
          </p>
        </div>

        <div className="rounded-2xl border border-hairline bg-surface p-6 sm:p-8">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
