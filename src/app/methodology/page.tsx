"use client";

import React, { useEffect, useState } from "react";
import { getDataSourcesWithLogs, DataSource } from "@/lib/dataService";

export default function MethodologyPage() {
  const [sources, setSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSources() {
      setLoading(true);
      const data = await getDataSourcesWithLogs();
      setSources(data);
      setLoading(false);
    }
    loadSources();
  }, []);

  return (
    <div className="relative min-h-screen pb-margin-lg overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-grid-pattern opacity-20"></div>

      <div className="relative px-4 md:px-margin-lg max-w-container-max mx-auto pt-12 md:pt-16 pb-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary font-mono text-xs">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Data Transparency Statement</span>
          </div>

          <h1 className="font-sans text-display-lg text-3xl md:text-5xl font-bold text-on-surface">
            Data Methodology &amp; Architecture
          </h1>

          <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed">
            PriorDate is engineered to bring total clarity to U.S. employment-based green card processing pipelines using exclusively official government open data releases.
          </p>
        </div>

        {/* Dynamic Data Sources Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-sans text-headline-md text-2xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container">database</span>
              <span>Live Ingested Data Sources</span>
            </h2>
            <span className="font-mono text-xs text-secondary-fixed-dim bg-white/5 px-3 py-1 rounded-full border border-white/10">
              Dynamically Synchronized
            </span>
          </div>

          {loading ? (
            <div className="glass-panel p-12 text-center rounded-xl">
              <span className="material-symbols-outlined text-primary-container text-[36px] animate-spin mb-2">
                hourglass_empty
              </span>
              <p className="font-sans text-on-surface-variant text-sm">Querying data_sources table...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sources.map((src) => (
                <div
                  key={src.id}
                  className="glass-panel rounded-xl p-6 glow-border transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <h3 className="font-sans text-lg font-bold text-on-surface">
                        {src.name}
                      </h3>
                      <span
                        className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded-full font-bold border ${
                          src.status === "active" && !src.has_failed_run
                            ? "bg-primary-container/10 border-primary-container/40 text-primary-container"
                            : "bg-tertiary-container/20 border-tertiary-container/50 text-tertiary"
                        }`}
                      >
                        {src.has_failed_run ? "Ingestion Warning" : src.status}
                      </span>
                    </div>

                    <p className="font-sans text-sm text-on-surface-variant leading-normal">
                      {src.description}
                    </p>

                    <a
                      href={src.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs text-primary hover:text-primary-container transition-colors pt-1"
                    >
                      <span>Official Source URL</span>
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </a>
                  </div>

                  <div className="font-mono text-xs text-right space-y-1 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-white/5">
                    <div className="text-secondary-fixed-dim">
                      Frequency: <strong className="text-on-surface capitalize">{src.update_frequency}</strong>
                    </div>
                    <div className="text-on-surface-variant">
                      Last Refreshed:{" "}
                      <span className="text-primary font-semibold">
                        {src.last_refreshed
                          ? new Date(src.last_refreshed).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Recently"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Known Limitations Callout Section */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="font-sans text-headline-md text-2xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary">gavel</span>
            <span>Known Data Limitations &amp; Principles</span>
          </h2>

          <div className="glass-panel rounded-xl p-8 border-l-4 border-l-tertiary space-y-6">
            <div className="space-y-2">
              <h3 className="font-sans text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[20px]">calendar_today</span>
                1. Annual Aggregate Scope (USCIS I-140 Reports)
              </h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                USCIS publishes I-140 petition statistics on an <strong>annual fiscal year basis</strong> (not quarterly or row-level receipt-by-receipt). PriorDate presents cohort calculations strictly as aggregate percentages (e.g. <em>&quot;68% of EB-2 petitions filed in FY2022 have been approved so far&quot;</em>). We explicitly avoid claiming individual percentile precision that public data cannot support.
              </p>
            </div>

            <div className="h-[1px] bg-white/5"></div>

            <div className="space-y-2">
              <h3 className="font-sans text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[20px]">domain_disabled</span>
                2. National Country-Level vs. Service Center Breakdown
              </h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                USCIS annual statistics are published at national and country-of-chargeability level. They do <strong>not</strong> contain service center breakdown (Nebraska vs. Texas). Service Center filters apply to point-in-time inventory snapshots, not annual petition totals.
              </p>
            </div>

            <div className="h-[1px] bg-white/5"></div>

            <div className="space-y-2">
              <h3 className="font-sans text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[20px]">fingerprint</span>
                3. No Individual Case Tracking
              </h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                No public source discloses individual Alien Registration Numbers, LIN/SRC case receipt numbers, or personal identifying information. PriorDate is an open-source statistical transparency tool, not an individual case status tracker.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
