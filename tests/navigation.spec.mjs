import {test, expect} from './support/fixture.mjs'
import {signIn} from './support/session.mjs'

test('la navegación móvil oculta sus controles al cerrar y mantiene el foco al abrir', async ({
  page,
}) => {
  await signIn(page.request)
  await page.setViewportSize({width: 390, height: 844})
  await page.goto('/dashboard')
  const menu = page.getByRole('button', {name: 'Abrir navegación', exact: true})
  await menu.focus()
  await page.keyboard.press('Shift+Tab')
  await expect(page.getByRole('link', {name: 'Ir al contenido'})).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(menu).toBeFocused()
  await page.keyboard.press('Enter')
  const navigation = page.getByRole('dialog', {
    name: 'Navegación de administración',
  })
  await expect(navigation).toBeVisible()
  for (let index = 0; index < 16; index++) {
    await page.keyboard.press('Tab')
    expect(
      await navigation.evaluate((element) =>
        element.contains(document.activeElement),
      ),
    ).toBe(true)
  }
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused()
  await menu.click()
  await page.getByRole('link', {name: 'Eventos', exact: true}).click()
  await expect(
    page.getByRole('heading', {name: 'Eventos', level: 1, exact: true}),
  ).toBeVisible()
  await expect(navigation).toBeHidden()
})
