/* global __PUBLIC_API_ORIGIN__ */
/* Vite replaces this constant at build time; tests/local builds default to same-origin. */
export const apiOrigin = typeof __PUBLIC_API_ORIGIN__ === 'undefined' ? '' : __PUBLIC_API_ORIGIN__
export const externalApi = Boolean(apiOrigin && apiOrigin !== window.location.origin)
export const apiUrl = (path) => `${apiOrigin}${path}`
export const publicImageUrl = (value) => typeof value === 'string' && value.startsWith('/api/uploads/files/') ? apiUrl(value) : value
