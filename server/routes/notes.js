import {Router} from 'express'
import {pool} from '../db.js'
import {requireAdmin} from '../middleware/auth.js'

export const notesRouter = Router()

notesRouter.use(requireAdmin)

notesRouter.get('/', async (req, res, next) => {
  try {
    const {rows} = await pool.query(
      'select id, data from notes where user_id = $1 order by created_at',
      [res.locals.authSession.user.id],
    )
    return res.json(rows)
  } catch (error) {
    return next(error)
  }
})

notesRouter.post('/', async (req, res, next) => {
  try {
    const {rows} = await pool.query(
      `insert into notes (user_id, data)
       values ($1, $2::jsonb)
       returning id, data`,
      [res.locals.authSession.user.id, JSON.stringify(req.body)],
    )
    return res.status(201).json(rows[0])
  } catch (error) {
    return next(error)
  }
})

notesRouter.put('/:id', async (req, res, next) => {
  try {
    const {rowCount} = await pool.query(
      `update notes
       set data = $1::jsonb, updated_at = now()
       where id = $2 and user_id = $3`,
      [JSON.stringify(req.body), req.params.id, res.locals.authSession.user.id],
    )
    if (!rowCount) return res.status(404).json({error: 'Nota no encontrada.'})
    return res.status(204).end()
  } catch (error) {
    return next(error)
  }
})

notesRouter.delete('/:id', async (req, res, next) => {
  try {
    const {rowCount} = await pool.query(
      'delete from notes where id = $1 and user_id = $2',
      [req.params.id, res.locals.authSession.user.id],
    )
    if (!rowCount) return res.status(404).json({error: 'Nota no encontrada.'})
    return res.status(204).end()
  } catch (error) {
    return next(error)
  }
})
