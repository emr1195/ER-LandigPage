import {randomUUID} from 'node:crypto'
import {detachmentKey, sortDetachments} from '../../shared/detachments.js'
import {resolveGoogleMaps} from './googleMaps.js'

export const prepareDetachmentSection = async (body) => {
  const collection = Array.isArray(body?.detachments)
  const records = collection ? body.detachments : [body]
  if (records.length > 500) throw new Error('Se permiten hasta 500 destacamentos.')
  const usedNumbers = new Set()
  const usedIds = new Set()
  const prepared = []
  for (const record of records) {
    if (!record || typeof record !== 'object' || Array.isArray(record)) throw new Error('El destacamento debe ser un objeto de datos.')
    const {name = '', number = '', mapsUrl = '', logo = ''} = record || {}
    if (typeof name !== 'string' || name.length > 160 ||
        typeof number !== 'string' || (number.trim() && !/^[A-Za-z0-9][A-Za-z0-9-]{0,9}$/.test(number.trim())) ||
        typeof mapsUrl !== 'string' || typeof logo !== 'string' || logo.length > 2048) {
      throw new Error('Revisa el formato de los datos introducidos. Todos los campos son opcionales.')
    }
    const key = detachmentKey(number)
    if (key && usedNumbers.has(key)) throw new Error(`El número o código ${number} está repetido.`)
    if (key) usedNumbers.add(key)
    const id = typeof record?.id === 'string' && /^[A-Za-z0-9_-]{1,100}$/.test(record.id)
      ? record.id : key ? `detachment-${key}` : `detachment-${randomUUID()}`
    if (usedIds.has(id)) throw new Error('Hay destacamentos con el mismo identificador.')
    usedIds.add(id)
    const embedUrl = mapsUrl.trim() ? (await resolveGoogleMaps(mapsUrl)).embedUrl : ''
    prepared.push({id, name: name.trim(), number: number.trim(), mapsUrl: mapsUrl.trim(), logo, embedUrl})
  }
  return collection
    ? {sectionTitle: 'Destacamento', detachments: sortDetachments(prepared)}
    : {sectionTitle: 'Destacamento', ...prepared[0]}
}
