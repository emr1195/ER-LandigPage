import {readFile} from 'node:fs/promises'
import {createHash, randomBytes} from 'node:crypto'
import {parse} from 'dotenv'
import pg from 'pg'

// Explicit environments: never point the running local app at the cloud by accident.
const sourceEnv = parse(await readFile('.env', 'utf8'))
const targetEnv = parse(await readFile('.env.neon.local', 'utf8'))
const sourceUrl = new URL(sourceEnv.DATABASE_URL)
const targetUrl = new URL(targetEnv.DATABASE_URL)
if (!['localhost', '127.0.0.1', '[::1]'].includes(sourceUrl.hostname)) throw new Error('El origen debe ser PostgreSQL local.')
if (!targetUrl.hostname.endsWith('.neon.tech')) throw new Error('El destino debe ser Neon.')
// Administrative operations use the direct endpoint, not the transaction pooler.
targetUrl.hostname = targetUrl.hostname.replace('-pooler.', '.')
targetUrl.searchParams.set('sslmode', 'verify-full')
const source = new pg.Pool({connectionString: sourceUrl.href, max: 1, connectionTimeoutMillis: 15000})
const destination = new pg.Pool({connectionString: targetUrl.href, max: 1, connectionTimeoutMillis: 15000})
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
let authPool
try {
  const {rows} = await source.query('select id,data,updated_at,revision from site_sections order by id')
  if (!rows.length) throw new Error('No hay secciones locales para migrar.')
  const allowed = new Set(['navbar', 'heroSection', 'history', 'programStructure', 'expeditionGroup', 'events', 'organization', 'detachment', 'footer'])
  if (rows.some(row => !allowed.has(row.id))) throw new Error('Hay secciones no reconocidas; revisa el contenido antes de copiar.')

  process.env.DATABASE_URL = targetUrl.href
  process.env.DATABASE_SSL = 'false'
  process.env.BETTER_AUTH_SECRET = targetEnv.BETTER_AUTH_SECRET || randomBytes(48).toString('hex')
  const {pool} = await import('../db.js')
  authPool = pool
  const {auth} = await import('../auth.js')
  // eslint-disable-next-line import/no-unresolved
  const {getMigrations} = await import('better-auth/db/migration')
  const {migrateApplication} = await import('../services/migrations.js')
  const {runMigrations} = await getMigrations(auth.options)
  await runMigrations()
  await migrateApplication(destination)

  const client = await destination.connect()
  try {
    await client.query('begin')
    await client.query('lock table site_sections in exclusive mode')
    const existing = await client.query('select id,data from site_sections order by id')
    if (existing.rowCount) {
      if (hash(existing.rows) !== hash(rows.map(({id, data}) => ({id, data})))) throw new Error('Neon ya contiene datos distintos. No se sobrescribió ninguna sección.')
    } else {
      for (const row of rows) await client.query('insert into site_sections (id,data,updated_at,revision,updated_by) values ($1,$2::jsonb,$3,$4,null)', [row.id, JSON.stringify(row.data), row.updated_at, row.revision])
    }
    const copied = await client.query('select id,data from site_sections order by id')
    if (hash(copied.rows) !== hash(rows.map(({id, data}) => ({id, data})))) throw new Error('La verificación no coincide; se canceló la copia.')
    await client.query('commit')
    console.log(JSON.stringify({migrated: true, sections: copied.rowCount, contentVerified: true, localDatabaseChanged: false, accountsCopied: false, images: 'Las rutas se conservaron; los archivos requieren migración de almacenamiento.'}))
  } catch (error) { await client.query('rollback'); throw error } finally { client.release() }
} catch (error) {
  console.error(JSON.stringify({migrated: false, code: error.code, message: String(error.message).replace(/postgres(?:ql)?:\/\/\S+/gi, '[conexión oculta]')}))
  process.exitCode = 1
} finally { await source.end(); await destination.end(); await authPool?.end() }
