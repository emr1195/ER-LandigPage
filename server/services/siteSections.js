import {pool} from '../db.js'
import {
  ContentError,
  expectedRevision,
  validateSection,
} from './sectionContent.js'
import {recordActivity} from './activity.js'

export const publishSection = async (key, body, header, actor) => {
  const revision = expectedRevision(header)
  const data = await validateSection(key, body)
  const query =
    revision === '0'
      ? {
          text: 'insert into site_sections (id,data,updated_by) values ($1,$2::jsonb,$3) on conflict (id) do nothing returning id,data,revision',
          values: [key, JSON.stringify(data), actor.email],
        }
      : {
          text: 'update site_sections set data=$2::jsonb, updated_by=$3, updated_at=now() where id=$1 and revision=$4 returning id,data,revision',
          values: [key, JSON.stringify(data), actor.email, revision],
        }
  const client = await pool.connect()
  try {
    await client.query('begin')
    const previous = (
      await client.query(
        'select data,revision from site_sections where id=$1 for update',
        [key],
      )
    ).rows[0]
    const {rows} = await client.query(query)
    if (!rows[0])
      throw new ContentError(
        412,
        'REVISION_CONFLICT',
        'Otro administrador publicó cambios. Conservamos tu edición para que puedas revisarla.',
      )
    await recordActivity(client, {
      actor,
      action: 'publication',
      sectionKey: key,
      before: previous?.data ?? null,
      after: rows[0].data,
      beforeRevision: previous?.revision ?? null,
      afterRevision: rows[0].revision,
    })
    await client.query('commit')
    return rows[0]
  } catch (error) {
    await client.query('rollback')
    throw error
  } finally {
    client.release()
  }
}
