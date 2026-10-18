import {test, expect} from './support/fixture.mjs'
import {signIn} from './support/session.mjs'
import pg from 'pg'

test('el servidor conserva exclusividad del botón de contacto y campos obligatorios existentes', async ({
  request,
}) => {
  await signIn(request)
  for (const key of ['navbar', 'programStructure', 'organization']) {
    const current = await request.get('/api/site-sections/' + key)
    const data = await current.json()
    if (key === 'navbar')
      data.listMenu.slice(0, 2).forEach((item) => {
        item.eventButton = true
      })
    if (key === 'programStructure') data.programValues[0].description = ' '
    if (key === 'organization') data.members.coorNac[0].role = ' '
    expect(
      (
        await request.put('/api/site-sections/' + key, {
          headers: {'If-Match': current.headers().etag},
          data,
        })
      ).status(),
      key,
    ).toBe(400)
    expect(
      (await request.get('/api/site-sections/' + key)).headers().etag,
    ).toBe(current.headers().etag)
  }
})

test('Navegación permite cambiar el único botón sin ocultar otro enlace', async ({
  page,
}) => {
  await signIn(page.request)
  await page.goto('/dashboard/navbar')
  const buttons = page.getByLabel('Destacar como botón de contacto', {
    exact: true,
  })
  const records = page.locator('details.admin-record')
  await expect(records.first()).toBeVisible()
  const count = await records.count()
  for (let index = 0; index < count; index++) {
    const record = records.nth(index)
    if (!(await record.evaluate((element) => element.open)))
      await record.locator('summary').first().click()
  }
  await expect(buttons.first()).toBeDisabled()
  await buttons.last().uncheck()
  await expect(buttons.first()).toBeEnabled()
  await buttons.first().check()
  await expect(buttons.last()).toBeDisabled()
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
  expect(
    (
      await (await page.request.get('/api/site-sections/navbar')).json()
    ).listMenu.filter((item) => item.eventButton),
  ).toHaveLength(1)
})

test('descartar cancela una resolución de mapa aunque el valor restaurado sea idéntico', async ({
  page,
}) => {
  await signIn(page.request)
  const pool = new pg.Pool({
    connectionString:
      'postgresql://test_admin@127.0.0.1:55439/er_dashboard_test',
  })
  try {
    await pool.query("update site_sections set data=$1 where id='detachment'", [
      {
        title: 'Directorio',
        detachments: [
          {
            id: 'legacy-short',
            name: 'Lugar heredado',
            number: '1',
            mapsUrl: 'https://maps.app.goo.gl/legacy',
            embedUrl: '',
            logo: '',
          },
        ],
      },
    ])
  } finally {
    await pool.end()
  }
  let pending
  await page.route('**/api/maps/preview', (route) => {
    pending = route
  })
  await page.goto('/dashboard/detachment')
  await expect.poll(() => Boolean(pending)).toBe(true)
  await expect(page.getByText('Preparando mapa…', {exact: true})).toBeVisible()
  await page.getByRole('button', {name: 'Descartar', exact: true}).click()
  await expect(page.getByText('Preparando mapa…', {exact: true})).toBeHidden()
  await page
    .getByLabel('Nombre del destacamento', {exact: true})
    .fill('Nueva edición después de cancelar')
  await page
    .getByLabel('Ubicación — enlace de Google Maps (opcional)', {exact: true})
    .fill('https://www.google.com/maps?q=8.9,-79.5')
  await pending
    .fulfill({
      json: {embedUrl: 'https://www.google.com/maps?q=1,2&output=embed'},
    })
    .catch(() => {})
  await expect(page.locator('.admin-map-preview')).toHaveAttribute(
    'src',
    /8\.9/,
  )
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
  const data = await (
    await page.request.get('/api/site-sections/detachment')
  ).json()
  expect(data.detachments[0].name).toBe('Nueva edición después de cancelar')
  expect(data.detachments[0].embedUrl).toContain('8.9')
})
