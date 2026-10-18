// Fail closed before exposing a container configured with example credentials.
const required = ['DATABASE_URL', 'BETTER_AUTH_SECRET', 'BETTER_AUTH_URL', 'CLIENT_ORIGIN', 'PUBLIC_SITE_ORIGIN', 'ADMIN_EMAIL', 'ADMIN_PASSWORD']
for (const key of required) {
  const value = process.env[key] || ''
  if (!value || /REPLACE_|example\.(com|org)/i.test(value)) {
    throw new Error(`Configura un valor real para ${key}.`)
  }
}
if (process.env.BETTER_AUTH_SECRET.length < 32 || process.env.ADMIN_PASSWORD.length < 16) {
  throw new Error('Usa un secreto de al menos 32 caracteres y una contraseña de administrador de al menos 16.')
}
for (const key of ['BETTER_AUTH_URL', 'CLIENT_ORIGIN', 'PUBLIC_SITE_ORIGIN']) {
  const value = process.env[key]
  if (!value.startsWith('https://') || new URL(value).origin !== value) throw new Error(`${key} debe ser un origen HTTPS sin ruta ni barra final.`)
}
console.log('Configuración de producción validada (secretos ocultos).')
