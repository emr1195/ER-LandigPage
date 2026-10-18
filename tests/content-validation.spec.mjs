import {test, expect} from './support/fixture.mjs'
import {signIn} from './support/session.mjs'

test('el servidor rechaza contenido incompleto sin cambiar publicación ni historial', async ({
  request,
}) => {
  await signIn(request)
  const current = await request.get('/api/site-sections/heroSection')
  const body = await current.json()
  const history = await (await request.get('/api/activity')).json()
  const response = await request.put('/api/site-sections/heroSection', {
    headers: {'If-Match': current.headers().etag},
    data: {...body, textSection: {...body.textSection, title: '   '}},
  })
  expect(response.status()).toBe(400)
  expect((await response.json()).fields['textSection.title']).toBeTruthy()
  const after = await request.get('/api/site-sections/heroSection')
  expect(after.headers().etag).toBe(current.headers().etag)
  expect(await after.json()).toEqual(body)
  expect((await (await request.get('/api/activity')).json()).items).toEqual(
    history.items,
  )
})

test('la respuesta de validación señala el campo y conserva la edición', async ({
  page,
}) => {
  await signIn(page.request)
  await page.goto('/dashboard/heroSection')
  const field = page.getByLabel('Título principal', {exact: true})
  await field.fill('   ')
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByText('Escribe el título principal.', {exact: true}),
  ).toBeVisible()
  await expect(field).toHaveAttribute('aria-invalid', 'true')
  await expect(field).toHaveValue('   ')
  await field.fill('Título corregido')
  await expect(field).toHaveAttribute('aria-invalid', 'false')
})
