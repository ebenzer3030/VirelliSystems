"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline/70 bg-base/85 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between sm:h-[72px]">
        <Link href="/" className="flex items-center gap-2">
          {/* Replace with your Virelli logo — see public/images/logo.svg and README */}
          <span className="text-lg font-semibold tracking-tight text-ink sm:text-xl">
            Virelli
          </span>
          <span className="hidden text-lg font-light text-muted sm:inline">
            Systems
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#how-it-works" className="text-sm text-muted transition-colors hover:text-ink">
            How It Works
          </a>
          <a href="#features" className="text-sm text-muted transition-colors hover:text-ink">
            Features
          </a>
          <a href="#faq" className="text-sm text-muted transition-colors hover:text-ink">
            FAQ
          </a>
        </nav>

        <a
          href="#lead-form"
          className="tap-target inline-flex items-center rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-bright sm:px-5"
        >
          Get a Free Demo
        </a>
      </div>
    </header>
  );
}
