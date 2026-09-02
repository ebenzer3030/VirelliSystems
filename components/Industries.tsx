const groups = [
  {
    title: "Trades",
    items: ["Plumbing", "Electrical", "HVAC", "Building", "Other field services"],
  },
  {
    title: "Health & appointment businesses",
    items: ["Dental", "Clinics", "Med spas", "Other appointment-based businesses"],
  },
  {
    title: "Professional services",
    items: ["Real estate", "Property services", "Consulting", "Other service businesses"],
  },
];

export default function Industries() {
  return (
    <section className="hairline-top">
      <div className="container-content py-16 sm:py-24">
        <h2 className="max-w-lg text-2xl leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
          Built around your business.
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-medium text-accent-bright">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-muted sm:text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 border-t border-hairline pt-8 text-base text-ink sm:text-lg">
          Different businesses. Same problem. Someone needs to answer.
        </p>
        <p className="mt-2 text-xs text-mutedDark">
          Examples of industries Virelli can be configured for — not existing
          Virelli customers.
        </p>
      </div>
    </section>
  );
}
