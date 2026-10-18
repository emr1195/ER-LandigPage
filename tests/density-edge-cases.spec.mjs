import {test, expect} from './support/fixture.mjs'
import {signIn} from './support/session.mjs'

test('un error de servidor devuelve al campo de un evento plegado desde el preview móvil', async ({
  page,
}) => {
  await signIn(page.request)
  await page.setViewportSize({width: 375, height: 812})
  await page.goto('/dashboard/events')
  const record = page.locator('details.admin-record').first()
  await record.locator(':scope > summary').click()
  const date = page.getByLabel('Fecha del evento', {exact: true}).first()
  await date.fill('   ')
  await record.locator(':scope > summary').click()
  await page.getByRole('button', {name: 'Vista previa', exact: true}).click()
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(date).toHaveAttribute('aria-invalid', 'true')
  await expect(date).toBeVisible()
  await expect(date).toBeFocused()
  await expect(date).toHaveValue('   ')
  await date.fill('30 de noviembre de 2026')
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
})

test('un error del servidor vuelve a la pestaña de texto de Portada y enfoca el título', async ({
  page,
}) => {
  await signIn(page.request)
  await page.setViewportSize({width: 375, height: 812})
  await page.goto('/dashboard/heroSection')
  const title = page.getByLabel('Título principal', {exact: true})
  await title.fill('   ')
  await page.getByRole('tab', {name: 'Botones', exact: true}).click()
  await page.getByRole('button', {name: 'Vista previa', exact: true}).click()
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(title).toHaveAttribute('aria-invalid', 'true')
  await expect(title).toBeVisible()
  await expect(title).toBeFocused()
  await expect(
    page.getByRole('tab', {name: 'Texto', exact: true}),
  ).toHaveAttribute('aria-selected', 'true')
})

for (const device of ['mobile', 'tablet']) {
  test(`el menú público de Navegación tiene espacio para abrirse en ${device}`, async ({
    page,
  }) => {
    await signIn(page.request)
    await page.setViewportSize({width: 1366, height: 900})
    await page.goto('/dashboard/navbar')
    await page.getByLabel('Dispositivo de vista previa').selectOption(device)
    const preview = page.locator('.admin-preview iframe')
    await expect
      .poll(() => preview.evaluate((element) => element.clientHeight))
      .not.toBe(720)
    const frame = page.frameLocator('.admin-preview iframe')
    await frame.getByRole('button', {name: 'account of current user'}).click()
    const menu = frame.getByRole('menu')
    await expect(menu).toBeVisible()
    await expect
      .poll(() =>
        menu.evaluate(
          (element) => element.parentElement.getBoundingClientRect().height,
        ),
      )
      .toBeGreaterThan(200)
    await expect(menu.getByRole('menuitem').first()).toBeInViewport()
  })
}
