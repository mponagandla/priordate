-- PriorDate Database Schema for Supabase / PostgreSQL
-- Open-source transparency project tracking U.S. green card pipeline data

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. DATA SOURCES TABLE
-- Powers UI DataSourceBadge component
-- ==========================================
CREATE TABLE IF NOT EXISTS data_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    url TEXT NOT NULL,
    description TEXT,
    last_refreshed TIMESTAMP WITH TIME ZONE,
    update_frequency TEXT NOT NULL, -- 'weekly', 'monthly', 'quarterly'
    status TEXT NOT NULL DEFAULT 'active', -- 'active', 'degraded', 'error'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 2. INGESTION LOG TABLE
-- Complete audit trail of all scraper runs
-- ==========================================
CREATE TABLE IF NOT EXISTS ingestion_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source TEXT NOT NULL,
    run_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    rows_processed INTEGER DEFAULT 0,
    status TEXT NOT NULL, -- 'SUCCESS', 'FAILED', 'WARNING'
    raw_file_reference TEXT,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ingestion_log_source_time ON ingestion_log (source, run_timestamp DESC);

-- ==========================================
-- 3. VISA BULLETIN MONTHLY
-- Priority date cutoffs by category x country x chart_type x month
-- ==========================================
CREATE TABLE IF NOT EXISTS visa_bulletin_monthly (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bulletin_month DATE NOT NULL, -- Stored as 1st of the month (e.g. 2026-08-01)
    category TEXT NOT NULL, -- 'EB-1', 'EB-2', 'EB-3', 'Other Workers', 'EB-4', 'EB-5 Unreserved', etc.
    country TEXT NOT NULL, -- 'All Chargeability Areas', 'China', 'India', 'Mexico', 'Philippines', 'Vietnam', etc.
    chart_type TEXT NOT NULL, -- 'final_action', 'dates_for_filing'
    cutoff_date DATE, -- NULL represents 'C' (Current) or 'U' (Unauthorized)
    raw_status TEXT NOT NULL, -- 'C', 'U', or 'DDMMMYY' (e.g., '15JAN23')
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT uq_visa_bulletin UNIQUE (category, country, chart_type, bulletin_month)
);

CREATE INDEX IF NOT EXISTS idx_vb_month_cat ON visa_bulletin_monthly (bulletin_month DESC, category, country);

-- ==========================================
-- 4. DOL PROCESSING TIMES
-- DOL FLAG processing times by form type & filing month
-- ==========================================
CREATE TABLE IF NOT EXISTS dol_processing_times (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    as_of_date DATE NOT NULL,
    form_type TEXT NOT NULL, -- 'PERM', 'Prevailing Wage - PERM', 'Prevailing Wage - H-1B', 'H-1B LCA'
    stage_name TEXT NOT NULL, -- 'Analyst Review', 'Audit Review', 'Reconsideration Request'
    filing_month DATE, -- Priority date being processed (1st of month)
    average_days INTEGER, -- Average processing days if reported
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT uq_dol_processing UNIQUE (form_type, stage_name, as_of_date)
);

CREATE INDEX IF NOT EXISTS idx_dol_proc_form ON dol_processing_times (form_type, as_of_date DESC);

-- ==========================================
-- 5. EMPLOYERS TABLE
-- Normalized and deduplicated employer directory
-- ==========================================
CREATE TABLE IF NOT EXISTS employers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clean_name TEXT NOT NULL UNIQUE,
    legal_name TEXT,
    fein TEXT, -- Federal Employer Identification Number (if disclosed)
    aliases TEXT[] DEFAULT '{}',
    city TEXT,
    state TEXT,
    postal_code TEXT,
    total_lca_count INTEGER DEFAULT 0,
    total_perm_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_employers_clean_name ON employers (clean_name);

-- ==========================================
-- 6. LCA FILINGS TABLE
-- H-1B/LCA case disclosures from DOL OFLC
-- ==========================================
CREATE TABLE IF NOT EXISTS lca_filings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_number TEXT NOT NULL UNIQUE,
    case_status TEXT NOT NULL,
    received_date DATE,
    decision_date DATE,
    visa_class TEXT DEFAULT 'H-1B',
    job_title TEXT,
    soc_code TEXT,
    soc_title TEXT,
    full_time_position BOOLEAN,
    employer_name TEXT NOT NULL,
    employer_id UUID REFERENCES employers(id),
    worksite_city TEXT,
    worksite_state TEXT,
    wage_rate_from NUMERIC(12, 2),
    wage_rate_to NUMERIC(12, 2),
    wage_unit_of_pay TEXT,
    prevailing_wage NUMERIC(12, 2),
    fiscal_year INTEGER NOT NULL,
    quarter INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lca_employer ON lca_filings (employer_name, fiscal_year);
CREATE INDEX IF NOT EXISTS idx_lca_case_num ON lca_filings (case_number);

-- ==========================================
-- 7. PERM FILINGS TABLE
-- PERM (ETA-9089) disclosures from DOL OFLC
-- ==========================================
CREATE TABLE IF NOT EXISTS perm_filings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_number TEXT NOT NULL UNIQUE,
    case_status TEXT NOT NULL,
    received_date DATE,
    decision_date DATE,
    employer_name TEXT NOT NULL,
    employer_id UUID REFERENCES employers(id),
    job_title TEXT,
    minimum_education TEXT,
    country_of_citizenship TEXT,
    class_of_admission TEXT,
    worksite_city TEXT,
    worksite_state TEXT,
    wage_offered_from NUMERIC(12, 2),
    wage_offered_to NUMERIC(12, 2),
    wage_unit_of_pay TEXT,
    fiscal_year INTEGER NOT NULL,
    quarter INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_perm_employer ON perm_filings (employer_name, fiscal_year);
CREATE INDEX IF NOT EXISTS idx_perm_case_num ON perm_filings (case_number);

-- ==========================================
-- 8. I-140 ANNUAL STATS TABLE
-- Classification x country x fiscal_year, from USCIS files
-- ==========================================
CREATE TABLE IF NOT EXISTS i140_annual_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    classification TEXT NOT NULL, -- 'E11', 'E12', 'E13', 'E21' (General), 'E21 NIW' (National Interest Waiver), 'E31', 'E32', 'EW3'
    country TEXT NOT NULL, -- 'China', 'India', 'All Other Countries', etc.
    fiscal_year INTEGER NOT NULL,
    quarter INTEGER DEFAULT 4, -- 1-4, or 4 for annual total
    approved_count INTEGER DEFAULT 0,
    denied_count INTEGER DEFAULT 0,
    pending_count INTEGER DEFAULT 0,
    received_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT uq_i140_annual_stats UNIQUE (classification, country, fiscal_year, quarter)
);

CREATE INDEX IF NOT EXISTS idx_i140_stats_class_fy ON i140_annual_stats (classification, country, fiscal_year);

-- ==========================================
-- 9. I-140 VISA AVAILABILITY SNAPSHOT TABLE
-- Point-in-time snapshot of USCIS inventory & receipt counts
-- ==========================================
CREATE TABLE IF NOT EXISTS i140_visa_availability_snapshot (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    as_of_date DATE NOT NULL,
    classification TEXT NOT NULL, -- e.g., 'E21', 'E21_NIW', 'E31'
    country TEXT NOT NULL,
    priority_date_year INTEGER,
    pending_inventory_count INTEGER DEFAULT 0,
    service_center TEXT DEFAULT 'ALL',
    raw_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT uq_i140_snapshot UNIQUE (as_of_date, classification, country, priority_date_year, service_center)
);

CREATE INDEX IF NOT EXISTS idx_i140_snap_date ON i140_visa_availability_snapshot (as_of_date DESC, classification);

-- Initial seed data for data_sources
INSERT INTO data_sources (name, url, description, update_frequency, status)
VALUES
    ('Visa Bulletin', 'https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html', 'U.S. Department of State monthly priority date cutoffs', 'monthly', 'active'),
    ('DOL Processing Times', 'https://flag.dol.gov/processingtimes', 'Department of Labor FLAG PERM & LCA processing times', 'monthly', 'active'),
    ('DOL Disclosure Data', 'https://www.dol.gov/agencies/eta/foreign-labor/performance', 'OFLC quarterly disclosure files for PERM & LCA', 'quarterly', 'active'),
    ('USCIS I-140 Statistics', 'https://www.uscis.gov/tools/reports-and-studies/immigration-and-citizenship-data', 'USCIS quarterly I-140 petitions by classification and country', 'quarterly', 'active')
ON CONFLICT (name) DO UPDATE SET
    url = EXCLUDED.url,
    description = EXCLUDED.description,
    update_frequency = EXCLUDED.update_frequency;
