

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { PublicHolidaySDK, BaseFeature, config, stdutil } from '../../..'

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


describe('LongWeekendEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PUBLIC_HOLIDAY_TEST_LIVE=TRUE.
  afterEach(liveDelay('PUBLIC_HOLIDAY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PublicHolidaySDK.test()
    const ent = testsdk.LongWeekend()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = PublicHolidaySDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LongWeekend().list({"country_code":1,"year":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PUBLIC_HOLIDAY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'long_weekend.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"dayCount":{"a":true,"h":"Day Count","n":"dayCount","r":false,"sh":"Number of days in the long weekend","t":"`$INTEGER`","key$":"dayCount","index$":0},"endDate":{"a":true,"fo":"date","h":"End Date","n":"endDate","r":false,"sh":"End date of the long weekend","t":"`$STRING`","key$":"endDate","index$":1},"needBridgeDay":{"a":true,"h":"Need Bridge Day","n":"needBridgeDay","r":false,"sh":"Whether a bridge day is needed","t":"`$BOOLEAN`","key$":"needBridgeDay","index$":2},"startDate":{"a":true,"fo":"date","h":"Start Date","n":"startDate","r":false,"sh":"Start date of the long weekend","t":"`$STRING`","key$":"startDate","index$":3}},"name":"long_weekend","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /LongWeekend/{Year}/{CountryCode}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"AT","k":"param","n":"country_code","or":"CountryCode","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":2026,"k":"param","n":"year","or":"Year","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/LongWeekend/{Year}/{CountryCode}","q":{"exist":["country_code","year"]},"r":{"param":{"CountryCode":"country_code","Year":"year"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"LongWeekend"},{"var":"year"},{"var":"country_code"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"long_weekend","name__orig":"long_weekend","Name":"LongWeekend","name_":"long_weekend","name-":"long-weekend","NAME":"LONG_WEEKEND","index$":2}, {"active":true,"entity":"long_weekend","key$":"BasicLongWeekendFlow","kind":"basic","name":"BasicLongWeekendFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"country_code":"country_code01","year":"year01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"long_weekend_ref01"}}],"index$":0}]}, 'LongWeekend', {"GET /LongWeekend/{Year}/{CountryCode}":{"protocol":"http","parameters":[{"name":"Year","in":"path","description":"The year to retrieve long weekends for","required":true,"schema":{"type":"integer","example":2026},"index$":0},{"name":"CountryCode","in":"path","description":"ISO 3166-1 alpha-2 country code","required":true,"schema":{"type":"string","minLength":2,"maxLength":2,"example":"AT"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let long_weekend_ref01_data = Object.values(setup.data.existing.long_weekend)[0] as any

    // LIST
    const long_weekend_ref01_ent = client.LongWeekend()
    const long_weekend_ref01_match: any = {}
    long_weekend_ref01_match['country_code'] = setup.idmap['country_code01']
    long_weekend_ref01_match['year'] = setup.idmap['year01']

    const long_weekend_ref01_list = (await long_weekend_ref01_ent.list(long_weekend_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/long_weekend/LongWeekendTestData.json')

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
    ['long_weekend01','long_weekend02','long_weekend03','country_code01','year01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PUBLIC_HOLIDAY_TEST_LONG_WEEKEND_ENTID': idmap,
    'PUBLIC_HOLIDAY_TEST_LIVE': 'FALSE',
    'PUBLIC_HOLIDAY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PUBLIC_HOLIDAY_TEST_LONG_WEEKEND_ENTID']

  const live = 'TRUE' === env.PUBLIC_HOLIDAY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PUBLIC_HOLIDAY_TEST_LONG_WEEKEND_ENTID']
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
  
