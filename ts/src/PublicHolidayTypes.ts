// Typed models for the PublicHoliday SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface AvailableCountry {
  country_code?: string
  name?: string
}

export interface AvailableCountryListMatch {
  country_code?: string
  name?: string
}

export interface CountryInfo {
  border?: any[]
  common_name?: string
  country_code?: string
  official_name?: string
  region?: string
}

export interface CountryInfoLoadMatch {
  id: string
}

export interface LongWeekend {
  day_count?: number
  end_date?: string
  need_bridge_day?: boolean
  start_date?: string
}

export interface LongWeekendListMatch {
  country_code: string
  year: number
}

export interface PublicHoliday {
  country_code?: string
  county?: any[]
  date?: string
  fixed?: boolean
  global?: boolean
  launch_year?: number
  local_name?: string
  name?: string
  type?: any[]
}

export interface PublicHolidayLoadMatch {
  country_code: string
}

export interface PublicHolidayListMatch {
  country_code: string
  year: number
}

