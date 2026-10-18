import React from 'react'
import {useImageUpload} from './useImageUpload'
export const ImageField = ({
  label,
  value = '',
  onChange,
  help,
  validationError,
}) => {
  const {pending, error, upload, retry, cancel} = useImageUpload(
    label,
    onChange,
  )
  return (
    <div className="admin-image-field">
      <p className="admin-image-label">{label}</p>
      {help && <p className="admin-muted">{help}</p>}
      <div className="admin-image-tools">
        {value && <img src={value} alt={'Imagen actual: ' + label} />}
        <label className="admin-button admin-button-secondary admin-file-button">
          <input
            aria-label={'Subir ' + label}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
            onChange={(event) => {
              upload(event.target.files?.[0])
              event.target.value = ''
            }}
            disabled={pending}
          />
          {pending ? 'Subiendo imagen…' : 'Subir imagen'}
        </label>
        <span className="admin-muted">
          PNG, JPG, WebP, GIF o AVIF · hasta 8 MB
        </span>
      </div>
      <details className="admin-image-url">
        <summary>Usar una dirección de imagen</summary>
        <label className="admin-field">
          <span>Dirección de {label.toLowerCase()}</span>
          <input
            aria-label={label}
            type="text"
            value={value}
            onChange={(event) => {
              cancel()

              onChange(event.target.value)
            }}
          />
        </label>
      </details>
      {value && (
        <button
          type="button"
          className="admin-text-button"
          onClick={() => {
            cancel()

            onChange('')
          }}
        >
          Quitar imagen: {label.toLowerCase()}
        </button>
      )}
      {pending && (
        <p role="status" className="admin-muted">
          Espera a que termine la carga antes de publicar.
        </p>
      )}
      {validationError && (
        <p className="admin-field-error" role="alert">
          {validationError}
        </p>
      )}
      {error && (
        <div className="admin-alert" role="alert">
          {error}
          <div className="admin-record-actions">
            <button
              type="button"
              className="admin-text-button"
              onClick={() => retry()}
            >
              Reintentar carga
            </button>
            <button
              type="button"
              className="admin-text-button"
              onClick={() => {
                cancel()
              }}
            >
              Conservar imagen actual
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
