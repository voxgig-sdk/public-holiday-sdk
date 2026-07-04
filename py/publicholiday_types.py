# Typed models for the PublicHoliday SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class AvailableCountry:
    country_code: Optional[str] = None
    name: Optional[str] = None


@dataclass
class AvailableCountryListMatch:
    country_code: Optional[str] = None
    name: Optional[str] = None


@dataclass
class CountryInfo:
    border: Optional[list] = None
    common_name: Optional[str] = None
    country_code: Optional[str] = None
    official_name: Optional[str] = None
    region: Optional[str] = None


@dataclass
class CountryInfoLoadMatch:
    id: str


@dataclass
class LongWeekend:
    day_count: Optional[int] = None
    end_date: Optional[str] = None
    need_bridge_day: Optional[bool] = None
    start_date: Optional[str] = None


@dataclass
class LongWeekendListMatch:
    country_code: str
    year: int


@dataclass
class PublicHoliday:
    country_code: Optional[str] = None
    county: Optional[list] = None
    date: Optional[str] = None
    fixed: Optional[bool] = None
    launch_year: Optional[int] = None
    local_name: Optional[str] = None
    name: Optional[str] = None
    type: Optional[list] = None


@dataclass
class PublicHolidayLoadMatch:
    country_code: str


@dataclass
class PublicHolidayListMatch:
    country_code: str
    year: int

