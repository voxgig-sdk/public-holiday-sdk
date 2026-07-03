<?php
declare(strict_types=1);

// PublicHoliday entity test

require_once __DIR__ . '/../publicholiday_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PublicHolidayEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = PublicHolidaySDK::test(null, null);
        $ent = $testsdk->PublicHoliday(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = public_holiday_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "public_holiday." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set PUBLICHOLIDAY_TEST_PUBLIC_HOLIDAY_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $public_holiday_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.public_holiday")));
        $public_holiday_ref01_data = null;
        if (count($public_holiday_ref01_data_raw) > 0) {
            $public_holiday_ref01_data = Helpers::to_map($public_holiday_ref01_data_raw[0][1]);
        }

        // LIST
        $public_holiday_ref01_ent = $client->PublicHoliday(null);
        $public_holiday_ref01_match = [];

        [$public_holiday_ref01_list_result, $err] = $public_holiday_ref01_ent->list($public_holiday_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($public_holiday_ref01_list_result);

        // LOAD
        $public_holiday_ref01_match_dt0 = [];
        [$public_holiday_ref01_data_dt0_loaded, $err] = $public_holiday_ref01_ent->load($public_holiday_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($public_holiday_ref01_data_dt0_loaded);

    }
}

function public_holiday_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/public_holiday/PublicHolidayTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = PublicHolidaySDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["public_holiday01", "public_holiday02", "public_holiday03", "is_today_public_holiday01", "is_today_public_holiday02", "is_today_public_holiday03", "next_public_holiday01", "next_public_holiday02", "next_public_holiday03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("PUBLICHOLIDAY_TEST_PUBLIC_HOLIDAY_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "PUBLICHOLIDAY_TEST_PUBLIC_HOLIDAY_ENTID" => $idmap,
        "PUBLICHOLIDAY_TEST_LIVE" => "FALSE",
        "PUBLICHOLIDAY_TEST_EXPLAIN" => "FALSE",
        "PUBLICHOLIDAY_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["PUBLICHOLIDAY_TEST_PUBLIC_HOLIDAY_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["PUBLICHOLIDAY_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["PUBLICHOLIDAY_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new PublicHolidaySDK(Helpers::to_map($merged_opts));
    }

    $live = $env["PUBLICHOLIDAY_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["PUBLICHOLIDAY_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
