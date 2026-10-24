# LongWeekend entity test

require "minitest/autorun"
require "json"
require_relative "../PublicHoliday_sdk"
require_relative "runner"

class LongWeekendEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = PublicHolidaySDK.test(nil, nil)
    ent = testsdk.LongWeekend(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = PublicHolidayConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = PublicHolidaySDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.LongWeekend(nil).list({ "country_code" => 1, "year" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
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
    if setup[:live]
      ["country_code01", "year01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via PUBLIC_HOLIDAY_TEST_LONG_WEEKEND_ENTID")
        end
      end
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

    long_weekend_ref01_list_result = long_weekend_ref01_ent.list(long_weekend_ref01_match, nil)
    assert long_weekend_ref01_list_result.is_a?(Array)

  end
end

def long_weekend_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "long_weekend", "LongWeekendTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
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

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["PUBLIC_HOLIDAY_TEST_LONG_WEEKEND_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "PUBLIC_HOLIDAY_TEST_LONG_WEEKEND_ENTID" => idmap,
    "PUBLIC_HOLIDAY_TEST_LIVE" => "FALSE",
    "PUBLIC_HOLIDAY_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["PUBLIC_HOLIDAY_TEST_LONG_WEEKEND_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["PUBLIC_HOLIDAY_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = PublicHolidaySDK.new(Helpers.to_map(merged_opts))
  end

  live = env["PUBLIC_HOLIDAY_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["PUBLIC_HOLIDAY_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
