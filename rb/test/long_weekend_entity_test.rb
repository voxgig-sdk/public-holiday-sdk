# LongWeekend entity test

require "minitest/autorun"
require "json"
require_relative "../PublicHoliday_sdk"
require_relative "runner"

class LongWeekendEntityTest < Minitest::Test
  def test_create_instance
    testsdk = PublicHolidaySDK.test(nil, nil)
    ent = testsdk.LongWeekend(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = long_weekend_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "long_weekend." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set PUBLICHOLIDAY_TEST_LONG_WEEKEND_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    long_weekend_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.long_weekend")))
    long_weekend_ref01_data = nil
    if long_weekend_ref01_data_raw.length > 0
      long_weekend_ref01_data = Helpers.to_map(long_weekend_ref01_data_raw[0][1])
    end

    # LIST
    long_weekend_ref01_ent = client.LongWeekend(nil)
    long_weekend_ref01_match = {
      "country_code" => setup[:idmap]["country_code01"],
      "year" => setup[:idmap]["year01"],
    }

    long_weekend_ref01_list_result, err = long_weekend_ref01_ent.list(long_weekend_ref01_match, nil)
    assert_nil err
    assert long_weekend_ref01_list_result.is_a?(Array)

  end
end

def long_weekend_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "long_weekend", "LongWeekendTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = PublicHolidaySDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["long_weekend01", "long_weekend02", "long_weekend03", "country_code01", "year01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["PUBLICHOLIDAY_TEST_LONG_WEEKEND_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "PUBLICHOLIDAY_TEST_LONG_WEEKEND_ENTID" => idmap,
    "PUBLICHOLIDAY_TEST_LIVE" => "FALSE",
    "PUBLICHOLIDAY_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["PUBLICHOLIDAY_TEST_LONG_WEEKEND_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["PUBLICHOLIDAY_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = PublicHolidaySDK.new(Helpers.to_map(merged_opts))
  end

  live = env["PUBLICHOLIDAY_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["PUBLICHOLIDAY_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
