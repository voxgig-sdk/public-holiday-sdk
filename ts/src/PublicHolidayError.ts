
import { Context } from './Context'


class PublicHolidayError extends Error {

  isPublicHolidayError = true

  sdk = 'PublicHoliday'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  PublicHolidayError
}

