# frozen_string_literal: true

# Typed models for the PublicHoliday SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# AvailableCountry entity data model.
#
# @!attribute [rw] countryCode
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
AvailableCountry = Struct.new(
  :countryCode,
  :name,
  keyword_init: true
)

# Request payload for AvailableCountry#list.
#
# @!attribute [rw] countryCode
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
AvailableCountryListMatch = Struct.new(
  :countryCode,
  :name,
  keyword_init: true
)

# CountryInfo entity data model.
#
# @!attribute [rw] borders
#   @return [Array, nil]
#
# @!attribute [rw] commonName
#   @return [String, nil]
#
# @!attribute [rw] countryCode
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] officialName
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
CountryInfo = Struct.new(
  :borders,
  :commonName,
  :countryCode,
  :id,
  :officialName,
  :region,
  keyword_init: true
)

# Request payload for CountryInfo#load.
#
# @!attribute [rw] id
#   @return [String]
CountryInfoLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# LongWeekend entity data model.
#
# @!attribute [rw] dayCount
#   @return [Integer, nil]
#
# @!attribute [rw] endDate
#   @return [String, nil]
#
# @!attribute [rw] needBridgeDay
#   @return [Boolean, nil]
#
# @!attribute [rw] startDate
#   @return [String, nil]
LongWeekend = Struct.new(
  :dayCount,
  :endDate,
  :needBridgeDay,
  :startDate,
  keyword_init: true
)

# Request payload for LongWeekend#list.
#
# @!attribute [rw] country_code
#   @return [String]
#
# @!attribute [rw] year
#   @return [Integer]
LongWeekendListMatch = Struct.new(
  :country_code,
  :year,
  keyword_init: true
)

# PublicHoliday entity data model.
#
# @!attribute [rw] counties
#   @return [Array, nil]
#
# @!attribute [rw] countryCode
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] fixed
#   @return [Boolean, nil]
#
# @!attribute [rw] global
#   @return [Boolean, nil]
#
# @!attribute [rw] launchYear
#   @return [Integer, nil]
#
# @!attribute [rw] localName
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] types
#   @return [Array, nil]
PublicHoliday = Struct.new(
  :counties,
  :countryCode,
  :date,
  :fixed,
  :global,
  :launchYear,
  :localName,
  :name,
  :types,
  keyword_init: true
)

# Request payload for PublicHoliday#load.
#
# @!attribute [rw] country_code
#   @return [String]
PublicHolidayLoadMatch = Struct.new(
  :country_code,
  keyword_init: true
)

# Request payload for PublicHoliday#list.
#
# @!attribute [rw] country_code
#   @return [String]
#
# @!attribute [rw] year
#   @return [Integer]
PublicHolidayListMatch = Struct.new(
  :country_code,
  :year,
  keyword_init: true
)

