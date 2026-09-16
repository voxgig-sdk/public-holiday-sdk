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
						"short": "ISO 3166-1 alpha-2 country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Country name",
						"type": "`$STRING`",
					},
				},
				"name": "available_country",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/AvailableCountries",
								"segments": []any{
									map[string]any{
										"lit": "AvailableCountries",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"AvailableCountries",
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
						"short": "Bordering countries",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "commonName",
						"short": "Common name of the country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "countryCode",
						"short": "ISO 3166-1 alpha-2 country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "officialName",
						"short": "Official name of the country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"short": "Region of the country",
						"type": "`$STRING`",
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
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "AT",
											"kind": "param",
											"name": "id",
											"orig": "country_code",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/CountryInfo/{CountryCode}",
								"rename": map[string]any{
									"param": map[string]any{
										"CountryCode": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "CountryInfo",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"CountryInfo",
									"{id}",
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
						"short": "Number of days in the long weekend",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "date",
						"name": "endDate",
						"short": "End date of the long weekend",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "needBridgeDay",
						"short": "Whether a bridge day is needed",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"format": "date",
						"name": "startDate",
						"short": "Start date of the long weekend",
						"type": "`$STRING`",
					},
				},
				"name": "long_weekend",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "AT",
											"kind": "param",
											"name": "country_code",
											"orig": "country_code",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 2026,
											"kind": "param",
											"name": "year",
											"orig": "year",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/LongWeekend/{Year}/{CountryCode}",
								"rename": map[string]any{
									"param": map[string]any{
										"CountryCode": "country_code",
										"Year": "year",
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"country_code",
										"year",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"LongWeekend",
									"{year}",
									"{country_code}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"long_weekend",
						},
					},
				},
			},
			"public_holiday": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "counties",
						"short": "If it is not global you found here the Federal states (ISO-3166-2)",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "countryCode",
						"short": "ISO 3166-1 alpha-2 country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date",
						"name": "date",
						"short": "The date of the holiday",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fixed",
						"short": "Is this public holiday every year on the same date",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "global",
						"short": "Is this public holiday in every county (federal state)",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "launchYear",
						"short": "The launch year of the public holiday",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "localName",
						"short": "Local name of the holiday",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "English name of the holiday",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "types",
						"short": "The types of the public holiday.",
						"type": "`$ARRAY`",
					},
				},
				"name": "public_holiday",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "AT",
											"kind": "param",
											"name": "country_code",
											"orig": "country_code",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 2026,
											"kind": "param",
											"name": "year",
											"orig": "year",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/PublicHolidays/{Year}/{CountryCode}",
								"rename": map[string]any{
									"param": map[string]any{
										"CountryCode": "country_code",
										"Year": "year",
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"country_code",
										"year",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"PublicHolidays",
									"{year}",
									"{country_code}",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/NextPublicHolidaysWorldwide",
								"segments": []any{
									map[string]any{
										"lit": "NextPublicHolidaysWorldwide",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"NextPublicHolidaysWorldwide",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "AT",
											"kind": "param",
											"name": "country_code",
											"orig": "country_code",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/IsTodayPublicHoliday/{CountryCode}",
								"rename": map[string]any{
									"param": map[string]any{
										"CountryCode": "country_code",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "IsTodayPublicHoliday",
									},
									map[string]any{
										"var": "country_code",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"country_code",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"IsTodayPublicHoliday",
									"{country_code}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "AT",
											"kind": "param",
											"name": "country_code",
											"orig": "country_code",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/NextPublicHolidays/{CountryCode}",
								"rename": map[string]any{
									"param": map[string]any{
										"CountryCode": "country_code",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "NextPublicHolidays",
									},
									map[string]any{
										"var": "country_code",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"country_code",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"NextPublicHolidays",
									"{country_code}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"is_today_public_holiday",
						},
						[]any{
							"next_public_holiday",
						},
						[]any{
							"public_holiday",
						},
					},
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
