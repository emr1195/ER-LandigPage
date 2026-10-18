import {test, expect} from './support/fixture.mjs'
import {signIn} from './support/session.mjs'

test('la apariencia sigue a la cuenta entre dispositivos sin perder la edición', async ({
  page,
  browser,
}) => {
  await signIn(page.request)
  await page.goto('/dashboard/heroSection')
  await page
    .getByLabel('Título principal', {exact: true})
    .fill('Un borrador que debe conservarse')
  const appearance = page.getByLabel('Apariencia personal', {exact: true})
  await expect(appearance).toBeVisible()
  await appearance.selectOption('petrol-apricot')
  await expect(page.locator('.admin-app').first()).toHaveAttribute(
    'data-appearance',
    'petrol-apricot',
  )
  await expect(page.getByLabel('Título principal', {exact: true})).toHaveValue(
    'Un borrador que debe conservarse',
  )
  const context = await browser.newContext()
  try {
    await signIn(context.request)
    const otherDevice = await context.newPage()
    await otherDevice.goto('http://127.0.0.1:3410/dashboard')
    await expect(otherDevice.locator('.admin-app').first()).toHaveAttribute(
      'data-appearance',
      'petrol-apricot',
    )
    await context.request.post('http://127.0.0.1:3410/api/auth/sign-out', {
      data: {},
      headers: {Origin: 'http://127.0.0.1:3410'},
    })
    await signIn(context.request, 'second@example.test')
    await otherDevice.reload()
    await expect(otherDevice.locator('.admin-app').first()).toHaveAttribute(
      'data-appearance',
      'carbon-azure',
    )
  } finally {
    await context.close()
  }
})
