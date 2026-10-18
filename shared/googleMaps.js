export const parseGoogleMapsUrl = (value) => {
  let url
  try { url = new URL(value.trim()) } catch { throw new Error('Introduce un enlace válido de Google Maps.') }
  if (url.protocol !== 'https:' || url.username || url.password || url.port) {
    throw new Error('El enlace debe usar HTTPS y pertenecer a Google Maps.')
  }
  const short = url.hostname === 'maps.app.goo.gl' || (url.hostname === 'goo.gl' && url.pathname.startsWith('/maps/'))
  const full = ['google.com', 'www.google.com'].includes(url.hostname) && (url.pathname === '/maps' || url.pathname.startsWith('/maps/'))
  const mapsHost = url.hostname === 'maps.google.com'
  if (!short && !full && !mapsHost) throw new Error('Utiliza un enlace de Google Maps, no de otra página.')
  return {url, short}
}

export const googleMapsEmbedUrl = (value) => {
  const {url, short} = parseGoogleMapsUrl(value)
  if (short) return null
  if (url.pathname === '/maps/embed' && url.searchParams.get('pb')) return url.href
  if (url.pathname.startsWith('/maps/embed/v1/')) throw new Error('Usa el enlace de Compartir de Google Maps, sin API key.')
  const coordinates = url.href.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/)
  const center = url.pathname.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/)
  const place = url.pathname.match(/\/maps\/(?:place|search)\/([^/]+)/)
  const query = coordinates ? `${coordinates[1]},${coordinates[2]}`
    : url.searchParams.get('query') || url.searchParams.get('q') || url.searchParams.get('ll')
      || (place ? decodeURIComponent(place[1].replace(/\+/g, ' ')) : null)
      || (center ? `${center[1]},${center[2]}` : null)
  if (!query) throw new Error('El enlace no identifica una ubicación. Copia el enlace del lugar desde Compartir en Google Maps.')
  const embed = new URL('https://www.google.com/maps')
  embed.searchParams.set('q', query)
  embed.searchParams.set('output', 'embed')
  embed.searchParams.set('z', '16')
  return embed.href
}
