// Dedicated PostgreSQL cluster and uploads: never connect this harness to .env's DB.
import {spawn, spawnSync} from 'node:child_process'
import {existsSync, mkdirSync, readFileSync} from 'node:fs'
import path from 'node:path'
import pg from 'pg'
import {resolvePostgresBin} from './postgres.mjs'

const root = process.cwd()
const scratch = path.join(root, '.tmp', 'dashboard-test.local')
const data = path.join(scratch, 'postgres')
mkdirSync(scratch, {recursive: true})
const recordingLock = path.join(scratch, 'walkthrough.lock')
if (existsSync(recordingLock) && JSON.parse(readFileSync(recordingLock, 'utf8')).token !== process.env.WALKTHROUGH_LEASE)
  throw new Error('Hay una captura de walkthrough en curso; no se restableció la base de prueba.')
const pgBin = resolvePostgresBin()
const pgRun = (name, args) => {
  const result = spawnSync(path.join(pgBin, `${name}.exe`), args, {
    windowsHide: true,
    stdio: 'ignore',
  })
  if (result.status !== 0)
    throw new Error(
      `No se pudo ejecutar ${name}; revisa el log de PostgreSQL de prueba.`,
    )
}
if (!existsSync(path.join(data, 'PG_VERSION')))
  pgRun('initdb', [
    '-D',
    data,
    '-U',
    'test_admin',
    '-A',
    'trust',
    '--encoding=UTF8',
    '--no-locale',
  ])
const running =
  spawnSync(path.join(pgBin, 'pg_ctl.exe'), ['-D', data, 'status'], {
    windowsHide: true,
    stdio: 'ignore',
  }).status === 0
if (!running)
  pgRun('pg_ctl', [
    '-D',
    data,
    '-l',
    path.join(scratch, 'postgres.log'),
    '-o',
    '-h 127.0.0.1 -p 55439 -F',
    '-w',
    'start',
  ])
const admin = new pg.Pool({
  connectionString: 'postgresql://test_admin@127.0.0.1:55439/postgres',
})
const actualDirectory = (await admin.query('show data_directory')).rows[0]
  .data_directory
if (
  path.resolve(actualDirectory).toLowerCase() !==
  path.resolve(data).toLowerCase()
)
  throw new Error(
    'El puerto de pruebas pertenece a otro clúster; no se modificó ninguna base.',
  )
if (
  !(
    await admin.query(
      "select 1 from pg_database where datname = 'er_dashboard_test'",
    )
  ).rowCount
)
  await admin.query('create database er_dashboard_test')
await admin.end()
Object.assign(process.env, {
  NODE_ENV: 'test',
  DATABASE_URL: 'postgresql://test_admin@127.0.0.1:55439/er_dashboard_test',
  DATABASE_SSL: 'false',
  BETTER_AUTH_SECRET: 'local-test-secret-not-for-production-00000001',
  BETTER_AUTH_URL: 'http://127.0.0.1:3410',
  CLIENT_ORIGIN: 'http://127.0.0.1:3410',
  HOST: '127.0.0.1',
  PORT: '3411',
  API_PROXY_TARGET: 'http://127.0.0.1:3411',
  UPLOADS_DIRECTORY: path.join(scratch, 'uploads'),
  GOOGLE_CLIENT_ID: '',
  GOOGLE_CLIENT_SECRET: '',
  PUBLIC_SITE_ORIGIN: '',
})
const children = []
let stopping = false
const stop = () => {
  if (stopping) return
  stopping = true
  for (const child of children) child.kill()
  spawnSync(
    path.join(pgBin, 'pg_ctl.exe'),
    ['-D', data, '-m', 'fast', '-w', 'stop'],
    {windowsHide: true, stdio: 'ignore'},
  )
}
process.on('SIGTERM', () => {
  stop()
  process.exit(0)
})
process.on('SIGINT', () => {
  stop()
  process.exit(0)
})
process.on('exit', stop)
const run = (file, args = []) =>
  new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [file, ...args], {
      env: process.env,
      windowsHide: true,
      stdio: 'inherit',
    })
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`${file}: ${code}`)),
    )
  })
try {
  await run('server/scripts/migrate.js')
  const {auth} = await import('../../server/auth.js')
  const {pool} = await import('../../server/db.js')
  for (const [email, role] of [
    ['admin@example.test', 'admin'],
    ['second@example.test', 'admin'],
    ['reader@example.test', 'user'],
  ]) {
    if (
      !(await pool.query('select id from "user" where email = $1', [email]))
        .rowCount
    ) {
      await auth.api.signUpEmail({
        body: {
          name: email.split('@')[0],
          email,
          password: 'Dashboard-test-2026!',
        },
      })
    }
    await pool.query('update "user" set role=$1 where email=$2', [role, email])
  }
  const {createDemoSiteSections} = await import(
    '../../server/data/demo-site-sections.js'
  )
  if (
    (await pool.query("select to_regclass('public.activity_events') as name"))
      .rows[0].name
  )
    await pool.query('truncate activity_events restart identity')
  if (
    (await pool.query("select to_regclass('public.admin_preferences') as name"))
      .rows[0].name
  )
    await pool.query('truncate admin_preferences')
  await pool.query('delete from site_sections')
  for (const [id, info] of Object.entries(createDemoSiteSections()))
    await pool.query('insert into site_sections (id,data) values ($1,$2)', [
      id,
      info,
    ])
  await pool.end()
  for (const args of [
    ['server/index.js'],
    [
      'node_modules/vite/bin/vite.js',
      '--host',
      '127.0.0.1',
      '--port',
      '3410',
      '--strictPort',
    ],
  ]) {
    const child = spawn(process.execPath, args, {
      env: process.env,
      windowsHide: true,
      stdio: 'inherit',
    })
    children.push(child)
    child.on('exit', () => {
      stop()
      process.exit(1)
    })
    if (args[0] === 'server/index.js') {
      let ready = false
      for (let attempt = 0; attempt < 100; attempt++) {
        try {
          ready = (await fetch('http://127.0.0.1:3411/api/health')).ok
        } catch {
          /* API is starting. */
        }
        if (ready) break
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
      if (!ready) throw new Error('La API de pruebas no inició.')
    }
  }
} catch (error) {
  stop()
  throw error
}
