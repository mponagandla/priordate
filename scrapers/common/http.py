import time
import urllib.parse
from typing import Dict, Optional
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

USER_AGENT = "PriorDate/1.0 (Open-Source Data Transparency Project; +https://github.com/priordate/priordate; contact: data@priordate.org)"

class RateLimitedSession(requests.Session):
    """
    A requests Session subclass that enforces rate limiting per domain
    and configures automatic retries with exponential backoff.
    """
    def __init__(self, min_delay_seconds: float = 1.5, max_retries: int = 3):
        super().__init__()
        self.min_delay_seconds = min_delay_seconds
        self._last_request_times: Dict[str, float] = {}
        
        # Configure headers
        self.headers.update({
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,application/json,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
        })

        # Retry strategy
        retry_strategy = Retry(
            total=max_retries,
            backoff_factor=1.5,
            status_forcelist=[429, 500, 502, 503, 504],
            allowed_methods=["GET", "HEAD", "POST"],
            raise_on_status=False
        )
        adapter = HTTPAdapter(max_retries=retry_strategy)
        self.mount("http://", adapter)
        self.mount("https://", adapter)

    def send(self, request, **kwargs):
        domain = urllib.parse.urlparse(request.url).netloc
        now = time.time()
        last_time = self._last_request_times.get(domain)
        
        if last_time is not None:
            elapsed = now - last_time
            if elapsed < self.min_delay_seconds:
                sleep_time = self.min_delay_seconds - elapsed
                time.sleep(sleep_time)
        
        self._last_request_times[domain] = time.time()
        return super().send(request, **kwargs)

_global_session: Optional[RateLimitedSession] = None

def get_session(min_delay_seconds: float = 1.5, max_retries: int = 3) -> RateLimitedSession:
    """
    Returns a singleton RateLimitedSession configured with standard User-Agent,
    rate limiting, and exponential backoff.
    """
    global _global_session
    if _global_session is None:
        _global_session = RateLimitedSession(
            min_delay_seconds=min_delay_seconds,
            max_retries=max_retries
        )
    return _global_session
