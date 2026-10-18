import {test, expect} from '@playwright/test'
import {signIn} from './support/session.mjs'
import {readdir} from 'node:fs/promises'
import pg from 'pg'

const file = {
  name: 'imagen.png',
  mimeType: 'image/png',
  buffer: Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jJ1sAAAAASUVORK5CYII=',
    'base64',
  ),
}

test('dos cargas simultáneas conservan ambos campos y las ediciones posteriores', async ({
  page,
}) => {
  await signIn(page.request)
  await page.goto('/dashboard/heroSection')
  await page.getByRole('tab', {name: 'Imágenes', exact: true}).click()
  const pending = []
  await page.route('**/api/uploads', (route) => pending.push(route))
  await page
    .getByLabel('Subir Imagen superior izquierda', {exact: true})
    .setInputFiles(file)
  await page
    .getByLabel('Subir Imagen inferior izquierda', {exact: true})
    .setInputFiles(file)
  await page
    .getByLabel('Título de la imagen', {exact: true})
    .first()
    .fill('Conservar título durante las cargas')
  await expect.poll(() => pending.length).toBe(2)
  await Promise.all(pending.map((route) => route.continue()))
  const first = page.getByLabel('Imagen superior izquierda', {exact: true})
  const second = page.getByLabel('Imagen inferior izquierda', {exact: true})
  await expect(first).toHaveValue(/\/api\/uploads\/files\//)
  await expect(second).toHaveValue(/\/api\/uploads\/files\//)
  await expect(
    page.getByLabel('Título de la imagen', {exact: true}).first(),
  ).toHaveValue('Conservar título durante las cargas')
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
})

test('una carga fallida se reintenta y descartar cancela resultados tardíos', async ({
  page,
}) => {
  await signIn(page.request)
  await page.goto('/dashboard/heroSection')
  await page.getByRole('tab', {name: 'Imágenes', exact: true}).click()
  const original = await page
    .getByLabel('Imagen superior izquierda', {exact: true})
    .inputValue()
  await page.route('**/api/uploads', (route) => route.abort())
  await page
    .getByLabel('Subir Imagen superior izquierda', {exact: true})
    .setInputFiles(file)
  await expect(
    page.getByRole('button', {name: 'Reintentar carga'}),
  ).toBeVisible()
  await expect(
    page.getByRole('button', {name: 'Guardar y publicar', exact: true}),
  ).toBeDisabled()
  await page.unroute('**/api/uploads')
  await page.getByRole('button', {name: 'Reintentar carga'}).click()
  await expect(
    page.getByLabel('Imagen superior izquierda', {exact: true}),
  ).not.toHaveValue(original)
  let delayed
  await page.route('**/api/uploads', (route) => {
    delayed = route
  })
  await page
    .getByLabel('Subir Imagen inferior izquierda', {exact: true})
    .setInputFiles(file)
  await expect.poll(() => Boolean(delayed)).toBe(true)
  await page.getByRole('button', {name: 'Descartar', exact: true}).click()
  await expect(
    page.getByLabel('Imagen superior izquierda', {exact: true}),
  ).toHaveValue(original)
  await delayed
    .fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({url: '/never-adopt-late.png'}),
    })
    .catch(() => {})
  await expect(
    page.getByLabel('Imagen inferior izquierda', {exact: true}),
  ).not.toHaveValue('/never-adopt-late.png')
  await expect(
    page.getByRole('button', {name: 'Guardar y publicar', exact: true}),
  ).toBeDisabled()
})

test('si falla la auditoría de una carga se compensa el archivo y se permite reintentar', async ({
  request,
}) => {
  await signIn(request)
  const directory = '.tmp/dashboard-test.local/uploads'
  const before = (await readdir(directory).catch(() => [])).sort()
  const control = new pg.Pool({
    connectionString:
      'postgresql://test_admin@127.0.0.1:55439/er_dashboard_test',
  })
  try {
    await control.query(
      "create or replace function test_reject_upload() returns trigger language plpgsql as $$ begin if new.action = 'upload' then raise exception 'Upload audit unavailable'; end if; return new; end; $$",
    )
    await control.query(
      'create trigger test_reject_upload before insert on activity_events for each row execute function test_reject_upload()',
    )
    expect(
      (
        await request.post('/api/uploads', {
          multipart: {file, sectionKey: 'heroSection'},
        })
      ).status(),
    ).toBe(500)
    expect((await readdir(directory)).sort()).toEqual(before)
  } finally {
    await control.query(
      'drop trigger if exists test_reject_upload on activity_events',
    )
    await control.query('drop function if exists test_reject_upload()')
    await control.end()
  }
  expect(
    (
      await request.post('/api/uploads', {
        multipart: {file, sectionKey: 'heroSection'},
      })
    ).status(),
  ).toBe(201)
})
