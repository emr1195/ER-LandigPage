/** @jest-environment node */
import express from 'express'
import {siteSectionsRouter} from './site-sections'
import {pool} from '../db'

jest.mock('../db', () => ({pool: {query: jest.fn()}}))
jest.mock('../middleware/auth', () => ({requireAdmin: (req, res, next) => {
  if (req.headers.authorization !== 'test-admin') return res.status(401).json({error: 'Debes iniciar sesión.'})
  res.locals.authSession = {user: {email: 'test@example.test'}}
  return next()
}}))

let server
let base
beforeAll(async () => {
  const app = express()
  app.use(express.json())
  app.use('/api/site-sections', siteSectionsRouter)
  await new Promise((resolve) => { server = app.listen(0, '127.0.0.1', resolve) })
  base = `http://127.0.0.1:${server.address().port}`
})
afterAll(async () => { await new Promise((resolve) => { server.closeAllConnections(); server.close(resolve) }) })
beforeEach(() => { pool.query.mockReset() })

const body = {name: 'Nombre de prueba', number: '24', mapsUrl: 'https://www.google.com/maps?q=8.9,-79.5'}
const put = (payload, authorized = true) => fetch(`${base}/api/site-sections/detachment`, {
  method: 'PUT',
  headers: {'Content-Type': 'application/json', ...(authorized ? {Authorization: 'test-admin'} : {})},
  body: JSON.stringify(payload),
})

test('guarda sin logo y genera en el servidor la ubicación que se entrega a PostgreSQL', async () => {
  pool.query.mockImplementation(async (_sql, args) => ({rows: [{id: args[0], data: JSON.parse(args[1])}]}))
  const response = await put({...body, embedUrl: 'https://evil.example'})
  const saved = await response.json()
  expect(response.status).toBe(200)
  expect(saved.data.logo).toBe('')
  expect(saved.data.number).toBe('24')
  expect(saved.data.embedUrl).toContain('https://www.google.com/maps?')
  expect(pool.query.mock.calls[0][1][0]).toBe('detachment')
  expect(pool.query.mock.calls[0][1][2]).toBe('test@example.test')
})

test.each([{...body, name: null}, {...body, number: '?invalid'}, {...body, mapsUrl: 'https://evil.example/maps'}])('rechaza campos inválidos antes de escribir datos', async (payload) => {
  expect((await put(payload)).status).toBe(400)
  expect(pool.query).not.toHaveBeenCalled()
})

test('guarda campos vacíos y asigna identificadores únicos sin exigir número', async () => {
  pool.query.mockImplementation(async (_sql, args) => ({rows: [{id: args[0], data: JSON.parse(args[1])}]}))
  const response = await put({detachments: [{name: '', number: ''}, {name: '', number: ''}]})
  expect(response.status).toBe(200)
  const records = (await response.json()).data.detachments
  expect(records).toHaveLength(2)
  expect(new Set(records.map((record) => record.id)).size).toBe(2)
  expect(records.every((record) => record.name === '' && record.number === '' && record.mapsUrl === '' && record.logo === '')).toBe(true)
})

test('conserva el identificador al vaciar el nombre y el número de un registro', async () => {
  pool.query.mockImplementation(async (_sql, args) => ({rows: [{id: args[0], data: JSON.parse(args[1])}]}))
  const response = await put({detachments: [{id: 'detachment-24', name: '', number: ''}]})
  expect(response.status).toBe(200)
  expect((await response.json()).data.detachments[0].id).toBe('detachment-24')
})

test('acepta un directorio sin ubicaciones ni logos y lo entrega ordenado a PostgreSQL', async () => {
  pool.query.mockImplementation(async (_sql, args) => ({rows: [{id: args[0], data: JSON.parse(args[1])}]}))
  const response = await put({detachments: [{name: 'Oficina Nacional', number: 'ON'}, {name: 'Templo', number: '14'}, {name: 'Catedral', number: '1'}]})
  const saved = await response.json()
  expect(response.status).toBe(200)
  expect(saved.data.detachments.map((item) => item.number)).toEqual(['1', '14', 'ON'])
  expect(saved.data.detachments.every((item) => item.logo === '' && item.mapsUrl === '' && item.embedUrl === '')).toBe(true)
})

test('rechaza números duplicados incluso si incluyen ceros iniciales', async () => {
  const response = await put({detachments: [{name: 'Uno', number: '1'}, {name: 'Otro', number: '01'}]})
  expect(response.status).toBe(400)
  expect(pool.query).not.toHaveBeenCalled()
})

test('exige autenticación para guardar el destacamento', async () => {
  expect((await put(body, false)).status).toBe(401)
  expect(pool.query).not.toHaveBeenCalled()
})

test('permite guardar el directorio vacío al eliminar el último destacamento', async () => {
  pool.query.mockImplementation(async (_sql, args) => ({rows: [{id: args[0], data: JSON.parse(args[1])}]}))
  const response = await put({detachments: []})
  expect(response.status).toBe(200)
  expect((await response.json()).data.detachments).toEqual([])
})
