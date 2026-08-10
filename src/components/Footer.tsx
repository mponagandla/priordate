import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest full-width py-margin-lg border-t border-outline-variant/30 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-gutter px-4 md:px-margin-lg max-w-container-max mx-auto">
        <div className="flex flex-col gap-4 max-w-md">
          <div className="flex items-center gap-2">
            <span className="font-sans text-headline-md text-on-surface font-bold">
              Priordate
            </span>
            <span className="text-primary font-mono text-xs">v1.0</span>
          </div>
          <p className="font-sans text-body-md text-secondary-fixed-dim">
            © {new Date().getFullYear()} Priordate. Data sourced from U.S. DOL PERM/LCA quarterly disclosures &amp; USCIS Open Data. This tool is an independent transparency effort and does not constitute legal advice.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 md:gap-12">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-label-mono text-secondary-fixed-dim uppercase tracking-wider text-[12px]">
              Navigation
            </span>
            <Link href="/" className="font-sans text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Cohort Finder
            </Link>
            <Link href="/employers" className="font-sans text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Employer Directory
            </Link>
            <Link href="/trends" className="font-sans text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Trends &amp; Velocity
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-label-mono text-secondary-fixed-dim uppercase tracking-wider text-[12px]">
              Transparency
            </span>
            <Link href="/methodology" className="font-sans text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Data Methodology
            </Link>
            <Link href="/about" className="font-sans text-body-md text-on-surface-variant hover:text-primary transition-colors">
              About &amp; Scope
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="font-sans text-body-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
            >
              <span>GitHub Codebase</span>
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
