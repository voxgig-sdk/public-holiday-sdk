# Typed models for the PublicHoliday SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class AvailableCountry(TypedDict, total=False):
    country_code: str
    name: str


class AvailableCountryListMatch(TypedDict, total=False):
    country_code: str
    name: str


class CountryInfo(TypedDict, total=False):
    border: list
    common_name: str
    country_code: str
    official_name: str
    region: str


class CountryInfoLoadMatch(TypedDict):
    id: str


class LongWeekend(TypedDict, total=False):
    day_count: int
    end_date: str
    need_bridge_day: bool
    start_date: str


class LongWeekendListMatch(TypedDict):
    country_code: str
    year: int


class PublicHoliday(TypedDict, total=False):
    country_code: str
    county: list
    date: str
    fixed: bool
    launch_year: int
    local_name: str
    name: str
    type: list


class PublicHolidayLoadMatch(TypedDict):
    country_code: str


class PublicHolidayListMatch(TypedDict, total=False):
    country_code: str
    year: int
