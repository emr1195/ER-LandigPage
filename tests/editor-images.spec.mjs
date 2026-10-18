import {test, expect} from './support/fixture.mjs'
import {signIn, openFirstRecord} from './support/session.mjs'

const file = {
  name: 'editor.png',
  mimeType: 'image/png',
  buffer: Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jJ1sAAAAASUVORK5CYII=',
    'base64',
  ),
}
const cases = [
  ['navbar', 'Logo del sitio', ['logo']],
  ['footer', 'Logo del pie', ['mainSection', 'logo']],
  ['history', 'Imagen izquierda de Historia', ['imageSection', 'imageLeft']],
  ['programStructure', 'Imagen del valor', ['programValues', 0, 'image']],
  ['expeditionGroup', 'Fotografía del grupo', ['expeditionGroups', 0, 'image']],
  ['events', 'Imagen del evento', ['events', 0, 'image']],
  [
    'organization',
    'Fotografía del integrante',
    ['members', 'coorNac', 0, 'image'],
  ],
  [
    'detachment',
    'Logo del destacamento (opcional)',
    ['detachments', 0, 'logo'],
  ],
]
for (const [section, label, path] of cases) {
  test(`${section}: vincula la imagen al campo correcto y publica con auditoría desde móvil`, async ({
    page,
  }) => {
    await signIn(page.request)
    await page.setViewportSize({width: 390, height: 844})
    await page.goto('/dashboard/' + section)
    if (section === 'events') await openFirstRecord(page)
    await page
      .getByLabel('Subir ' + label, {exact: true})
      .first()
      .setInputFiles(file)
    const url = page.getByLabel(label, {exact: true}).first()
    await expect(url).toHaveValue(/\/api\/uploads\/files\//)
    const uploaded = await url.inputValue()
    await page
      .getByRole('button', {name: 'Guardar y publicar', exact: true})
      .click()
    await expect(
      page.getByRole('status').filter({hasText: 'Contenido publicado'}),
    ).toBeVisible()
    const saved = await (
      await page.request.get('/api/site-sections/' + section)
    ).json()
    expect(path.reduce((value, key) => value[key], saved)).toBe(uploaded)
    const activity = (await (await page.request.get('/api/activity')).json())
      .items
    const event = activity.find(
      (item) => item.action === 'publication' && item.section_key === section,
    )
    const detail = await (
      await page.request.get('/api/activity/' + event.id)
    ).json()
    expect(path.reduce((value, key) => value[key], detail.after)).toBe(uploaded)
    await page.getByRole('button', {name: 'Vista previa', exact: true}).click()
    await expect
      .poll(() =>
        page
          .frameLocator('iframe')
          .locator('*')
          .evaluateAll(
            (elements, url) =>
              elements.some(
                (element) =>
                  element.getAttribute('src') === url ||
                  getComputedStyle(element).backgroundImage.includes(url),
              ),
            uploaded,
          ),
      )
      .toBe(true)
  })
}
