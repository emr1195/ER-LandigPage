import React from 'react'
import {useMapPreview} from './useMapPreview'
export const MapsField = ({value, onChange}) => {
  const map = useMapPreview(value, onChange)
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
          {map.error}{' '}
          <button
            type="button"
            className="admin-text-button"
            onClick={map.retry}
          >
            Reintentar mapa
          </button>
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
