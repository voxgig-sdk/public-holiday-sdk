# PublicHoliday SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module PublicHolidayFeatures
  def self.make_feature(name)
    case name
    when "base"
      PublicHolidayBaseFeature.new
    when "test"
      PublicHolidayTestFeature.new
    else
      PublicHolidayBaseFeature.new
    end
  end
end
