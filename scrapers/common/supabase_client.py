import os
import logging
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

logger = logging.getLogger("priordate.supabase")

_supabase_client = None

def get_supabase_client():
    """
    Returns an initialized Supabase Client using SUPABASE_URL and SUPABASE_SERVICE_KEY.
    Returns None if environment variables are not configured (useful for local dry-runs).
    """
    global _supabase_client
    if _supabase_client is not None:
        return _supabase_client

    supabase_url = os.getenv("SUPABASE_URL")
    # Accept SUPABASE_SECRET_KEY (new Supabase naming sbs_...) or SUPABASE_SERVICE_KEY (classic service_role key)
    supabase_key = os.getenv("SUPABASE_SECRET_KEY") or os.getenv("SUPABASE_SERVICE_KEY")

    if not supabase_url or not supabase_key:
        logger.warning("SUPABASE_URL or SUPABASE_SERVICE_KEY/SUPABASE_SECRET_KEY is not set. Database mutations will be skipped (dry run).")
        return None

    try:
        from supabase import create_client, Client
        _supabase_client = create_client(supabase_url, supabase_key)
        return _supabase_client
    except Exception as e:
        logger.error(f"Failed to initialize Supabase client: {e}")
        return None

def upsert_records(
    table_name: str,
    records: List[Dict[str, Any]],
    on_conflict: str,
    batch_size: int = 1000
) -> int:
    """
    Idempotently upsert records into a Supabase table.
    
    Args:
        table_name: Name of the database table.
        records: List of dictionary objects to insert/update.
        on_conflict: Column name(s) defining the unique constraint (e.g. "category,country,chart_type,bulletin_month").
        batch_size: Maximum records per upsert API call.
        
    Returns:
        Number of records processed.
    """
    if not records:
        logger.info(f"No records provided for upsert into {table_name}.")
        return 0

    client = get_supabase_client()
    if client is None:
        logger.info(f"[DRY-RUN] Would upsert {len(records)} records into table '{table_name}' with on_conflict='{on_conflict}'.")
        return len(records)

    total_upserted = 0
    for i in range(0, len(records), batch_size):
        chunk = records[i:i + batch_size]
        try:
            res = client.table(table_name).upsert(chunk, on_conflict=on_conflict).execute()
            total_upserted += len(chunk)
            logger.info(f"Successfully upserted batch of {len(chunk)} records into {table_name}.")
        except Exception as e:
            logger.error(f"Error upserting batch into {table_name}: {e}")
            raise

    return total_upserted
