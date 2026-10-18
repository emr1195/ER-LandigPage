import 'dotenv/config'
import {auth} from '../auth.js'
import {pool} from '../db.js'

const name = process.env.ADMIN_NAME || 'Administrador'
const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD

if (!email || !password) {
  throw new Error('Faltan ADMIN_EMAIL o ADMIN_PASSWORD en el archivo .env')
}

if (password.length < 8) {
  throw new Error('ADMIN_PASSWORD debe tener al menos 8 caracteres.')
}

try {
  const existing = await pool.query(
    'select id from "user" where lower(email) = lower($1)',
    [email],
  )

  if (!existing.rowCount) {
    await auth.api.signUpEmail({
      body: {name, email, password},
    })
  }

  await pool.query(
    'update "user" set role = $1 where lower(email) = lower($2)',
    ['admin', email],
  )
  console.log(`Administrador preparado: ${email}`)
} finally {
  await pool.end()
}
