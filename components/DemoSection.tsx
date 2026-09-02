import AudioPlayer from "@/components/AudioPlayer";

export default function DemoSection() {
  return (
    <section className="hairline-top bg-surface/40">
      <div className="container-content py-16 sm:py-24">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
            Don&apos;t just read about it. Hear it.
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Listen to how Virelli handles a real customer enquiry.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-lg">
          {/* Swap the src below once you have a real recording — the file
              just needs to live at public/audio/demo-plumbing.mp3 */}
          <AudioPlayer
            src="/audio/demo-plumbing.mp3"
            industry="Plumbing business"
            callType="Incoming enquiry"
          />
        </div>

        <div className="mx-auto mt-10 max-w-lg text-center">
          <p className="text-base text-ink">
            Want to hear Virelli answering for your business?
          </p>
          <a
            href="#lead-form"
            className="tap-target mt-5 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-bright sm:text-base"
          >
            Get my free custom demo
          </a>
        </div>
      </div>
    </section>
  );
}
