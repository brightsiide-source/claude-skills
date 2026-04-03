#!/usr/bin/env python3
"""
Tradovate API Client

Handles REST authentication and WebSocket connections for
real-time market data and account monitoring.

Requirements:
    pip install websocket-client

This module is used by live_connector.py — not run directly.
"""

import json
import ssl
import sys
import threading
import time
from datetime import datetime, timezone
from queue import Queue, Empty
from typing import Callable, Dict, List, Optional
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

# Optional: websocket-client library
try:
    import websocket
    HAS_WEBSOCKET = True
except ImportError:
    HAS_WEBSOCKET = False

# ─── Tradovate API Endpoints ────────────────────────────────────────────────

ENVIRONMENTS = {
    "live": {
        "api": "https://live.tradovate.com/v1",
        "md": "wss://md.tradovate.com/v1/websocket",
        "ws": "wss://live.tradovate.com/v1/websocket",
    },
    "demo": {
        "api": "https://demo.tradovate.com/v1",
        "md": "wss://md-demo.tradovate.com/v1/websocket",
        "ws": "wss://demo.tradovate.com/v1/websocket",
    },
}


def check_dependencies():
    """Verify required packages are installed."""
    if not HAS_WEBSOCKET:
        print("=" * 60, file=sys.stderr)
        print("  MISSING DEPENDENCY: websocket-client", file=sys.stderr)
        print("  Install with: pip install websocket-client", file=sys.stderr)
        print("=" * 60, file=sys.stderr)
        sys.exit(1)


# ─── REST API Client ────────────────────────────────────────────────────────

class TradovateREST:
    """Tradovate REST API client for authentication and account queries."""

    def __init__(self, env: str = "demo"):
        self.base_url = ENVIRONMENTS[env]["api"]
        self.access_token: Optional[str] = None
        self.md_access_token: Optional[str] = None
        self.user_id: Optional[int] = None
        self.token_expiry: Optional[str] = None

    def _request(self, method: str, endpoint: str, body: dict = None,
                 auth: bool = True) -> dict:
        """Make an HTTP request to the Tradovate API."""
        url = f"{self.base_url}{endpoint}"
        headers = {"Content-Type": "application/json", "Accept": "application/json"}
        if auth and self.access_token:
            headers["Authorization"] = f"Bearer {self.access_token}"

        data = json.dumps(body).encode("utf-8") if body else None
        req = Request(url, data=data, headers=headers, method=method)

        try:
            with urlopen(req, timeout=10) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except HTTPError as e:
            error_body = e.read().decode("utf-8") if e.fp else str(e)
            raise ConnectionError(f"API error {e.code}: {error_body}")
        except URLError as e:
            raise ConnectionError(f"Connection failed: {e.reason}")

    def authenticate(self, name: str, password: str, app_id: str = None,
                     app_version: str = "1.0", cid: int = None,
                     sec: str = None) -> dict:
        """Authenticate and obtain access tokens."""
        body = {
            "name": name,
            "password": password,
            "appId": app_id or "NQAnalyzer",
            "appVersion": app_version,
        }
        if cid is not None:
            body["cid"] = cid
        if sec:
            body["sec"] = sec

        result = self._request("POST", "/auth/accesstokenrequest",
                               body=body, auth=False)

        self.access_token = result.get("accessToken")
        self.md_access_token = result.get("mdAccessToken")
        self.user_id = result.get("userId")
        self.token_expiry = result.get("expirationTime")

        if not self.access_token:
            raise ConnectionError(f"Auth failed: {result}")

        return result

    def renew_token(self) -> dict:
        """Renew the access token before expiry."""
        result = self._request("POST", "/auth/renewaccesstoken")
        self.access_token = result.get("accessToken")
        self.token_expiry = result.get("expirationTime")
        return result

    def get_accounts(self) -> list:
        """Get all trading accounts."""
        return self._request("GET", "/account/list")

    def get_positions(self, account_id: int = None) -> list:
        """Get current open positions."""
        if account_id:
            return self._request("GET", f"/position/list?accountId={account_id}")
        return self._request("GET", "/position/list")

    def get_fills(self, account_id: int = None) -> list:
        """Get recent order fills."""
        if account_id:
            return self._request("GET", f"/fill/list?accountId={account_id}")
        return self._request("GET", "/fill/list")

    def get_cash_balances(self, account_id: int) -> list:
        """Get cash balance for an account."""
        return self._request("GET",
                             f"/cashBalance/getCashBalanceSnapshot?accountId={account_id}")

    def get_contract(self, symbol: str) -> dict:
        """Find a contract by symbol name."""
        result = self._request("GET", f"/contract/find?name={symbol}")
        return result


# ─── WebSocket Client ────────────────────────────────────────────────────────

class TradovateWebSocket:
    """Tradovate WebSocket client for real-time data streaming.

    Handles the Tradovate frame protocol:
    - 'o'       -> connection opened
    - 'h'       -> heartbeat (respond with [])
    - 'a[...]'  -> data messages
    - 'c[...]'  -> connection closed
    """

    def __init__(self, url: str, token: str, on_message: Callable = None,
                 on_error: Callable = None, label: str = "WS"):
        self.url = url
        self.token = token
        self.on_message_cb = on_message
        self.on_error_cb = on_error
        self.label = label
        self.ws: Optional[websocket.WebSocketApp] = None
        self.thread: Optional[threading.Thread] = None
        self.connected = False
        self.authorized = False
        self._request_id = 0
        self._pending: Dict[int, Queue] = {}
        self._message_queue = Queue()
        self._lock = threading.Lock()

    def _next_id(self) -> int:
        with self._lock:
            self._request_id += 1
            return self._request_id

    def connect(self):
        """Connect to the WebSocket in a background thread."""
        check_dependencies()

        self.ws = websocket.WebSocketApp(
            self.url,
            on_open=self._on_open,
            on_message=self._on_raw_message,
            on_error=self._on_error,
            on_close=self._on_close,
        )
        self.thread = threading.Thread(
            target=self.ws.run_forever,
            kwargs={"sslopt": {"cert_reqs": ssl.CERT_NONE}},
            daemon=True,
        )
        self.thread.start()

        # Wait for connection + auth
        deadline = time.time() + 15
        while not self.authorized and time.time() < deadline:
            time.sleep(0.1)

        if not self.authorized:
            raise ConnectionError(f"[{self.label}] Failed to authorize within 15s")

    def send_request(self, endpoint: str, body: dict = None,
                     timeout: float = 10) -> Optional[dict]:
        """Send a request and wait for response."""
        req_id = self._next_id()
        q = Queue()
        self._pending[req_id] = q

        payload = f"{endpoint}\n{req_id}\n\n{json.dumps(body or {})}"
        self.ws.send(payload)

        try:
            return q.get(timeout=timeout)
        except Empty:
            return None
        finally:
            self._pending.pop(req_id, None)

    def send_fire_and_forget(self, endpoint: str, body: dict = None):
        """Send a request without waiting for response."""
        req_id = self._next_id()
        payload = f"{endpoint}\n{req_id}\n\n{json.dumps(body or {})}"
        self.ws.send(payload)

    def close(self):
        """Close the WebSocket connection."""
        if self.ws:
            self.ws.close()
        self.connected = False
        self.authorized = False

    def _on_open(self, ws):
        """Handle WebSocket open."""
        self.connected = True

    def _on_raw_message(self, ws, raw):
        """Parse Tradovate frame protocol."""
        if not raw:
            return

        frame_type = raw[0]

        if frame_type == "o":
            # Connection opened — send auth
            self._authorize()

        elif frame_type == "h":
            # Heartbeat — respond
            ws.send("[]")

        elif frame_type == "a":
            # Data frame — parse JSON array
            try:
                messages = json.loads(raw[1:])
                for msg_str in messages:
                    self._handle_message(msg_str)
            except (json.JSONDecodeError, TypeError):
                pass

        elif frame_type == "c":
            # Close frame
            self.connected = False
            self.authorized = False

    def _authorize(self):
        """Send authorization request."""
        req_id = self._next_id()
        payload = f"authorize\n{req_id}\n\n{self.token}"
        self.ws.send(payload)

    def _handle_message(self, msg_str: str):
        """Route a decoded message."""
        # Messages can be JSON objects or protocol-formatted strings
        # Try JSON first
        try:
            data = json.loads(msg_str)
        except (json.JSONDecodeError, TypeError):
            data = msg_str

        if isinstance(data, dict):
            # Check if it's an auth response
            if "s" in data and data.get("s") == 200:
                self.authorized = True

            # Check for request ID match
            req_id = data.get("i")
            if req_id and req_id in self._pending:
                self._pending[req_id].put(data)

            # Forward to callback
            if self.on_message_cb:
                self.on_message_cb(data)

        elif isinstance(data, str):
            # Protocol string format: "type\nid\nstatus\nbody"
            parts = data.split("\n", 3)
            if len(parts) >= 1:
                msg_type = parts[0]
                if msg_type == "a" and len(parts) >= 2:
                    self.authorized = True
                    return

                # Parse structured response
                parsed = {"_raw": data, "_type": msg_type}
                if len(parts) >= 2:
                    try:
                        parsed["_id"] = int(parts[1])
                    except ValueError:
                        parsed["_id"] = parts[1]
                if len(parts) >= 3:
                    try:
                        parsed["_status"] = int(parts[2])
                    except ValueError:
                        parsed["_status"] = parts[2]
                if len(parts) >= 4:
                    try:
                        parsed["_body"] = json.loads(parts[3])
                    except (json.JSONDecodeError, TypeError):
                        parsed["_body"] = parts[3]

                # Check for auth success
                if parsed.get("_status") == 200:
                    self.authorized = True

                # Match pending requests
                req_id = parsed.get("_id")
                if req_id and req_id in self._pending:
                    self._pending[req_id].put(parsed.get("_body", parsed))

                if self.on_message_cb:
                    self.on_message_cb(parsed)

    def _on_error(self, ws, error):
        """Handle WebSocket error."""
        if self.on_error_cb:
            self.on_error_cb(error)

    def _on_close(self, ws, code, msg):
        """Handle WebSocket close."""
        self.connected = False
        self.authorized = False


# ─── Market Data Subscriptions ───────────────────────────────────────────────

class MarketDataClient:
    """High-level market data client for chart subscriptions."""

    def __init__(self, ws: TradovateWebSocket):
        self.ws = ws
        self.chart_callbacks: Dict[str, Callable] = {}

    def subscribe_chart(self, symbol: str, timeframe_min: int = 1,
                        bar_count: int = 200,
                        on_bar: Callable = None) -> Optional[dict]:
        """Subscribe to real-time chart bars.

        Args:
            symbol: Contract symbol (e.g., 'NQM6', 'MNQM6')
            timeframe_min: Bar interval in minutes (1 or 5)
            bar_count: Number of historical bars to fetch
            on_bar: Callback for new bar data
        """
        if on_bar:
            self.chart_callbacks[symbol] = on_bar

        body = {
            "symbol": symbol,
            "chartDescription": {
                "underlyingType": "MinuteBar",
                "elementSize": timeframe_min,
                "elementSizeUnit": "UnderlyingUnits",
                "withHistogram": False,
            },
            "timeRange": {
                "asMuchAsElements": bar_count,
            },
        }
        return self.ws.send_request("md/getChart", body, timeout=15)

    def subscribe_quote(self, symbol: str) -> Optional[dict]:
        """Subscribe to real-time quotes (bid/ask/last)."""
        body = {"symbol": symbol}
        return self.ws.send_request("md/subscribeQuote", body, timeout=10)

    def subscribe_dom(self, symbol: str) -> Optional[dict]:
        """Subscribe to depth of market."""
        body = {"symbol": symbol}
        return self.ws.send_request("md/subscribeDom", body, timeout=10)

    def unsubscribe_chart(self, subscription_id: int):
        """Unsubscribe from chart data."""
        self.ws.send_fire_and_forget("md/cancelChart",
                                     {"subscriptionId": subscription_id})

    def unsubscribe_quote(self, symbol: str):
        """Unsubscribe from quotes."""
        self.ws.send_fire_and_forget("md/unsubscribeQuote", {"symbol": symbol})


# ─── Account Monitor ─────────────────────────────────────────────────────────

class AccountMonitor:
    """Polls account data via REST for position and P&L tracking."""

    def __init__(self, rest: TradovateREST, account_id: int,
                 poll_interval: float = 5.0):
        self.rest = rest
        self.account_id = account_id
        self.poll_interval = poll_interval
        self.positions: list = []
        self.cash_balance: Optional[dict] = None
        self.fills: list = []
        self._last_fill_count = 0
        self._running = False
        self._thread: Optional[threading.Thread] = None
        self.on_new_fill: Optional[Callable] = None
        self.on_position_update: Optional[Callable] = None

    def start(self):
        """Start polling in background thread."""
        self._running = True
        self._thread = threading.Thread(target=self._poll_loop, daemon=True)
        self._thread.start()

    def stop(self):
        """Stop polling."""
        self._running = False

    def _poll_loop(self):
        """Background polling loop."""
        while self._running:
            try:
                self._poll_once()
            except Exception:
                pass
            time.sleep(self.poll_interval)

    def _poll_once(self):
        """Single poll cycle."""
        try:
            self.positions = self.rest.get_positions(self.account_id)
            if self.on_position_update:
                self.on_position_update(self.positions)
        except Exception:
            pass

        try:
            self.fills = self.rest.get_fills(self.account_id)
            if len(self.fills) > self._last_fill_count:
                new_fills = self.fills[self._last_fill_count:]
                self._last_fill_count = len(self.fills)
                if self.on_new_fill:
                    for fill in new_fills:
                        self.on_new_fill(fill)
        except Exception:
            pass

        try:
            self.cash_balance = self.rest.get_cash_balances(self.account_id)
        except Exception:
            pass

    def get_realized_pnl(self) -> float:
        """Get today's realized P&L from positions."""
        total = 0.0
        for pos in self.positions:
            total += pos.get("realizedPnl", 0)
        return total

    def get_unrealized_pnl(self) -> float:
        """Get current unrealized P&L."""
        total = 0.0
        for pos in self.positions:
            total += pos.get("unrealizedPnl", 0)
        return total

    def get_open_position(self, symbol: str = None) -> Optional[dict]:
        """Get the current open position for a symbol."""
        for pos in self.positions:
            if pos.get("netPos", 0) != 0:
                if symbol is None or pos.get("contractId") == symbol:
                    return pos
        return None
