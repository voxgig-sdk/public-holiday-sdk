<?php
declare(strict_types=1);

// Typed models for the PublicHoliday SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** AvailableCountry entity data model. */
class AvailableCountry
{
    public ?string $countryCode = null;
    public ?string $name = null;
}

/** Request payload for AvailableCountry#list. */
class AvailableCountryListMatch
{
    public ?string $countryCode = null;
    public ?string $name = null;
}

/** CountryInfo entity data model. */
class CountryInfo
{
    public ?array $borders = null;
    public ?string $commonName = null;
    public ?string $countryCode = null;
    public ?string $id = null;
    public ?string $officialName = null;
    public ?string $region = null;
}

/** Request payload for CountryInfo#load. */
class CountryInfoLoadMatch
{
    public string $id;
}

/** LongWeekend entity data model. */
class LongWeekend
{
    public ?int $dayCount = null;
    public ?string $endDate = null;
    public ?bool $needBridgeDay = null;
    public ?string $startDate = null;
}

/** Request payload for LongWeekend#list. */
class LongWeekendListMatch
{
    public string $country_code;
    public int $year;
}

/** PublicHoliday entity data model. */
class PublicHoliday
{
    public ?array $counties = null;
    public ?string $countryCode = null;
    public ?string $date = null;
    public ?bool $fixed = null;
    public ?bool $global = null;
    public ?int $launchYear = null;
    public ?string $localName = null;
    public ?string $name = null;
    public ?array $types = null;
}

/** Request payload for PublicHoliday#load. */
class PublicHolidayLoadMatch
{
    public string $country_code;
    public ?int $offset = null;
}

/** Request payload for PublicHoliday#list. */
class PublicHolidayListMatch
{
    public string $country_code;
    public int $year;
}

