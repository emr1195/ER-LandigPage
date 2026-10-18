import {test, expect} from './support/fixture.mjs'
import {signIn} from './support/session.mjs'

const publish = async (request, data) => {
  const current = await request.get('/api/site-sections/detachment')
  return request.put('/api/site-sections/detachment', {
    headers: {'If-Match': current.headers().etag},
    data,
  })
}
test('el directorio conserva identidades, permite datos opcionales y normaliza mapas en el servidor', async ({
  request,
}) => {
  await signIn(request)
  const response = await publish(request, {
    detachments: [
      {
        id: 'fixed-24',
        name: 'Prueba de ubicación',
        number: '24',
        mapsUrl: 'https://www.google.com/maps?q=8.9,-79.5',
        embedUrl: 'https://evil.example/map',
      },
      {
        id: 'fixed-1',
        name: 'Sin ubicación',
        number: '1',
        logo: '',
        mapsUrl: '',
      },
    ],
  })
  expect(response.status()).toBe(200)
  const {data} = await response.json()
  expect(data.detachments.map((row) => row.number)).toEqual(['1', '24'])
  expect(data.detachments[0].logo).toBe('')
  expect(data.detachments[0].embedUrl).toBe('')
  expect(data.detachments[1].embedUrl).toContain('https://www.google.com/maps?')
  const renamed = await publish(request, {
    detachments: [
      {
        ...data.detachments[1],
        number: '25',
        name: 'Renombrado sin cambiar identidad',
      },
    ],
  })
  expect(renamed.status()).toBe(200)
  expect((await renamed.json()).data.detachments[0].id).toBe('fixed-24')
  expect((await publish(request, {detachments: []})).status()).toBe(200)
  expect(
    (await (await request.get('/api/site-sections/detachment')).json())
      .detachments,
  ).toEqual([])
})

test('el directorio rechaza datos inválidos y duplicados sin alterar lo publicado', async ({
  request,
}) => {
  await signIn(request)
  const current = await request.get('/api/site-sections/detachment')
  const before = await current.json()
  for (const payload of [
    {name: '', number: '24'},
    {name: 'Inválido', number: '?invalid'},
    {name: 'Inválido', number: '24', mapsUrl: 'https://evil.example/maps'},
    {
      detachments: [
        {name: 'Uno', number: '1'},
        {name: 'Duplicado', number: '01'},
      ],
    },
  ])
    expect((await publish(request, payload)).status()).toBe(400)
  expect(
    await (await request.get('/api/site-sections/detachment')).json(),
  ).toEqual(before)
})
