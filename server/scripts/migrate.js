import 'dotenv/config'
// ESLint 8's resolver does not understand this package export subpath.
// eslint-disable-next-line import/no-unresolved
import {getMigrations} from 'better-auth/db/migration'
import {auth} from '../auth.js'
import {pool} from '../db.js'
import {migrateApplication} from '../services/migrations.js'

try {
  const {runMigrations} = await getMigrations(auth.options)
  await runMigrations()

  await migrateApplication(pool)
  console.log('Migraciones de autenticacion y aplicacion completadas.')
} finally {
  await pool.end()
}
