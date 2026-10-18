import {pool} from '../db.js'
import {ContentError} from './sectionContent.js'

export const recordActivity = async (
  client,
  {
    actor,
    action,
    sectionKey = null,
    before = null,
    after = null,
    beforeRevision = null,
    afterRevision = null,
  },
) => {
  const {rows} = await client.query(
    'insert into activity_events (actor_id,actor_email,actor_name,action,section_key,before_revision,after_revision,before_data,after_data) values ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9::jsonb) returning id',
    [
      actor.id,
      actor.email,
      actor.name || actor.email,
      action,
      sectionKey,
      beforeRevision,
      afterRevision,
      before === null ? null : JSON.stringify(before),
      after === null ? null : JSON.stringify(after),
    ],
  )
  return rows[0].id
}
export const listActivity = async (cursor) => {
  if (cursor !== undefined && !validId(cursor))
    throw new ContentError(
      400,
      'INVALID_CURSOR',
      'La página de actividad no es válida.',
    )
  const {rows} = await pool.query(
    'select id, actor_email, actor_name, created_at, action, section_key, before_revision, after_revision from activity_events where ($1::bigint is null or id < $1::bigint) order by id desc limit 21',
    [cursor || null],
  )
  return {
    items: rows.slice(0, 20),
    nextCursor: rows.length > 20 ? rows[19].id : null,
  }
}
export const getActivity = async (id) => {
  if (!validId(id))
    throw new ContentError(
      404,
      'ACTIVITY_NOT_FOUND',
      'No encontramos esta actividad.',
    )
  const {rows} = await pool.query(
    'select id,actor_email,actor_name,created_at,action,section_key,before_revision,after_revision,before_data as before, after_data as after from activity_events where id=$1',
    [id],
  )
  if (!rows[0])
    throw new ContentError(
      404,
      'ACTIVITY_NOT_FOUND',
      'No encontramos esta actividad.',
    )
  return rows[0]
}
const validId = (value) =>
  typeof value === 'string' &&
  /^[1-9][0-9]{0,18}$/.test(value) &&
  BigInt(value) <= 9223372036854775807n
