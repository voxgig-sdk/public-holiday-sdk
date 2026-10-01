import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "available_country",
    "accessor": "AvailableCountry",
    "op": "list",
    "method": "GET",
    "path": "/AvailableCountries",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "countryCode": "AT",
        "name": "Austria"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "country_info",
    "accessor": "CountryInfo",
    "op": "load",
    "method": "GET",
    "path": "/CountryInfo/{CountryCode}",
    "args": [
      {
        "name": "id",
        "wire": "CountryCode",
        "value": "AT"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "commonName": "Austria",
      "officialName": "Republic of Austria",
      "countryCode": "AT",
      "region": "Europe",
      "borders": [
        {
          "countryCode": "AT",
          "name": "Austria"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "long_weekend",
    "accessor": "LongWeekend",
    "op": "list",
    "method": "GET",
    "path": "/LongWeekend/{Year}/{CountryCode}",
    "args": [
      {
        "name": "country_code",
        "wire": "CountryCode",
        "value": "AT"
      },
      {
        "name": "year",
        "wire": "Year",
        "value": 2026
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "startDate": "2026-01-01",
        "endDate": "2026-01-01",
        "dayCount": 1,
        "needBridgeDay": true
      }
    ],
    "idField": "id"
  },
  {
    "entity": "public_holiday",
    "accessor": "PublicHoliday",
    "op": "list",
    "method": "GET",
    "path": "/PublicHolidays/{Year}/{CountryCode}",
    "args": [
      {
        "name": "country_code",
        "wire": "CountryCode",
        "value": "AT"
      },
      {
        "name": "year",
        "wire": "Year",
        "value": 2026
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "date": "2017-01-01",
        "localName": "Neujahr",
        "name": "New Year's Day",
        "countryCode": "AT",
        "fixed": true,
        "global": true,
        "counties": null,
        "launchYear": 1967,
        "types": [
          "Public"
        ]
      },
      {
        "date": "2017-01-06",
        "localName": "Heilige Drei Könige",
        "name": "Epiphany",
        "countryCode": "AT",
        "fixed": true,
        "global": true,
        "counties": null,
        "launchYear": null,
        "types": [
          "Public"
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "public_holiday",
    "accessor": "PublicHoliday",
    "op": "list",
    "method": "GET",
    "path": "/NextPublicHolidaysWorldwide",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "date": "2017-01-01",
        "localName": "Neujahr",
        "name": "New Year's Day",
        "countryCode": "AT",
        "fixed": true,
        "global": true,
        "counties": [
          "x"
        ],
        "launchYear": 1967,
        "types": [
          "Public"
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "public_holiday",
    "accessor": "PublicHoliday",
    "op": "load",
    "method": "GET",
    "path": "/IsTodayPublicHoliday/{CountryCode}",
    "args": [
      {
        "name": "country_code",
        "wire": "CountryCode",
        "value": "AT"
      }
    ],
    "select": {
      "offset": "v1"
    },
    "headers": [],
    "query": [
      "offset"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "public_holiday",
    "accessor": "PublicHoliday",
    "op": "load",
    "method": "GET",
    "path": "/NextPublicHolidays/{CountryCode}",
    "args": [
      {
        "name": "country_code",
        "wire": "CountryCode",
        "value": "AT"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "date": "2017-01-01",
        "localName": "Neujahr",
        "name": "New Year's Day",
        "countryCode": "AT",
        "fixed": true,
        "global": true,
        "counties": [
          "x"
        ],
        "launchYear": 1967,
        "types": [
          "Public"
        ]
      }
    ],
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
