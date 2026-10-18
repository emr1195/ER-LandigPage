import {test, expect} from './support/fixture.mjs'
import {signIn, openFirstRecord} from './support/session.mjs'

test('Navegación conserva sus enlaces al actualizar la identidad del sitio', async ({
  page,
}) => {
  await signIn(page.request)
  const original = await (
    await page.request.get('/api/site-sections/navbar')
  ).json()
  await page.goto('/dashboard/navbar')
  const field = page.getByLabel('Texto junto al logo', {exact: true})
  await expect(field).toBeVisible()
  await field.fill('Nuestra comunidad de exploradores')
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
  const saved = await (
    await page.request.get('/api/site-sections/navbar')
  ).json()
  expect(saved.logoTitle).toBe('Nuestra comunidad de exploradores')
  expect(saved.listMenu).toEqual(original.listMenu)
})

test('Pie de página permite editar contacto y mantiene las colecciones vecinas', async ({
  page,
}) => {
  await signIn(page.request)
  const before = await (
    await page.request.get('/api/site-sections/footer')
  ).json()
  await page.goto('/dashboard/footer')
  const field = page.getByLabel('Nombre junto al logo del pie', {exact: true})
  await expect(field).toBeVisible()
  await field.fill('Exploradores en comunidad')
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
  const after = await (
    await page.request.get('/api/site-sections/footer')
  ).json()
  expect(after.mainSection.logoTitle).toBe('Exploradores en comunidad')
  expect(after.menus).toEqual(before.menus)
  expect(after.socialMedia).toEqual(before.socialMedia)
  expect(after.aditionalFooterInfo).toEqual(before.aditionalFooterInfo)
})

test('Historia conserva sus imágenes y publica el relato editado', async ({
  page,
}) => {
  await signIn(page.request)
  const before = await (
    await page.request.get('/api/site-sections/history')
  ).json()
  await page.goto('/dashboard/history')
  const field = page.getByLabel('Nuestra historia', {exact: true})
  await expect(field).toBeVisible()
  await field.fill('Un primer capítulo;Un segundo capítulo para compartir')
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
  const after = await (
    await page.request.get('/api/site-sections/history')
  ).json()
  expect(after.description).toBe(
    'Un primer capítulo;Un segundo capítulo para compartir',
  )
  expect(after.imageSection).toEqual(before.imageSection)
  expect(after.infoSection).toEqual(before.infoSection)
})

test('Programa permite cambiar un valor conservando los demás y su identidad', async ({
  page,
}) => {
  await signIn(page.request)
  const before = await (
    await page.request.get('/api/site-sections/programStructure')
  ).json()
  await page.goto('/dashboard/programStructure')
  const field = page.getByLabel('Nombre del valor', {exact: true}).first()
  await expect(field).toBeVisible()
  await field.fill('Aprender con propósito')
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
  const after = await (
    await page.request.get('/api/site-sections/programStructure')
  ).json()
  expect(after.programValues[0].title).toBe('Aprender con propósito')
  expect(after.programValues[0].id).toBe(before.programValues[0].id)
  expect(after.programValues.slice(1)).toEqual(before.programValues.slice(1))
})

test('Grupos combina una edición y una eliminación pendiente sin perder otros grupos', async ({
  page,
}) => {
  await signIn(page.request)
  const before = await (
    await page.request.get('/api/site-sections/expeditionGroup')
  ).json()
  await page.goto('/dashboard/expeditionGroup')
  const field = page.getByLabel('Nombre del grupo', {exact: true}).first()
  await expect(field).toBeVisible()
  await field.fill('Grupo actualizado')
  const removing = before.expeditionGroups[1]
  await page.locator('summary').filter({hasText: removing.title}).click()
  await page
    .getByRole('button', {name: 'Eliminar ' + removing.title, exact: true})
    .click()
  await page.getByRole('button', {name: 'Confirmar eliminación'}).click()
  expect(
    (
      await (
        await page.request.get('/api/site-sections/expeditionGroup')
      ).json()
    ).expeditionGroups,
  ).toHaveLength(before.expeditionGroups.length)
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
  const saved = await (
    await page.request.get('/api/site-sections/expeditionGroup')
  ).json()
  expect(saved.expeditionGroups[0].title).toBe('Grupo actualizado')
  expect(saved.expeditionGroups.some((item) => item.id === removing.id)).toBe(
    false,
  )
  expect(
    saved.expeditionGroups.some(
      (item) => item.id === before.expeditionGroups[2].id,
    ),
  ).toBe(true)
})

test('Eventos se edita en móvil conservando la hora y los otros eventos', async ({
  page,
}) => {
  await signIn(page.request)
  const before = await (
    await page.request.get('/api/site-sections/events')
  ).json()
  await page.setViewportSize({width: 390, height: 844})
  await page.goto('/dashboard/events')
  await openFirstRecord(page)
  const title = page.getByLabel('Nombre del evento', {exact: true}).first()
  await expect(title).toBeVisible()
  await title.fill('Encuentro de nuestra comunidad')
  await page
    .getByLabel('Fecha del evento', {exact: true})
    .first()
    .fill('30 de noviembre de 2026')
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
  const after = await (
    await page.request.get('/api/site-sections/events')
  ).json()
  expect(after.events[0].title).toBe('Encuentro de nuestra comunidad')
  expect(after.events[0].date).toBe(
    '30 de noviembre de 2026;' +
      before.events[0].date.split(';').slice(1).join(';'),
  )
  expect(after.events.slice(1)).toEqual(before.events.slice(1))
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
})

test('Organización modifica un integrante y conserva las otras categorías', async ({
  page,
}) => {
  await signIn(page.request)
  const before = await (
    await page.request.get('/api/site-sections/organization')
  ).json()
  await page.goto('/dashboard/organization')
  const field = page.getByLabel('Nombre del integrante', {exact: true}).first()
  await expect(field).toBeVisible()
  await field.fill('Ana Comunidad')
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
  const after = await (
    await page.request.get('/api/site-sections/organization')
  ).json()
  expect(after.members.coorNac[0].name).toBe('Ana Comunidad')
  expect(after.members.coorNac[0].id).toBe(before.members.coorNac[0].id)
  expect(after.members.teamNac).toEqual(before.members.teamNac)
  expect(after.members.comNac).toEqual(before.members.comNac)
  expect(after.members.cmDist).toEqual(before.members.cmDist)
})
