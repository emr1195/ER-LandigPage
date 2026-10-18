import {publicImageUrl} from '../api/deployment'

export const prepareSection = (info) => {
  const visit = (value) => {
    if (Array.isArray(value)) {
      const usedIds = new Set()
      return value.map((entry, index) => {
        const row = visit(entry)
        if (!row || typeof row !== 'object' || Array.isArray(row)) return row
        if (!row.id || usedIds.has(row.id)) row.id = crypto.randomUUID()
        usedIds.add(row.id)
        if (row.position === undefined) row.position = index + 1
        return row
      })
    }
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, visit(entry)]))
    }
    return publicImageUrl(value)
  }
  const result = visit(info)
  if (result.listMenu) result.logoTitle ??= ''
  result.textSection?.buttons?.forEach((button) => {
    button.url ??= ''
    button.outsideURL ??= false
  })
  result.events?.forEach((event) => { event.image ??= '' })
  if (result.programValues) {
    result.programValues.forEach((row) => { row.display ??= row.active ?? true })
  }
  return result
}
