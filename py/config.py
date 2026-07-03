# PublicHoliday SDK configuration


def make_config():
    return {
        "main": {
            "name": "PublicHoliday",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://date.nager.at/api/v3",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "available_country": {},
                "country_info": {},
                "long_weekend": {},
                "public_holiday": {},
            },
        },
        "entity": {
      "available_country": {
        "fields": [
          {
            "active": True,
            "name": "country_code",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
        ],
        "name": "available_country",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/AvailableCountries",
                "parts": [
                  "AvailableCountries",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "country_info": {
        "fields": [
          {
            "active": True,
            "name": "border",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "common_name",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "country_code",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "official_name",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "region",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
        ],
        "name": "country_info",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "AT",
                      "kind": "param",
                      "name": "id",
                      "orig": "country_code",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/CountryInfo/{CountryCode}",
                "parts": [
                  "CountryInfo",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "CountryCode": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "long_weekend": {
        "fields": [
          {
            "active": True,
            "name": "day_count",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "end_date",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "need_bridge_day",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "start_date",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
        ],
        "name": "long_weekend",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "AT",
                      "kind": "param",
                      "name": "country_code",
                      "orig": "country_code",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": 2026,
                      "kind": "param",
                      "name": "year",
                      "orig": "year",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/LongWeekend/{Year}/{CountryCode}",
                "parts": [
                  "LongWeekend",
                  "{year}",
                  "{country_code}",
                ],
                "rename": {
                  "param": {
                    "CountryCode": "country_code",
                    "Year": "year",
                  },
                },
                "select": {
                  "exist": [
                    "country_code",
                    "year",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [
            [
              "long_weekend",
            ],
          ],
        },
      },
      "public_holiday": {
        "fields": [
          {
            "active": True,
            "name": "country_code",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "county",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "date",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "fixed",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "global",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "launch_year",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "local_name",
            "req": False,
            "type": "`$STRING`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "type",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 8,
          },
        ],
        "name": "public_holiday",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "AT",
                      "kind": "param",
                      "name": "country_code",
                      "orig": "country_code",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": 2026,
                      "kind": "param",
                      "name": "year",
                      "orig": "year",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/PublicHolidays/{Year}/{CountryCode}",
                "parts": [
                  "PublicHolidays",
                  "{year}",
                  "{country_code}",
                ],
                "rename": {
                  "param": {
                    "CountryCode": "country_code",
                    "Year": "year",
                  },
                },
                "select": {
                  "exist": [
                    "country_code",
                    "year",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/NextPublicHolidaysWorldwide",
                "parts": [
                  "NextPublicHolidaysWorldwide",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "AT",
                      "kind": "param",
                      "name": "country_code",
                      "orig": "country_code",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/IsTodayPublicHoliday/{CountryCode}",
                "parts": [
                  "IsTodayPublicHoliday",
                  "{country_code}",
                ],
                "rename": {
                  "param": {
                    "CountryCode": "country_code",
                  },
                },
                "select": {
                  "exist": [
                    "country_code",
                    "offset",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "AT",
                      "kind": "param",
                      "name": "country_code",
                      "orig": "country_code",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/NextPublicHolidays/{CountryCode}",
                "parts": [
                  "NextPublicHolidays",
                  "{country_code}",
                ],
                "rename": {
                  "param": {
                    "CountryCode": "country_code",
                  },
                },
                "select": {
                  "exist": [
                    "country_code",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "is_today_public_holiday",
            ],
            [
              "next_public_holiday",
            ],
            [
              "public_holiday",
            ],
          ],
        },
      },
    },
    }
