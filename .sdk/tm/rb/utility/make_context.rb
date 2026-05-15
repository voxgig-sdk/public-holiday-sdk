# PublicHoliday SDK utility: make_context
require_relative '../core/context'
module PublicHolidayUtilities
  MakeContext = ->(ctxmap, basectx) {
    PublicHolidayContext.new(ctxmap, basectx)
  }
end
