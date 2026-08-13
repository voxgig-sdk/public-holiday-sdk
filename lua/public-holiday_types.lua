-- Typed models for the PublicHoliday SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class AvailableCountry
---@field countryCode? string
---@field name? string

---@class AvailableCountryListMatch
---@field countryCode? string
---@field name? string

---@class CountryInfo
---@field borders? table
---@field commonName? string
---@field countryCode? string
---@field officialName? string
---@field region? string

---@class CountryInfoLoadMatch
---@field id string

---@class LongWeekend
---@field dayCount? number
---@field endDate? string
---@field needBridgeDay? boolean
---@field startDate? string

---@class LongWeekendListMatch
---@field country_code string
---@field year number

---@class PublicHoliday
---@field counties? table
---@field countryCode? string
---@field date? string
---@field fixed? boolean
---@field global? boolean
---@field launchYear? number
---@field localName? string
---@field name? string
---@field types? table

---@class PublicHolidayLoadMatch
---@field country_code string

---@class PublicHolidayListMatch
---@field country_code? string
---@field year? number

local M = {}

return M
