import {test, expect} from './support/fixture.mjs'
import {signIn} from './support/session.mjs'

test('la navegación completa cabe en alturas habituales de escritorio', async ({
  page,
}) => {
  await signIn(page.request)
  for (const viewport of [
    {width: 1280, height: 800},
    {width: 1366, height: 768},
    {width: 1280, height: 720},
  ]) {
    await page.setViewportSize(viewport)
    await page.goto('/dashboard/history')
    await expect(page.getByLabel('Apariencia personal')).toBeVisible()
    const size = await page.locator('.admin-sidebar').evaluate((element) => ({
      content: element.scrollHeight,
      available: element.clientHeight,
    }))
    expect(size.content).toBeLessThanOrEqual(size.available + 1)
    await expect(
      page.getByText('Acceso de administrador', {exact: true}),
    ).toBeInViewport()
  }
})

test('Eventos ofrece un resumen compacto, abre la edición y conserva el formato al publicar', async ({
  page,
}) => {
  await signIn(page.request)
  await page.setViewportSize({width: 1366, height: 768})
  const before = await (
    await page.request.get('/api/site-sections/events')
  ).json()
  await page.goto('/dashboard/events')
  const record = page.locator('details.admin-record').first()
  await expect(record).toBeVisible()
  await expect(record).not.toHaveAttribute('open', '')
  await expect(record.locator(':scope > summary')).toContainText(
    before.events[0].date.split(';')[0],
  )
  await record.locator(':scope > summary').click()
  const title = page.getByLabel('Nombre del evento', {exact: true}).first()
  await title.fill('Evento editado en un panel compacto')
  expect((await record.boundingBox()).height).toBeLessThan(650)
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
  const after = await (
    await page.request.get('/api/site-sections/events')
  ).json()
  expect(after.events[0].date).toBe(before.events[0].date)
  expect(after.events[0].title).toBe('Evento editado en un panel compacto')
})

test('el preview encaja un viewport explícito y se amplía sin perder el borrador', async ({
  page,
}) => {
  await signIn(page.request)
  await page.setViewportSize({width: 1366, height: 768})
  await page.goto('/dashboard/heroSection')
  await page
    .getByLabel('Título principal', {exact: true})
    .fill('Borrador conservado al ampliar')
  const preview = page.locator('.admin-preview').first()
  const frame = preview.locator('iframe')
  await expect
    .poll(() => frame.evaluate((element) => element.contentWindow.innerWidth))
    .toBe(1280)
  await preview.getByLabel('Dispositivo de vista previa').selectOption('tablet')
  await expect
    .poll(() => frame.evaluate((element) => element.contentWindow.innerWidth))
    .toBe(768)
  await preview.getByLabel('Dispositivo de vista previa').selectOption('mobile')
  await expect
    .poll(() => frame.evaluate((element) => element.contentWindow.innerWidth))
    .toBe(390)
  const expand = preview.getByRole('button', {name: 'Ampliar vista previa'})
  await expand.click()
  const dialog = page.getByRole('dialog', {name: 'Vista previa ampliada'})
  await expect(dialog).toBeVisible()
  await expect(
    dialog.frameLocator('iframe').getByRole('heading', {
      name: 'Borrador conservado al ampliar',
      exact: true,
    }),
  ).toBeAttached()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(expand).toBeFocused()
  await expect(page.getByLabel('Título principal', {exact: true})).toHaveValue(
    'Borrador conservado al ampliar',
  )
})

test('las acciones de publicación permanecen accesibles durante un formulario largo', async ({
  page,
}) => {
  await signIn(page.request)
  for (const viewport of [
    {width: 1280, height: 720},
    {width: 375, height: 812},
  ]) {
    await page.setViewportSize(viewport)
    await page.goto('/dashboard/history')
    await expect(
      page.getByLabel('Nuestra historia', {exact: true}),
    ).toBeAttached()
    const save = page.getByRole('button', {
      name: 'Guardar y publicar',
      exact: true,
    })
    await expect(save).toBeInViewport()
    await page.locator('.admin-record').last().scrollIntoViewIfNeeded()
    await expect(save).toBeInViewport()
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true)
  }
})

test('la vista ampliada cabe en móvil y mantiene la navegación por teclado', async ({
  page,
}) => {
  await signIn(page.request)
  await page.setViewportSize({width: 320, height: 812})
  await page.goto('/dashboard/heroSection')
  await page.getByRole('button', {name: 'Vista previa', exact: true}).click()
  await page.getByRole('button', {name: 'Ampliar vista previa'}).click()
  const dialog = page.getByRole('dialog', {name: 'Vista previa ampliada'})
  const close = dialog.getByRole('button', {name: 'Cerrar vista ampliada'})
  await expect(close).toBeFocused()
  const device = dialog.getByLabel('Dispositivo de vista ampliada')
  await page.keyboard.press('Tab')
  await expect(device).toBeFocused()
  await device.selectOption('desktop')
  await expect
    .poll(() =>
      dialog
        .locator('iframe')
        .evaluate((element) => element.contentWindow.innerWidth),
    )
    .toBe(1280)
  for (const control of [close, device]) {
    const bounds = await control.boundingBox()
    expect(bounds.x).toBeGreaterThanOrEqual(0)
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(320)
  }
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(
    page.getByRole('button', {name: 'Ampliar vista previa'}),
  ).toBeFocused()
})

test('la vista previa permanece junto al contenido al recorrer Historia', async ({
  page,
}) => {
  await signIn(page.request)
  await page.setViewportSize({width: 1366, height: 768})
  await page.goto('/dashboard/history')
  await expect(page.getByLabel('Nuestra historia', {exact: true})).toBeVisible()
  await page.evaluate(() => scrollTo(0, 500))
  const preview = await page
    .locator('.admin-preview')
    .evaluate((element) => element.getBoundingClientRect().top)
  expect(preview).toBeGreaterThanOrEqual(0)
  expect(preview).toBeLessThanOrEqual(24)
})

test('validar un evento plegado abre y enfoca el campo que falta', async ({
  page,
}) => {
  await signIn(page.request)
  await page.goto('/dashboard/events')
  const record = page.locator('details.admin-record').first()
  await record.locator(':scope > summary').click()
  const title = page.getByLabel('Nombre del evento', {exact: true}).first()
  await title.fill('')
  await record.locator(':scope > summary').click()
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(title).toBeVisible()
  await expect(title).toBeFocused()
  await title.fill('Evento corregido')
  await page
    .getByRole('button', {name: 'Guardar y publicar', exact: true})
    .click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
})
