import {test, expect} from './support/fixture.mjs'

test('login editorial valida, muestra contraseña y vuelve a una sección solicitada', async ({
  page,
}) => {
  await page.goto('/dashboard/events')
  await expect(
    page.getByRole('heading', {name: 'Qué bueno tenerte aquí.'}),
  ).toBeVisible()
  await page
    .getByLabel('Correo electrónico', {exact: true})
    .fill('admin@example.test')
  await page.getByLabel('Contraseña', {exact: true}).fill('incorrecta')
  await page.getByRole('button', {name: 'Mostrar contraseña'}).click()
  await expect(page.getByLabel('Contraseña', {exact: true})).toHaveAttribute(
    'type',
    'text',
  )
  await page.getByRole('button', {name: 'Ingresar', exact: true}).click()
  await expect(page.getByRole('alert')).toBeVisible()
  await page
    .getByLabel('Contraseña', {exact: true})
    .fill('Dashboard-test-2026!')
  await page.getByRole('button', {name: 'Ingresar', exact: true}).click()
  await expect(
    page.getByRole('heading', {name: 'Eventos', exact: true}).first(),
  ).toBeVisible()
  await expect(page).toHaveURL(/dashboard\/events$/)
})
