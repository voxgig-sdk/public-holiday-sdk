# PublicHoliday entity test

require "minitest/autorun"
require "json"
require_relative "../PublicHoliday_sdk"
require_relative "runner"

class PublicHolidayEntityTest < Minitest::Test
  def test_create_instance
    testsdk = PublicHolidaySDK.test(nil, nil)
    ent = testsdk.PublicHoliday(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = public_holiday_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "public_holiday." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set PUBLICHOLIDAY_TEST_PUBLIC_HOLIDAY_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    public_holiday_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.public_holiday")))
    public_holiday_ref01_data = nil
    if public_holiday_ref01_data_raw.length > 0
      public_holiday_ref01_data = Helpers.to_map(public_holiday_ref01_data_raw[0][1])
    end

    # LIST
    public_holiday_ref01_ent = client.PublicHoliday(nil)
    public_holiday_ref01_match = {}

    public_holiday_ref01_list_result = public_holiday_ref01_ent.list(public_holiday_ref01_match, nil)
    assert public_holiday_ref01_list_result.is_a?(Array)

    # LOAD
    public_holiday_ref01_match_dt0 = {}
    public_holiday_ref01_data_dt0_loaded = public_holiday_ref01_ent.load(public_holiday_ref01_match_dt0, nil)
    assert !public_holiday_ref01_data_dt0_loaded.nil?

  end
end

def public_holiday_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "public_holiday", "PublicHolidayTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = PublicHolidaySDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["public_holiday01", "public_holiday02", "public_holiday03", "is_today_public_holiday01", "is_today_public_holiday02", "is_today_public_holiday03", "next_public_holiday01", "next_public_holiday02", "next_public_holiday03"],
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
  entid_env_raw = ENV["PUBLICHOLIDAY_TEST_PUBLIC_HOLIDAY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "PUBLICHOLIDAY_TEST_PUBLIC_HOLIDAY_ENTID" => idmap,
    "PUBLICHOLIDAY_TEST_LIVE" => "FALSE",
    "PUBLICHOLIDAY_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["PUBLICHOLIDAY_TEST_PUBLIC_HOLIDAY_ENTID"])
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
