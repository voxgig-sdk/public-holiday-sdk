
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PublicHolidaySDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = PublicHolidaySDK.test()
    equal(testsdk instanceof PublicHolidaySDK, true,
      'PublicHolidaySDK.test() must return a client synchronously')
  })

})
