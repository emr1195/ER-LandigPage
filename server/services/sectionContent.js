import {randomUUID} from 'node:crypto'
import {prepareDetachmentSection} from './detachments.js'
import {contentValidationErrors} from './validateContent.js'

export const sectionKeys = new Set([
  'navbar',
  'heroSection',
  'history',
  'programStructure',
  'expeditionGroup',
  'events',
  'organization',
  'detachment',
  'footer',
])
export class ContentError extends Error {
  constructor(status, code, message, fields = {}) {
    super(message)
    this.status = status
    this.code = code
    this.fields = fields
  }
}
const metadata = new Set(['updatedBy', 'lastModified', 'sectionKey'])
export const normalizeContent = (value, depth = 0) => {
  if (depth > 20)
    throw new ContentError(
      400,
      'INVALID_CONTENT',
      'El contenido tiene demasiados niveles.',
    )
  if (Array.isArray(value)) {
    if (value.length > 500)
      throw new ContentError(
        400,
        'INVALID_CONTENT',
        'Se permiten hasta 500 elementos por lista.',
      )
    const used = new Set()
    return value.map((entry) => {
      const row = normalizeContent(entry, depth + 1)
      if (row && typeof row === 'object' && !Array.isArray(row)) {
        if (typeof row.id !== 'string' || !row.id || used.has(row.id))
          row.id = randomUUID()
        used.add(row.id)
      }
      return row
    })
  }
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => !metadata.has(key))
        .map(([key, entry]) => [key, normalizeContent(entry, depth + 1)]),
    )
  return value
}
export const validateSection = async (key, body) => {
  if (!sectionKeys.has(key))
    throw new ContentError(404, 'SECTION_NOT_FOUND', 'Esta sección no existe.')
  if (!body || typeof body !== 'object' || Array.isArray(body))
    throw new ContentError(
      400,
      'INVALID_CONTENT',
      'El contenido debe ser una sección válida.',
    )
  if (key === 'detachment') {
    try {
      body = await prepareDetachmentSection(body)
    } catch (error) {
      throw new ContentError(
        400,
        'VALIDATION_ERROR',
        error.message,
        error.fields,
      )
    }
  }
  const fields = contentValidationErrors(key, body)
  if (Object.keys(fields).length)
    throw new ContentError(
      400,
      'VALIDATION_ERROR',
      'Revisa los campos indicados antes de publicar.',
      fields,
    )
  return normalizeContent(body)
}
export const expectedRevision = (header) => {
  if (!header)
    throw new ContentError(
      428,
      'REVISION_REQUIRED',
      'Vuelve a cargar la sección antes de publicar.',
    )
  const match = /^"([0-9]+)"$/.exec(header)
  if (!match || !Number.isSafeInteger(Number(match[1])))
    throw new ContentError(
      400,
      'INVALID_REVISION',
      'La revisión de la sección no es válida.',
    )
  return match[1]
}
