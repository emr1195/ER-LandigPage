import {readFile, readdir} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const directory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../migrations',
)
export const migrateApplication = async (pool) => {
  const client = await pool.connect()
  try {
    await client.query('begin')
    await client.query('select pg_advisory_xact_lock(571904)')
    await client.query(
      'create table if not exists public.schema_migrations (name text primary key, applied_at timestamptz not null default now())',
    )
    for (const name of (await readdir(directory))
      .filter((name) => /^\d+.*\.sql$/.test(name))
      .sort()) {
      if (
        (
          await client.query(
            'select 1 from public.schema_migrations where name=$1',
            [name],
          )
        ).rowCount
      )
        continue
      await client.query(await readFile(path.join(directory, name), 'utf8'))
      await client.query(
        'insert into public.schema_migrations (name) values ($1)',
        [name],
      )
    }
    await client.query('commit')
  } catch (error) {
    await client.query('rollback')
    throw error
  } finally {
    client.release()
  }
}
