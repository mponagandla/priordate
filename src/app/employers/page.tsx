"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { searchEmployers, Employer } from "@/lib/dataService";
import DataSourceBadge from "@/components/DataSourceBadge";

export default function EmployersDirectoryPage() {
  const [query, setQuery] = useState("");
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [loading, setLoading] = useState(false);

  // Default featured employers list if query is empty
  const defaultEmployers: Employer[] = [
    {
      id: "google-llc",
      clean_name: "Google LLC",
      legal_name: "Google LLC",
      fein: null,
      aliases: ["Google Inc", "Alphabet"],
      city: "Mountain View",
      state: "CA",
      postal_code: "94043",
      total_lca_count: 14250,
      total_perm_count: 3890,
    },
    {
      id: "microsoft-corporation",
      clean_name: "Microsoft Corporation",
      legal_name: "Microsoft Corporation",
      fein: null,
      aliases: ["Microsoft"],
      city: "Redmond",
      state: "WA",
      postal_code: "98052",
      total_lca_count: 12800,
      total_perm_count: 3410,
    },
    {
      id: "amazon-com-services-llc",
      clean_name: "Amazon.com Services LLC",
      legal_name: "Amazon.com Services LLC",
      fein: null,
      aliases: ["Amazon", "AWS"],
      city: "Seattle",
      state: "WA",
      postal_code: "98109",
      total_lca_count: 18500,
      total_perm_count: 5120,
    },
    {
      id: "meta-platforms-inc",
      clean_name: "Meta Platforms Inc",
      legal_name: "Meta Platforms Inc",
      fein: null,
      aliases: ["Facebook Inc"],
      city: "Menlo Park",
      state: "CA",
      postal_code: "94025",
      total_lca_count: 8900,
      total_perm_count: 2450,
    },
    {
      id: "apple-inc",
      clean_name: "Apple Inc",
      legal_name: "Apple Inc",
      fein: null,
      aliases: ["Apple Computer"],
      city: "Cupertino",
      state: "CA",
      postal_code: "95014",
      total_lca_count: 7600,
      total_perm_count: 1980,
    },
    {
      id: "intel-corporation",
      clean_name: "Intel Corporation",
      legal_name: "Intel Corporation",
      fein: null,
      aliases: ["Intel"],
      city: "Santa Clara",
      state: "CA",
      postal_code: "95054",
      total_lca_count: 6100,
      total_perm_count: 1620,
    },
  ];

  useEffect(() => {
    async function doSearch() {
      if (query.trim().length < 2) {
        setEmployers(defaultEmployers);
        return;
      }
      setLoading(true);
      const results = await searchEmployers(query);
      setEmployers(results.length > 0 ? results : []);
      setLoading(false);
    }

    const timer = setTimeout(doSearch, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative min-h-screen pb-margin-lg overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-grid-pattern opacity-20"></div>

      <div className="relative px-4 md:px-margin-lg max-w-container-max mx-auto pt-12 md:pt-16 pb-12">
        {/* Page Title */}
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary font-mono text-xs">
            <span className="material-symbols-outlined text-[16px]">domain</span>
            <span>DOL OFLC Sponsoring Directory</span>
          </div>

          <h1 className="font-sans text-display-lg text-3xl md:text-5xl font-bold text-on-surface">
            Employer Pipeline Profiles
          </h1>
          <p className="font-sans text-body-lg text-on-surface-variant">
            Explore PERM filing volume, certification ratios, and wage distributions for U.S. visa sponsoring employers.
          </p>

          <div className="pt-2">
            <DataSourceBadge sourceName="DOL Disclosure Data" />
          </div>
        </div>

        {/* Employer Search Box */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="glass-panel p-4 rounded-xl glow-border">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-3.5 text-on-surface-variant text-[22px]">
                search
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search employer by name (e.g. Google, Microsoft, Amazon)..."
                className="w-full bg-surface-container-highest/60 border border-outline-variant/50 rounded-lg py-3 pl-12 pr-4 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors backdrop-blur-md font-sans text-body-md"
              />
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        {loading ? (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-primary-container text-[36px] animate-spin">
              hourglass_empty
            </span>
            <p className="font-sans text-on-surface-variant mt-2 text-sm">
              Searching employer registry...
            </p>
          </div>
        ) : employers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employers.map((emp) => (
              <Link
                key={emp.id}
                href={`/employers/${encodeURIComponent(emp.id)}`}
                className="glass-card rounded-xl p-6 glow-border hover:border-primary-container/60 hover:bg-surface-container-high/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="w-10 h-10 rounded-lg bg-primary-container/10 border border-primary-container/30 flex items-center justify-center text-primary font-bold text-lg group-hover:scale-110 transition-transform">
                      {emp.clean_name.charAt(0)}
                    </span>
                    <span className="font-mono text-xs text-on-surface-variant bg-surface-container-highest px-2.5 py-1 rounded-md">
                      {emp.state || "US"}
                    </span>
                  </div>

                  <h3 className="font-sans text-headline-md text-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                    {emp.clean_name}
                  </h3>

                  {emp.city && (
                    <p className="font-sans text-xs text-on-surface-variant mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      {emp.city}, {emp.state}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center font-mono text-xs">
                  <div>
                    <span className="text-secondary-fixed-dim block text-[10px] uppercase">
                      PERM Filings
                    </span>
                    <span className="text-primary font-bold text-sm">
                      {(emp.total_perm_count || 0).toLocaleString()}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-secondary-fixed-dim block text-[10px] uppercase">
                      LCA Filings
                    </span>
                    <span className="text-on-surface font-semibold text-sm">
                      {(emp.total_lca_count || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-xl p-12 text-center max-w-lg mx-auto my-8">
            <span className="material-symbols-outlined text-[48px] text-tertiary mb-2">
              search_off
            </span>
            <h3 className="font-sans text-headline-md text-on-surface">No employers found</h3>
            <p className="font-sans text-body-md text-on-surface-variant mt-1 text-sm">
              Try a different search term or check spelling.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
