import {Router} from 'express'
import {requireAdmin} from '../middleware/auth.js'
import {remoteStorage, prepareImageUpload, verifyImageUpload, signedImageUrl, validImageKey} from '../services/objectStorage.js'
import {recordActivity} from '../services/activity.js'
import {pool} from '../db.js'
import {sectionKeys} from '../services/sectionContent.js'

export const cloudUploadsRouter = Router()
cloudUploadsRouter.get('/files/:key', async (req, res, next) => {
  if (!remoteStorage()) return next()
  if (!validImageKey(req.params.key)) return res.status(404).end()
  try {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=300')
    return res.redirect(302, await signedImageUrl(req.params.key))
  } catch (error) { return next(error) }
})
cloudUploadsRouter.post('/prepare', requireAdmin, async (req, res, next) => {
  try {
    if (!remoteStorage()) return res.status(404).json({error: 'Carga directa no disponible.'})
    if (!sectionKeys.has(req.body.sectionKey)) return res.status(400).json({error: 'Sección no válida.'})
    return res.json(await prepareImageUpload(req.body, res.locals.authSession.user.id))
  } catch (error) { return next(error) }
})
cloudUploadsRouter.post('/complete', requireAdmin, async (req, res, next) => {
  try {
    if (!remoteStorage()) return res.status(404).end()
    const file = await verifyImageUpload(req.body.ticket, res.locals.authSession.user.id)
    const url = '/api/uploads/files/' + file.key
    await recordActivity(pool, {actor: res.locals.authSession.user, action: 'upload', sectionKey: file.sectionKey, after: {url, name: file.name, type: file.type, size: file.size, field: file.field}})
    return res.status(201).json({url})
  } catch (error) { return next(error) }
})
