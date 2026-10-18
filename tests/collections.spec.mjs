import {test, expect} from './support/fixture.mjs'
import {signIn} from './support/session.mjs'

test('el pie combina cambios de contacto con una eliminación confirmada sin perder menús', async ({
  page,
}) => {
  await signIn(page.request)
  const before = await (
    await page.request.get('/api/site-sections/footer')
  ).json()
  await page.goto('/dashboard/footer')
  await page
    .getByLabel('Información', {exact: true})
    .first()
    .fill('Contacto actualizado desde el panel')
  const removed = before.aditionalFooterInfo[0]
  const remove = page.getByRole('button', {
    name: 'Eliminar ' + removed.name,
    exact: true,
  })
  await remove.click()
  await page.getByRole('button', {name: 'Cancelar', exact: true}).click()
  await expect(remove).toBeVisible()
  await remove.click()
  await page.getByRole('button', {name: 'Confirmar eliminación'}).click()
  expect(
    (await (await page.request.get('/api/site-sections/footer')).json())
      .aditionalFooterInfo,
  ).toEqual(before.aditionalFooterInfo)
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
  const after = await (
    await page.request.get('/api/site-sections/footer')
  ).json()
  expect(after.mainSection.moreInfo[0].description).toBe(
    'Contacto actualizado desde el panel',
  )
  expect(after.aditionalFooterInfo.some((item) => item.id === removed.id)).toBe(
    false,
  )
  expect(after.menus).toEqual(before.menus)
  expect(after.socialMedia).toEqual(before.socialMedia)
})

test('Organización publica un cambio y una baja manteniendo las otras categorías', async ({
  page,
}) => {
  await signIn(page.request)
  const before = await (
    await page.request.get('/api/site-sections/organization')
  ).json()
  await page.goto('/dashboard/organization')
  await page
    .getByLabel('Nombre del integrante', {exact: true})
    .first()
    .fill('Coordinación editada')
  const removed = before.members.teamNac[0]
  await page
    .getByRole('button', {name: 'Eliminar ' + removed.name, exact: true})
    .click()
  await page.getByRole('button', {name: 'Confirmar eliminación'}).click()
  expect(
    (await (await page.request.get('/api/site-sections/organization')).json())
      .members,
  ).toEqual(before.members)
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
  const after = await (
    await page.request.get('/api/site-sections/organization')
  ).json()
  expect(after.members.coorNac[0].name).toBe('Coordinación editada')
  expect(after.members.teamNac.some((item) => item.id === removed.id)).toBe(
    false,
  )
  expect(after.members.comNac).toEqual(before.members.comNac)
  expect(after.members.cmDist).toEqual(before.members.cmDist)
})

test('Eventos puede eliminar el último elemento sin publicar las bajas por separado', async ({
  page,
}) => {
  await signIn(page.request)
  const before = await (
    await page.request.get('/api/site-sections/events')
  ).json()
  await page.setViewportSize({width: 320, height: 844})
  await page.goto('/dashboard/events')
  await page
    .getByLabel('Título de los eventos', {exact: true})
    .fill('Próximas actividades por anunciar')
  for (const item of before.events) {
    await page
      .getByRole('button', {name: 'Eliminar ' + item.title, exact: true})
      .click()
    await page.getByRole('button', {name: 'Confirmar eliminación'}).click()
  }
  await expect(
    page.getByText('Todavía no hay elementos.', {exact: false}),
  ).toBeVisible()
  expect(
    (await (await page.request.get('/api/site-sections/events')).json()).events,
  ).toEqual(before.events)
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
  const after = await (
    await page.request.get('/api/site-sections/events')
  ).json()
  expect(after.events).toEqual([])
  expect(after.title).toBe('Próximas actividades por anunciar')
})
