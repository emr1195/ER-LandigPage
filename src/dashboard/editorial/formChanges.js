import {createContext} from 'react'
export const ValidationContext = createContext({})
export const applyChange = (previous, next) =>
  typeof next === 'function' ? next(previous) : next
const updateAt = (previous, keys, next) => {
  if (!keys.length) return applyChange(previous, next)
  const [key, ...rest] = keys
  const copy = Array.isArray(previous) ? [...previous] : {...previous}
  copy[key] = updateAt(previous?.[key], rest, next)
  return copy
}
// Every nested change resolves against the latest draft, including simultaneous uploads.
export const at = (onChange, ...keys) => {
  const change = (next) =>
    onChange((previous) => updateAt(previous, keys, next))
  change.path = [...(onChange.path || []), ...keys]
  return change
}
