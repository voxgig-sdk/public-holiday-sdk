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

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const long_weekendEntityLiveStrict = true


func TestLongWeekendEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.LongWeekend(nil)
		if ent == nil {
			t.Fatal("expected non-nil LongWeekendEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.LongWeekend(nil).List(map[string]any{"country_code": 1, "year": 1}, nil)
		if sdkerr, ok := err.(*core.PublicHolidayError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := long_weekendBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "long_weekend." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"country_code01", "year01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, long_weekendEntityLiveStrict, "Live entity test blocked: needs %s via PUBLIC_HOLIDAY_TEST_LONG_WEEKEND_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		longWeekendRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.long_weekend")))
		var longWeekendRef01Data map[string]any
		if len(longWeekendRef01DataRaw) > 0 {
			longWeekendRef01Data = core.ToMapAny(longWeekendRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = longWeekendRef01Data

		// LIST
		longWeekendRef01Ent := client.LongWeekend(nil)
		longWeekendRef01Match := map[string]any{
			"country_code": setup.idmap["country_code01"],
			"year": setup.idmap["year01"],
		}

		longWeekendRef01ListResult, err := longWeekendRef01Ent.List(longWeekendRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, longWeekendRef01ListOk := longWeekendRef01ListResult.([]any)
		if !longWeekendRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", longWeekendRef01ListResult)
		}

	})
}

func long_weekendBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "long_weekend", "LongWeekendTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read long_weekend test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse long_weekend test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"long_weekend01", "long_weekend02", "long_weekend03", "country_code01", "year01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("PUBLIC_HOLIDAY_TEST_LONG_WEEKEND_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"PUBLIC_HOLIDAY_TEST_LONG_WEEKEND_ENTID": idmap,
		"PUBLIC_HOLIDAY_TEST_LIVE":      "FALSE",
		"PUBLIC_HOLIDAY_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["PUBLIC_HOLIDAY_TEST_LONG_WEEKEND_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["PUBLIC_HOLIDAY_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
		})
		client = sdk.NewPublicHolidaySDK(core.ToMapAny(mergedOpts))
	}

	live := env["PUBLIC_HOLIDAY_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["PUBLIC_HOLIDAY_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
