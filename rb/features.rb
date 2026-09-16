# PublicHoliday SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module PublicHolidayFeatures
  def self.make_feature(name)
    case name
    when "base"
      PublicHolidayBaseFeature.new
    when "ratelimit"
      PublicHolidayRatelimitFeature.new
    when "retry"
      PublicHolidayRetryFeature.new
    when "test"
      PublicHolidayTestFeature.new
    when "timeout"
      PublicHolidayTimeoutFeature.new
    else
      PublicHolidayBaseFeature.new
    end
  end
end
