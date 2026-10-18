const ignored = new Set([
  'id',
  'position',
  'updatedBy',
  'lastModified',
  'sectionKey',
])
export const contentChanges = (before, after, path = '') => {
  if (
    (before === null || before === undefined || before === '') &&
    (after === null || after === undefined || after === '')
  )
    return []
  if (JSON.stringify(before) === JSON.stringify(after)) return []
  if (Array.isArray(before) || Array.isArray(after)) {
    const left = Array.isArray(before) ? before : []
    const right = Array.isArray(after) ? after : []
    if (
      [...left, ...right].every(
        (item) => item && typeof item === 'object' && item.id,
      )
    ) {
      const changes = [
        ...new Set([...left, ...right].map((item) => item.id)),
      ].flatMap((id) => {
        const a = left.find((item) => item.id === id)
        const b = right.find((item) => item.id === id)
        const name = b?.name || b?.title || a?.name || a?.title || 'Elemento'
        return contentChanges(a, b, path + ' / ' + name)
      })
      if (
        left.length === right.length &&
        left.some((item, index) => item.id !== right[index]?.id)
      )
        changes.push({
          path: path + ' / Orden',
          before: left
            .map((item) => item.name || item.title || 'Elemento')
            .join(', '),
          after: right
            .map((item) => item.name || item.title || 'Elemento')
            .join(', '),
        })
      return changes
    }
    return [{path, before, after}]
  }
  if (
    (before && typeof before === 'object') ||
    (after && typeof after === 'object')
  ) {
    return [
      ...new Set([...Object.keys(before || {}), ...Object.keys(after || {})]),
    ]
      .filter((key) => !ignored.has(key))
      .flatMap((key) =>
        contentChanges(
          before?.[key],
          after?.[key],
          path ? path + ' / ' + key : key,
        ),
      )
  }
  return [{path, before: before ?? null, after: after ?? null}]
}
