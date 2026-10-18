const metadata = new Set([
  'updatedBy',
  'lastModified',
  'sectionKey',
  'embedUrl',
])
export const contentIdentity = (value) => JSON.stringify(canonical(value))
const canonical = (value) => {
  if (Array.isArray(value)) return value.map(canonical)
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.keys(value)
        .filter((key) => !metadata.has(key))
        .sort()
        .map((key) => [key, canonical(value[key])]),
    )
  return value
}
