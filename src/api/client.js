import {apiUrl, externalApi} from './deployment'

export class ApiError extends Error {
  constructor(message, status, code, fields) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.fields = fields || {}
  }
}

export const apiResponse = async (path, options = {}) => {
  const response = await fetch(apiUrl(path), {
    credentials: externalApi ? 'omit' : 'include',
    ...options,
    headers: {
      ...(options.body && !(options.body instanceof FormData)
        ? {'Content-Type': 'application/json'}
        : {}),
      ...options.headers,
    },
  }).catch((error) => {
    if (error.name === 'AbortError') throw error
    throw new ApiError(
      'No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.',
      undefined,
      'NETWORK_ERROR',
    )
  })

  if (!response.ok) {
    const payload = await response.json().catch(() => null)
    throw new ApiError(
      payload?.error || `Error HTTP ${response.status}`,
      response.status,
      payload?.code,
      payload?.fields,
    )
  }

  return response
}

export const apiRequest = async (path, options = {}) => {
  const response = await apiResponse(path, options)
  return response.status === 204 ? null : response.json()
}
