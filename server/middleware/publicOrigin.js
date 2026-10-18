/* Only anonymous public content is readable from GitHub Pages.
   Authentication and all writes stay same-origin on the VPS. */
export const publicOrigin = (req, res, next) => {
  const allowed = (process.env.PUBLIC_SITE_ORIGIN || '').split(',').map((origin) => origin.trim()).filter(Boolean)
  res.vary('Origin')
  if (req.method === 'GET' && allowed.includes(req.headers.origin)) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
  }
  res.setHeader('Cache-Control', 'no-store')
  next()
}
