import 'dotenv/config'
import {readFile} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
// ESLint 8's resolver does not understand this package export subpath.
// eslint-disable-next-line import/no-unresolved
import {getMigrations} from 'better-auth/db/migration'
import {auth} from '../auth.js'
import {pool} from '../db.js'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const schemaPath = path.resolve(currentDir, '../migrations/001_app_schema.sql')

try {
  const {runMigrations} = await getMigrations(auth.options)
  await runMigrations()

  const applicationSchema = await readFile(schemaPath, 'utf8')
  await pool.query(applicationSchema)
  console.log('Migraciones de autenticacion y aplicacion completadas.')
} finally {
  await pool.end()
}
