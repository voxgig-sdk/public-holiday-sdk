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
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
AvailableCountry = Struct.new(
  :country_code,
  :name,
  keyword_init: true
)

# Match filter for AvailableCountry#list (any subset of AvailableCountry fields).
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
AvailableCountryListMatch = Struct.new(
  :country_code,
  :name,
  keyword_init: true
)

# CountryInfo entity data model.
#
# @!attribute [rw] border
#   @return [Array, nil]
#
# @!attribute [rw] common_name
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] official_name
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
CountryInfo = Struct.new(
  :border,
  :common_name,
  :country_code,
  :official_name,
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
# @!attribute [rw] day_count
#   @return [Integer, nil]
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] need_bridge_day
#   @return [Boolean, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
LongWeekend = Struct.new(
  :day_count,
  :end_date,
  :need_bridge_day,
  :start_date,
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
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] county
#   @return [Array, nil]
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
# @!attribute [rw] launch_year
#   @return [Integer, nil]
#
# @!attribute [rw] local_name
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [Array, nil]
PublicHoliday = Struct.new(
  :country_code,
  :county,
  :date,
  :fixed,
  :global,
  :launch_year,
  :local_name,
  :name,
  :type,
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

