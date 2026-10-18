import {Router} from 'express'
import {requireAdmin} from '../middleware/auth.js'
import {getActivity, listActivity} from '../services/activity.js'

export const activityRouter = Router()
activityRouter.use(requireAdmin, (_req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})
activityRouter.get('/', async (req, res, next) => {
  try {
    res.json(await listActivity(req.query.cursor))
  } catch (error) {
    next(error)
  }
})
activityRouter.get('/:id', async (req, res, next) => {
  try {
    res.json(await getActivity(req.params.id))
  } catch (error) {
    next(error)
  }
})
