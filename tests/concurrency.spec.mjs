import {test, expect} from './support/fixture.mjs'
import {signIn} from './support/session.mjs'

test('dos administradores que publican la misma revisión no se sobrescriben', async ({
  playwright,
}) => {
  const first = await playwright.request.newContext({
    baseURL: 'http://127.0.0.1:3410',
  })
  const second = await playwright.request.newContext({
    baseURL: 'http://127.0.0.1:3410',
  })
  try {
    await signIn(first)
    await signIn(second, 'second@example.test')
    const a = await first.get('/api/site-sections/history')
    const b = await second.get('/api/site-sections/history')
    const data = await a.json()
    const responses = await Promise.all([
      first.put('/api/site-sections/history', {
        headers: {'If-Match': a.headers().etag},
        data: {...data, title: 'Publicado por el primero'},
      }),
      second.put('/api/site-sections/history', {
        headers: {'If-Match': b.headers().etag},
        data: {...data, title: 'Publicado por el segundo'},
      }),
    ])
    expect(responses.map((response) => response.status()).sort()).toEqual([
      200, 412,
    ])
    const current = await first.get('/api/site-sections/history')
    expect(['Publicado por el primero', 'Publicado por el segundo']).toContain(
      (await current.json()).title,
    )
    expect(current.headers().etag).not.toBe(a.headers().etag)
  } finally {
    await first.dispose()
    await second.dispose()
  }
})

test('el editor conserva el borrador y deja consultar la publicación que causó el conflicto', async ({
  page,
  playwright,
}) => {
  await signIn(page.request)
  await page.goto('/dashboard/heroSection')
  const title = page.getByLabel('Título principal', {exact: true})
  await title.fill('Mi edición pendiente')
  const other = await playwright.request.newContext({
    baseURL: 'http://127.0.0.1:3410',
  })
  try {
    await signIn(other, 'second@example.test')
    const current = await other.get('/api/site-sections/heroSection')
    const data = await current.json()
    expect(
      (
        await other.put('/api/site-sections/heroSection', {
          headers: {'If-Match': current.headers().etag},
          data: {
            ...data,
            textSection: {
              ...data.textSection,
              title: 'Versión del otro administrador',
            },
          },
        })
      ).ok(),
    ).toBeTruthy()
    await page
      .getByRole('button', {name: 'Guardar y publicar', exact: true})
      .click()
    await expect(page.getByRole('alert')).toContainText('Otro administrador')
    await expect(title).toHaveValue('Mi edición pendiente')
    await page.getByRole('button', {name: 'Consultar versión vigente'}).click()
    await expect(
      page.getByRole('heading', {name: 'Versión publicada actual'}),
    ).toBeVisible()
    await expect(title).toHaveValue('Mi edición pendiente')
    await page
      .getByRole('button', {name: 'Descartar y cargar versión vigente'})
      .click()
    await expect(title).toHaveValue('Versión del otro administrador')
  } finally {
    await other.dispose()
  }
})
