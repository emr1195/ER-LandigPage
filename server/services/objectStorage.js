import {createHmac, timingSafeEqual, randomUUID} from 'node:crypto'
import {S3Client, GetObjectCommand, HeadObjectCommand} from '@aws-sdk/client-s3'
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'
import {createPresignedPost} from '@aws-sdk/s3-presigned-post'

export const imageTypes = new Map([['image/jpeg', '.jpg'], ['image/png', '.png'], ['image/webp', '.webp'], ['image/gif', '.gif'], ['image/avif', '.avif']])
export const remoteStorage = () => process.env.STORAGE_DRIVER === 's3'
export const validImageKey = key => /^[a-f0-9-]{36}\.(?:jpg|jpeg|png|webp|gif|avif)$/i.test(key || '')
let client
export const storageClient = () => {
  if (!process.env.AWS_ENDPOINT_URL_S3 || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) throw new Error('Falta configurar el almacenamiento de imágenes.')
  client ||= new S3Client({forcePathStyle: true, region: process.env.AWS_REGION || 'us-east-2', endpoint: process.env.AWS_ENDPOINT_URL_S3, requestChecksumCalculation: 'WHEN_REQUIRED', responseChecksumValidation: 'WHEN_REQUIRED'})
  return client
}
export const storageBucket = () => process.env.STORAGE_BUCKET || 'uploads'
const invalid = message => Object.assign(new Error(message), {status: 400})
const sign = text => createHmac('sha256', process.env.BETTER_AUTH_SECRET).update(text).digest('base64url')
export const signUploadTicket = payload => {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  return data + '.' + sign(data)
}
export const readUploadTicket = (ticket, userId) => {
  if (typeof ticket !== 'string' || ticket.length > 6000) throw invalid('Carga no válida.')
  const [data, signature, extra] = ticket.split('.')
  const expected = Buffer.from(sign(data || ''))
  const actual = Buffer.from(signature || '')
  if (extra || actual.length !== expected.length || !timingSafeEqual(actual, expected)) throw invalid('Carga no válida.')
  let payload
  try { payload = JSON.parse(Buffer.from(data, 'base64url').toString()) } catch { throw invalid('Carga no válida.') }
  if (payload.userId !== userId || payload.expires < Date.now() || !validImageKey(payload.key)) throw invalid('La autorización de carga caducó o no pertenece a esta cuenta.')
  return payload
}
export const prepareImageUpload = async (body, userId) => {
  if (!imageTypes.has(body.type) || !Number.isInteger(body.size) || body.size < 1 || body.size > 8 * 1024 * 1024) throw invalid('Selecciona una imagen PNG, JPG, WebP, GIF o AVIF de hasta 8 MB.')
  const payload = {key: randomUUID() + imageTypes.get(body.type), name: String(body.name || 'Imagen').slice(0, 180), type: body.type, size: body.size, sectionKey: body.sectionKey, field: String(body.field || '').slice(0, 160), userId, expires: Date.now() + 5 * 60000}
  const post = await createPresignedPost(storageClient(), {Bucket: storageBucket(), Key: payload.key, Expires: 300, Fields: {'Content-Type': payload.type}, Conditions: [['content-length-range', payload.size, payload.size], ['eq', '$Content-Type', payload.type]]})
  return {...post, ticket: signUploadTicket(payload)}
}
export const verifyImageUpload = async (ticket, userId) => {
  const payload = readUploadTicket(ticket, userId)
  const object = await storageClient().send(new HeadObjectCommand({Bucket: storageBucket(), Key: payload.key}))
  if (object.ContentLength !== payload.size || object.ContentType !== payload.type) throw invalid('La imagen subida no coincide con el archivo autorizado.')
  return payload
}
export const signedImageUrl = key => getSignedUrl(storageClient(), new GetObjectCommand({Bucket: storageBucket(), Key: key}), {expiresIn: 3600})
