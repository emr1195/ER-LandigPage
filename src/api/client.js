import {apiUrl, externalApi} from './deployment'

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(apiUrl(path), {
    credentials: externalApi ? 'omit' : 'include',
    ...options,
    headers: {
      ...(options.body ? {'Content-Type': 'application/json'} : {}),
      ...options.headers,
    },
  })

  if (!response.ok) {
    const payload = await response.json().catch(() => null)
    throw new Error(payload?.error || `Error HTTP ${response.status}`)
  }

  if (response.status === 204) return null
  return response.json()
}
