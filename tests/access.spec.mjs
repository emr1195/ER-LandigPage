import {test, expect} from './support/fixture.mjs'
import {signIn} from './support/session.mjs'

test('lecturas privadas y publicaciones exigen una sesión con rol de administrador', async ({
  request,
}) => {
  expect((await request.get('/api/site-sections')).status()).toBe(200)
  for (const url of ['/api/activity', '/api/me/preferences', '/api/me'])
    expect((await request.get(url)).status()).toBe(401)
  expect((await request.post('/api/uploads', {data: {}})).status()).toBe(401)
  await signIn(request, 'reader@example.test')
  for (const url of ['/api/activity', '/api/me/preferences', '/api/me'])
    expect((await request.get(url)).status()).toBe(403)
  expect(
    (
      await request.put('/api/site-sections/history', {
        headers: {'If-Match': '"1"'},
        data: {},
      })
    ).status(),
  ).toBe(403)
  expect((await request.post('/api/uploads', {data: {}})).status()).toBe(403)
  expect(
    (await request.post('/api/auth/sign-up/email', {data: {}})).status(),
  ).toBe(403)
})

test('la publicación exige revisión y no confía en el autor que envía el navegador', async ({
  request,
}) => {
  await signIn(request)
  const current = await request.get('/api/site-sections/history')
  const data = await current.json()
  expect(
    (await request.put('/api/site-sections/history', {data})).status(),
  ).toBe(428)
  const saved = await request.put('/api/site-sections/history', {
    headers: {'If-Match': current.headers().etag},
    data: {
      ...data,
      title: 'Publicación atribuida al servidor',
      updatedBy: 'otra-persona@example.test',
      lastModified: '2099',
    },
  })
  expect(saved.status()).toBe(200)
  const content = await (await request.get('/api/site-sections/history')).json()
  expect(content.updatedBy).toBeUndefined()
  const {items} = await (await request.get('/api/activity')).json()
  expect(items[0].actor_email).toBe('admin@example.test')
  expect((await request.delete('/api/activity/' + items[0].id)).status()).toBe(
    404,
  )
  expect(
    (await request.get('/api/me/preferences')).headers()['cache-control'],
  ).toBe('no-store')
  expect(
    (
      await request.put('/api/me/preferences', {
        data: {appearance: 'petrol-apricot', userId: 'otra-cuenta'},
      })
    ).status(),
  ).toBe(400)
})
