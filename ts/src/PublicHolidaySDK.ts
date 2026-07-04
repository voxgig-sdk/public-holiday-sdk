// PublicHoliday Ts SDK

import { AvailableCountryEntity } from './entity/AvailableCountryEntity'
import { CountryInfoEntity } from './entity/CountryInfoEntity'
import { LongWeekendEntity } from './entity/LongWeekendEntity'
import { PublicHolidayEntity } from './entity/PublicHolidayEntity'

export type * from './PublicHolidayTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { PublicHolidayEntityBase } from './PublicHolidayEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class PublicHolidaySDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _available_country?: AvailableCountryEntity

  // Idiomatic facade: `client.available_country.list()` / `client.available_country.load({ id })`.
  get available_country(): AvailableCountryEntity {
    return (this._available_country ??= new AvailableCountryEntity(this, undefined))
  }

  /** @deprecated Use `client.available_country` instead. */
  AvailableCountry(data?: any) {
    const self = this
    return new AvailableCountryEntity(self,data)
  }


  _country_info?: CountryInfoEntity

  // Idiomatic facade: `client.country_info.list()` / `client.country_info.load({ id })`.
  get country_info(): CountryInfoEntity {
    return (this._country_info ??= new CountryInfoEntity(this, undefined))
  }

  /** @deprecated Use `client.country_info` instead. */
  CountryInfo(data?: any) {
    const self = this
    return new CountryInfoEntity(self,data)
  }


  _long_weekend?: LongWeekendEntity

  // Idiomatic facade: `client.long_weekend.list()` / `client.long_weekend.load({ id })`.
  get long_weekend(): LongWeekendEntity {
    return (this._long_weekend ??= new LongWeekendEntity(this, undefined))
  }

  /** @deprecated Use `client.long_weekend` instead. */
  LongWeekend(data?: any) {
    const self = this
    return new LongWeekendEntity(self,data)
  }


  _public_holiday?: PublicHolidayEntity

  // Idiomatic facade: `client.public_holiday.list()` / `client.public_holiday.load({ id })`.
  get public_holiday(): PublicHolidayEntity {
    return (this._public_holiday ??= new PublicHolidayEntity(this, undefined))
  }

  /** @deprecated Use `client.public_holiday` instead. */
  PublicHoliday(data?: any) {
    const self = this
    return new PublicHolidayEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new PublicHolidaySDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return PublicHolidaySDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'PublicHoliday' }
  }

  toString() {
    return 'PublicHoliday ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = PublicHolidaySDK


export {
  stdutil,

  BaseFeature,
  PublicHolidayEntityBase,

  PublicHolidaySDK,
  SDK,
}


