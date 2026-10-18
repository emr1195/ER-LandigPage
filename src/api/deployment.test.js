afterEach(() => {
  delete global.__PUBLIC_API_ORIGIN__
  jest.resetModules()
})

test('el entorno local conserva las rutas y la sesión en el mismo origen', () => {
  const {externalApi, apiUrl, publicImageUrl} = require('./deployment')
  expect(externalApi).toBe(false)
  expect(apiUrl('/api/me')).toBe('/api/me')
  expect(publicImageUrl('/api/uploads/files/logo.png')).toBe('/api/uploads/files/logo.png')
})

test('GitHub Pages usa la API remota y resuelve imágenes sin modificar enlaces externos', () => {
  global.__PUBLIC_API_ORIGIN__ = 'https://admin.example.test'
  const {externalApi, apiUrl, publicImageUrl} = require('./deployment')
  expect(externalApi).toBe(true)
  expect(apiUrl('/api/site-sections')).toBe('https://admin.example.test/api/site-sections')
  expect(publicImageUrl('/api/uploads/files/logo.png')).toBe('https://admin.example.test/api/uploads/files/logo.png')
  expect(publicImageUrl('https://images.example.test/logo.png')).toBe('https://images.example.test/logo.png')
  expect(publicImageUrl('Título')).toBe('Título')
})

test('la lectura desde Pages no envía cookies de administrador a otro dominio', async () => {
  global.__PUBLIC_API_ORIGIN__ = 'https://admin.example.test'
  const previousFetch = global.fetch
  global.fetch = jest.fn().mockResolvedValue({ok: true, status: 200, json: async () => []})
  try {
    const {apiRequest} = require('./client')
    await apiRequest('/api/site-sections')
    expect(global.fetch).toHaveBeenCalledWith('https://admin.example.test/api/site-sections', expect.objectContaining({credentials: 'omit'}))
  } finally { global.fetch = previousFetch }
})
