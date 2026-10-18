import {pool} from '../db.js'
import {ContentError} from './sectionContent.js'
export const getPreferences = async (userId) => {
  const {rows} = await pool.query(
    'select appearance from admin_preferences where user_id=$1',
    [userId],
  )
  return {appearance: rows[0]?.appearance || 'carbon-azure'}
}
export const savePreferences = async (userId, body) => {
  if (
    !body ||
    !['carbon-azure', 'petrol-apricot'].includes(body.appearance) ||
    Object.keys(body).some((key) => key !== 'appearance')
  )
    throw new ContentError(
      400,
      'INVALID_APPEARANCE',
      'Elige una de las dos apariencias disponibles.',
    )
  const {rows} = await pool.query(
    'insert into admin_preferences (user_id,appearance) values ($1,$2) on conflict (user_id) do update set appearance=excluded.appearance,updated_at=now() returning appearance',
    [userId, body.appearance],
  )
  return rows[0]
}
