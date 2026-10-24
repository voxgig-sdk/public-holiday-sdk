# PublicHoliday SDK utility: prepare_body
require_relative 'media'
module PublicHolidayUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return PublicHolidayUtilities.raw_body(ctx.reqdata) if PublicHolidayUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
