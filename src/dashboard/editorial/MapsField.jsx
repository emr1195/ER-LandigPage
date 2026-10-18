import React, {useEffect, useId, useRef, useState} from 'react'
import {
  parseGoogleMapsUrl,
  googleMapsEmbedUrl,
} from '../../../shared/googleMaps'
import {apiRequest} from '../../api/client'
import {useUploads} from './useUploads'
export const MapsField = ({value, onChange}) => {
  const id = useId()
  const {set, clear, onSessionExpired} = useUploads()
  const change = useRef(onChange)
  change.current = onChange
  const [map, setMap] = useState({url: '', error: '', pending: false})
  useEffect(() => {
    let active = true
    let timer
    const controller = new AbortController()
    const url = value.mapsUrl?.trim() || ''
    if (!url) {
      setMap({url: '', error: '', pending: false})
      clear(id)
      return
    }
    try {
      const parsed = parseGoogleMapsUrl(url)
      if (!parsed.short || value.embedUrl) {
        setMap({
          url: googleMapsEmbedUrl(value.embedUrl || url),
          error: '',
          pending: false,
        })
        clear(id)
      } else {
        setMap({url: '', error: '', pending: true})
        set(id, 'pending', controller)
        timer = setTimeout(async () => {
          try {
            const result = await apiRequest('/api/maps/preview', {
              method: 'POST',
              body: JSON.stringify({url}),
              signal: controller.signal,
            })
            if (active) {
              setMap({url: result.embedUrl, error: '', pending: false})
              clear(id)
              change.current((previous) => ({
                ...previous,
                embedUrl: result.embedUrl,
              }))
            }
          } catch (reason) {
            if (active && !controller.signal.aborted) {
              setMap({url: '', error: reason.message, pending: false})
              set(id, 'failed', controller)
              if (reason.status === 401) onSessionExpired?.()
            }
          }
        }, 400)
      }
    } catch (reason) {
      setMap({url: '', error: reason.message, pending: false})
      set(id, 'failed', controller)
    }
    return () => {
      active = false
      clearTimeout(timer)
      controller.abort()
      clear(id)
    }
    // Updating other fields must not restart a map resolution.
  }, [value.mapsUrl, value.embedUrl, id, set, clear, onSessionExpired])
  return (
    <div className="admin-field-group">
      <label className="admin-field">
        <span>Ubicación — enlace de Google Maps (opcional)</span>
        <input
          aria-label="Ubicación — enlace de Google Maps (opcional)"
          value={value.mapsUrl || ''}
          onChange={(event) => {
            const url = event.target.value
            onChange((previous) => ({...previous, mapsUrl: url, embedUrl: ''}))
          }}
          maxLength={12000}
          aria-invalid={Boolean(map.error)}
        />
        <small>
          Pega el enlace del lugar desde Compartir en Google Maps. También
          puedes dejarlo vacío.
        </small>
      </label>
      {map.error && (
        <p role="alert" className="admin-field-error">
          {map.error}
        </p>
      )}
      {map.pending && <p role="status">Preparando mapa…</p>}
      {map.url && (
        <iframe
          className="admin-map-preview"
          src={map.url}
          title={'Ubicación de ' + (value.name || 'este destacamento')}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
    </div>
  )
}
