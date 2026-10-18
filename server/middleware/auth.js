// ESLint 8's resolver does not understand this package export subpath.
// eslint-disable-next-line import/no-unresolved
import {fromNodeHeaders} from 'better-auth/node'
import {auth} from '../auth.js'

export const requireAdmin = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })

    if (!session?.user) {
      return res.status(401).json({error: 'Debes iniciar sesion.'})
    }

    if (session.user.role !== 'admin') {
      return res.status(403).json({
        error: 'Esta cuenta no tiene permiso para administrar el sitio.',
      })
    }

    res.locals.authSession = session
    return next()
  } catch (error) {
    return next(error)
  }
}
