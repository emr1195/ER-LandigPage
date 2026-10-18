import {test, expect} from './support/fixture.mjs'
import {signIn, sectionLabels} from './support/session.mjs'

test('el administrador abre las nueve secciones por URL y conserva la selección al recargar', async ({
  page,
}) => {
  await signIn(page.request)
  await page.goto('/dashboard')
  await expect(
    page.getByRole('heading', {name: 'Tu sitio, en buenas manos.'}),
  ).toBeVisible()
  for (const [key, label] of Object.entries(sectionLabels)) {
    await page.goto(`/dashboard/${key}`)
    await expect(
      page.getByRole('heading', {name: label, exact: true}).first(),
    ).toBeVisible()
  }
  await page.reload()
  await expect(
    page.getByRole('heading', {name: 'Pie de página', exact: true}).first(),
  ).toBeVisible()
})
