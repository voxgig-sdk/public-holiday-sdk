// Typed models for the PublicHoliday SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// AvailableCountry is the typed data model for the available_country entity.
type AvailableCountry struct {
	CountryCode *string `json:"country_code,omitempty"`
	Name *string `json:"name,omitempty"`
}

// AvailableCountryListMatch is the typed request payload for AvailableCountry.ListTyped.
type AvailableCountryListMatch struct {
	CountryCode *string `json:"country_code,omitempty"`
	Name *string `json:"name,omitempty"`
}

// CountryInfo is the typed data model for the country_info entity.
type CountryInfo struct {
	Border *[]any `json:"border,omitempty"`
	CommonName *string `json:"common_name,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	OfficialName *string `json:"official_name,omitempty"`
	Region *string `json:"region,omitempty"`
}

// CountryInfoLoadMatch is the typed request payload for CountryInfo.LoadTyped.
type CountryInfoLoadMatch struct {
	Id string `json:"id"`
}

// LongWeekend is the typed data model for the long_weekend entity.
type LongWeekend struct {
	DayCount *int `json:"day_count,omitempty"`
	EndDate *string `json:"end_date,omitempty"`
	NeedBridgeDay *bool `json:"need_bridge_day,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
}

// LongWeekendListMatch is the typed request payload for LongWeekend.ListTyped.
type LongWeekendListMatch struct {
	CountryCode string `json:"country_code"`
	Year int `json:"year"`
}

// PublicHoliday is the typed data model for the public_holiday entity.
type PublicHoliday struct {
	CountryCode *string `json:"country_code,omitempty"`
	County *[]any `json:"county,omitempty"`
	Date *string `json:"date,omitempty"`
	Fixed *bool `json:"fixed,omitempty"`
	Global *bool `json:"global,omitempty"`
	LaunchYear *int `json:"launch_year,omitempty"`
	LocalName *string `json:"local_name,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *[]any `json:"type,omitempty"`
}

// PublicHolidayLoadMatch is the typed request payload for PublicHoliday.LoadTyped.
type PublicHolidayLoadMatch struct {
	CountryCode string `json:"country_code"`
}

// PublicHolidayListMatch is the typed request payload for PublicHoliday.ListTyped.
type PublicHolidayListMatch struct {
	CountryCode string `json:"country_code"`
	Year int `json:"year"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
