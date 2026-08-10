from typing import List, Dict, Any, Optional

class ValidationError(Exception):
    """Custom exception raised when scraped data fails schema validation checks."""
    pass

def validate_scraped_data(
    data: List[Dict[str, Any]],
    expected_columns: List[str],
    min_rows: int = 1,
    max_rows: Optional[int] = None,
    required_non_null_fields: Optional[List[str]] = None,
    source_name: str = "Scraper"
) -> bool:
    """
    Validates scaped data rows before writing to database.
    
    Args:
        data: List of dictionary records representing scraped rows.
        expected_columns: List of column names that MUST be present in each row.
        min_rows: Minimum acceptable row count (default: 1).
        max_rows: Maximum acceptable row count (optional).
        required_non_null_fields: Fields that must not be None or empty string.
        source_name: Name of the scraper for logging context.
        
    Raises:
        ValidationError: If any assertion fails.
    """
    if not isinstance(data, list):
        raise ValidationError(f"[{source_name}] Scraped data must be a list of dicts, got {type(data)}")

    row_count = len(data)
    if row_count < min_rows:
        raise ValidationError(
            f"[{source_name}] Row count check failed: got {row_count} rows, minimum required is {min_rows}"
        )

    if max_rows is not None and row_count > max_rows:
        raise ValidationError(
            f"[{source_name}] Row count check failed: got {row_count} rows, maximum allowed is {max_rows}"
        )

    required_fields = required_non_null_fields or []
    expected_col_set = set(expected_columns)

    for idx, row in enumerate(data):
        if not isinstance(row, dict):
            raise ValidationError(f"[{source_name}] Row {idx} is not a dictionary: {row}")

        row_keys = set(row.keys())
        missing_cols = expected_col_set - row_keys
        if missing_cols:
            raise ValidationError(
                f"[{source_name}] Row {idx} is missing required columns: {sorted(list(missing_cols))}"
            )

        for req_field in required_fields:
            val = row.get(req_field)
            if val is None or (isinstance(val, str) and val.strip() == ""):
                raise ValidationError(
                    f"[{source_name}] Row {idx} has invalid/null required field '{req_field}': {val}"
                )

    return True
