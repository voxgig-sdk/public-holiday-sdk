<?php
declare(strict_types=1);

// LongWeekend direct test

require_once __DIR__ . '/../publicholiday_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;

class LongWeekendDirectTest extends TestCase
{
    public function test_direct_list_long_weekend(): void
    {
        $setup = long_weekend_direct_setup([
            ["id" => "direct01"],
            ["id" => "direct02"],
        ]);
        [$_shouldSkip, $_reason] = Runner::is_control_skipped("direct", "direct-list-long_weekend", $setup["live"] ? "live" : "unit");
        if ($_shouldSkip) {
            $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
            return;
        }
        if ($setup["live"]) {
            foreach (["country_code01", "year01"] as $_liveKey) {
                if (!isset($setup["idmap"][$_liveKey]) || $setup["idmap"][$_liveKey] === null) {
                    $this->markTestSkipped("live test needs $_liveKey via *_ENTID env var (synthetic IDs only)");
                    return;
                }
            }
        }
        $client = $setup["client"];

        $params = [];
        if ($setup["live"]) {
            $params["country_code"] = $setup["idmap"]["country_code01"];
        } else {
            $params["country_code"] = "direct01";
        }
        if ($setup["live"]) {
            $params["year"] = $setup["idmap"]["year01"];
        } else {
            $params["year"] = "direct01";
        }

        [$result, $err] = $client->direct([
            "path" => "LongWeekend/{year}/{country_code}",
            "method" => "GET",
            "params" => $params,
        ]);
        if ($setup["live"]) {
            // Live mode is lenient: synthetic IDs frequently 4xx and the
            // list-response shape varies wildly across public APIs. Skip
            // rather than fail when the call doesn't return a usable list.
            if ($err !== null) {
                $this->markTestSkipped("list call failed (likely synthetic IDs against live API): " . (string)$err);
                return;
            }
            if (empty($result["ok"])) {
                $this->markTestSkipped("list call not ok (likely synthetic IDs against live API)");
                return;
            }
            $status = Helpers::to_int($result["status"]);
            if ($status < 200 || $status >= 300) {
                $this->markTestSkipped("expected 2xx status, got " . $status);
                return;
            }
        } else {
            $this->assertNull($err);
            $this->assertTrue($result["ok"]);
            $this->assertEquals(200, Helpers::to_int($result["status"]));
            $this->assertIsArray($result["data"]);
            $this->assertCount(2, $result["data"]);
            $this->assertCount(1, $setup["calls"]);
        }
    }

}


function long_weekend_direct_setup($mockres)
{
    Runner::load_env_local();

    $calls = new \ArrayObject();

    $env = Runner::env_override([
        "PUBLICHOLIDAY_TEST_LONG_WEEKEND_ENTID" => [],
        "PUBLICHOLIDAY_TEST_LIVE" => "FALSE",
    ]);

    $live = $env["PUBLICHOLIDAY_TEST_LIVE"] === "TRUE";

    if ($live) {
        $merged_opts = [
        ];
        $client = new PublicHolidaySDK($merged_opts);
        return [
            "client" => $client,
            "calls" => $calls,
            "live" => true,
            "idmap" => [],
        ];
    }

    $mock_fetch = function ($url, $init) use ($calls, $mockres) {
        $calls[] = ["url" => $url, "init" => $init];
        return [
            [
                "status" => 200,
                "statusText" => "OK",
                "headers" => [],
                "json" => function () use ($mockres) {
                    if ($mockres !== null) {
                        return $mockres;
                    }
                    return ["id" => "direct01"];
                },
                "body" => "mock",
            ],
            null,
        ];
    };

    $client = new PublicHolidaySDK([
        "base" => "http://localhost:8080",
        "system" => [
            "fetch" => $mock_fetch,
        ],
    ]);

    return [
        "client" => $client,
        "calls" => $calls,
        "live" => false,
        "idmap" => [],
    ];
}
