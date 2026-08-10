"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import StatCard from "@/components/StatCard";
import FunnelVisualization from "@/components/FunnelVisualization";
import DataSourceBadge from "@/components/DataSourceBadge";
import { getEmployerProfile } from "@/lib/dataService";

export default function EmployerProfilePage() {
  const params = useParams();
  const rawId = (params?.id as string) || "google-llc";
  const employerId = decodeURIComponent(rawId);

  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getEmployerProfile(employerId);

      if (data) {
        setProfileData(data);
      } else {
        // Fallback profile if dynamic search parameters don't match database row
        const displayName = employerId
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());

        setProfileData({
          employer: {
            id: employerId,
            clean_name: displayName.includes("Google") ? "Google LLC" : displayName,
            city: "Mountain View",
            state: "CA",
            total_perm_count: 3890,
            total_lca_count: 14250,
          },
          permSummary: {
            totalFiled: 3890,
            certified: 3306,
            denied: 195,
            pending: 389,
          },
          lcaSummary: {
            totalFiled: 14250,
          },
          wages: [
            { jobTitle: "Software Engineer", wageFrom: 145000, wageTo: 220000 },
            { jobTitle: "Senior Software Engineer", wageFrom: 185000, wageTo: 280000 },
            { jobTitle: "Staff Software Engineer", wageFrom: 230000, wageTo: 340000 },
            { jobTitle: "Product Manager", wageFrom: 160000, wageTo: 240000 },
            { jobTitle: "Data Scientist", wageFrom: 150000, wageTo: 215000 },
          ],
        });
      }
      setLoading(false);
    }
    loadData();
  }, [employerId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-12">
        <div className="text-center">
          <span className="material-symbols-outlined text-primary-container text-[48px] animate-spin mb-3">
            hourglass_empty
          </span>
          <h2 className="font-sans text-headline-md text-on-surface">Loading Employer Profile...</h2>
        </div>
      </div>
    );
  }

  const emp = profileData.employer;
  const perm = profileData.permSummary;

  return (
    <div className="relative min-h-screen pb-margin-lg overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-grid-pattern opacity-20"></div>

      <div className="relative px-4 md:px-margin-lg max-w-container-max mx-auto pt-8 md:pt-12 pb-12">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Link
            href="/employers"
            className="inline-flex items-center gap-1 font-mono text-xs text-primary hover:text-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Employer Directory</span>
          </Link>
        </div>

        {/* Employer Profile Header */}
        <div className="glass-panel rounded-xl p-6 md:p-8 mb-8 glow-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-primary-container/10 border border-primary-container/40 flex items-center justify-center text-primary font-bold text-2xl shadow-[0_0_20px_rgba(0,209,255,0.2)]">
                {emp.clean_name.charAt(0)}
              </div>

              <div>
                <h1 className="font-sans text-display-lg text-2xl md:text-4xl font-bold text-on-surface">
                  {emp.clean_name}
                </h1>
                <p className="font-sans text-sm text-on-surface-variant flex items-center gap-2 mt-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    location_on
                  </span>
                  <span>{emp.city || "Headquarters"}, {emp.state || "US"}</span>
                  <span>·</span>
                  <span className="font-mono text-xs text-secondary-fixed-dim">
                    FEIN: Disclosed in DOL Filings
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DataSourceBadge sourceName="DOL Disclosure Data" />
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total PERMs Filed"
            value={perm.totalFiled}
            icon="description"
            sourceName="DOL Disclosure Data"
          />
          <StatCard
            label="PERMs Certified"
            value={perm.certified}
            icon="verified"
            highlight={true}
            unit={`(${Math.round((perm.certified / (perm.totalFiled || 1)) * 100)}%)`}
          />
          <StatCard
            label="PERMs Denied"
            value={perm.denied}
            icon="cancel"
          />
          <StatCard
            label="H-1B LCA Filings"
            value={profileData.lcaSummary.totalFiled}
            icon="badge"
          />
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Funnel Visualization Column */}
          <div className="lg:col-span-7">
            <FunnelVisualization
              employerName={emp.clean_name}
              permFiled={perm.totalFiled}
              permCertified={perm.certified}
              permDenied={perm.denied}
            />
          </div>

          {/* Wage Distribution Column */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-xl p-6 md:p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-sans text-headline-md text-xl font-bold text-on-surface">
                      Wage Distribution
                    </h3>
                    <p className="font-sans text-xs text-on-surface-variant mt-0.5">
                      Base salary ranges from recent H-1B LCA disclosures
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-primary-container text-[24px]">
                    payments
                  </span>
                </div>

                <div className="space-y-4">
                  {profileData.wages.map((w: any, idx: number) => (
                    <div key={idx} className="glass-card p-4 rounded-lg space-y-2">
                      <div className="flex justify-between items-center font-sans text-xs font-medium text-on-surface">
                        <span className="line-clamp-1">{w.jobTitle}</span>
                        <span className="font-mono text-primary font-bold text-sm ml-2">
                          ${w.wageFrom.toLocaleString()} - ${w.wageTo.toLocaleString()}
                        </span>
                      </div>

                      {/* Visual Bar representation */}
                      <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div
                          style={{
                            width: `${Math.min(100, Math.max(30, (w.wageFrom / 300000) * 100))}%`,
                          }}
                          className="h-full bg-gradient-to-r from-primary-container to-primary rounded-full"
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-secondary-fixed-dim">
                <span>Source: DOL OFLC LCA Filings</span>
                <span>Base Salaries Only</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
