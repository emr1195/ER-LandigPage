import React, {useRef, useState} from 'react'
import {apiResponse} from '../../api/client'
import {useFieldRequest} from './useFieldRequest'

const types = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif']

export const GalleryUpload = ({onChange, count = 0}) => {
  const request = useFieldRequest()
  const change = useRef(onChange)
  change.current = onChange
  const queue = useRef([])
  const [progress, setProgress] = useState({done: 0, total: 0})
  const [validationError, setValidationError] = useState('')
  const run = async () => {
    const controller = request.start()
    try {
      while (queue.current.length && !controller.signal.aborted) {
        const file = queue.current[0]
        const body = new FormData()
        body.append('file', file)
        body.append('sectionKey', request.sectionKey)
        body.append('field', 'Galería compartida de portada')
        const response = await apiResponse('/api/uploads', {method: 'POST', body, signal: controller.signal})
        const data = await response.json()
        if (controller.signal.aborted) return
        if (!data.url) throw new Error('El servidor no devolvió la dirección de la imagen.')
        change.current(current => [...(current || []), {id: crypto.randomUUID(), title: file.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' '), imageURL: data.url, position: (current?.length || 0) + 1}])
        queue.current.shift()
        setProgress(previous => ({...previous, done: previous.done + 1}))
      }
      request.finish(controller)
    } catch (error) { request.fail(controller, error) }
  }
  const upload = files => {
    if (!files.length) return
    request.cancel()
    queue.current = []
    const invalid = files.find(file => !types.includes(file.type) || file.size > 8 * 1024 * 1024)
    if (invalid || count + files.length > 500) {
      setValidationError(invalid ? `${invalid.name}: usa PNG, JPG, WebP, GIF o AVIF de hasta 8 MB por imagen.` : 'La galería admite hasta 500 fotografías.')
      return
    }
    setValidationError('')
    queue.current = files
    setProgress({done: 0, total: files.length})
    run()
  }
  return <div className="admin-gallery-upload">
    <label className="admin-button admin-button-secondary admin-file-button">
      <input type="file" multiple accept={types.join(',')} aria-label="Subir bloque de imágenes a la galería" disabled={request.pending} onChange={event => { upload(Array.from(event.target.files || [])); event.target.value = '' }} />
      {request.pending ? 'Subiendo imágenes…' : 'Subir varias imágenes'}
    </label>
    <p className="admin-muted">Selecciona una o varias fotos en una sola carga. Se agregan a esta misma galería sin reemplazar las existentes. Hasta 8 MB por imagen.</p>
    {progress.total > 0 && <p role="status">{progress.done} de {progress.total} imágenes subidas. Guarda y publica para mostrarlas en la página.</p>}
    {validationError && <p className="admin-field-error" role="alert">{validationError}</p>}
    {request.error && <div className="admin-alert" role="alert">{request.error}<p>Las imágenes ya subidas se conservan; reintentar continúa con las pendientes.</p><button type="button" className="admin-text-button" onClick={run}>Reintentar pendientes</button></div>}
    {(request.pending || request.error) && <button type="button" className="admin-text-button" onClick={() => { request.cancel(); queue.current = [] }}>Cancelar pendientes</button>}
  </div>
}
