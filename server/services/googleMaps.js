import {googleMapsEmbedUrl, parseGoogleMapsUrl} from '../../shared/googleMaps.js'

export const resolveGoogleMaps = async (value) => {
  let {url, short} = parseGoogleMapsUrl(value)
  if (url.href.length > 12000) throw new Error('El enlace de Google Maps es demasiado largo.')
  // Validate every redirect before following it; never fetch arbitrary hosts.
  for (let attempt = 0; short && attempt < 5; attempt += 1) {
    const response = await fetch(url, {redirect: 'manual', signal: AbortSignal.timeout(6000)})
    const location = response.headers.get('location')
    await response.body?.cancel()
    if (!location || response.status < 300 || response.status >= 400) {
      throw new Error('No se pudo abrir el enlace corto. Pega el enlace completo del lugar desde Google Maps.')
    }
    const parsed = parseGoogleMapsUrl(new URL(location, url).href)
    url = parsed.url
    short = parsed.short
  }
  if (short) throw new Error('El enlace corto tiene demasiadas redirecciones. Utiliza el enlace completo.')
  return {embedUrl: googleMapsEmbedUrl(url.href)}
}
