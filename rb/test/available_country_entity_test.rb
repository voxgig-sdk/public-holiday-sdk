# AvailableCountry entity test

require "minitest/autorun"
require "json"
require_relative "../PublicHoliday_sdk"
require_relative "runner"

class AvailableCountryEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = PublicHolidaySDK.test(nil, nil)
    ent = testsdk.AvailableCountry(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "available_country" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = PublicHolidaySDK.test(seed, nil).AvailableCountry(nil).list(nil, nil)
    # list resolves to one entity per record; data_get reads the record.
    assert_equal 2, items.length
    items.each do |item|
      assert item.respond_to?(:data_get)
      assert item.data_get.is_a?(Hash)
    end
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "available_country" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = PublicHolidaySDK.test(seed, nil)
    seen = base.AvailableCountry(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = PublicHolidayConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = PublicHolidaySDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.AvailableCountry(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  class FailHook < PublicHolidayBaseFeature
    attr_reader :unexpected

    def initialize
      super()
      @name = "failhook"
      @unexpected = 0
    end

    def PreSpec(ctx)
      raise "available_country hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      PublicHolidaySDK.test(offline, nil).AvailableCountry(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    PublicHolidaySDK.test(offline, nil).AvailableCountry(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = PublicHolidayConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = PublicHolidaySDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.AvailableCountry(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    PublicHolidaySDK.test(nil, nil).AvailableCountry(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = PublicHolidaySDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.AvailableCountry(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.AvailableCountry(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate_list_response
    cfg = PublicHolidayConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    opts = { "feature" => { "validate" => { "active" => true, "request" => false, "response" => true } } }
    listed = PublicHolidaySDK.test({ "entity" => { "available_country" => { "v1" => {  } } } }, opts).AvailableCountry(nil).list(nil, nil)
    assert_equal ["v1"], listed.map { |ent| ent.data_get["id"] }
    err = assert_raises(StandardError) do
      PublicHolidaySDK.test({ "entity" => { "available_country" => { "v1" => { "countryCode" => 1 } } } }, opts).AvailableCountry(nil).list(nil, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_validate
    cfg = PublicHolidayConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = PublicHolidaySDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.AvailableCountry(nil).list({ "countryCode" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = available_country_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "available_country." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    available_country_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.available_country")))
    available_country_ref01_data = nil
    if available_country_ref01_data_raw.length > 0
      available_country_ref01_data = Helpers.to_map(available_country_ref01_data_raw[0][1])
    end

    # LIST
    available_country_ref01_ent = client.AvailableCountry(nil)
    available_country_ref01_match = {}

    available_country_ref01_list_result = available_country_ref01_ent.list(available_country_ref01_match, nil)
    assert available_country_ref01_list_result.is_a?(Array)

  end
end

def available_country_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "available_country", "AvailableCountryTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = PublicHolidaySDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["available_country01", "available_country02", "available_country03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["PUBLIC_HOLIDAY_TEST_AVAILABLE_COUNTRY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "PUBLIC_HOLIDAY_TEST_AVAILABLE_COUNTRY_ENTID" => idmap,
    "PUBLIC_HOLIDAY_TEST_LIVE" => "FALSE",
    "PUBLIC_HOLIDAY_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["PUBLIC_HOLIDAY_TEST_AVAILABLE_COUNTRY_ENTID"])
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
