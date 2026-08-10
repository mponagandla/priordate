import React from "react";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen pb-margin-lg overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-grid-pattern opacity-20"></div>

      <div className="relative px-4 md:px-margin-lg max-w-container-max mx-auto pt-12 md:pt-16 pb-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary font-mono text-xs">
            <span className="material-symbols-outlined text-[16px]">info</span>
            <span>About PriorDate</span>
          </div>

          <h1 className="font-sans text-display-lg text-3xl md:text-5xl font-bold text-on-surface">
            Democratizing U.S. Green Card Pipeline Data
          </h1>

          <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed">
            PriorDate was created to replace forum rumors and black-box estimates with verifiable, open-source immigration pipeline intelligence.
          </p>
        </div>

        {/* Founder Note Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="glass-panel rounded-xl p-8 md:p-10 glow-border relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary-container/20 border border-primary-container flex items-center justify-center text-primary-container font-bold text-xl">
                PD
              </div>
              <div>
                <h3 className="font-sans text-lg font-bold text-on-surface">Founder&apos;s Note</h3>
                <p className="font-mono text-xs text-secondary-fixed-dim">Open Source Transparency Project</p>
              </div>
            </div>

            <div className="space-y-4 font-sans text-on-surface-variant text-base leading-relaxed">
              <p>
                Navigating the U.S. permanent residency process as an immigrant worker or employer often feels like driving in the fog. While the Department of Labor and USCIS publish thousands of quarterly records, the data remains buried across scattered PDFs and disclosure files.
              </p>
              <p>
                PriorDate turns raw public disclosures into clean visual intelligence. We parse quarterly PERM disclosures, LCA filings, monthly Visa Bulletin cutoffs, and USCIS annual classification reports into unified cohort metrics.
              </p>
              <p>
                Our commitment is simple: <strong>No guesswork, no fake percentile promises, and 100% open source transparency.</strong> Every chart and metric shown traces back to a verified public record.
              </p>
            </div>
          </div>
        </div>

        {/* Empty Styled Logo Strip / Quote Block Section (per MEP Scope) */}
        <div className="max-w-4xl mx-auto my-12">
          <div className="glass-card rounded-xl p-10 border border-dashed border-white/20 text-center relative overflow-hidden">
            <div className="space-y-3 opacity-60">
              <span className="material-symbols-outlined text-[36px] text-primary-container">
                format_quote
              </span>
              <p className="font-sans text-sm text-secondary-fixed-dim italic max-w-md mx-auto">
                &ldquo;Empowering applicants and legal teams with open data transparency.&rdquo;
              </p>
              <div className="pt-4 flex justify-center items-center gap-8 text-on-surface-variant opacity-40">
                <span className="font-mono text-xs tracking-widest uppercase">Open Source</span>
                <span>·</span>
                <span className="font-mono text-xs tracking-widest uppercase">Public Domain</span>
                <span>·</span>
                <span className="font-mono text-xs tracking-widest uppercase">Verifiable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
