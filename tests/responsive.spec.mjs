import {test, expect} from './support/fixture.mjs'
import {signIn} from './support/session.mjs'
import {mkdir} from 'node:fs/promises'

const sections = [
  'navbar',
  'heroSection',
  'history',
  'programStructure',
  'expeditionGroup',
  'events',
  'organization',
  'detachment',
  'footer',
]
const directory = '.tmp/dashboard-test.local/visuals'
for (const appearance of ['carbon-azure', 'petrol-apricot']) {
  test(`${appearance}: inicio, nueve editores y actividad se adaptan a cuatro anchos y zoom equivalente 200 %`, async ({
    page,
  }) => {
    test.setTimeout(180000)
    await signIn(page.request)
    expect(
      (
        await page.request.put('/api/me/preferences', {data: {appearance}})
      ).ok(),
    ).toBeTruthy()
    await mkdir(directory, {recursive: true})
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    for (const width of [320, 390, 768, 1024, 1440, 720]) {
      await page.setViewportSize({width, height: width === 720 ? 450 : 960})
      for (const section of ['', ...sections, 'activity']) {
        await page.goto('/dashboard' + (section ? '/' + section : ''))
        await expect(page.locator('.admin-app')).toHaveAttribute(
          'data-appearance',
          appearance,
        )
        await expect(page.locator('h1')).toBeVisible()
        if (sections.includes(section)) {
          await expect(page.locator('form fieldset')).toBeVisible()
          await expect(
            page
              .frameLocator('iframe')
              .locator('[aria-label="Contenido de la vista previa"]'),
          ).toBeAttached()
        }
        const overflow = await page.evaluate(() => ({
          document: document.documentElement.scrollWidth > innerWidth + 1,
          controls: [
            ...document.querySelectorAll(
              '.admin-main input,.admin-main textarea,.admin-main button',
            ),
          ]
            .filter(
              (element) =>
                element.getClientRects().length &&
                getComputedStyle(element).visibility !== 'hidden',
            )
            .filter((element) => {
              const box = element.getBoundingClientRect()
              return box.left < -1 || box.right > innerWidth + 1
            })
            .map(
              (element) =>
                element.getAttribute('aria-label') || element.textContent,
            ),
        }))
        expect(overflow, `${appearance}, ${width}px, ${section}`).toEqual({
          document: false,
          controls: [],
        })
        if (
          ['', 'heroSection', 'activity'].includes(section) &&
          [320, 768, 1440].includes(width)
        )
          await page.screenshot({
            path: `${directory}/${appearance}-${section || 'inicio'}-${width}.png`,
            fullPage: true,
          })
      }
    }
    expect(errors).toEqual([])
  })
}

test('login adaptable y la apariencia administrativa no modifica el tema público', async ({
  page,
  browser,
}) => {
  test.setTimeout(90000)
  await mkdir(directory, {recursive: true})
  for (const width of [320, 390, 768, 1440, 720]) {
    await page.setViewportSize({width, height: 960})
    await page.goto('/auth/login')
    await expect(
      page.getByRole('heading', {name: 'Qué bueno tenerte aquí.'}),
    ).toBeVisible()
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true)
    await page.screenshot({
      path: `${directory}/login-${width}.png`,
      fullPage: true,
    })
  }
  await signIn(page.request)
  const publicContext = await browser.newContext({
    viewport: {width: 1440, height: 960},
  })
  const publicPage = await publicContext.newPage()
  try {
    const colors = []
    for (const appearance of ['carbon-azure', 'petrol-apricot']) {
      await page.request.put('/api/me/preferences', {data: {appearance}})
      await publicPage.goto('http://127.0.0.1:3410/')
      await expect(publicPage.locator('.Header')).toBeVisible()
      colors.push(
        await publicPage.locator('.Header').evaluate((element) => ({
          background: getComputedStyle(element).backgroundColor,
          text: getComputedStyle(element).color,
        })),
      )
      expect(await publicPage.locator('.admin-app').count()).toBe(0)
    }
    expect(colors[0]).toEqual(colors[1])
  } finally {
    await publicContext.close()
  }
})
