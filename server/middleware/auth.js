// ESLint 8's resolver does not understand this package export subpath.
// eslint-disable-next-line import/no-unresolved
import {fromNodeHeaders} from 'better-auth/node'
import {auth} from '../auth.js'

export const requireAdmin = async (req, res, next) => {
  res.set('Cache-Control', 'no-store')
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })

    if (!session?.user) {
      return res
        .status(401)
        .json({error: 'Debes iniciar sesion.', code: 'SESSION_REQUIRED'})
    }

    if (session.user.role !== 'admin') {
      return res.status(403).json({
        error: 'Esta cuenta no tiene permiso para administrar el sitio.',
        code: 'ADMIN_REQUIRED',
      })
    }

    // Each response belongs to one request; no concurrent writer uses these locals.
    // eslint-disable-next-line require-atomic-updates
    res.locals.authSession = session
    return next()
  } catch (error) {
    return next(error)
  }
}
