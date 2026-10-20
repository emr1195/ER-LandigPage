import {uploadImageFile} from './uploads'
import {apiResponse} from './client'
jest.mock('./client', () => ({apiResponse: jest.fn()}))
const originalFetch = global.fetch
afterEach(() => { delete global.__DIRECT_UPLOADS__; global.fetch = originalFetch; jest.clearAllMocks() })

test('las imágenes van al bucket y la API recibe solo los metadatos y la confirmación', async () => {
  global.__DIRECT_UPLOADS__ = true
  const file = new File(['photo'], 'foto.jpg', {type: 'image/jpeg'})
  apiResponse.mockResolvedValueOnce({json: async () => ({url: 'https://storage.example.test/uploads', fields: {key: 'uuid.jpg'}, ticket: 'signed'})}).mockResolvedValueOnce({json: async () => ({url: '/api/uploads/files/uuid.jpg'})})
  global.fetch = jest.fn().mockResolvedValue({ok: true})
  const result = await uploadImageFile(file, {sectionKey: 'heroSection', field: 'Imagen'})
  expect(result.url).toBe('/api/uploads/files/uuid.jpg')
  expect(apiResponse.mock.calls.map(([url]) => url)).toEqual(['/api/uploads/prepare', '/api/uploads/complete'])
  expect(global.fetch.mock.calls[0][1].body.get('file')).toBe(file)
  expect(global.fetch.mock.calls[0][1].credentials).toBe('omit')
})
