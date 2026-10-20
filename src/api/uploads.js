/* global __DIRECT_UPLOADS__ */
import {apiResponse} from './client'

export const uploadImageFile = async (file, {sectionKey, field, signal}) => {
  if (typeof __DIRECT_UPLOADS__ !== 'undefined' && __DIRECT_UPLOADS__) {
    const response = await apiResponse('/api/uploads/prepare', {method: 'POST', signal, body: JSON.stringify({name: file.name, type: file.type, size: file.size, sectionKey, field})})
    const prepared = await response.json()
    const body = new FormData()
    Object.entries(prepared.fields).forEach(([key, value]) => body.append(key, value))
    body.append('file', file)
    const sent = await fetch(prepared.url, {method: 'POST', body, signal, credentials: 'omit'})
    if (!sent.ok) throw new Error('No se pudo subir la imagen al almacenamiento. Reintenta la carga.')
    return (await apiResponse('/api/uploads/complete', {method: 'POST', signal, body: JSON.stringify({ticket: prepared.ticket})})).json()
  }
  const body = new FormData()
  body.append('file', file)
  body.append('sectionKey', sectionKey)
  body.append('field', field)
  return (await apiResponse('/api/uploads', {method: 'POST', body, signal})).json()
}
