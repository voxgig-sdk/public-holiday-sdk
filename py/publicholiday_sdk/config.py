# PublicHoliday SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
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
            "name": "countryCode",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
        ],
        "name": "available_country",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "country_info": {
        "fields": [
          {
            "name": "borders",
            "type": "`$ARRAY`",
          },
          {
            "name": "commonName",
            "type": "`$STRING`",
          },
          {
            "name": "countryCode",
            "type": "`$STRING`",
          },
          {
            "name": "officialName",
            "type": "`$STRING`",
          },
          {
            "name": "region",
            "type": "`$STRING`",
          },
        ],
        "name": "country_info",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "AT",
                      "kind": "param",
                      "name": "id",
                      "orig": "country_code",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "long_weekend": {
        "fields": [
          {
            "name": "dayCount",
            "type": "`$INTEGER`",
          },
          {
            "name": "endDate",
            "type": "`$STRING`",
          },
          {
            "name": "needBridgeDay",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "startDate",
            "type": "`$STRING`",
          },
        ],
        "name": "long_weekend",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "AT",
                      "kind": "param",
                      "name": "country_code",
                      "orig": "country_code",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": 2026,
                      "kind": "param",
                      "name": "year",
                      "orig": "year",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
            "name": "counties",
            "type": "`$ARRAY`",
          },
          {
            "name": "countryCode",
            "type": "`$STRING`",
          },
          {
            "name": "date",
            "type": "`$STRING`",
          },
          {
            "name": "fixed",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "global",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "launchYear",
            "type": "`$INTEGER`",
          },
          {
            "name": "localName",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "types",
            "type": "`$ARRAY`",
          },
        ],
        "name": "public_holiday",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "AT",
                      "kind": "param",
                      "name": "country_code",
                      "orig": "country_code",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": 2026,
                      "kind": "param",
                      "name": "year",
                      "orig": "year",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
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
              },
              {
                "args": {},
                "kind": "http",
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
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
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
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
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
              },
              {
                "args": {
                  "params": [
                    {
                      "example": "AT",
                      "kind": "param",
                      "name": "country_code",
                      "orig": "country_code",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
