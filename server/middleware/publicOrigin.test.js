/** @jest-environment node */
import {publicOrigin} from './publicOrigin'

test.each([
  ['GET', 'https://emr1195.github.io', true],
  ['GET', 'https://untrusted.test', false],
  ['PUT', 'https://emr1195.github.io', false],
  ['OPTIONS', 'https://emr1195.github.io', false],
])('CORS permite solo lectura pública autorizada: %s %s', (method, origin, allowed) => {
  process.env.PUBLIC_SITE_ORIGIN = 'https://emr1195.github.io'
  const res = {vary: jest.fn(), setHeader: jest.fn()}
  const next = jest.fn()
  publicOrigin({method, headers: {origin}}, res, next)
  expect(res.setHeader.mock.calls.some(([name]) => name === 'Access-Control-Allow-Origin')).toBe(allowed)
  expect(res.setHeader.mock.calls.some(([name]) => name === 'Access-Control-Allow-Credentials')).toBe(false)
  expect(next).toHaveBeenCalledTimes(1)
  delete process.env.PUBLIC_SITE_ORIGIN
})
