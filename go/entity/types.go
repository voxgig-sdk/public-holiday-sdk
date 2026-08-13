// Typed models for the PublicHoliday SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/public-holiday-sdk/go/core"
)

// AvailableCountry is the typed data model for the available_country entity.
type AvailableCountry struct {
	CountryCode *string `json:"countryCode,omitempty"`
	Name *string `json:"name,omitempty"`
}

// AvailableCountryListMatch is the typed request payload for AvailableCountry.ListTyped.
type AvailableCountryListMatch struct {
	CountryCode *string `json:"countryCode,omitempty"`
	Name *string `json:"name,omitempty"`
}

// CountryInfo is the typed data model for the country_info entity.
type CountryInfo struct {
	Borders *[]any `json:"borders,omitempty"`
	CommonName *string `json:"commonName,omitempty"`
	CountryCode *string `json:"countryCode,omitempty"`
	OfficialName *string `json:"officialName,omitempty"`
	Region *string `json:"region,omitempty"`
}

// CountryInfoLoadMatch is the typed request payload for CountryInfo.LoadTyped.
type CountryInfoLoadMatch struct {
	Id string `json:"id"`
}

// LongWeekend is the typed data model for the long_weekend entity.
type LongWeekend struct {
	DayCount *int `json:"dayCount,omitempty"`
	EndDate *string `json:"endDate,omitempty"`
	NeedBridgeDay *bool `json:"needBridgeDay,omitempty"`
	StartDate *string `json:"startDate,omitempty"`
}

// LongWeekendListMatch is the typed request payload for LongWeekend.ListTyped.
type LongWeekendListMatch struct {
	CountryCode string `json:"country_code"`
	Year int `json:"year"`
}

// PublicHoliday is the typed data model for the public_holiday entity.
type PublicHoliday struct {
	Counties *[]any `json:"counties,omitempty"`
	CountryCode *string `json:"countryCode,omitempty"`
	Date *string `json:"date,omitempty"`
	Fixed *bool `json:"fixed,omitempty"`
	Global *bool `json:"global,omitempty"`
	LaunchYear *int `json:"launchYear,omitempty"`
	LocalName *string `json:"localName,omitempty"`
	Name *string `json:"name,omitempty"`
	Types *[]any `json:"types,omitempty"`
}

// PublicHolidayLoadMatch is the typed request payload for PublicHoliday.LoadTyped.
type PublicHolidayLoadMatch struct {
	CountryCode string `json:"country_code"`
}

// PublicHolidayListMatch is the typed request payload for PublicHoliday.ListTyped.
type PublicHolidayListMatch struct {
	CountryCode *string `json:"country_code,omitempty"`
	Year *int `json:"year,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
