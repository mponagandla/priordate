import os
import json
import logging
import datetime
import requests
from typing import Optional, Dict, Any
from scrapers.common.supabase_client import get_supabase_client

# Configure root logger
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] [%(name)s] %(message)s"
)
logger = logging.getLogger("priordate")

def log_ingestion_event(
    source: str,
    status: str,  # 'SUCCESS', 'FAILED', 'WARNING'
    rows_processed: int = 0,
    raw_file_reference: Optional[str] = None,
    error_message: Optional[str] = None
) -> Dict[str, Any]:
    """
    Records structured log output to stdout, sends an alert webhook if FAILED,
    and inserts an ingestion event record into Supabase ingestion_log.
    """
    timestamp = datetime.datetime.utcnow().isoformat() + "Z"

    event_payload = {
        "source": source,
        "run_timestamp": timestamp,
        "rows_processed": rows_processed,
        "status": status,
        "raw_file_reference": raw_file_reference,
        "error_message": error_message
    }

    log_level = logging.INFO if status == "SUCCESS" else logging.ERROR
    logger.log(log_level, f"INGESTION EVENT: {json.dumps(event_payload)}")

    # 1. Post webhook alert on failure
    if status in ("FAILED", "ERROR"):
        send_alert_webhook(source, error_message or "Unknown failure during ingestion", event_payload)

    # 2. Persist to Supabase ingestion_log table if available
    client = get_supabase_client()
    if client is not None:
        try:
            client.table("ingestion_log").insert(event_payload).execute()
        except Exception as e:
            logger.error(f"Failed to record entry in ingestion_log: {e}")

    return event_payload

def send_alert_webhook(source: str, error_msg: str, details: Optional[Dict[str, Any]] = None):
    """
    Sends an alert notification payload to ALERT_WEBHOOK_URL.
    Formated to work with Slack, Discord, or generic Webhook receivers.
    """
    webhook_url = os.getenv("ALERT_WEBHOOK_URL")
    if not webhook_url:
        logger.warning("ALERT_WEBHOOK_URL environment variable is not set. Webhook alert skipped.")
        return

    payload = {
        "text": f"🚨 *PriorDate Ingestion Alert*: Scraper `{source}` failed!",
        "attachments": [
            {
                "color": "#FF0000",
                "fields": [
                    {"title": "Source", "value": source, "short": True},
                    {"title": "Timestamp", "value": details.get("run_timestamp", "N/A") if details else "N/A", "short": True},
                    {"title": "Error Message", "value": error_msg, "short": False},
                    {"title": "Raw File", "value": details.get("raw_file_reference", "None") if details else "None", "short": True}
                ]
            }
        ],
        # Discord compatibility fallback
        "content": f"🚨 **PriorDate Ingestion Alert**: Scraper `{source}` failed!\n**Error**: {error_msg}"
    }

    try:
        response = requests.post(webhook_url, json=payload, timeout=10)
        if response.status_code >= 400:
            logger.error(f"Webhook alert HTTP failure: {response.status_code} - {response.text}")
        else:
            logger.info("Successfully dispatched failure alert to ALERT_WEBHOOK_URL.")
    except Exception as e:
        logger.error(f"Failed to send webhook alert: {e}")
