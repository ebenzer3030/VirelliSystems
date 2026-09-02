const steps = [
  {
    number: "01",
    title: "Answer",
    copy: "Virelli answers incoming calls 24/7 using a natural conversational voice.",
  },
  {
    number: "02",
    title: "Understand",
    copy: "It understands why the customer is calling and responds using information specific to your business.",
  },
  {
    number: "03",
    title: "Qualify",
    copy: "Virelli gathers the information your team actually needs.",
  },
  {
    number: "04",
    title: "Act",
    copy: "Book appointments, capture leads, answer questions or transfer important calls.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="hairline-top scroll-mt-16">
      <div className="container-content py-16 sm:py-24">
        <h2 className="max-w-lg text-2xl leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
          From incoming call to captured opportunity.
        </h2>

        <div className="relative mt-14 grid gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              <span className="text-sm font-medium text-mutedDark">
                {step.number}
              </span>
              <h3 className="mt-3 text-lg font-medium text-ink sm:text-xl">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-base">
                {step.copy}
              </p>
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute right-[-1.1rem] top-1.5 hidden h-px w-6 bg-hairline lg:block"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
