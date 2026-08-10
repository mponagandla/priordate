"use client";

import React, { useEffect, useState } from "react";
import FilterBar from "@/components/FilterBar";
import StatCard from "@/components/StatCard";
import CohortChart from "@/components/CohortChart";
import { getClassificationOptions, getCohortAnalysis } from "@/lib/dataService";

export default function HomePage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("EB-2 PERM");
  const [priorityDate, setPriorityDate] = useState<string>("2022-10");
  const [serviceCenter, setServiceCenter] = useState<string>("ALL");
  const [employer, setEmployer] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [cohortData, setCohortData] = useState<any>(null);

  // Initialize categories from database
  useEffect(() => {
    async function loadOptions() {
      const opts = await getClassificationOptions();
      setCategories(opts);
      if (opts.length > 0) {
        setCategory(opts[0]);
      }
    }
    loadOptions();
  }, []);

  // Fetch Cohort Analysis data
  const handleAnalyze = async () => {
    setLoading(true);
    const data = await getCohortAnalysis(category, priorityDate, "All Other Countries");
    setCohortData(data);
    setLoading(false);
  };

  useEffect(() => {
    handleAnalyze();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, priorityDate]);

  return (
    <div className="relative min-h-screen pb-margin-lg overflow-hidden">
      {/* Atmospheric Background Effects */}
      <div className="absolute inset-0 pointer-events-none bg-grid-pattern opacity-20"></div>
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary-container/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>

      <div className="relative px-4 md:px-margin-lg max-w-container-max mx-auto pt-12 md:pt-20 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16 space-y-6">
          <h1 className="font-sans text-display-lg text-3xl md:text-5xl lg:text-[52px] text-on-surface font-bold tracking-tight">
            Track your place in the
            <br />
            <span className="text-primary-container">immigration pipeline.</span>
          </h1>
          <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto text-base md:text-lg">
            Precise cohort analysis based on real DOL PERM &amp; USCIS open data. Uncover processing velocities and secure your timeline.
          </p>
        </div>

        {/* Search Interface */}
        <div className="max-w-4xl mx-auto mb-16">
          <FilterBar
            categories={categories.length > 0 ? categories : ["EB-1A", "EB-2 PERM", "EB-2 NIW", "EB-3"]}
            selectedCategory={category}
            onCategoryChange={setCategory}
            priorityDate={priorityDate}
            onPriorityDateChange={setPriorityDate}
            serviceCenter={serviceCenter}
            onServiceCenterChange={setServiceCenter}
            selectedEmployer={employer}
            onEmployerChange={setEmployer}
            onSearch={handleAnalyze}
          />
        </div>

        {/* Post-Search Results (Bento Grid Layout) */}
        {loading ? (
          <div className="glass-panel rounded-xl p-12 text-center max-w-4xl mx-auto my-12 animate-pulse">
            <span className="material-symbols-outlined text-[48px] text-primary-container animate-spin mb-4">
              hourglass_empty
            </span>
            <h3 className="font-sans text-headline-md text-on-surface">Analyzing USCIS &amp; DOL Records...</h3>
            <p className="font-sans text-body-md text-on-surface-variant mt-2">
              Cross-referencing I-140 annual stats and Visa Bulletin cutoffs
            </p>
          </div>
        ) : cohortData ? (
          <div className="mb-12">
            {/* Header Title */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1.5 bg-primary-container rounded-full"></div>
                <h2 className="font-sans text-headline-md text-xl md:text-2xl font-bold text-on-surface">
                  Cohort Analysis: {cohortData.classification} ({cohortData.priorityDateString})
                </h2>
              </div>
              <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary-fixed font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                Active Processing Cohort
              </span>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: 4 StatCards & CohortChart */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* 4 StatCards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <StatCard
                    label="Cohort Size"
                    value={cohortData.totalCohort}
                    icon="group"
                    sourceName="USCIS I-140 Statistics"
                  />
                  <StatCard
                    label="% Approved"
                    value={cohortData.approvedPct}
                    unit="%"
                    icon="verified"
                    sourceName="USCIS I-140 Statistics"
                  />
                  <StatCard
                    label="Outcome Rate"
                    value={`${cohortData.approvedPct}%`}
                    icon="analytics"
                    highlight={true}
                    subtitle={`Approved so far in FY${cohortData.priorityYear}`}
                  />
                  <StatCard
                    label="Visa Status"
                    value={cohortData.isCurrent ? "Current" : cohortData.latestCutoff}
                    icon="speed"
                    sourceName="Visa Bulletin"
                  />
                </div>

                {/* CohortChart Canvas */}
                <CohortChart
                  classification={cohortData.classification}
                  priorityYear={cohortData.priorityYear}
                  priorityDateString={cohortData.priorityDateString}
                  approvedPct={cohortData.approvedPct}
                  pendingPct={cohortData.pendingPct}
                  deniedPct={cohortData.deniedPct}
                  totalCohort={cohortData.totalCohort}
                  isCurrent={cohortData.isCurrent}
                  latestCutoff={cohortData.latestCutoff}
                />
              </div>

              {/* Right Column: Shareable Summary Card */}
              <div className="lg:col-span-4 h-full">
                <div className="glass-panel rounded-xl p-8 h-full flex flex-col items-center justify-between text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-container/10 via-transparent to-surface-variant/20 opacity-50 pointer-events-none"></div>

                  <div className="relative z-10 space-y-6 w-full my-auto">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary-container/20 border border-primary-container flex items-center justify-center shadow-[0_0_30px_rgba(0,209,255,0.3)]">
                      <span className="material-symbols-outlined text-primary-container text-[32px]">
                        emoji_events
                      </span>
                    </div>

                    <h4 className="font-mono text-label-mono text-secondary-fixed-dim uppercase tracking-widest text-xs">
                      Cohort Summary Status
                    </h4>

                    <div className="space-y-1">
                      <p className="font-sans text-headline-lg text-2xl font-bold text-on-surface leading-tight">
                        <span className="text-primary-container font-extrabold">{cohortData.approvedPct}% Approved</span>
                        <br />
                        in FY{cohortData.priorityYear}
                      </p>
                      <p className="font-mono text-secondary-fixed-dim text-sm mt-1">
                        {cohortData.classification} Cohort
                      </p>
                    </div>

                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"></div>

                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                      {cohortData.approvedPct}% of {cohortData.classification} petitions filed in FY{cohortData.priorityYear} have been approved by USCIS so far.
                    </p>

                    <div className="flex flex-col gap-3 w-full pt-2">
                      <button
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(window.location.href);
                            alert("Copied link to your clipboard!");
                          }
                        }}
                        className="w-full bg-surface-bright/50 border border-outline-variant hover:border-primary hover:bg-white/5 text-on-surface px-6 py-3 rounded-full font-sans text-body-md font-semibold transition-all flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[20px]">share</span>
                        <span>Share Result</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-panel rounded-xl p-12 text-center max-w-4xl mx-auto my-12">
            <span className="material-symbols-outlined text-[48px] text-tertiary mb-3">
              search_off
            </span>
            <h3 className="font-sans text-headline-md text-on-surface">No data yet for this combination</h3>
            <p className="font-sans text-body-md text-on-surface-variant mt-2 max-w-md mx-auto">
              Try selecting a different category or priority year to analyze cohort outcomes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
