export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-glow">
      <div className="container-content grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
        <div className="animate-rise">
          <p className="text-sm font-medium text-accent-bright">
            Virelli Systems — AI Reception
          </p>

          <h1 className="mt-5 max-w-xl text-[2.2rem] leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Never miss the call that becomes the opportunity.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Virelli answers your business calls 24/7, handles enquiries,
            qualifies leads and books appointments — even when you can&apos;t.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#lead-form"
              className="tap-target inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-bright sm:text-base"
            >
              Hear a free demo for my business
            </a>
            <a
              href="#how-it-works"
              className="tap-target inline-flex items-center justify-center rounded-full border border-hairline px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-muted sm:text-base"
            >
              See how it works
            </a>
          </div>

          <p className="mt-5 text-xs text-mutedDark sm:text-sm">
            No commitment. See what Virelli could sound like for your business.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[340px] lg:max-w-none">
          <PhoneVisual />
        </div>
      </div>
    </section>
  );
}

function PhoneVisual() {
  return (
    <div className="relative mx-auto w-[280px] rounded-[2.4rem] border border-hairline bg-surface p-3 shadow-[0_40px_80px_-30px_rgba(61,92,255,0.35)] sm:w-[300px]">
      <div className="rounded-[1.9rem] bg-surfaceAlt px-5 py-8">
        <p className="text-center text-xs text-mutedDark">Incoming call</p>
        <p className="mt-1 text-center text-sm font-medium text-ink">
          Unknown caller
        </p>

        {/* Waveform */}
        <div className="mt-8 flex h-14 items-end justify-center gap-1">
          {[0.4, 0.7, 1, 0.5, 0.9, 0.35, 0.75, 1, 0.5, 0.65].map((h, i) => (
            <span
              key={i}
              style={{
                animationDelay: `${i * 0.09}s`,
                height: `${h * 100}%`,
              }}
              className="w-1 origin-bottom animate-waveform rounded-full bg-accent-bright/80"
            />
          ))}
        </div>

        <div className="mt-8 space-y-2.5">
          <StatusRow label="Call answered" />
          <StatusRow label="Lead qualified" />
          <StatusRow label="Appointment booked" />
        </div>
      </div>
    </div>
  );
}

function StatusRow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-hairline bg-base/60 px-3 py-2.5">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-bright" />
      <span className="text-xs font-medium text-ink/90 sm:text-sm">{label}</span>
    </div>
  );
}
