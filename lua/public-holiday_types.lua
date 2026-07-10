-- Typed models for the PublicHoliday SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class AvailableCountry
---@field country_code? string
---@field name? string

---@class AvailableCountryListMatch
---@field country_code? string
---@field name? string

---@class CountryInfo
---@field border? table
---@field common_name? string
---@field country_code? string
---@field official_name? string
---@field region? string

---@class CountryInfoLoadMatch
---@field id string

---@class LongWeekend
---@field day_count? number
---@field end_date? string
---@field need_bridge_day? boolean
---@field start_date? string

---@class LongWeekendListMatch
---@field country_code string
---@field year number

---@class PublicHoliday
---@field country_code? string
---@field county? table
---@field date? string
---@field fixed? boolean
---@field global? boolean
---@field launch_year? number
---@field local_name? string
---@field name? string
---@field type? table

---@class PublicHolidayLoadMatch
---@field country_code string

---@class PublicHolidayListMatch
---@field country_code? string
---@field year? number

local M = {}

return M
