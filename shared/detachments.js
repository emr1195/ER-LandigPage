export const emptyDetachment = {name: '', number: '', mapsUrl: '', logo: '', embedUrl: ''}

export const detachmentKey = (number) => {
  const value = String(number ?? '').trim()
  return /^\d+$/.test(value) ? String(Number(value)) : value.toUpperCase()
}

export const sortDetachments = (records) => [...records].sort((left, right) => {
  const a = detachmentKey(left.number)
  const b = detachmentKey(right.number)
  if (!a || !b) return a ? -1 : b ? 1 : 0
  const numericA = /^\d+$/.test(a)
  const numericB = /^\d+$/.test(b)
  if (numericA !== numericB) return numericA ? -1 : 1
  return numericA ? Number(a) - Number(b) : a.localeCompare(b, 'es', {numeric: true})
})

// Accept the original single-record format as well as the new directory.
export const getDetachments = (info = {}) => {
  const records = Array.isArray(info?.detachments) ? info.detachments
    : typeof info?.name === 'string' || typeof info?.number === 'string' ? [info] : []
  return sortDetachments(records.map((record, index) => ({
    ...emptyDetachment,
    ...record,
    number: String(record.number ?? ''),
    id: record.id && record.id !== 'detachment' ? record.id : `detachment-${detachmentKey(record.number) || `empty-${index + 1}`}`,
  })))
}
