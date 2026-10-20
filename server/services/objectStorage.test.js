/** @jest-environment node */
import {readUploadTicket, signUploadTicket, validImageKey} from './objectStorage.js'

const previous = process.env.BETTER_AUTH_SECRET
beforeAll(() => { process.env.BETTER_AUTH_SECRET = 'test-only-secret-with-at-least-32-characters' })
afterAll(() => { if (previous === undefined) delete process.env.BETTER_AUTH_SECRET; else process.env.BETTER_AUTH_SECRET = previous })
const payload = () => ({key: 'f8d6573c-61ac-4ea2-8a0e-833a32d98660.jpg', userId: 'admin', expires: Date.now() + 60000, size: 100, type: 'image/jpeg'})

test('solo admite claves de imágenes sin rutas arbitrarias', () => {
  expect(validImageKey(payload().key)).toBe(true)
  expect(validImageKey('../secrets.env')).toBe(false)
  expect(validImageKey('https://example.com/file.jpg')).toBe(false)
})
test('el ticket conserva el propietario y no admite alteraciones ni sesiones ajenas', () => {
  const data = payload()
  const ticket = signUploadTicket(data)
  expect(readUploadTicket(ticket, 'admin')).toEqual(data)
  expect(() => readUploadTicket(ticket, 'other')).toThrow()
  expect(() => readUploadTicket(ticket + 'tampered', 'admin')).toThrow()
  expect(() => readUploadTicket(signUploadTicket({...data, expires: 1}), 'admin')).toThrow()
})
