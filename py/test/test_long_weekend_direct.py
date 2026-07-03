# LongWeekend direct test

import json
import pytest

from utility.voxgig_struct import voxgig_struct as vs
from publicholiday_sdk import PublicHolidaySDK
from core import helpers
from test import runner


class TestLongWeekendDirect:

    def test_should_direct_list_long_weekend(self):
        setup = _long_weekend_direct_setup([
            {"id": "direct01"},
            {"id": "direct02"},
        ])
        _skip, _reason = runner.is_control_skipped("direct", "direct-list-long_weekend", "live" if setup["live"] else "unit")
        if _skip:
            # pytest already imported at module scope
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        if setup["live"]:
            for _live_key in ["country_code01", "year01"]:
                if setup["idmap"].get(_live_key) is None:
                    # pytest already imported at module scope
                    pytest.skip(f"live test needs {_live_key} via *_ENTID env var (synthetic IDs only)")
                    return

        client = setup["client"]

        params = {}
        if setup["live"]:
            params["country_code"] = setup["idmap"]["country_code01"]
        else:
            params["country_code"] = "direct01"
        if setup["live"]:
            params["year"] = setup["idmap"]["year01"]
        else:
            params["year"] = "direct01"

        result, err = client.direct({
            "path": "LongWeekend/{year}/{country_code}",
            "method": "GET",
            "params": params,
        })
        if setup["live"]:
            # Live mode is lenient: synthetic IDs frequently 4xx and the
            # list-response shape varies wildly across public APIs. Skip
            # rather than fail when the call doesn't return a usable list.
            if err is not None:
                pytest.skip(f"list call failed (likely synthetic IDs against live API): {err}")
                return
            if not result.get("ok"):
                pytest.skip("list call not ok (likely synthetic IDs against live API)")
                return
            status = helpers.to_int(result["status"])
            if status < 200 or status >= 300:
                pytest.skip(f"expected 2xx status, got {status}")
                return
        else:
            assert err is None
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert isinstance(result["data"], list)
            assert len(result["data"]) == 2
            assert len(setup["calls"]) == 1



def _long_weekend_direct_setup(mockres):
    runner.load_env_local()

    calls = []

    env = runner.env_override({
        "PUBLICHOLIDAY_TEST_LONG_WEEKEND_ENTID": {},
        "PUBLICHOLIDAY_TEST_LIVE": "FALSE",
        "PUBLICHOLIDAY_APIKEY": "NONE",
    })

    live = env.get("PUBLICHOLIDAY_TEST_LIVE") == "TRUE"

    if live:
        merged_opts = {
            "apikey": env.get("PUBLICHOLIDAY_APIKEY"),
        }
        client = PublicHolidaySDK(merged_opts)
        return {
            "client": client,
            "calls": calls,
            "live": True,
            "idmap": {},
        }

    def mock_fetch(url, init):
        calls.append({"url": url, "init": init})
        return {
            "status": 200,
            "statusText": "OK",
            "headers": {},
            "json": lambda: mockres if mockres is not None else {"id": "direct01"},
            "body": "mock",
        }, None

    client = PublicHolidaySDK({
        "base": "http://localhost:8080",
        "system": {
            "fetch": mock_fetch,
        },
    })

    return {
        "client": client,
        "calls": calls,
        "live": False,
        "idmap": {},
    }
