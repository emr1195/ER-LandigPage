import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const apiOrigin = env.VITE_API_ORIGIN || ''
  if (
    apiOrigin &&
    (new URL(apiOrigin).origin !== apiOrigin ||
      !apiOrigin.startsWith('https://'))
  ) {
    throw new Error(
      'VITE_API_ORIGIN debe ser un origen HTTPS sin ruta ni barra final.',
    )
  }
  return {
    plugins: [react()],
    base: env.VITE_BASE_PATH || '/',
    define: {__PUBLIC_API_ORIGIN__: JSON.stringify(apiOrigin)},
    server: {
      port: 3002,
      proxy: {
        '/api': process.env.API_PROXY_TARGET || 'http://127.0.0.1:3001',
      },
    },
  }
})
