import 'dotenv/config'
import assert from 'node:assert/strict'
import {readFile, mkdir, writeFile} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {pool} from '../db.js'
import {detachmentKey, emptyDetachment, getDetachments, sortDetachments} from '../../shared/detachments.js'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
// Source: Registro participantes.xlsx, Destacamentos!B2:C19. No participant data.
const imported = JSON.parse(await readFile(path.resolve(currentDir, '../data/registered-detachments.json'), 'utf8'))
const sourceKeys = imported.map((record) => detachmentKey(record.number))
assert.equal(new Set(sourceKeys).size, imported.length, 'La fuente contiene números repetidos.')
const client = await pool.connect()
try {
  await client.query('begin')
  const {rows} = await client.query("select data, updated_by from site_sections where id = 'detachment' for update")
  const original = rows[0] || null
  const existing = getDetachments(original?.data || {})
  const merged = new Map(existing.map((record) => [detachmentKey(record.number), record]))
  let added = 0
  for (const record of imported) {
    assert.ok(record.name.trim() && /^[A-Za-z0-9][A-Za-z0-9-]{0,9}$/.test(record.number))
    const key = detachmentKey(record.number)
    const previous = merged.get(key)
    if (!previous) added += 1
    merged.set(key, {...emptyDetachment, ...previous, ...record, id: previous?.id || `detachment-${key}`})
  }
  const data = {sectionTitle: 'Destacamento', detachments: sortDetachments([...merged.values()])}
  for (const record of existing) {
    const updated = data.detachments.find((item) => detachmentKey(item.number) === detachmentKey(record.number))
    assert.equal(updated.logo, record.logo, 'Se modificó un logo existente.')
    assert.equal(updated.mapsUrl, record.mapsUrl, 'Se modificó una ubicación existente.')
    assert.equal(updated.embedUrl, record.embedUrl, 'Se modificó un mapa existente.')
  }
  const summary = {sourceRecords: imported.length, existing: existing.length, added, total: data.detachments.length, order: data.detachments.map((record) => record.number)}
  if (process.argv.includes('--apply')) {
    const backupDir = path.resolve(currentDir, '../../backups')
    await mkdir(backupDir, {recursive: true})
    const backupFile = path.join(backupDir, `detachment-before-import-${new Date().toISOString().replace(/[:.]/g, '-')}.json`)
    await writeFile(backupFile, JSON.stringify(original, null, 2), {flag: 'wx', mode: 0o600})
    await client.query(
      `insert into site_sections (id, data, updated_by, updated_at) values ('detachment', $1::jsonb, $2, now())
       on conflict (id) do update set data = excluded.data, updated_by = excluded.updated_by, updated_at = now()`,
      [JSON.stringify(data), process.env.ADMIN_EMAIL || original?.updated_by || 'local-import'],
    )
    const verification = await client.query("select data from site_sections where id = 'detachment'")
    assert.deepEqual(verification.rows[0].data, data)
    await client.query('commit')
    console.log(JSON.stringify({...summary, applied: true, backupFile}))
  } else {
    await client.query('rollback')
    console.log(JSON.stringify({...summary, applied: false}))
  }
} catch (error) {
  await client.query('rollback')
  throw error
} finally {
  client.release()
  await pool.end()
}
