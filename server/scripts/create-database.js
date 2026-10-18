import 'dotenv/config'
import pg from 'pg'

const {Client} = pg
const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('Falta DATABASE_URL en el archivo .env')
}

const targetUrl = new URL(databaseUrl)
const databaseName = decodeURIComponent(targetUrl.pathname.replace(/^\//, ''))

if (!/^[A-Za-z_][A-Za-z0-9_-]*$/.test(databaseName)) {
  throw new Error('El nombre de la base en DATABASE_URL no es valido.')
}

const maintenanceUrl = new URL(targetUrl)
maintenanceUrl.pathname = '/postgres'

const client = new Client({
  connectionString: maintenanceUrl.toString(),
  ssl:
    process.env.DATABASE_SSL === 'true'
      ? {rejectUnauthorized: false}
      : undefined,
})

try {
  await client.connect()
  const existing = await client.query(
    'select 1 from pg_database where datname = $1',
    [databaseName],
  )

  if (existing.rowCount) {
    console.log(`La base ${databaseName} ya existe.`)
  } else {
    await client.query(`create database "${databaseName}"`)
    console.log(`Base creada: ${databaseName}`)
  }
} finally {
  await client.end()
}
