import {test, expect} from './support/fixture.mjs'
import {signIn} from './support/session.mjs'

test('Destacamentos mantiene una eliminación pendiente junto a otras ediciones', async ({
  page,
}) => {
  await signIn(page.request)
  const before = await (
    await page.request.get('/api/site-sections/detachment')
  ).json()
  await page.goto('/dashboard/detachment')
  const field = page
    .getByLabel('Nombre del destacamento', {exact: true})
    .first()
  await expect(field).toBeVisible()
  await field.fill('Destacamento renombrado')
  const removed = before.detachments[1]
  await page.locator('summary').filter({hasText: removed.name}).click()
  await page
    .getByRole('button', {name: 'Eliminar ' + removed.name, exact: true})
    .click()
  await page.getByRole('button', {name: 'Confirmar eliminación'}).click()
  const stillPublic = await (
    await page.request.get('/api/site-sections/detachment')
  ).json()
  expect(stillPublic.detachments).toEqual(before.detachments)
  await expect(field).toHaveValue('Destacamento renombrado')
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
  const saved = await (
    await page.request.get('/api/site-sections/detachment')
  ).json()
  expect(
    saved.detachments.find((row) => row.id === before.detachments[0].id).name,
  ).toBe('Destacamento renombrado')
  expect(saved.detachments.some((row) => row.id === removed.id)).toBe(false)
  expect(
    saved.detachments.find((row) => row.id === before.detachments[2].id).logo,
  ).toBe(before.detachments[2].logo)
})
