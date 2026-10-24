package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "PublicHoliday",
			"slug": "public-holiday",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://date.nager.at/api/v3",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"available_country": map[string]any{},
				"country_info": map[string]any{},
				"long_weekend": map[string]any{},
				"public_holiday": map[string]any{},
			},
		},
		"entity": map[string]any{
			"available_country": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "countryCode",
						"title": "Country Code",
						"type": "`$STRING`",
						"short": "ISO 3166-1 alpha-2 country code",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Country name",
					},
				},
				"name": "available_country",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/AvailableCountries",
								"segments": []any{
									map[string]any{
										"lit": "AvailableCountries",
									},
								},
								"parts": []any{
									"AvailableCountries",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"country_info": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "borders",
						"title": "Borders",
						"type": "`$ARRAY`",
						"short": "Bordering countries",
					},
					map[string]any{
						"name": "commonName",
						"title": "Common Name",
						"type": "`$STRING`",
						"short": "Common name of the country",
					},
					map[string]any{
						"name": "countryCode",
						"title": "Country Code",
						"type": "`$STRING`",
						"short": "ISO 3166-1 alpha-2 country code",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "officialName",
						"title": "Official Name",
						"type": "`$STRING`",
						"short": "Official name of the country",
					},
					map[string]any{
						"name": "region",
						"title": "Region",
						"type": "`$STRING`",
						"short": "Region of the country",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "country_info",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/CountryInfo/{CountryCode}",
								"segments": []any{
									map[string]any{
										"lit": "CountryInfo",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"CountryInfo",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"CountryCode": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "CountryCode",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "AT",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"long_weekend": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "dayCount",
						"title": "Day Count",
						"type": "`$INTEGER`",
						"short": "Number of days in the long weekend",
					},
					map[string]any{
						"name": "endDate",
						"title": "End Date",
						"type": "`$STRING`",
						"short": "End date of the long weekend",
						"format": "date",
					},
					map[string]any{
						"name": "needBridgeDay",
						"title": "Need Bridge Day",
						"type": "`$BOOLEAN`",
						"short": "Whether a bridge day is needed",
					},
					map[string]any{
						"name": "startDate",
						"title": "Start Date",
						"type": "`$STRING`",
						"short": "Start date of the long weekend",
						"format": "date",
					},
				},
				"name": "long_weekend",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/LongWeekend/{Year}/{CountryCode}",
								"segments": []any{
									map[string]any{
										"lit": "LongWeekend",
									},
									map[string]any{
										"var": "year",
									},
									map[string]any{
										"var": "country_code",
									},
								},
								"parts": []any{
									"LongWeekend",
									"{year}",
									"{country_code}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"CountryCode": "country_code",
										"Year": "year",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "country_code",
											"orig": "CountryCode",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "AT",
										},
										map[string]any{
											"name": "year",
											"orig": "Year",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 2026,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"country_code",
										"year",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"public_holiday": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "counties",
						"title": "Counties",
						"type": "`$ARRAY`",
						"short": "If it is not global you found here the Federal states (ISO-3166-2)",
					},
					map[string]any{
						"name": "countryCode",
						"title": "Country Code",
						"type": "`$STRING`",
						"short": "ISO 3166-1 alpha-2 country code",
					},
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": "`$STRING`",
						"short": "The date of the holiday",
						"format": "date",
					},
					map[string]any{
						"name": "fixed",
						"title": "Fixed",
						"type": "`$BOOLEAN`",
						"short": "Is this public holiday every year on the same date",
					},
					map[string]any{
						"name": "global",
						"title": "Global",
						"type": "`$BOOLEAN`",
						"short": "Is this public holiday in every county (federal state)",
					},
					map[string]any{
						"name": "launchYear",
						"title": "Launch Year",
						"type": "`$INTEGER`",
						"short": "The launch year of the public holiday",
					},
					map[string]any{
						"name": "localName",
						"title": "Local Name",
						"type": "`$STRING`",
						"short": "Local name of the holiday",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "English name of the holiday",
					},
					map[string]any{
						"name": "types",
						"title": "Types",
						"type": "`$ARRAY`",
						"short": "The types of the public holiday.",
					},
				},
				"name": "public_holiday",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/PublicHolidays/{Year}/{CountryCode}",
								"segments": []any{
									map[string]any{
										"lit": "PublicHolidays",
									},
									map[string]any{
										"var": "year",
									},
									map[string]any{
										"var": "country_code",
									},
								},
								"parts": []any{
									"PublicHolidays",
									"{year}",
									"{country_code}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"CountryCode": "country_code",
										"Year": "year",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "country_code",
											"orig": "CountryCode",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "AT",
										},
										map[string]any{
											"name": "year",
											"orig": "Year",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 2026,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"country_code",
										"year",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/NextPublicHolidaysWorldwide",
								"segments": []any{
									map[string]any{
										"lit": "NextPublicHolidaysWorldwide",
									},
								},
								"parts": []any{
									"NextPublicHolidaysWorldwide",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/IsTodayPublicHoliday/{CountryCode}",
								"segments": []any{
									map[string]any{
										"lit": "IsTodayPublicHoliday",
									},
									map[string]any{
										"var": "country_code",
									},
								},
								"parts": []any{
									"IsTodayPublicHoliday",
									"{country_code}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"CountryCode": "country_code",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "country_code",
											"orig": "CountryCode",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "AT",
										},
									},
									"query": []any{
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"country_code",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/NextPublicHolidays/{CountryCode}",
								"segments": []any{
									map[string]any{
										"lit": "NextPublicHolidays",
									},
									map[string]any{
										"var": "country_code",
									},
								},
								"parts": []any{
									"NextPublicHolidays",
									"{country_code}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"CountryCode": "country_code",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "country_code",
											"orig": "CountryCode",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "AT",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"country_code",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
