-- PublicHoliday SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "PublicHoliday",
      slug = "public-holiday",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://date.nager.at/api/v3",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["available_country"] = {},
        ["country_info"] = {},
        ["long_weekend"] = {},
        ["public_holiday"] = {},
      },
    },
    entity = {
      ["available_country"] = {
        ["fields"] = {
          {
            ["name"] = "countryCode",
            ["title"] = "Country Code",
            ["type"] = "`$STRING`",
            ["short"] = "ISO 3166-1 alpha-2 country code",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "Country name",
          },
        },
        ["name"] = "available_country",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/AvailableCountries",
                ["segments"] = {
                  {
                    ["lit"] = "AvailableCountries",
                  },
                },
                ["parts"] = {
                  "AvailableCountries",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["country_info"] = {
        ["fields"] = {
          {
            ["name"] = "borders",
            ["title"] = "Borders",
            ["type"] = "`$ARRAY`",
            ["short"] = "Bordering countries",
          },
          {
            ["name"] = "commonName",
            ["title"] = "Common Name",
            ["type"] = "`$STRING`",
            ["short"] = "Common name of the country",
          },
          {
            ["name"] = "countryCode",
            ["title"] = "Country Code",
            ["type"] = "`$STRING`",
            ["short"] = "ISO 3166-1 alpha-2 country code",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "officialName",
            ["title"] = "Official Name",
            ["type"] = "`$STRING`",
            ["short"] = "Official name of the country",
          },
          {
            ["name"] = "region",
            ["title"] = "Region",
            ["type"] = "`$STRING`",
            ["short"] = "Region of the country",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "country_info",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/CountryInfo/{CountryCode}",
                ["segments"] = {
                  {
                    ["lit"] = "CountryInfo",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "CountryInfo",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["CountryCode"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "country_code",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "AT",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["long_weekend"] = {
        ["fields"] = {
          {
            ["name"] = "dayCount",
            ["title"] = "Day Count",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of days in the long weekend",
          },
          {
            ["name"] = "endDate",
            ["title"] = "End Date",
            ["type"] = "`$STRING`",
            ["short"] = "End date of the long weekend",
            ["format"] = "date",
          },
          {
            ["name"] = "needBridgeDay",
            ["title"] = "Need Bridge Day",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Whether a bridge day is needed",
          },
          {
            ["name"] = "startDate",
            ["title"] = "Start Date",
            ["type"] = "`$STRING`",
            ["short"] = "Start date of the long weekend",
            ["format"] = "date",
          },
        },
        ["name"] = "long_weekend",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/LongWeekend/{Year}/{CountryCode}",
                ["segments"] = {
                  {
                    ["lit"] = "LongWeekend",
                  },
                  {
                    ["var"] = "year",
                  },
                  {
                    ["var"] = "country_code",
                  },
                },
                ["parts"] = {
                  "LongWeekend",
                  "{year}",
                  "{country_code}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["CountryCode"] = "country_code",
                    ["Year"] = "year",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "country_code",
                      ["orig"] = "country_code",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "AT",
                    },
                    {
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = 2026,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "country_code",
                    "year",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["public_holiday"] = {
        ["fields"] = {
          {
            ["name"] = "counties",
            ["title"] = "Counties",
            ["type"] = "`$ARRAY`",
            ["short"] = "If it is not global you found here the Federal states (ISO-3166-2)",
          },
          {
            ["name"] = "countryCode",
            ["title"] = "Country Code",
            ["type"] = "`$STRING`",
            ["short"] = "ISO 3166-1 alpha-2 country code",
          },
          {
            ["name"] = "date",
            ["title"] = "Date",
            ["type"] = "`$STRING`",
            ["short"] = "The date of the holiday",
            ["format"] = "date",
          },
          {
            ["name"] = "fixed",
            ["title"] = "Fixed",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Is this public holiday every year on the same date",
          },
          {
            ["name"] = "global",
            ["title"] = "Global",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Is this public holiday in every county (federal state)",
          },
          {
            ["name"] = "launchYear",
            ["title"] = "Launch Year",
            ["type"] = "`$INTEGER`",
            ["short"] = "The launch year of the public holiday",
          },
          {
            ["name"] = "localName",
            ["title"] = "Local Name",
            ["type"] = "`$STRING`",
            ["short"] = "Local name of the holiday",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "English name of the holiday",
          },
          {
            ["name"] = "types",
            ["title"] = "Types",
            ["type"] = "`$ARRAY`",
            ["short"] = "The types of the public holiday.",
          },
        },
        ["name"] = "public_holiday",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/PublicHolidays/{Year}/{CountryCode}",
                ["segments"] = {
                  {
                    ["lit"] = "PublicHolidays",
                  },
                  {
                    ["var"] = "year",
                  },
                  {
                    ["var"] = "country_code",
                  },
                },
                ["parts"] = {
                  "PublicHolidays",
                  "{year}",
                  "{country_code}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["CountryCode"] = "country_code",
                    ["Year"] = "year",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "country_code",
                      ["orig"] = "country_code",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "AT",
                    },
                    {
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = 2026,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "country_code",
                    "year",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/NextPublicHolidaysWorldwide",
                ["segments"] = {
                  {
                    ["lit"] = "NextPublicHolidaysWorldwide",
                  },
                },
                ["parts"] = {
                  "NextPublicHolidaysWorldwide",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/IsTodayPublicHoliday/{CountryCode}",
                ["segments"] = {
                  {
                    ["lit"] = "IsTodayPublicHoliday",
                  },
                  {
                    ["var"] = "country_code",
                  },
                },
                ["parts"] = {
                  "IsTodayPublicHoliday",
                  "{country_code}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["CountryCode"] = "country_code",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "country_code",
                      ["orig"] = "country_code",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "AT",
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "country_code",
                    "offset",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/NextPublicHolidays/{CountryCode}",
                ["segments"] = {
                  {
                    ["lit"] = "NextPublicHolidays",
                  },
                  {
                    ["var"] = "country_code",
                  },
                },
                ["parts"] = {
                  "NextPublicHolidays",
                  "{country_code}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["CountryCode"] = "country_code",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "country_code",
                      ["orig"] = "country_code",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "AT",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "country_code",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
