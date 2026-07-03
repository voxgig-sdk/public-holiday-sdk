package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/public-holiday-sdk/go"
	"github.com/voxgig-sdk/public-holiday-sdk/go/core"

	vs "github.com/voxgig-sdk/public-holiday-sdk/go/utility/struct"
)

func TestCountryInfoEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CountryInfo(nil)
		if ent == nil {
			t.Fatal("expected non-nil CountryInfoEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := country_infoBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "country_info." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set PUBLICHOLIDAY_TEST_COUNTRY_INFO_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		countryInfoRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.country_info", setup.data)))
		var countryInfoRef01Data map[string]any
		if len(countryInfoRef01DataRaw) > 0 {
			countryInfoRef01Data = core.ToMapAny(countryInfoRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = countryInfoRef01Data

		// LOAD
		countryInfoRef01Ent := client.CountryInfo(nil)
		countryInfoRef01MatchDt0 := map[string]any{}
		countryInfoRef01DataDt0Loaded, err := countryInfoRef01Ent.Load(countryInfoRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if countryInfoRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func country_infoBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "country_info", "CountryInfoTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read country_info test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse country_info test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"country_info01", "country_info02", "country_info03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("PUBLICHOLIDAY_TEST_COUNTRY_INFO_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"PUBLICHOLIDAY_TEST_COUNTRY_INFO_ENTID": idmap,
		"PUBLICHOLIDAY_TEST_LIVE":      "FALSE",
		"PUBLICHOLIDAY_TEST_EXPLAIN":   "FALSE",
		"PUBLICHOLIDAY_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["PUBLICHOLIDAY_TEST_COUNTRY_INFO_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["PUBLICHOLIDAY_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["PUBLICHOLIDAY_APIKEY"],
			},
			extra,
		})
		client = sdk.NewPublicHolidaySDK(core.ToMapAny(mergedOpts))
	}

	live := env["PUBLICHOLIDAY_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["PUBLICHOLIDAY_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
