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
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
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
            ["short"] = "ISO 3166-1 alpha-2 country code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["short"] = "Country name",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "available_country",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/AvailableCountries",
                ["segments"] = {
                  {
                    ["lit"] = "AvailableCountries",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "AvailableCountries",
                },
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
            ["short"] = "Bordering countries",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "commonName",
            ["short"] = "Common name of the country",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "countryCode",
            ["short"] = "ISO 3166-1 alpha-2 country code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "officialName",
            ["short"] = "Official name of the country",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "region",
            ["short"] = "Region of the country",
            ["type"] = "`$STRING`",
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
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "AT",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "country_code",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/CountryInfo/{CountryCode}",
                ["rename"] = {
                  ["param"] = {
                    ["CountryCode"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "CountryInfo",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "CountryInfo",
                  "{id}",
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
            ["short"] = "Number of days in the long weekend",
            ["type"] = "`$INTEGER`",
          },
          {
            ["format"] = "date",
            ["name"] = "endDate",
            ["short"] = "End date of the long weekend",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "needBridgeDay",
            ["short"] = "Whether a bridge day is needed",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["format"] = "date",
            ["name"] = "startDate",
            ["short"] = "Start date of the long weekend",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "long_weekend",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "AT",
                      ["kind"] = "param",
                      ["name"] = "country_code",
                      ["orig"] = "country_code",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 2026,
                      ["kind"] = "param",
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/LongWeekend/{Year}/{CountryCode}",
                ["rename"] = {
                  ["param"] = {
                    ["CountryCode"] = "country_code",
                    ["Year"] = "year",
                  },
                },
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
                ["select"] = {
                  ["exist"] = {
                    "country_code",
                    "year",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "LongWeekend",
                  "{year}",
                  "{country_code}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "long_weekend",
            },
          },
        },
      },
      ["public_holiday"] = {
        ["fields"] = {
          {
            ["name"] = "counties",
            ["short"] = "If it is not global you found here the Federal states (ISO-3166-2)",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "countryCode",
            ["short"] = "ISO 3166-1 alpha-2 country code",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date",
            ["name"] = "date",
            ["short"] = "The date of the holiday",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "fixed",
            ["short"] = "Is this public holiday every year on the same date",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "global",
            ["short"] = "Is this public holiday in every county (federal state)",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "launchYear",
            ["short"] = "The launch year of the public holiday",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "localName",
            ["short"] = "Local name of the holiday",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["short"] = "English name of the holiday",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "types",
            ["short"] = "The types of the public holiday.",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "public_holiday",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "AT",
                      ["kind"] = "param",
                      ["name"] = "country_code",
                      ["orig"] = "country_code",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 2026,
                      ["kind"] = "param",
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/PublicHolidays/{Year}/{CountryCode}",
                ["rename"] = {
                  ["param"] = {
                    ["CountryCode"] = "country_code",
                    ["Year"] = "year",
                  },
                },
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
                ["select"] = {
                  ["exist"] = {
                    "country_code",
                    "year",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "PublicHolidays",
                  "{year}",
                  "{country_code}",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/NextPublicHolidaysWorldwide",
                ["segments"] = {
                  {
                    ["lit"] = "NextPublicHolidaysWorldwide",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "NextPublicHolidaysWorldwide",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "AT",
                      ["kind"] = "param",
                      ["name"] = "country_code",
                      ["orig"] = "country_code",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/IsTodayPublicHoliday/{CountryCode}",
                ["rename"] = {
                  ["param"] = {
                    ["CountryCode"] = "country_code",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "IsTodayPublicHoliday",
                  },
                  {
                    ["var"] = "country_code",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "country_code",
                    "offset",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "IsTodayPublicHoliday",
                  "{country_code}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "AT",
                      ["kind"] = "param",
                      ["name"] = "country_code",
                      ["orig"] = "country_code",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/NextPublicHolidays/{CountryCode}",
                ["rename"] = {
                  ["param"] = {
                    ["CountryCode"] = "country_code",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "NextPublicHolidays",
                  },
                  {
                    ["var"] = "country_code",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "country_code",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "NextPublicHolidays",
                  "{country_code}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "is_today_public_holiday",
            },
            {
              "next_public_holiday",
            },
            {
              "public_holiday",
            },
          },
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
