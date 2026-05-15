# LongWeekend direct test

require "minitest/autorun"
require "json"
require_relative "../PublicHoliday_sdk"
require_relative "runner"

class LongWeekendDirectTest < Minitest::Test
  def test_direct_list_long_weekend
    setup = long_weekend_direct_setup([
      { "id" => "direct01" },
      { "id" => "direct02" },
    ])
    _should_skip, _reason = Runner.is_control_skipped("direct", "direct-list-long_weekend", setup[:live] ? "live" : "unit")
    if _should_skip
      skip(_reason || "skipped via sdk-test-control.json")
      return
    end
    if setup[:live]
      ["country_code01", "year01"].each do |_live_key|
        if setup[:idmap][_live_key].nil?
          skip "live test needs #{_live_key} via *_ENTID env var (synthetic IDs only)"
          return
        end
      end
    end
    client = setup[:client]

    params = {}
    if setup[:live]
      params["country_code"] = setup[:idmap]["country_code01"]
    else
      params["country_code"] = "direct01"
    end
    if setup[:live]
      params["year"] = setup[:idmap]["year01"]
    else
      params["year"] = "direct01"
    end

    result, err = client.direct({
      "path" => "LongWeekend/{year}/{country_code}",
      "method" => "GET",
      "params" => params,
    })
    if setup[:live]
      # Live mode is lenient: synthetic IDs frequently 4xx and the list-
      # response shape varies wildly across public APIs. Skip rather than
      # fail when the call doesn't return a usable list.
      if !err.nil?
        skip("list call failed (likely synthetic IDs against live API): #{err}")
        return
      end
      unless result["ok"]
        skip("list call not ok (likely synthetic IDs against live API)")
        return
      end
      status = Helpers.to_int(result["status"])
      if status < 200 || status >= 300
        skip("expected 2xx status, got #{status}")
        return
      end
    else
      assert_nil err
      assert result["ok"]
      assert_equal 200, Helpers.to_int(result["status"])
      assert result["data"].is_a?(Array)
      assert_equal 2, result["data"].length
      assert_equal 1, setup[:calls].length
    end
  end

end


def long_weekend_direct_setup(mockres)
  Runner.load_env_local

  calls = []

  env = Runner.env_override({
    "PUBLICHOLIDAY_TEST_LONG_WEEKEND_ENTID" => {},
    "PUBLICHOLIDAY_TEST_LIVE" => "FALSE",
    "PUBLICHOLIDAY_APIKEY" => "NONE",
  })

  live = env["PUBLICHOLIDAY_TEST_LIVE"] == "TRUE"

  if live
    merged_opts = {
      "apikey" => env["PUBLICHOLIDAY_APIKEY"],
    }
    client = PublicHolidaySDK.new(merged_opts)
    return {
      client: client,
      calls: calls,
      live: true,
      idmap: {},
    }
  end

  mock_fetch = ->(url, init) {
    calls.push({ "url" => url, "init" => init })
    return {
      "status" => 200,
      "statusText" => "OK",
      "headers" => {},
      "json" => ->() {
        if !mockres.nil?
          return mockres
        end
        return { "id" => "direct01" }
      },
      "body" => "mock",
    }, nil
  }

  client = PublicHolidaySDK.new({
    "base" => "http://localhost:8080",
    "system" => {
      "fetch" => mock_fetch,
    },
  })

  {
    client: client,
    calls: calls,
    live: false,
    idmap: {},
  }
end
