import {Router} from 'express'
import {requireAdmin} from '../middleware/auth.js'
import {resolveGoogleMaps} from '../services/googleMaps.js'

export const mapsRouter = Router()
mapsRouter.post('/preview', requireAdmin, async (req, res) => {
  try {
    if (typeof req.body?.url !== 'string') throw new Error('Introduce el enlace de Google Maps.')
    return res.json(await resolveGoogleMaps(req.body.url))
  } catch (error) {
    return res.status(400).json({error: error.name === 'TimeoutError' ? 'Google Maps tardó en responder. Intenta nuevamente.' : error.message})
  }
})
