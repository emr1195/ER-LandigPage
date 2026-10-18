import {test, expect} from './support/fixture.mjs'
import pg from 'pg'
import {signIn} from './support/session.mjs'

test('una sección sin datos permite crear y editar su primer evento', async ({
  page,
}) => {
  await signIn(page.request)
  const control = new pg.Pool({
    connectionString:
      'postgresql://test_admin@127.0.0.1:55439/er_dashboard_test',
  })
  try {
    await control.query("delete from site_sections where id='events'")
  } finally {
    await control.end()
  }
  await page.goto('/dashboard/events')
  await page
    .getByLabel('Título de los eventos', {exact: true})
    .fill('Nuestros próximos encuentros')
  await page.getByRole('button', {name: 'Agregar eventos', exact: true}).click()
  const field = page.getByLabel('Nombre del evento', {exact: true}).first()
  await expect(field).toBeVisible()
  await field.fill('Primer encuentro')
  await page
    .getByLabel('Fecha del evento', {exact: true})
    .first()
    .fill('10 de diciembre de 2026')
  await page
    .getByLabel('Hora del evento', {exact: true})
    .first()
    .fill('10:00 a. m.')
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
  const saved = await (
    await page.request.get('/api/site-sections/events')
  ).json()
  expect(saved.events).toHaveLength(1)
  expect(saved.events[0].title).toBe('Primer encuentro')
  expect(saved.events[0].date).toBe('10 de diciembre de 2026;10:00 a. m.')
})
