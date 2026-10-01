

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


describe('CountryInfoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PUBLIC_HOLIDAY_TEST_LIVE=TRUE.
  afterEach(liveDelay('PUBLIC_HOLIDAY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PublicHolidaySDK.test()
    const ent = testsdk.CountryInfo()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PUBLIC_HOLIDAY_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'country_info.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"borders":{"a":true,"h":"Borders","n":"borders","r":false,"sh":"Bordering countries","t":"`$ARRAY`","key$":"borders","index$":0},"commonName":{"a":true,"h":"Common Name","n":"commonName","r":false,"sh":"Common name of the country","t":"`$STRING`","key$":"commonName","index$":1},"countryCode":{"a":true,"h":"Country Code","n":"countryCode","r":false,"sh":"ISO 3166-1 alpha-2 country code","t":"`$STRING`","key$":"countryCode","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":3},"officialName":{"a":true,"h":"Official Name","n":"officialName","r":false,"sh":"Official name of the country","t":"`$STRING`","key$":"officialName","index$":4},"region":{"a":true,"h":"Region","n":"region","r":false,"sh":"Region of the country","t":"`$STRING`","key$":"region","index$":5}},"id":{"field":"id","name":"id"},"name":"country_info","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /CountryInfo/{CountryCode}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"AT","k":"param","n":"id","or":"CountryCode","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/CountryInfo/{CountryCode}","q":{"exist":["id"]},"r":{"param":{"CountryCode":"id"}},"s":[{"lit":"CountryInfo"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"country_info","name__orig":"country_info","Name":"CountryInfo","name_":"country_info","name-":"country-info","NAME":"COUNTRY_INFO","index$":1}, {"active":true,"entity":"country_info","key$":"BasicCountryInfoFlow","kind":"basic","name":"BasicCountryInfoFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"country_info_ref01","srcdatavar":"country_info_ref01_data","suffix":"_dt0"},"m":{"id":"country_info01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-country_info_ref01"}}],"index$":0}]}, 'CountryInfo', {"GET /CountryInfo/{CountryCode}":{"protocol":"http","parameters":[{"name":"CountryCode","in":"path","description":"ISO 3166-1 alpha-2 country code","required":true,"schema":{"type":"string","minLength":2,"maxLength":2,"example":"AT"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let country_info_ref01_data = Object.values(setup.data.existing.country_info)[0] as any

    // LOAD
    const country_info_ref01_ent = client.CountryInfo()
    const country_info_ref01_match_dt0: any = {}
    country_info_ref01_match_dt0.id = country_info_ref01_data.id
    const country_info_ref01_data_dt0 = (await country_info_ref01_ent.load(country_info_ref01_match_dt0)).data()
    assert(country_info_ref01_data_dt0.id === country_info_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/country_info/CountryInfoTestData.json')

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
    ['country_info01','country_info02','country_info03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PUBLIC_HOLIDAY_TEST_COUNTRY_INFO_ENTID': idmap,
    'PUBLIC_HOLIDAY_TEST_LIVE': 'FALSE',
    'PUBLIC_HOLIDAY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PUBLIC_HOLIDAY_TEST_COUNTRY_INFO_ENTID']

  const live = 'TRUE' === env.PUBLIC_HOLIDAY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PUBLIC_HOLIDAY_TEST_COUNTRY_INFO_ENTID']
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
  
