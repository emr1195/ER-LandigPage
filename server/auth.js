import 'dotenv/config'
import {randomUUID} from 'node:crypto'
import {betterAuth} from 'better-auth'
import {pool} from './db.js'

const port = process.env.PORT || 3001
if (
  !process.env.BETTER_AUTH_SECRET ||
  process.env.BETTER_AUTH_SECRET.length < 32
) {
  throw new Error('BETTER_AUTH_SECRET debe tener al menos 32 caracteres.')
}

const googleEnabled = Boolean(
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
)

export const auth = betterAuth({
  database: pool,
  baseURL: process.env.BETTER_AUTH_URL || `http://localhost:${port}`,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [process.env.CLIENT_ORIGIN || 'http://localhost:3002'],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: googleEnabled
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : {},
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'user',
        input: false,
      },
    },
  },
  advanced: {
    database: {
      generateId: () => randomUUID(),
      joins: true,
    },
  },
})

export {googleEnabled}
