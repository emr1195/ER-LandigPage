import {test, expect} from './support/fixture.mjs'
import {signIn} from './support/session.mjs'

test('reingresar con otra cuenta no recibe ni publica el borrador anterior', async ({
  page,
}) => {
  await signIn(page.request)
  await page.goto('/dashboard/heroSection')
  await page
    .getByLabel('Título principal', {exact: true})
    .fill('Borrador privado de la primera cuenta')
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
    .fill('second@example.test')
  await page.getByLabel('Contraseña', {exact: true}).fill('incorrecta')
  await page.getByRole('button', {name: 'Ingresar', exact: true}).click()
  await expect(page.getByRole('dialog').getByRole('alert')).toContainText(
    'no son correctos',
  )
  await page
    .getByLabel('Contraseña', {exact: true})
    .fill('Dashboard-test-2026!')
  await page.getByRole('button', {name: 'Ingresar', exact: true}).click()
  await expect(
    page.getByRole('heading', {name: 'Vuelve a ingresar.'}),
  ).toBeHidden()
  await expect(
    page.getByLabel('Título principal', {exact: true}),
  ).not.toHaveValue('Borrador privado de la primera cuenta')
  await expect(
    page.getByRole('button', {name: 'Guardar y publicar', exact: true}),
  ).toBeDisabled()
})

test('el retorno simulado de Google conserva el borrador de esta pestaña sin publicar', async ({
  page,
}) => {
  await signIn(page.request)
  await page.route('**/api/config', (route) =>
    route.fulfill({json: {googleAuthEnabled: true}}),
  )
  await page.goto('/dashboard/heroSection')
  await page
    .getByLabel('Título principal', {exact: true})
    .fill('Continuidad por redirección de Google')
  await page.request.post('/api/auth/sign-out', {
    data: {},
    headers: {Origin: 'http://127.0.0.1:3410'},
  })
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await page.route('**/api/auth/sign-in/social', async (route) => {
    const body = route.request().postDataJSON()
    expect(body.provider).toBe('google')
    expect(body.callbackURL).toBe('http://127.0.0.1:3410/dashboard/heroSection')
    await signIn(page.request)
    await route.fulfill({json: {url: body.callbackURL, redirect: true}})
  })
  await page.getByRole('button', {name: 'Continuar con Google'}).click()
  await expect(
    page.getByRole('heading', {name: 'Vuelve a ingresar.'}),
  ).toBeHidden()
  await expect(page.getByLabel('Título principal', {exact: true})).toHaveValue(
    'Continuidad por redirección de Google',
  )
  await expect(
    page.getByRole('button', {name: 'Guardar y publicar', exact: true}),
  ).toBeEnabled()
  expect(
    (await (await page.request.get('/api/site-sections/heroSection')).json())
      .textSection.title,
  ).not.toBe('Continuidad por redirección de Google')
})

test('Google mantiene un destino permitido y ofrece reintento ante un fallo del proveedor', async ({
  page,
}) => {
  await page.route('**/api/config', (route) =>
    route.fulfill({json: {googleAuthEnabled: true}}),
  )
  await page.goto('/auth/login?returnTo=/dashboard/events')
  let callback
  await page.route('**/api/auth/sign-in/social', async (route) => {
    callback = route.request().postDataJSON().callbackURL
    await route.fulfill({
      status: 503,
      json: {message: 'Proveedor temporalmente no disponible'},
    })
  })
  await page.getByRole('button', {name: 'Continuar con Google'}).click()
  await expect(page.getByRole('alert')).toContainText(
    'No pudimos iniciar con Google',
  )
  await expect(
    page.getByRole('button', {name: 'Continuar con Google'}),
  ).toBeEnabled()
  expect(callback).toBe('http://127.0.0.1:3410/dashboard/events')
})
