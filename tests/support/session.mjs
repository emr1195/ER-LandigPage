import {expect} from '@playwright/test'

export const signIn = async (request, email = 'admin@example.test') => {
  const response = await request.post(
    'http://127.0.0.1:3410/api/auth/sign-in/email',
    {
      data: {email, password: 'Dashboard-test-2026!'},
      headers: {Origin: 'http://127.0.0.1:3410'},
    },
  )
  expect(response.ok()).toBeTruthy()
}

export const sectionLabels = {
  navbar: 'Menú de navegación',
  heroSection: 'Portada',
  history: 'Historia',
  programStructure: 'Programa',
  expeditionGroup: 'Grupos',
  events: 'Eventos',
  organization: 'Organización',
  detachment: 'Destacamentos',
  footer: 'Pie de página',
}

export const openFirstRecord = async (page) => {
  const record = page.locator('details.admin-record').first()
  await expect(record).toBeVisible()
  if (!(await record.evaluate((element) => element.open)))
    await record.locator(':scope > summary').click()
}
