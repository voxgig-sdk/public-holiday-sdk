

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PUBLIC_HOLIDAY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'long_weekend.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"dayCount","req":false,"short":"Number of days in the long weekend","type":"`$INTEGER`","index$":0},{"active":true,"format":"date","name":"endDate","req":false,"short":"End date of the long weekend","type":"`$STRING`","index$":1},{"active":true,"name":"needBridgeDay","req":false,"short":"Whether a bridge day is needed","type":"`$BOOLEAN`","index$":2},{"active":true,"format":"date","name":"startDate","req":false,"short":"Start date of the long weekend","type":"`$STRING`","index$":3}],"name":"long_weekend","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"example":"AT","kind":"param","name":"country_code","orig":"country_code","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"example":2026,"kind":"param","name":"year","orig":"year","reqd":true,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /LongWeekend/{Year}/{CountryCode}","json":"{\"operationId\":\"getLongWeekends\",\"parameters\":[{\"description\":\"The year to retrieve long weekends for\",\"in\":\"path\",\"name\":\"Year\",\"required\":true,\"schema\":{\"example\":2026,\"type\":\"integer\"}},{\"description\":\"ISO 3166-1 alpha-2 country code\",\"in\":\"path\",\"name\":\"CountryCode\",\"required\":true,\"schema\":{\"example\":\"AT\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"dayCount\":{\"description\":\"Number of days in the long weekend\",\"type\":\"integer\"},\"endDate\":{\"description\":\"End date of the long weekend\",\"format\":\"date\",\"type\":\"string\"},\"needBridgeDay\":{\"description\":\"Whether a bridge day is needed\",\"type\":\"boolean\"},\"startDate\":{\"description\":\"Start date of the long weekend\",\"format\":\"date\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of long weekends\"},\"404\":{\"description\":\"Country not found or no long weekends available\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/LongWeekend/{Year}/{CountryCode}","rename":{"param":{"CountryCode":"country_code","Year":"year"}},"segments":[{"lit":"LongWeekend"},{"var":"year"},{"var":"country_code"}],"select":{"exist":["country_code","year"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["long_weekend"]]},"key$":"long_weekend","name__orig":"long_weekend","Name":"LongWeekend","name_":"long_weekend","name-":"long-weekend","NAME":"LONG_WEEKEND","index$":2}, {"active":true,"entity":"long_weekend","key$":"BasicLongWeekendFlow","kind":"basic","name":"BasicLongWeekendFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"country_code":"country_code01","year":"year01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"long_weekend_ref01"}}],"index$":0}]}, 'LongWeekend')
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
    ['long_weekend01','long_weekend02','long_weekend03','long_weekend01','long_weekend02','long_weekend03'],
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
  
