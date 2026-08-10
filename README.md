# PriorDate

> **Track your green card cohort** — see how filers with your priority date, category, and service center are actually moving through the U.S. employment-based green card pipeline.

PriorDate is an open-source data transparency tool that collects, normalizes, and aggregates official data from the U.S. Department of Labor (DOL), U.S. Citizenship and Immigration Services (USCIS), and the U.S. Department of State (DOS).

---

## Data Sources

PriorDate automatically ingests open dataset disclosures from official U.S. government portals:

| Data Source | Provider | Frequency | Coverage | Link |
| :--- | :--- | :--- | :--- | :--- |
| **Visa Bulletin** | U.S. Department of State | Monthly | Priority date cutoffs for Final Action and Dates for Filing (EB-1 through EB-5 x all countries) | [DOS Visa Bulletin](https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html) |
| **DOL Processing Times** | U.S. Department of Labor (FLAG) | Monthly | Processing times and current priority dates for PERM, Prevailing Wage, and H-1B LCA | [DOL FLAG Processing Times](https://flag.dol.gov/processingtimes) |
| **OFLC Disclosure Data** | U.S. Department of Labor (OFLC) | Quarterly | Full Case disclosures for PERM ETA-9089 and H-1B LCA ETA-9035 filings | [DOL OFLC Performance Data](https://www.dol.gov/agencies/eta/foreign-labor/performance) |
| **USCIS I-140 Petitions** | U.S. Citizenship & Immigration Services | Quarterly | I-140 approvals, denials, pending inventory, and receipts by classification (including distinct NIW category) and country of birth | [USCIS Immigration Data](https://www.uscis.gov/tools/reports-and-studies/immigration-and-citizenship-data) |

---

## Repository Structure

```
priordate/
├── .github/
│   └── workflows/
│       ├── scrape-visa-bulletin.yml   # Weekly check during 2nd-4th weeks
│       ├── scrape-dol-processing.yml  # Monthly on 1st of month
│       ├── fetch-dol-disclosure.yml   # Quarterly
│       └── fetch-uscis-data.yml       # Quarterly
├── scrapers/
│   ├── __init__.py
│   ├── visa_bulletin.py               # DOS Visa Bulletin scraper
│   ├── dol_processing_times.py        # DOL FLAG processing times scraper
│   ├── dol_disclosure.py              # DOL OFLC PERM & LCA disclosure fetcher
│   ├── uscis_i140.py                  # USCIS I-140 statistics fetcher
│   └── common/
│       ├── __init__.py
│       ├── http.py                    # Shared rate-limited requests session with retries & exponential backoff
│       ├── validate.py                # Schema validation helpers (min/max rows, non-null checks)
│       ├── supabase_client.py         # Idempotent Supabase upsert helper
│       └── logging_config.py          # Structured logger & webhook alert dispatch
├── raw/                               # Gitignored local raw snapshot audit cache
├── schema/
│   └── supabase_schema.sql            # PostgreSQL / Supabase table structure & indexes
├── .env.example                       # Environment variable template
├── .gitignore                         # Excludes credentials, raw snapshots, caches
├── requirements.txt                   # Python dependencies
├── README.md                          # Project documentation
└── LICENSE                            # MIT License
```

---

## Local Development & Setup

### Prerequisites
- Python 3.10+
- A Supabase project (or PostgreSQL instance)

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/priordate/priordate.git
   cd priordate
   ```

2. **Create a virtual environment & install dependencies**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. **Configure environment variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and fill in your Supabase connection parameters:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_KEY=your-supabase-service-role-key
   ALERT_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
   ```

4. **Initialize Database Schema**:
   Run the SQL scripts in `schema/supabase_schema.sql` inside your Supabase SQL Editor to initialize all required tables, constraints, and seed data.

5. **Run Scrapers Locally**:
   ```bash
   python scrapers/visa_bulletin.py
   python scrapers/dol_processing_times.py
   python scrapers/dol_disclosure.py
   python scrapers/uscis_i140.py
   ```

---

## Automated Pipeline & GitHub Actions

Scrapers run automatically via GitHub Actions on schedules aligned with source update cadences:
- **Visa Bulletin**: Runs weekly on weekdays during the 2nd-4th week of each month (`scrape-visa-bulletin.yml`).
- **DOL Processing Times**: Runs on the 1st of every month (`scrape-dol-processing.yml`).
- **DOL Disclosure & USCIS Data**: Run quarterly (`fetch-dol-disclosure.yml`, `fetch-uscis-data.yml`).

All workflows support manual invocation (`workflow_dispatch`) for testing. Raw download snapshots are uploaded as 90-day retention GitHub Action artifacts for auditing.

### Setting Up Secrets in GitHub

To enable the automated scrapers in your GitHub fork or repository:

1. Navigate to your repository on GitHub.
2. Go to **Settings** > **Secrets and variables** > **Actions**.
3. Click **New repository secret** and add the following:
   - `SUPABASE_URL`: Your Supabase API endpoint (e.g. `https://xyz.supabase.co`).
   - `SUPABASE_SERVICE_KEY`: Your Supabase Service Role secret key (used for database upserts).
   - `ALERT_WEBHOOK_URL`: Slack or Discord Webhook URL for scraper error notifications.

---

## Contributing

We welcome community contributions!
- **Bug Reports & Feature Requests**: Please open an Issue detailing the bug or proposed feature.
- **Pull Requests**:
  1. Fork the repo and create a feature branch (`git checkout -b feature/my-feature`).
  2. Write clean, modular Python code following existing standards in `scrapers/common/`.
  3. Ensure schema validations in `common/validate.py` are updated if introducing new columns.
  4. Submit a Pull Request with a descriptive title and summary.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
