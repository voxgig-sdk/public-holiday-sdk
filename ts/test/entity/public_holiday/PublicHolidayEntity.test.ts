

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { PublicHolidaySDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('PublicHolidayEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PUBLIC_HOLIDAY_TEST_LIVE=TRUE.
  afterEach(liveDelay('PUBLIC_HOLIDAY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PublicHolidaySDK.test()
    const ent = testsdk.PublicHoliday()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PUBLIC_HOLIDAY_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'public_holiday.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"counties":{"a":true,"h":"Counties","n":"counties","r":false,"sh":"If it is not global you found here the Federal states (ISO-3166-2)","t":"`$ARRAY`","key$":"counties","index$":0},"countryCode":{"a":true,"h":"Country Code","n":"countryCode","r":false,"sh":"ISO 3166-1 alpha-2 country code","t":"`$STRING`","key$":"countryCode","index$":1},"date":{"a":true,"fo":"date","h":"Date","n":"date","r":false,"sh":"The date of the holiday","t":"`$STRING`","key$":"date","index$":2},"fixed":{"a":true,"h":"Fixed","n":"fixed","r":false,"sh":"Is this public holiday every year on the same date","t":"`$BOOLEAN`","key$":"fixed","index$":3},"global":{"a":true,"h":"Global","n":"global","r":false,"sh":"Is this public holiday in every county (federal state)","t":"`$BOOLEAN`","key$":"global","index$":4},"launchYear":{"a":true,"h":"Launch Year","n":"launchYear","r":false,"sh":"The launch year of the public holiday","t":"`$INTEGER`","key$":"launchYear","index$":5},"localName":{"a":true,"h":"Local Name","n":"localName","r":false,"sh":"Local name of the holiday","t":"`$STRING`","key$":"localName","index$":6},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"English name of the holiday","t":"`$STRING`","key$":"name","index$":7},"types":{"a":true,"h":"Types","n":"types","r":false,"sh":"The types of the public holiday.","t":"`$ARRAY`","key$":"types","index$":8}},"name":"public_holiday","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /PublicHolidays/{Year}/{CountryCode}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"AT","k":"param","n":"country_code","or":"country_code","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":2026,"k":"param","n":"year","or":"year","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/PublicHolidays/{Year}/{CountryCode}","q":{"exist":["country_code","year"]},"r":{"param":{"CountryCode":"country_code","Year":"year"}},"s":[{"lit":"PublicHolidays"},{"var":"year"},{"var":"country_code"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /NextPublicHolidaysWorldwide","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/NextPublicHolidaysWorldwide","q":{},"r":{},"s":[{"lit":"NextPublicHolidaysWorldwide"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /IsTodayPublicHoliday/{CountryCode}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"AT","k":"param","n":"country_code","or":"country_code","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/IsTodayPublicHoliday/{CountryCode}","q":{"exist":["country_code","offset"]},"r":{"param":{"CountryCode":"country_code"}},"s":[{"lit":"IsTodayPublicHoliday"},{"var":"country_code"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /NextPublicHolidays/{CountryCode}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"AT","k":"param","n":"country_code","or":"country_code","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/NextPublicHolidays/{CountryCode}","q":{"exist":["country_code"]},"r":{"param":{"CountryCode":"country_code"}},"s":[{"lit":"NextPublicHolidays"},{"var":"country_code"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"public_holiday","name__orig":"public_holiday","Name":"PublicHoliday","name_":"public_holiday","name-":"public-holiday","NAME":"PUBLIC_HOLIDAY","index$":3}, {"active":true,"entity":"public_holiday","key$":"BasicPublicHolidayFlow","kind":"basic","name":"BasicPublicHolidayFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"public_holiday_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"public_holiday_ref01","srcdatavar":"public_holiday_ref01_data","suffix":"_dt0"},"m":{"id":"public_holiday01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-public_holiday_ref01"}}],"index$":1}]}, 'PublicHoliday', {"GET /PublicHolidays/{Year}/{CountryCode}":{"protocol":"http","operationId":"getPublicHolidays","responses":{"200":{"description":"Successful response with list of public holidays","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"date":{"type":"string","format":"date","description":"The date of the holiday","example":"2017-01-01","key$":"date"},"localName":{"type":"string","description":"Local name of the holiday","example":"Neujahr","key$":"localName"},"name":{"type":"string","description":"English name of the holiday","example":"New Year's Day","key$":"name"},"countryCode":{"type":"string","description":"ISO 3166-1 alpha-2 country code","example":"AT","key$":"countryCode"},"fixed":{"type":"boolean","description":"Is this public holiday every year on the same date","example":true,"key$":"fixed"},"global":{"type":"boolean","description":"Is this public holiday in every county (federal state)","example":true,"key$":"global"},"counties":{"type":"array","items":{"type":"string"},"nullable":true,"description":"If it is not global you found here the Federal states (ISO-3166-2)","key$":"counties"},"launchYear":{"type":"integer","nullable":true,"description":"The launch year of the public holiday","example":1967,"key$":"launchYear"},"types":{"type":"array","items":{"type":"string","enum":["Public","Bank","School","Authorities","Optional","Observance"]},"description":"The types of the public holiday. Public (Bank holiday, banks and offices are closed), Bank (Bank holiday, banks and offices are closed), School (School holiday, schools are closed), Authorities (Authorities are closed), Optional (Majority of people take a day off), Observance (Optional festivity, no paid day off)","key$":"types"}},"x-ref":"#/components/schemas/PublicHoliday","index$":0}},"example":[{"date":"2017-01-01","localName":"Neujahr","name":"New Year's Day","countryCode":"AT","fixed":true,"global":true,"counties":null,"launchYear":1967,"types":["Public"]},{"date":"2017-01-06","localName":"Heilige Drei Könige","name":"Epiphany","countryCode":"AT","fixed":true,"global":true,"counties":null,"launchYear":null,"types":["Public"]}]}}},"400":{"description":"Invalid year or country code format"},"404":{"description":"Country not found or no holidays available for the specified year"}},"parameters":[{"name":"Year","in":"path","description":"The year to retrieve holidays for","required":true,"schema":{"type":"integer","example":2026},"index$":0},{"name":"CountryCode","in":"path","description":"ISO 3166-1 alpha-2 country code","required":true,"schema":{"type":"string","minLength":2,"maxLength":2,"example":"AT"},"index$":1}],"securitySource":"unspecified"},"GET /NextPublicHolidaysWorldwide":{"protocol":"http","operationId":"getNextPublicHolidaysWorldwide","responses":{"200":{"description":"Successful response with next public holidays worldwide","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"date":{"type":"string","format":"date","description":"The date of the holiday","example":"2017-01-01","key$":"date"},"localName":{"type":"string","description":"Local name of the holiday","example":"Neujahr","key$":"localName"},"name":{"type":"string","description":"English name of the holiday","example":"New Year's Day","key$":"name"},"countryCode":{"type":"string","description":"ISO 3166-1 alpha-2 country code","example":"AT","key$":"countryCode"},"fixed":{"type":"boolean","description":"Is this public holiday every year on the same date","example":true,"key$":"fixed"},"global":{"type":"boolean","description":"Is this public holiday in every county (federal state)","example":true,"key$":"global"},"counties":{"type":"array","items":{"type":"string"},"nullable":true,"description":"If it is not global you found here the Federal states (ISO-3166-2)","key$":"counties"},"launchYear":{"type":"integer","nullable":true,"description":"The launch year of the public holiday","example":1967,"key$":"launchYear"},"types":{"type":"array","items":{"type":"string","enum":["Public","Bank","School","Authorities","Optional","Observance"]},"description":"The types of the public holiday. Public (Bank holiday, banks and offices are closed), Bank (Bank holiday, banks and offices are closed), School (School holiday, schools are closed), Authorities (Authorities are closed), Optional (Majority of people take a day off), Observance (Optional festivity, no paid day off)","key$":"types"}},"x-ref":"#/components/schemas/PublicHoliday","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /IsTodayPublicHoliday/{CountryCode}":{"protocol":"http","operationId":"isTodayPublicHoliday","responses":{"200":{"description":"Today is a public holiday"},"204":{"description":"Today is not a public holiday"},"404":{"description":"Country not found"}},"parameters":[{"name":"CountryCode","in":"path","description":"ISO 3166-1 alpha-2 country code","required":true,"schema":{"type":"string","minLength":2,"maxLength":2,"example":"AT"},"index$":0},{"name":"offset","in":"query","description":"Timezone offset in hours","required":false,"schema":{"type":"integer"},"index$":1}],"securitySource":"unspecified"},"GET /NextPublicHolidays/{CountryCode}":{"protocol":"http","operationId":"getNextPublicHolidays","responses":{"200":{"description":"Successful response with next public holidays","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"date":{"type":"string","format":"date","description":"The date of the holiday","example":"2017-01-01","key$":"date"},"localName":{"type":"string","description":"Local name of the holiday","example":"Neujahr","key$":"localName"},"name":{"type":"string","description":"English name of the holiday","example":"New Year's Day","key$":"name"},"countryCode":{"type":"string","description":"ISO 3166-1 alpha-2 country code","example":"AT","key$":"countryCode"},"fixed":{"type":"boolean","description":"Is this public holiday every year on the same date","example":true,"key$":"fixed"},"global":{"type":"boolean","description":"Is this public holiday in every county (federal state)","example":true,"key$":"global"},"counties":{"type":"array","items":{"type":"string"},"nullable":true,"description":"If it is not global you found here the Federal states (ISO-3166-2)","key$":"counties"},"launchYear":{"type":"integer","nullable":true,"description":"The launch year of the public holiday","example":1967,"key$":"launchYear"},"types":{"type":"array","items":{"type":"string","enum":["Public","Bank","School","Authorities","Optional","Observance"]},"description":"The types of the public holiday. Public (Bank holiday, banks and offices are closed), Bank (Bank holiday, banks and offices are closed), School (School holiday, schools are closed), Authorities (Authorities are closed), Optional (Majority of people take a day off), Observance (Optional festivity, no paid day off)","key$":"types"}},"x-ref":"#/components/schemas/PublicHoliday","key$":"items"}}}}},"404":{"description":"Country not found"}},"parameters":[{"name":"CountryCode","in":"path","description":"ISO 3166-1 alpha-2 country code","required":true,"schema":{"type":"string","minLength":2,"maxLength":2,"example":"AT"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let public_holiday_ref01_data = Object.values(setup.data.existing.public_holiday)[0] as any

    // LIST
    const public_holiday_ref01_ent = client.PublicHoliday()
    const public_holiday_ref01_match: any = {}

    const public_holiday_ref01_list = (await public_holiday_ref01_ent.list(public_holiday_ref01_match)).map((e: any) => e.data())



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/public_holiday/PublicHolidayTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = PublicHolidaySDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['public_holiday01','public_holiday02','public_holiday03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PUBLIC_HOLIDAY_TEST_PUBLIC_HOLIDAY_ENTID': idmap,
    'PUBLIC_HOLIDAY_TEST_LIVE': 'FALSE',
    'PUBLIC_HOLIDAY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PUBLIC_HOLIDAY_TEST_PUBLIC_HOLIDAY_ENTID']

  const live = 'TRUE' === env.PUBLIC_HOLIDAY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PUBLIC_HOLIDAY_TEST_PUBLIC_HOLIDAY_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new PublicHolidaySDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.PUBLIC_HOLIDAY_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
