# LongWeekend entity test

import json
import os
import time

import pytest

from publicholiday_sdk.utility.voxgig_struct import voxgig_struct as vs
from publicholiday_sdk import PublicHolidaySDK
from publicholiday_sdk.core import helpers
from publicholiday_sdk.config import shared_config
from publicholiday_sdk.feature.base_feature import PublicHolidayBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestLongWeekendEntity:

    def test_should_create_instance(self):
        testsdk = PublicHolidaySDK.test(None, None)
        ent = testsdk.LongWeekend(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = PublicHolidaySDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.LongWeekend(None).list({"country_code": 1, "year": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _long_weekend_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "long_weekend." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            for _live_key in ["country_code01", "year01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via PUBLIC_HOLIDAY_TEST_LONG_WEEKEND_ENTID")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        long_weekend_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.long_weekend")))
        long_weekend_ref01_data = None
        if len(long_weekend_ref01_data_raw) > 0:
            long_weekend_ref01_data = helpers.to_map(long_weekend_ref01_data_raw[0][1])

        # LIST
        long_weekend_ref01_ent = client.LongWeekend(None)
        long_weekend_ref01_match = {
            "country_code": setup["idmap"]["country_code01"],
            "year": setup["idmap"]["year01"],
        }

        long_weekend_ref01_list_result = long_weekend_ref01_ent.list(long_weekend_ref01_match, None)
        assert isinstance(long_weekend_ref01_list_result, list)



def _long_weekend_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/long_weekend/LongWeekendTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = PublicHolidaySDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["long_weekend01", "long_weekend02", "long_weekend03", "country_code01", "year01"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "PUBLIC_HOLIDAY_TEST_LONG_WEEKEND_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "PUBLIC_HOLIDAY_TEST_LONG_WEEKEND_ENTID": idmap,
        "PUBLIC_HOLIDAY_TEST_LIVE": "FALSE",
        "PUBLIC_HOLIDAY_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("PUBLIC_HOLIDAY_TEST_LONG_WEEKEND_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("PUBLIC_HOLIDAY_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
            },
            extra or {},
        ])
        client = PublicHolidaySDK(helpers.to_map(merged_opts))

    _live = env.get("PUBLIC_HOLIDAY_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("PUBLIC_HOLIDAY_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
