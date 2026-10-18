import {detachmentKey, sortDetachments} from '../../shared/detachments.js'
import {resolveGoogleMaps} from './googleMaps.js'

export const prepareDetachmentSection = async (body) => {
  const collection = Array.isArray(body?.detachments)
  const records = collection ? body.detachments : [body]
  if (records.length > 500)
    throw new Error('Se permiten hasta 500 destacamentos.')
  const usedNumbers = new Set()
  const prepared = []
  for (const record of records) {
    const {name, number, mapsUrl = '', logo = ''} = record || {}
    if (
      typeof name !== 'string' ||
      !name.trim() ||
      name.length > 160 ||
      typeof number !== 'string' ||
      !/^[A-Za-z0-9][A-Za-z0-9-]{0,9}$/.test(number.trim()) ||
      typeof mapsUrl !== 'string' ||
      typeof logo !== 'string' ||
      logo.length > 2048
    ) {
      throw new Error(
        'Completa el nombre y un número o código de destacamento válido. La ubicación y el logo son opcionales.',
      )
    }
    const key = detachmentKey(number)
    if (usedNumbers.has(key))
      throw new Error(`El número o código ${number} está repetido.`)
    usedNumbers.add(key)
    const embedUrl = mapsUrl.trim()
      ? (await resolveGoogleMaps(mapsUrl)).embedUrl
      : ''
    prepared.push({
      ...record,
      id:
        typeof record.id === 'string' && record.id
          ? record.id
          : `detachment-${key}`,
      name: name.trim(),
      number: number.trim(),
      mapsUrl: mapsUrl.trim(),
      logo,
      embedUrl,
    })
  }
  return collection
    ? {
        ...body,
        sectionTitle: body.sectionTitle || 'Destacamento',
        detachments: sortDetachments(prepared),
      }
    : {sectionTitle: 'Destacamento', ...prepared[0]}
}
