import {readFile, stat} from 'node:fs/promises'
import path from 'node:path'
import {createHash} from 'node:crypto'
import {parse} from 'dotenv'
import pg from 'pg'
import {HeadBucketCommand, HeadObjectCommand, PutObjectCommand} from '@aws-sdk/client-s3'
import {storageClient, storageBucket, validImageKey, imageTypes} from '../services/objectStorage.js'

Object.assign(process.env, parse(await readFile('.env.neon.local', 'utf8')))
const database = new URL(process.env.DATABASE_URL)
if (!database.hostname.endsWith('.neon.tech')) throw new Error('El destino debe ser Neon.')
database.searchParams.set('sslmode', 'verify-full')
const pool = new pg.Pool({connectionString: database.href, max: 1, connectionTimeoutMillis: 15000})
try {
  const s3 = storageClient()
  const Bucket = storageBucket()
  await s3.send(new HeadBucketCommand({Bucket}))
  const {rows} = await pool.query('select data from site_sections')
  const keys = new Set()
  const collect = value => {
    if (typeof value === 'string' && value.startsWith('/api/uploads/files/')) {
      const key = value.slice('/api/uploads/files/'.length)
      if (!validImageKey(key)) throw new Error('Una imagen tiene una ruta no válida.')
      keys.add(key)
    } else if (Array.isArray(value)) value.forEach(collect)
    else if (value && typeof value === 'object') Object.values(value).forEach(collect)
  }
  rows.forEach(row => collect(row.data))
  // Validate every source before copying the first file.
  for (const key of keys) await stat(path.join('uploads', key))
  let uploaded = 0
  let reused = 0
  for (const Key of keys) {
    const Body = await readFile(path.join('uploads', Key))
    const sha256 = createHash('sha256').update(Body).digest('hex')
    let existing
    try { existing = await s3.send(new HeadObjectCommand({Bucket, Key})) } catch (error) {
      if (error.$metadata?.httpStatusCode !== 404) throw error
    }
    if (existing) {
      if (existing.ContentLength !== Body.length || existing.Metadata?.sha256 !== sha256) throw new Error('Existe una imagen diferente en el destino; no se sobrescribió.')
      reused++
    } else {
      const ContentType = [...imageTypes.entries()].find(([, extension]) => Key.endsWith(extension))?.[0]
      await s3.send(new PutObjectCommand({Bucket, Key, Body, ContentType, Metadata: {sha256}, CacheControl: 'public, max-age=31536000, immutable', IfNoneMatch: '*'}))
      uploaded++
    }
    const verified = await s3.send(new HeadObjectCommand({Bucket, Key}))
    if (verified.ContentLength !== Body.length || verified.Metadata?.sha256 !== sha256) throw new Error('La verificación de imagen no coincide.')
    if ((uploaded + reused) % 10 === 0) console.log(JSON.stringify({verified: uploaded + reused, total: keys.size}))
  }
  console.log(JSON.stringify({verified: keys.size, uploaded, reused, localFilesDeleted: false, databasePathsChanged: false}))
} catch (error) {
  console.error(JSON.stringify({migrated: false, code: error.name, status: error.$metadata?.httpStatusCode, message: String(error.message).replace(/https?:[^\s]+/g, '[URL]').replace(/n[as]k_[\w-]+/g, '[oculto]')}))
  process.exitCode = 1
} finally { await pool.end() }
