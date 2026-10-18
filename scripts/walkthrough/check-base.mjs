// Exercise the built application with Vite's own static preview server.
// This check does not start an API or connect to a database.
import {spawn, execFileSync, spawnSync} from 'node:child_process'
import {readFileSync, mkdirSync, writeFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {chromium, expect} from '@playwright/test'

const origin = 'http://127.0.0.1:3412'
const base = '/demo/'
const output = '.tmp/walkthrough-base.local/dist'
try {
  await fetch(origin, {signal: AbortSignal.timeout(1000)})
  throw new Error('El puerto 3412 está ocupado; no se inició otro servidor.')
} catch (error) {
  if (error.message.includes('ocupado')) throw error
}
execFileSync(process.execPath, ['node_modules/vite/bin/vite.js', 'build', '--base', base, '--outDir', output], {stdio: 'inherit', windowsHide: true})
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--base', base, '--outDir', output, '--host', '127.0.0.1', '--port', '3412', '--strictPort'], {stdio: 'ignore', windowsHide: true})
let browser
try {
  await expect.poll(async () => {
    if (server.exitCode !== null) throw new Error('El servidor de vista previa terminó.')
    try { return (await fetch(origin + base)).ok } catch { return false }
  }, {timeout: 20000}).toBe(true)
  browser = await chromium.launch({channel: 'chrome'})
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  for (const route of ['walkthrough', 'walktrough']) {
    await page.goto(origin + base + route)
    await page.reload()
    await expect(page.getByRole('heading', {name: 'Tu sitio, paso a paso.'})).toBeVisible()
    await expect(page.getByRole('link', {name: /Entrar al dashboard/})).toHaveAttribute('href', base + 'auth/login')
    await expect(page.getByRole('link', {name: 'Volver al sitio'})).toHaveAttribute('href', base)
    const video = page.getByLabel('Recorrido del dashboard')
    await expect.poll(() => video.evaluate(element => element.readyState)).toBeGreaterThan(0)
    await video.evaluate(element => element.play())
    await expect.poll(() => video.evaluate(element => element.currentTime)).toBeGreaterThan(.1)
    await video.evaluate(element => { element.pause(); element.currentTime = 30 })
    await expect.poll(() => video.evaluate(element => element.currentTime)).toBeCloseTo(30, 0)
  }
  const url = origin + base + 'walkthrough/exploradores-walkthrough.mp4'
  const response = await fetch(url)
  expect(response.headers.get('content-type')).toContain('video/mp4')
  const hash = buffer => createHash('sha256').update(buffer).digest('hex')
  const sha256 = hash(Buffer.from(await response.arrayBuffer()))
  expect(sha256).toBe(hash(readFileSync('public/walkthrough/exploradores-walkthrough.mp4')))
  const partial = await fetch(url, {headers: {Range: 'bytes=0-1023'}})
  expect(partial.status).toBe(206)
  expect((await partial.arrayBuffer()).byteLength).toBe(1024)
  mkdirSync('.tmp/walkthrough-base.local/visuals', {recursive: true})
  for (const width of [320, 768, 1024, 1440]) {
    await page.setViewportSize({width, height: 900})
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    const videoBox = await page.getByLabel('Recorrido del dashboard').boundingBox()
    const transcriptBox = await page.getByRole('heading', {name: 'Transcripción en español'}).boundingBox()
    expect(videoBox.width).toBeGreaterThan(Math.min(width * .8, 1100))
    expect(transcriptBox.y).toBeGreaterThan(videoBox.y + videoBox.height)
    await page.screenshot({path: `.tmp/walkthrough-base.local/visuals/player-${width}.png`, fullPage: true})
  }
  expect(errors).toEqual([])
  writeFileSync('.scratch/dashboard-walkthrough/qa/base-path.json', JSON.stringify({base, routes: ['walkthrough', 'walktrough'], reload: true, playback: true, seek: true, mime: 'video/mp4', partial: 206, sha256, widths: [320, 768, 1024, 1440], browserErrors: errors}, null, 2) + '\n')
  console.log('Ruta base verificada: ambas rutas, recarga, reproducción, búsqueda y MP4 idéntico.')
} finally {
  await browser?.close()
  if (server.pid && server.exitCode === null)
    spawnSync('taskkill', ['/PID', String(server.pid), '/T', '/F'], {windowsHide: true, stdio: 'ignore'})
}
