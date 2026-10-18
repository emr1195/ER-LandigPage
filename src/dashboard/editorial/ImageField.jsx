import React, {useEffect, useId, useRef, useState} from 'react'
import {apiResponse} from '../../api/client'
import {useUploads} from './useUploads'
export const ImageField = ({
  label,
  value = '',
  onChange,
  help,
  validationError,
}) => {
  const id = useId()
  const queue = useUploads()
  const {set, clear, epoch} = queue
  const change = useRef(onChange)
  change.current = onChange
  const request = useRef(null)
  const file = useRef(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  useEffect(
    () => () => {
      request.current?.abort()
      clear(id)
    },
    [id, clear],
  )
  useEffect(() => {
    request.current?.abort()
    setPending(false)
    setError('')
  }, [epoch])
  const upload = async (next) => {
    if (!next) return
    request.current?.abort()
    const controller = new AbortController()
    request.current = controller
    file.current = next
    setPending(true)
    setError('')
    set(id, 'pending', controller)
    try {
      const body = new FormData()
      body.append('file', next)
      body.append('sectionKey', queue.sectionKey)
      body.append('field', label)
      const response = await apiResponse('/api/uploads', {
        method: 'POST',
        body,
        signal: controller.signal,
      })
      const data = await response.json()
      if (controller.signal.aborted) return
      change.current(data.url)
      clear(id)
    } catch (reason) {
      if (controller.signal.aborted) return
      setError(reason.message)
      set(id, 'failed', controller)
      if (reason.status === 401) queue.onSessionExpired?.()
    } finally {
      if (!controller.signal.aborted) setPending(false)
    }
  }
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
              request.current?.abort()
              clear(id)
              setPending(false)
              setError('')
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
            request.current?.abort()
            clear(id)
            setPending(false)
            setError('')
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
              onClick={() => upload(file.current)}
            >
              Reintentar carga
            </button>
            <button
              type="button"
              className="admin-text-button"
              onClick={() => {
                clear(id)
                setError('')
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
