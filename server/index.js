import 'dotenv/config'
import {existsSync} from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import express from 'express'
// ESLint 8's resolver does not understand this package export subpath.
// eslint-disable-next-line import/no-unresolved
import {toNodeHandler} from 'better-auth/node'
import {auth, googleEnabled} from './auth.js'
import {pool} from './db.js'
import {requireAdmin} from './middleware/auth.js'
import {publicOrigin} from './middleware/publicOrigin.js'
import {notesRouter} from './routes/notes.js'
import {siteSectionsRouter} from './routes/site-sections.js'
import {mapsRouter} from './routes/maps.js'
import {uploadsDirectory, uploadsRouter} from './routes/uploads.js'

const app = express()
const port = Number(process.env.PORT || 3001)
const host = process.env.HOST || '127.0.0.1'
const currentDir = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(currentDir, '../dist')

app.disable('x-powered-by')
// One trusted reverse proxy (Caddy); never expose the app port publicly.
if (process.env.TRUST_PROXY === 'true') app.set('trust proxy', 1)
app.use('/api/site-sections', publicOrigin)

// Los administradores se crean exclusivamente con npm run db:seed-admin.
app.post('/api/auth/sign-up/email', (_req, res) => {
  return res.status(403).json({error: 'El registro publico esta deshabilitado.'})
})

// Better Auth debe recibir el cuerpo sin procesar antes de express.json().
app.all('/api/auth/*', toNodeHandler(auth))

app.use(express.json({limit: '2mb'}))
app.use('/api/maps', mapsRouter)
app.use('/api/uploads/files', express.static(uploadsDirectory, {index: false}))
app.use('/api/uploads', uploadsRouter)

app.get('/api/health', async (_req, res, next) => {
  try {
    await pool.query('select 1')
    return res.json({status: 'ok', database: 'postgresql'})
  } catch (error) {
    return next(error)
  }
})

app.get('/api/config', (_req, res) => {
  return res.json({googleAuthEnabled: googleEnabled})
})

app.get('/api/me', requireAdmin, async (req, res) => {
  return res.json({
    uid: res.locals.authSession.user.id,
    email: res.locals.authSession.user.email,
    displayName: res.locals.authSession.user.name,
    photoURL: res.locals.authSession.user.image || null,
  })
})

app.use('/api/site-sections', siteSectionsRouter)
app.use('/api/notes', notesRouter)
app.use('/api', (_req, res) => res.status(404).json({error: 'Ruta no encontrada.'}))

if (existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get('*', (_req, res) => res.sendFile(path.join(distDir, 'index.html')))
}

app.use((error, _req, res, _next) => {
  console.error(error)
  const statusCandidate = Number(error.statusCode || error.status || 500)
  const status = Number.isInteger(statusCandidate) ? statusCandidate : 500
  return res.status(status).json({
    error: status >= 500 ? 'Error interno del servidor.' : error.message,
  })
})

const server = app.listen(port, host, () => {
  console.log(`API disponible en http://${host}:${port}`)
})

const shutdown = async () => {
  server.close(async () => {
    await pool.end()
    process.exit(0)
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
