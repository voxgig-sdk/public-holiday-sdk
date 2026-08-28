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
    countryCode: str
    name: str


class AvailableCountryListMatch(TypedDict, total=False):
    countryCode: str
    name: str


class CountryInfo(TypedDict, total=False):
    borders: list
    commonName: str
    countryCode: str
    id: str
    officialName: str
    region: str


class CountryInfoLoadMatch(TypedDict):
    id: str


class LongWeekend(TypedDict, total=False):
    dayCount: int
    endDate: str
    needBridgeDay: bool
    startDate: str


class LongWeekendListMatch(TypedDict):
    country_code: str
    year: int


class PublicHoliday(TypedDict, total=False):
    counties: list
    countryCode: str
    date: str
    fixed: bool
    launchYear: int
    localName: str
    name: str
    types: list


class PublicHolidayLoadMatchRequired(TypedDict):
    country_code: str


class PublicHolidayLoadMatch(PublicHolidayLoadMatchRequired, total=False):
    offset: int


class PublicHolidayListMatch(TypedDict):
    country_code: str
    year: int
