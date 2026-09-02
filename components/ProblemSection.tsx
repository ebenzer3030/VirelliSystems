export default function ProblemSection() {
  return (
    <section className="hairline-top">
      <div className="container-content py-16 sm:py-24">
        <div className="max-w-xl">
          <h2 className="text-2xl leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
            Your next customer could already be calling.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            When a customer needs something, they don&apos;t always leave a
            voicemail or wait for a callback. They call the next business.
            Virelli makes sure someone answers.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 sm:gap-8">
          <FlowCard
            tone="muted"
            title="Without Virelli"
            steps={["Phone rings", "No answer", "Customer moves on"]}
          />
          <FlowCard
            tone="accent"
            title="With Virelli"
            steps={[
              "Phone rings",
              "Virelli answers",
              "Enquiry handled",
              "Lead or appointment captured",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function FlowCard({
  title,
  steps,
  tone,
}: {
  title: string;
  steps: string[];
  tone: "muted" | "accent";
}) {
  const isAccent = tone === "accent";
  return (
    <div
      className={`rounded-2xl border p-6 sm:p-8 ${
        isAccent ? "border-accent/40 bg-accent/[0.06]" : "border-hairline bg-surface"
      }`}
    >
      <p className={`text-sm font-medium ${isAccent ? "text-accent-bright" : "text-mutedDark"}`}>
        {title}
      </p>
      <ol className="mt-5 space-y-4">
        {steps.map((step, i) => (
          <li key={step} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                isAccent
                  ? "bg-accent text-white"
                  : "bg-hairline text-mutedDark"
              }`}
            >
              {i + 1}
            </span>
            <span className={`text-sm sm:text-base ${isAccent ? "text-ink" : "text-muted"}`}>
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
