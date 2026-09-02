const features = [
  {
    title: "24/7 call answering",
    copy: "Never let after-hours calls disappear.",
  },
  {
    title: "Lead qualification",
    copy: "Capture the information your team needs before following up.",
  },
  {
    title: "Appointment booking",
    copy: "Connect Virelli to your scheduling workflow.",
  },
  {
    title: "Call transfers",
    copy: "Send important conversations to the right person.",
  },
  {
    title: "Business-specific knowledge",
    copy: "Virelli can be configured around your services, FAQs and processes.",
  },
  {
    title: "Consistent customer experience",
    copy: "Every caller receives a fast, professional response.",
  },
];

export default function Features() {
  return (
    <section id="features" className="hairline-top scroll-mt-16 bg-surface/40">
      <div className="container-content py-16 sm:py-24">
        <h2 className="max-w-lg text-2xl leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
          More than answering the phone.
        </h2>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="bg-surface p-6 sm:p-7">
              <h3 className="text-base font-medium text-ink sm:text-lg">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {f.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
