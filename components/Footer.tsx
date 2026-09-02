export default function Footer() {
  return (
    <footer className="hairline-top">
      <div className="container-content flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-mutedDark">
          © {new Date().getFullYear()} Virelli Systems. All rights reserved.
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {/* Placeholder links — point these at real pages when ready. */}
          <a href="/privacy" className="hover:text-ink">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-ink">
            Terms
          </a>
          <a href="/contact" className="hover:text-ink">
            Contact
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink"
          >
            Instagram
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}
