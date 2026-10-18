import {googleMapsEmbedUrl, parseGoogleMapsUrl} from './googleMaps'
import {resolveGoogleMaps} from '../server/services/googleMaps'

test.each([
  ['https://www.google.com/maps/search/?api=1&query=8.9824,-79.5199', '8.9824,-79.5199'],
  ['https://www.google.com/maps/place/Panama/data=!3d8.9824!4d-79.5199', '8.9824,-79.5199'],
])('convierte el enlace de ubicación %s en un mapa', (source, query) => {
  const result = new URL(googleMapsEmbedUrl(source))
  expect(result.searchParams.get('q')).toBe(query)
  expect(result.searchParams.get('output')).toBe('embed')
})

test.each(['javascript:alert(1)', 'https://evil.example/maps', 'https://www.google.com.evil.example/maps', 'https://www.google.com/url?q=http://localhost', 'http://www.google.com/maps?q=Panama'])('rechaza destinos ajenos a Google Maps: %s', (source) => {
  expect(() => parseGoogleMapsUrl(source)).toThrow()
})

test('reconoce enlaces cortos y conserva enlaces para insertar', () => {
  expect(parseGoogleMapsUrl('https://maps.app.goo.gl/example').short).toBe(true)
  const embed = 'https://www.google.com/maps/embed?pb=original'
  expect(googleMapsEmbedUrl(embed)).toBe(embed)
})

test('rechaza un destino externo antes de seguir una redirección de enlace corto', async () => {
  const originalFetch = global.fetch
  const originalTimeout = AbortSignal.timeout
  Object.defineProperty(AbortSignal, 'timeout', {value: jest.fn(() => undefined), configurable: true})
  global.fetch = jest.fn(async () => ({status: 302, headers: {get: () => 'http://127.0.0.1/private'}, body: {cancel: jest.fn()}}))
  try {
    await expect(resolveGoogleMaps('https://maps.app.goo.gl/example')).rejects.toThrow()
    expect(global.fetch).toHaveBeenCalledTimes(1)
  } finally {
    global.fetch = originalFetch
    Object.defineProperty(AbortSignal, 'timeout', {value: originalTimeout, configurable: true})
  }
})
