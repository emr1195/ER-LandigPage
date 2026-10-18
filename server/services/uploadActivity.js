import {unlink} from 'node:fs/promises'
import {pool} from '../db.js'
import {recordActivity} from './activity.js'
import {ContentError, sectionKeys} from './sectionContent.js'

export const completeUpload = async (file, context, actor) => {
  try {
    if (context.sectionKey && !sectionKeys.has(context.sectionKey))
      throw new ContentError(
        400,
        'INVALID_SECTION',
        'La sección de la imagen no es válida.',
      )
    const url = '/api/uploads/files/' + file.filename
    const name = [...file.originalname]
      .filter(
        (character) =>
          character.charCodeAt(0) >= 32 && character.charCodeAt(0) !== 127,
      )
      .join('')
      .slice(0, 180)
    await recordActivity(pool, {
      actor,
      action: 'upload',
      sectionKey: context.sectionKey || null,
      after: {
        url,
        name,
        type: file.mimetype,
        size: file.size,
        field:
          typeof context.field === 'string' ? context.field.slice(0, 160) : '',
      },
    })
    return {url}
  } catch (error) {
    try {
      await unlink(file.path)
    } catch (cleanupError) {
      if (cleanupError.code !== 'ENOENT')
        console.error(
          'No se pudo compensar una carga fallida:',
          cleanupError.message,
        )
    }
    throw error
  }
}
