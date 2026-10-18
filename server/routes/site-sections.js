import {Router} from 'express'
import {pool} from '../db.js'
import {requireAdmin} from '../middleware/auth.js'
import {prepareDetachmentSection} from '../services/detachments.js'
import {publishSection} from '../services/siteSections.js'

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
      'select data, revision from site_sections where id = $1',
      [req.params.id],
    )
    res.set('ETag', '"' + (rows[0]?.revision || '0') + '"')
    return res.json(rows[0]?.data ?? null)
  } catch (error) {
    return next(error)
  }
})

siteSectionsRouter.put('/:id', requireAdmin, async (req, res, next) => {
  try {
    const result = await publishSection(
      req.params.id,
      req.body,
      req.headers['if-match'],
      res.locals.authSession.user,
    )
    res.set('ETag', '"' + result.revision + '"')
    return res.json({id: result.id, data: result.data})
  } catch (error) {
    return next(error)
  }
})
