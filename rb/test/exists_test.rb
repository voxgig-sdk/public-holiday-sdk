# PublicHoliday SDK exists test

require "minitest/autorun"
require_relative "../PublicHoliday_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = PublicHolidaySDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
