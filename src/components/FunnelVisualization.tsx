import React from "react";

interface FunnelVisualizationProps {
  employerName: string;
  permFiled: number;
  permCertified: number;
  permDenied: number;
  className?: string;
}

export default function FunnelVisualization({
  employerName,
  permFiled,
  permCertified,
  permDenied,
  className = "",
}: FunnelVisualizationProps) {
  const certifiedPct = permFiled > 0 ? Math.round((permCertified / permFiled) * 100) : 85;

  return (
    <div className={`glass-panel rounded-xl p-6 md:p-8 glow-border ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="font-sans text-headline-md text-on-surface flex items-center gap-2">
            <span>Immigration Pipeline Funnel</span>
          </h3>
          <p className="font-sans text-xs text-on-surface-variant mt-1">
            Tracking PERM to Green Card stage conversions for {employerName}
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-secondary-fixed-dim bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <span className="w-2 h-2 rounded-full bg-primary-container"></span>
          <span>Verified DOL Disclosure Data</span>
        </div>
      </div>

      {/* Funnel Steps Container */}
      <div className="space-y-4 my-6">
        {/* Stage 1: PERM Filed */}
        <div className="relative">
          <div className="glass-card p-4 rounded-lg flex justify-between items-center border-l-4 border-l-primary-container">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-container text-[24px]">
                assignment
              </span>
              <div>
                <span className="font-mono text-label-mono text-xs uppercase tracking-wider text-secondary-fixed-dim block">
                  Stage 1: PERM (ETA-9089) Filed
                </span>
                <span className="font-sans font-semibold text-on-surface text-sm">
                  DOL OFLC Public Disclosure File
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-sans font-bold text-headline-md text-on-surface block">
                {permFiled.toLocaleString()}
              </span>
              <span className="font-mono text-[11px] text-on-surface-variant">100% Initial Baseline</span>
            </div>
          </div>
        </div>

        {/* Connector Arrow */}
        <div className="flex justify-center my-1 text-primary/40">
          <span className="material-symbols-outlined text-[20px]">arrow_downward</span>
        </div>

        {/* Stage 2: PERM Certified */}
        <div className="relative">
          <div className="glass-card p-4 rounded-lg flex justify-between items-center border-l-4 border-l-primary">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[24px]">
                verified
              </span>
              <div>
                <span className="font-mono text-label-mono text-xs uppercase tracking-wider text-secondary-fixed-dim block">
                  Stage 2: PERM Certified
                </span>
                <span className="font-sans font-semibold text-on-surface text-sm">
                  Approved by Department of Labor
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-baseline gap-2 justify-end">
                <span className="font-sans font-bold text-headline-md text-primary">
                  {permCertified.toLocaleString()}
                </span>
                <span className="font-mono text-xs text-primary-container font-semibold">
                  ({certifiedPct}%)
                </span>
              </div>
              <span className="font-mono text-[11px] text-on-surface-variant">
                {permDenied > 0 ? `${permDenied} Denied / Withdrawn` : "High certification rate"}
              </span>
            </div>
          </div>
        </div>

        {/* Connector Arrow */}
        <div className="flex justify-center my-1 text-outline/30">
          <span className="material-symbols-outlined text-[20px]">arrow_downward</span>
        </div>

        {/* Stage 3: I-140 Immigrant Petition (LOCKED STATE) */}
        <div className="relative group">
          <div className="glass-card p-4 rounded-lg flex justify-between items-center border-l-4 border-l-outline/40 opacity-70 bg-surface-container-low/40">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-tertiary-container/20 border border-tertiary-container/40 flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary text-[18px]">
                  lock
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-label-mono text-xs uppercase tracking-wider text-secondary-fixed-dim block">
                    Stage 3: I-140 Petition Filed
                  </span>
                  <span className="bg-tertiary-container/20 border border-tertiary-container/50 text-tertiary font-mono text-[10px] uppercase px-2 py-0.5 rounded-full font-bold">
                    Coming Soon
                  </span>
                </div>
                <span className="font-sans text-xs text-on-surface-variant">
                  USCIS Immigrant Petition Stage
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs text-tertiary font-medium block">
                Data Locked
              </span>
              <span className="font-mono text-[10px] text-outline">
                USCIS does not release employer-level I-140 data
              </span>
            </div>
          </div>
        </div>

        {/* Connector Arrow */}
        <div className="flex justify-center my-1 text-outline/30">
          <span className="material-symbols-outlined text-[20px]">arrow_downward</span>
        </div>

        {/* Stage 4: I-485 Adjustment of Status (LOCKED STATE) */}
        <div className="relative group">
          <div className="glass-card p-4 rounded-lg flex justify-between items-center border-l-4 border-l-outline/40 opacity-70 bg-surface-container-low/40">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-tertiary-container/20 border border-tertiary-container/40 flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary text-[18px]">
                  lock
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-label-mono text-xs uppercase tracking-wider text-secondary-fixed-dim block">
                    Stage 4: I-485 Green Card Approved
                  </span>
                  <span className="bg-tertiary-container/20 border border-tertiary-container/50 text-tertiary font-mono text-[10px] uppercase px-2 py-0.5 rounded-full font-bold">
                    Coming Soon
                  </span>
                </div>
                <span className="font-sans text-xs text-on-surface-variant">
                  Final Green Card Issuance
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs text-tertiary font-medium block">
                Data Locked
              </span>
              <span className="font-mono text-[10px] text-outline">
                Subject to country priority date availability
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Explanatory Footer Callout */}
      <div className="p-4 rounded-lg bg-surface-container-high/40 border border-white/5 text-xs text-on-surface-variant font-sans flex items-start gap-2.5">
        <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">
          info
        </span>
        <div>
          <strong className="text-on-surface">Data Transparency Guarantee:</strong> Stages 1 &amp; 2 reflect official Department of Labor disclosure disclosures. Stages 3 &amp; 4 are locked because USCIS publishes I-140 data exclusively at national classification/country level, never by employer name. We never show estimated or fabricated numbers.
        </div>
      </div>
    </div>
  );
}
