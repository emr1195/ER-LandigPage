import 'dotenv/config'
import {pool} from '../db.js'
import {createDemoSiteSections} from '../data/demo-site-sections.js'
import {prepareDetachmentSection} from '../services/detachments.js'

let client
try {
  const database = new URL(process.env.DATABASE_URL)
  if (
    process.env.NODE_ENV === 'production' ||
    !['localhost', '127.0.0.1', '[::1]'].includes(database.hostname)
  ) {
    throw new Error(
      'El seed de demostración solo se permite en PostgreSQL local, fuera de producción.',
    )
  }
  const sections = createDemoSiteSections()
  const detachment = await prepareDetachmentSection(sections.detachment)
  sections.detachment = {...sections.detachment, ...detachment}

  client = await pool.connect()
  await client.query('begin')
  const inserted = []
  const preserved = []
  for (const [id, data] of Object.entries(sections)) {
    const result = await client.query(
      `insert into site_sections (id, data, updated_by, updated_at)
       values ($1, $2::jsonb, 'seed:local-demo', now())
       on conflict (id) do nothing returning id`,
      [id, JSON.stringify(data)],
    )
    if (result.rowCount) inserted.push(id)
    else preserved.push(id)
  }
  await client.query('commit')
  console.log(
    JSON.stringify(
      {
        database: decodeURIComponent(database.pathname.slice(1)),
        inserted,
        preserved,
        message:
          'Contenido de demostración preparado. Las secciones existentes se conservan.',
      },
      null,
      2,
    ),
  )
} catch (error) {
  if (client) await client.query('rollback')
  console.error(error.message)
  process.exitCode = 1
} finally {
  client?.release()
  await pool.end()
}
