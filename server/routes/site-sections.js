import {Router} from 'express'
import {pool} from '../db.js'
import {requireAdmin} from '../middleware/auth.js'
import {prepareDetachmentSection} from '../services/detachments.js'

export const siteSectionsRouter = Router()

siteSectionsRouter.get('/', async (_req, res, next) => {
  try {
    const {rows} = await pool.query(
      'select id, data from site_sections order by id',
    )
    return res.json(rows)
  } catch (error) {
    return next(error)
  }
})

siteSectionsRouter.get('/:id', async (req, res, next) => {
  try {
    const {rows} = await pool.query(
      'select data from site_sections where id = $1',
      [req.params.id],
    )
    return res.json(rows[0]?.data ?? null)
  } catch (error) {
    return next(error)
  }
})

siteSectionsRouter.put('/:id', requireAdmin, async (req, res, next) => {
  try {
    let sectionData = req.body
    if (req.params.id === 'detachment') {
      try {
        sectionData = await prepareDetachmentSection(req.body)
      } catch (error) {
        return res.status(400).json({error: error.message})
      }
    }
    const {rows} = await pool.query(
      `insert into site_sections (id, data, updated_by, updated_at)
       values ($1, $2::jsonb, $3, now())
       on conflict (id) do update
       set data = excluded.data,
           updated_by = excluded.updated_by,
           updated_at = now()
       returning id, data`,
      [req.params.id, JSON.stringify(sectionData), res.locals.authSession.user.email],
    )
    return res.json(rows[0])
  } catch (error) {
    return next(error)
  }
})
