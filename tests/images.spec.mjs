import {test, expect} from './support/fixture.mjs'
import {signIn} from './support/session.mjs'

test('una imagen en curso bloquea publicar y la carga completada queda auditada', async ({
  page,
}) => {
  await signIn(page.request)
  await page.goto('/dashboard/heroSection')
  await page
    .getByLabel('Título principal', {exact: true})
    .fill('Portada con imagen nueva')
  await page.getByRole('tab', {name: 'Imágenes', exact: true}).click()
  const upload = page.getByLabel('Subir Imagen superior izquierda', {
    exact: true,
  })
  await expect(upload).toBeAttached()
  let resume
  await page.route('**/api/uploads', (route) => {
    resume = () => route.continue()
  })
  await upload.setInputFiles({
    name: 'prueba.png',
    mimeType: 'image/png',
    buffer: Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jJ1sAAAAASUVORK5CYII=',
      'base64',
    ),
  })
  await expect(page.getByText('Subiendo imagen…', {exact: true})).toBeVisible()
  await expect(
    page.getByRole('button', {name: 'Guardar y publicar', exact: true}),
  ).toBeDisabled()
  await resume()
  await expect(
    page.getByLabel('Imagen superior izquierda', {exact: true}),
  ).toHaveValue(/\/api\/uploads\/files\//)
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
  const {items} = await (await page.request.get('/api/activity')).json()
  expect(
    items.some(
      (item) =>
        item.action === 'upload' && item.actor_email === 'admin@example.test',
    ),
  ).toBeTruthy()
})
