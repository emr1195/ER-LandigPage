import {randomUUID} from 'node:crypto'
import {mkdirSync} from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {Router} from 'express'
import multer from 'multer'
import {requireAdmin} from '../middleware/auth.js'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
export const uploadsDirectory = path.resolve(currentDir, '../../uploads')

mkdirSync(uploadsDirectory, {recursive: true})

const imageExtensions = new Map([
  ['image/avif', '.avif'],
  ['image/gif', '.gif'],
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/webp', '.webp'],
])

const storage = multer.diskStorage({
  destination: uploadsDirectory,
  filename: (_req, file, callback) => {
    const extension = imageExtensions.get(file.mimetype)
    callback(null, `${randomUUID()}${extension}`)
  },
})

const upload = multer({
  storage,
  limits: {fileSize: 8 * 1024 * 1024, files: 1},
  fileFilter: (_req, file, callback) => {
    if (!imageExtensions.has(file.mimetype)) {
      return callback(new Error('Solo se permiten archivos de imagen.'))
    }
    return callback(null, true)
  },
})

export const uploadsRouter = Router()

uploadsRouter.post('/', requireAdmin, (req, res, next) => {
  upload.single('file')(req, res, (error) => {
    if (error) {
      error.status = 400
      return next(error)
    }
    if (!req.file) {
      return res.status(400).json({error: 'Selecciona una imagen.'})
    }
    return res.status(201).json({
      url: `/api/uploads/files/${req.file.filename}`,
    })
  })
})
