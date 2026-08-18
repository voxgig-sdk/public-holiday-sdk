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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
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
								"parts": []any{
									"AvailableCountries",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "commonName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "countryCode",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "officialName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"type": "`$STRING`",
					},
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
								"parts": []any{
									"CountryInfo",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"CountryCode": "id",
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
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "endDate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "needBridgeDay",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "startDate",
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
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "countryCode",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fixed",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "global",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "launchYear",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "localName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "types",
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
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/NextPublicHolidaysWorldwide",
								"parts": []any{
									"NextPublicHolidaysWorldwide",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"parts": []any{
									"IsTodayPublicHoliday",
									"{country_code}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"CountryCode": "country_code",
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
								"parts": []any{
									"NextPublicHolidays",
									"{country_code}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"CountryCode": "country_code",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
