import {test, expect} from '@playwright/test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const content = JSON.parse(readFileSync(new URL('../src/walkthrough/content.json', import.meta.url), 'utf8'))

test('un visitante abre y recarga el recorrido sin sesión', async ({page}) => {
  const privateRequests = []
  page.on('request', request => {
    if (/\/api\/(me|activity|notes)(\/|\?|$)/.test(request.url())) privateRequests.push(request.url())
  })
  await page.goto('/walkthrough')
  await expect(page.getByRole('heading', {name: 'Tu sitio, paso a paso.'})).toBeVisible()
  await expect(page.getByLabel('Recorrido del dashboard')).toHaveAttribute('controls', '')
  await expect(page.getByRole('link', {name: 'Descargar el video'})).toHaveAttribute('href', /exploradores-walkthrough\.mp4$/)
  await page.reload()
  await expect(page.getByRole('heading', {name: 'Tu sitio, paso a paso.'})).toBeVisible()
  await page.goto('/walktrough')
  await page.reload()
  await expect(page.getByRole('heading', {name: 'Tu sitio, paso a paso.'})).toBeVisible()
  await expect(page.getByRole('heading', {name: 'Transcripción en español'})).toBeVisible()
  expect(privateRequests).toEqual([])
})

test('reproduce, pausa, busca capítulos y descarga el mismo MP4', async ({page}) => {
  await page.goto('/walkthrough')
  const video = page.getByLabel('Recorrido del dashboard')
  await expect.poll(() => video.evaluate(element => element.readyState)).toBeGreaterThan(0)
  await video.evaluate(element => element.play())
  await expect.poll(() => video.evaluate(element => element.currentTime)).toBeGreaterThan(0.1)
  await video.evaluate(element => element.pause())
  expect(await video.evaluate(element => element.paused)).toBe(true)
  for (const index of [2, content.chapters.length - 1]) {
    const chapter = content.chapters[index]
    await page.getByRole('button', {name: `Ir a ${chapter.title}`, exact: true}).click()
    await expect.poll(() => video.evaluate(element => element.currentTime)).toBeCloseTo(chapter.start, 0)
    await expect(video).toBeFocused()
  }
  expect(await video.evaluate(element => typeof element.requestFullscreen)).toBe('function')
  await video.evaluate(element => element.requestFullscreen())
  expect(await page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true)
  await page.evaluate(() => document.exitFullscreen())
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('link', {name: 'Descargar el video'}).click()
  const download = await downloadPromise
  const hash = buffer => createHash('sha256').update(buffer).digest('hex')
  expect(hash(readFileSync(await download.path()))).toBe(hash(readFileSync('public/walkthrough/exploradores-walkthrough.mp4')))
})

for (const width of [320, 768, 1024, 1440]) {
  test(`teclado, transcripción y enlaces a ${width}px`, async ({page}) => {
    await page.setViewportSize({width, height: 900})
    await page.goto('/walkthrough')
    await expect(page.getByRole('heading', {name: 'Tu sitio, paso a paso.'})).toBeVisible()
    const videoBox = await page.getByLabel('Recorrido del dashboard').boundingBox()
    const transcriptBox = await page.getByRole('heading', {name: 'Transcripción en español'}).boundingBox()
    expect(videoBox.width).toBeGreaterThan(Math.min(width * .8, 1100))
    expect(transcriptBox.y).toBeGreaterThan(videoBox.y + videoBox.height)
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', {name: 'Ir al video'})).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', {name: 'Exploradores del Rey', exact: true})).toBeFocused()
    await expect(page.getByRole('link', {name: /Entrar al dashboard/})).toHaveAttribute('href', '/auth/login')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.getByRole('button', {name: `Ir a ${content.chapters[1].title}`, exact: true}).focus()
    await page.keyboard.press('Enter')
    await expect(page.getByLabel('Recorrido del dashboard')).toBeFocused()
    await page.getByRole('link', {name: 'Volver al sitio'}).click()
    await expect(page).toHaveURL(/\/$/)
  })
}

test('un error del archivo conserva la descarga y la transcripción', async ({page}) => {
  await page.route('**/exploradores-walkthrough.mp4', route => route.abort())
  await page.goto('/walkthrough')
  await expect(page.getByRole('alert')).toContainText('No se pudo cargar el video')
  await expect(page.getByRole('link', {name: 'Descargar el video'})).toBeVisible()
  await expect(page.getByRole('heading', {name: 'Transcripción en español'})).toBeVisible()
})

test('la portada y el acceso al dashboard no solicitan el video', async ({page}) => {
  const requested = []
  page.on('request', request => {
    if (request.url().includes('/walkthrough/')) requested.push(request.url())
  })
  for (const route of ['/', '/auth/login']) {
    await page.goto(route)
    await expect(page.getByRole('heading').first()).toBeVisible()
    await page.waitForLoadState('networkidle')
  }
  expect(requested).toEqual([])
})

test('Express reproduce el artefacto revisado y permite solicitudes parciales', async ({request, page}) => {
  // npm run test:e2e builds dist before starting the actual application server.
  const url = 'http://127.0.0.1:3411/walkthrough/exploradores-walkthrough.mp4'
  const response = await request.get(url)
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toContain('video/mp4')
  const expected = readFileSync('public/walkthrough/exploradores-walkthrough.mp4')
  expect(createHash('sha256').update(await response.body()).digest('hex')).toBe(createHash('sha256').update(expected).digest('hex'))
  const partial = await request.get(url, {headers: {Range: 'bytes=1000-2023'}})
  expect(partial.status()).toBe(206)
  expect(partial.headers()['content-range']).toBe(`bytes 1000-2023/${expected.length}`)
  expect(await partial.body()).toEqual(expected.subarray(1000, 2024))
  for (const route of ['walkthrough', 'walktrough']) {
    await page.goto(`http://127.0.0.1:3411/${route}`)
    await page.reload()
    await expect(page.getByRole('heading', {name: 'Tu sitio, paso a paso.'})).toBeVisible()
    const video = page.getByLabel('Recorrido del dashboard')
    await video.evaluate(element => element.play())
    await expect.poll(() => video.evaluate(element => element.currentTime)).toBeGreaterThan(.1)
    await video.evaluate(element => { element.pause(); element.currentTime = 40 })
    await expect.poll(() => video.evaluate(element => element.currentTime)).toBeCloseTo(40, 0)
  }
})
