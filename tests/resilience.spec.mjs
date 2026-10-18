import {test, expect} from './support/fixture.mjs'
import {signIn} from './support/session.mjs'
import pg from 'pg'

test('descartar carga la publicación vigente y conserva la edición si falla la lectura', async ({
  page,
}) => {
  await signIn(page.request)
  await page.goto('/dashboard/heroSection')
  const title = page.getByLabel('Título principal', {exact: true})
  await title.fill('Edición local protegida')
  const current = await page.request.get('/api/site-sections/heroSection')
  const data = await current.json()
  expect(
    (
      await page.request.put('/api/site-sections/heroSection', {
        headers: {'If-Match': current.headers().etag},
        data: {
          ...data,
          textSection: {...data.textSection, title: 'Nueva publicación remota'},
        },
      })
    ).ok(),
  ).toBeTruthy()
  await page.route('**/api/site-sections/heroSection', (route) => route.abort())
  await page.getByRole('button', {name: 'Descartar', exact: true}).click()
  await expect(page.getByRole('alert')).toBeVisible()
  await expect(title).toHaveValue('Edición local protegida')
  await page.unroute('**/api/site-sections/heroSection')
  await page.getByRole('button', {name: 'Descartar', exact: true}).click()
  await expect(title).toHaveValue('Nueva publicación remota')
})

test('una respuesta perdida se reconcilia sin publicar dos veces', async ({
  page,
}) => {
  await signIn(page.request)
  await page.goto('/dashboard/heroSection')
  await page
    .getByLabel('Título principal', {exact: true})
    .fill('Confirmación de guardado perdida')
  let writes = 0
  await page.route('**/api/site-sections/heroSection', async (route) => {
    if (route.request().method() !== 'PUT') return route.continue()
    writes++
    expect((await route.fetch()).ok()).toBeTruthy()
    await route.abort('failed')
  })
  const save = page.getByRole('button', {
    name: 'Guardar y publicar',
    exact: true,
  })
  await save.click()
  await expect(page.getByRole('alert')).toBeVisible()
  await save.click()
  await expect(
    page
      .getByRole('status')
      .filter({hasText: 'Confirmamos el guardado anterior'}),
  ).toBeVisible()
  expect(writes).toBe(1)
})

test('editar después de perder la respuesta usa la base confirmada sin conflicto consigo mismo', async ({
  page,
}) => {
  await signIn(page.request)
  await page.goto('/dashboard/heroSection')
  const title = page.getByLabel('Título principal', {exact: true})
  await title.fill('Primer cambio sin respuesta')
  let writes = 0
  await page.route('**/api/site-sections/heroSection', async (route) => {
    if (route.request().method() !== 'PUT') return route.continue()
    writes++
    if (writes === 1) {
      await route.fetch()
      return route.abort('failed')
    }
    return route.continue()
  })
  const save = page.getByRole('button', {
    name: 'Guardar y publicar',
    exact: true,
  })
  await save.click()
  await expect(page.getByRole('alert')).toBeVisible()
  await title.fill('Segundo cambio después de la respuesta perdida')
  await save.click()
  await expect(
    page.getByRole('status').filter({hasText: 'Contenido publicado'}),
  ).toBeVisible()
  expect(writes).toBe(2)
  expect(
    (await (await page.request.get('/api/site-sections/heroSection')).json())
      .textSection.title,
  ).toBe('Segundo cambio después de la respuesta perdida')
})

test('crear una sección ausente también tiene un único ganador', async ({
  request,
  playwright,
}) => {
  const control = new pg.Pool({
    connectionString:
      'postgresql://test_admin@127.0.0.1:55439/er_dashboard_test',
  })
  const previous = (
    await control.query("select data from site_sections where id='history'")
  ).rows[0]?.data
  const other = await playwright.request.newContext({
    baseURL: 'http://127.0.0.1:3410',
  })
  try {
    await signIn(request)
    await signIn(other, 'second@example.test')
    await control.query("delete from site_sections where id='history'")
    const current = await request.get('/api/site-sections/history')
    expect(current.headers().etag).toBe('"0"')
    const data = {
      title: 'Nueva historia',
      description: 'Nuestra historia',
      infoSection: [],
    }
    const responses = await Promise.all(
      [request, other].map((client) =>
        client.put('/api/site-sections/history', {
          headers: {'If-Match': '"0"'},
          data,
        }),
      ),
    )
    expect(responses.map((response) => response.status()).sort()).toEqual([
      200, 412,
    ])
  } finally {
    if (previous)
      await control.query(
        "update site_sections set data=$1 where id='history'",
        [previous],
      )
    await control.end()
    await other.dispose()
  }
})

test('la actividad pagina sin repetir registros y rechaza cursores inválidos', async ({
  request,
}) => {
  await signIn(request)
  for (let index = 0; index < 21; index++) {
    const current = await request.get('/api/site-sections/history')
    expect(
      (
        await request.put('/api/site-sections/history', {
          headers: {'If-Match': current.headers().etag},
          data: {
            ...(await current.json()),
            title: 'Historial paginado ' + index,
          },
        })
      ).ok(),
    ).toBeTruthy()
  }
  const first = await (await request.get('/api/activity')).json()
  const second = await (
    await request.get('/api/activity?cursor=' + first.nextCursor)
  ).json()
  expect(first.items).toHaveLength(20)
  expect(second.items.length).toBeGreaterThan(0)
  expect(
    new Set([...first.items, ...second.items].map((item) => item.id)).size,
  ).toBe(first.items.length + second.items.length)
  for (const query of [
    'cursor=9999999999999999999',
    'cursor[]=1',
    'cursor=x',
    'cursor=',
  ])
    expect((await request.get('/api/activity?' + query)).status()).toBe(400)
})

test('un menú vacío válido no rompe su vista previa pública', async ({
  page,
}) => {
  await page.setViewportSize({width: 390, height: 844})
  await signIn(page.request)
  const current = await page.request.get('/api/site-sections/navbar')
  const data = await current.json()
  try {
    expect(
      (
        await page.request.put('/api/site-sections/navbar', {
          headers: {'If-Match': current.headers().etag},
          data: {...data, listMenu: []},
        })
      ).ok(),
    ).toBeTruthy()
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto('/dashboard/navbar')
    await page.getByRole('button', {name: 'Vista previa', exact: true}).click()
    await expect(page.frameLocator('iframe').locator('.Header')).toBeVisible()
    expect(errors).toEqual([])
  } finally {
    const latest = await page.request.get('/api/site-sections/navbar')
    await page.request.put('/api/site-sections/navbar', {
      headers: {'If-Match': latest.headers().etag},
      data,
    })
  }
})
