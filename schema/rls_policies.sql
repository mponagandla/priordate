-- ============================================
-- PriorDate — Row Level Security Setup
-- Public anon key: read-only. Service key (used only by 
-- GitHub Actions scrapers) bypasses RLS entirely by design 
-- in Supabase, so no separate write-policy is needed for it.
-- ============================================

-- Enable RLS on every table exposed to the frontend
ALTER TABLE lca_filings ENABLE ROW LEVEL SECURITY;
ALTER TABLE perm_filings ENABLE ROW LEVEL SECURITY;
ALTER TABLE i140_annual_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE i140_visa_availability_snapshot ENABLE ROW LEVEL SECURITY;
ALTER TABLE visa_bulletin_monthly ENABLE ROW LEVEL SECURITY;
ALTER TABLE dol_processing_times ENABLE ROW LEVEL SECURITY;
ALTER TABLE employers ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_sources ENABLE ROW LEVEL SECURITY;

-- ingestion_log: enable RLS but do NOT add a public read policy.
-- This table can contain error messages/internals not meant for 
-- public exposure — keep it service-role-only (no policy = no 
-- access for anon/authenticated).
ALTER TABLE ingestion_log ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Public read-only policies (SELECT only, no INSERT/UPDATE/DELETE)
-- ============================================

DROP POLICY IF EXISTS "public_read_lca_filings" ON lca_filings;
CREATE POLICY "public_read_lca_filings" ON lca_filings
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_perm_filings" ON perm_filings;
CREATE POLICY "public_read_perm_filings" ON perm_filings
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_i140_annual_stats" ON i140_annual_stats;
CREATE POLICY "public_read_i140_annual_stats" ON i140_annual_stats
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_i140_visa_availability" ON i140_visa_availability_snapshot;
CREATE POLICY "public_read_i140_visa_availability" ON i140_visa_availability_snapshot
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_visa_bulletin" ON visa_bulletin_monthly;
CREATE POLICY "public_read_visa_bulletin" ON visa_bulletin_monthly
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_dol_processing_times" ON dol_processing_times;
CREATE POLICY "public_read_dol_processing_times" ON dol_processing_times
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_employers" ON employers;
CREATE POLICY "public_read_employers" ON employers
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_data_sources" ON data_sources;
CREATE POLICY "public_read_data_sources" ON data_sources
  FOR SELECT USING (true);

-- No policy added for ingestion_log — RLS enabled with zero 
-- policies means anon/authenticated get NO access by default.
