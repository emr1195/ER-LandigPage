import {test, expect} from './support/fixture.mjs'
import {signIn} from './support/session.mjs'

test('Portada conserva la edición al navegar, publica y permite descartar', async ({
  page,
}) => {
  await signIn(page.request)
  await page.goto('/dashboard/heroSection')
  const title = page.getByLabel('Título principal', {exact: true})
  await expect(title).toBeVisible()
  await title.fill('Una portada editada con cuidado')
  await expect(
    page.getByText('Cambios sin guardar', {exact: true}),
  ).toBeVisible()
  await page.getByRole('link', {name: 'Historia', exact: true}).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('button', {name: 'Seguir editando'}).click()
  await expect(title).toHaveValue('Una portada editada con cuidado')
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
  const data = await (
    await page.request.get('/api/site-sections/heroSection')
  ).json()
  expect(data.textSection.title).toBe('Una portada editada con cuidado')
  await title.fill('No publicar este cambio')
  await page.getByRole('button', {name: 'Descartar', exact: true}).click()
  await expect(title).toHaveValue('Una portada editada con cuidado')
})
