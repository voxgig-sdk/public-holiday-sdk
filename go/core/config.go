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
						"name": "country_code",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "available_country",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"method": "GET",
								"orig": "/AvailableCountries",
								"parts": []any{
									"AvailableCountries",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"country_info": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "border",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "common_name",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "country_code",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "official_name",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "region",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 4,
					},
				},
				"name": "country_info",
				"op": map[string]any{
					"load": map[string]any{
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
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"long_weekend": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "day_count",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "end_date",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "need_bridge_day",
						"req": false,
						"type": "`$BOOLEAN`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "start_date",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 3,
					},
				},
				"name": "long_weekend",
				"op": map[string]any{
					"list": map[string]any{
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
											"active": true,
										},
										map[string]any{
											"example": 2026,
											"kind": "param",
											"name": "year",
											"orig": "year",
											"reqd": true,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
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
						"name": "country_code",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "county",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "date",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "fixed",
						"req": false,
						"type": "`$BOOLEAN`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "global",
						"req": false,
						"type": "`$BOOLEAN`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "launch_year",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 5,
					},
					map[string]any{
						"name": "local_name",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 6,
					},
					map[string]any{
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 7,
					},
					map[string]any{
						"name": "type",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 8,
					},
				},
				"name": "public_holiday",
				"op": map[string]any{
					"list": map[string]any{
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
											"active": true,
										},
										map[string]any{
											"example": 2026,
											"kind": "param",
											"name": "year",
											"orig": "year",
											"reqd": true,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
							map[string]any{
								"method": "GET",
								"orig": "/NextPublicHolidaysWorldwide",
								"parts": []any{
									"NextPublicHolidaysWorldwide",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 1,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
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
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 1,
							},
						},
						"input": "data",
						"key$": "load",
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
