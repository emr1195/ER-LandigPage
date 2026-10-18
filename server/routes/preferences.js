import {Router} from 'express'
import {requireAdmin} from '../middleware/auth.js'
import {getPreferences, savePreferences} from '../services/preferences.js'
export const preferencesRouter = Router()
preferencesRouter.use(requireAdmin, (_req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})
preferencesRouter.get('/', async (_req, res, next) => {
  try {
    res.json(await getPreferences(res.locals.authSession.user.id))
  } catch (error) {
    next(error)
  }
})
preferencesRouter.put('/', async (req, res, next) => {
  try {
    res.json(await savePreferences(res.locals.authSession.user.id, req.body))
  } catch (error) {
    next(error)
  }
})
