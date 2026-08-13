package core

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
						"active": true,
						"name": "countryCode",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
				},
				"name": "available_country",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
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
								"index$": 0,
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
						"active": true,
						"name": "borders",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "commonName",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "countryCode",
						"req": false,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "officialName",
						"req": false,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "region",
						"req": false,
						"type": "`$STRING`",
						"index$": 4,
					},
				},
				"name": "country_info",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "AT",
											"kind": "param",
											"name": "id",
											"orig": "country_code",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
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
								"index$": 0,
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
						"active": true,
						"name": "dayCount",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "endDate",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "needBridgeDay",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "startDate",
						"req": false,
						"type": "`$STRING`",
						"index$": 3,
					},
				},
				"name": "long_weekend",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "AT",
											"kind": "param",
											"name": "country_code",
											"orig": "country_code",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"example": 2026,
											"kind": "param",
											"name": "year",
											"orig": "year",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 1,
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
								"index$": 0,
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
						"active": true,
						"name": "counties",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "countryCode",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "date",
						"req": false,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "fixed",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "global",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "launchYear",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "localName",
						"req": false,
						"type": "`$STRING`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "types",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 8,
					},
				},
				"name": "public_holiday",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "AT",
											"kind": "param",
											"name": "country_code",
											"orig": "country_code",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"example": 2026,
											"kind": "param",
											"name": "year",
											"orig": "year",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 1,
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
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
								"index$": 1,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "AT",
											"kind": "param",
											"name": "country_code",
											"orig": "country_code",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"reqd": false,
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "AT",
											"kind": "param",
											"name": "country_code",
											"orig": "country_code",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
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
								"index$": 1,
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
