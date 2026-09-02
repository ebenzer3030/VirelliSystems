"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Does Virelli answer calls after hours?",
    a: "Yes. Virelli is designed to answer calls 24/7, including evenings, weekends and public holidays.",
  },
  {
    q: "Can Virelli book appointments?",
    a: "Yes, when connected to your scheduling workflow. Exactly how it books depends on the tools your business already uses.",
  },
  {
    q: "Can it transfer calls?",
    a: "Yes. Important or time-sensitive conversations can be transferred to the right person on your team.",
  },
  {
    q: "Can it answer questions about my business?",
    a: "Yes. Virelli is configured around your services, FAQs and processes so answers reflect how your business actually operates.",
  },
  {
    q: "Can it work with my existing business number?",
    a: "In most cases, yes. The exact setup depends on your current phone provider and systems, which we'll confirm during your demo.",
  },
  {
    q: "Does every business use the same AI setup?",
    a: "No. Each Virelli setup is configured around the specific business it answers for — its services, tone and processes.",
  },
  {
    q: "How do I hear a demo?",
    a: "Fill in the short form on this page and we'll get in touch to build a personalised demo for your business.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="hairline-top scroll-mt-16">
      <div className="container-content py-16 sm:py-24">
        <h2 className="text-2xl leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
          Questions, answered.
        </h2>

        <div className="mt-10 divide-y divide-hairline border-t border-hairline">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="tap-target flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-sm font-medium text-ink sm:text-base">
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 text-xl text-muted transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-5 pr-10 text-sm leading-relaxed text-muted sm:text-base">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
