import {test, expect} from './support/fixture.mjs'
import {signIn} from './support/session.mjs'

test('la sesión vencida permite reingresar sin publicar ni perder la edición', async ({
  page,
}) => {
  await signIn(page.request)
  await page.goto('/dashboard/heroSection')
  const title = page.getByLabel('Título principal', {exact: true})
  await title.fill('Edición conservada durante el reingreso')
  await page.request.post('/api/auth/sign-out', {
    data: {},
    headers: {Origin: 'http://127.0.0.1:3410'},
  })
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('heading', {name: 'Vuelve a ingresar.'}),
  ).toBeVisible()
  await page
    .getByLabel('Correo electrónico', {exact: true})
    .fill('admin@example.test')
  await page
    .getByLabel('Contraseña', {exact: true})
    .fill('Dashboard-test-2026!')
  await page.getByRole('button', {name: 'Ingresar', exact: true}).click()
  await expect(
    page.getByRole('heading', {name: 'Vuelve a ingresar.'}),
  ).toBeHidden()
  await expect(title).toHaveValue('Edición conservada durante el reingreso')
  expect(
    (await (await page.request.get('/api/site-sections/heroSection')).json())
      .textSection.title,
  ).not.toBe('Edición conservada durante el reingreso')
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
})

test('cerrar sesión con cambios confirmados limpia la selección y el borrador', async ({
  page,
}) => {
  await signIn(page.request)
  await page.goto('/dashboard/heroSection')
  await page
    .getByLabel('Título principal', {exact: true})
    .fill('No mostrar a la siguiente cuenta')
  await page.getByRole('button', {name: 'Cerrar sesión', exact: true}).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page
    .getByRole('button', {name: 'Descartar cambios', exact: true})
    .click()
  await expect(page).toHaveURL(/\/auth\/login$/)
  expect((await page.request.get('/api/me')).status()).toBe(401)
  await page
    .getByLabel('Correo electrónico', {exact: true})
    .fill('second@example.test')
  await page
    .getByLabel('Contraseña', {exact: true})
    .fill('Dashboard-test-2026!')
  await page.getByRole('button', {name: 'Ingresar', exact: true}).click()
  await expect(
    page.getByRole('heading', {name: 'Tu sitio, en buenas manos.'}),
  ).toBeVisible()
})
