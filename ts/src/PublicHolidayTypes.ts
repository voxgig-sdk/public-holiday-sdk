// Typed models for the PublicHoliday SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface AvailableCountry {
  countryCode?: string
  name?: string
}

export interface AvailableCountryListMatch {
  countryCode?: string
  name?: string
}

export interface CountryInfo {
  borders?: any[]
  commonName?: string
  countryCode?: string
  id?: string
  officialName?: string
  region?: string
}

export interface CountryInfoLoadMatch {
  id: string
}

export interface LongWeekend {
  dayCount?: number
  endDate?: string
  needBridgeDay?: boolean
  startDate?: string
}

export interface LongWeekendListMatch {
  country_code: string
  year: number
}

export interface PublicHoliday {
  counties?: any[]
  countryCode?: string
  date?: string
  fixed?: boolean
  global?: boolean
  launchYear?: number
  localName?: string
  name?: string
  types?: any[]
}

export interface PublicHolidayLoadMatch {
  country_code: string
  offset?: number
}

export interface PublicHolidayListMatch {
  country_code: string
  year: number
}

