-- PublicHoliday SDK error

local PublicHolidayError = {}
PublicHolidayError.__index = PublicHolidayError


function PublicHolidayError.new(code, msg, ctx)
  local self = setmetatable({}, PublicHolidayError)
  self.is_sdk_error = true
  self.sdk = "PublicHoliday"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function PublicHolidayError:error()
  return self.msg
end


function PublicHolidayError:__tostring()
  return self.msg
end


return PublicHolidayError
