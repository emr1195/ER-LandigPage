# Exploradores del Rey

Landing page y panel administrativo con React, una API Express y PostgreSQL independiente. La autenticacion se almacena en la misma base mediante Better Auth.

## Arquitectura

```text
Navegador (Vite/React) -> API Express -> PostgreSQL
```

La contraseña de PostgreSQL solo existe en el servidor. Nunca se envía al navegador.

Las imágenes subidas desde el dashboard se guardan localmente en `uploads/` y sus
rutas se almacenan con el contenido de cada sección en PostgreSQL. Conserva esa
carpeta cuando hagas respaldos o muevas el proyecto a otro equipo.

## Configuración inicial

1. Crea una base vacía en PostgreSQL.
2. Copia `.env.example` como `.env`.
3. Completa como mínimo:

```env
DATABASE_URL=postgresql://USUARIO:CONTRASENA@HOST:5432/BASE_DE_DATOS
BETTER_AUTH_SECRET=UNA_CADENA_ALEATORIA_DE_AL_MENOS_32_CARACTERES
ADMIN_NAME=Administrador
ADMIN_EMAIL=tu-correo@example.com
ADMIN_PASSWORD=UNA_CONTRASENA_SEGURA
```

Para PostgreSQL alojado que exige TLS agrega `DATABASE_SSL=true`.

4. Instala y prepara la base:

```powershell
npm install
npm run db:setup
```

`db:setup` crea primero la base indicada en `DATABASE_URL` si no existe, agrega las tablas de autenticación, contenido y notas, y después crea o promueve el usuario administrador indicado en `.env`.

5. Inicia frontend y API:

```powershell
npm run dev
```

## URLs locales

- Landing: `http://localhost:3000/`
- Login: `http://localhost:3000/auth/login`
- Dashboard: `http://localhost:3000/dashboard`
- Salud de la API: `http://localhost:3000/api/health`

## Google opcional

Agrega `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` al `.env`. La URL de callback local es:

```text
http://localhost:3001/api/auth/callback/google
```

El botón de Google solo aparece cuando ambas variables están configuradas. Después del primer acceso debes ejecutar `npm run db:seed-admin` usando el mismo correo en `ADMIN_EMAIL` para otorgarle permisos administrativos.

## Producción

```powershell
npm run build
npm start
```

Express sirve la carpeta `dist` y la API desde el mismo proceso. Ajusta `BETTER_AUTH_URL` y `CLIENT_ORIGIN` al dominio público.

## Respaldo de Firebase

El respaldo se importará a `site_sections` y, si contiene notas, a `notes`. Conserva el archivo original sin modificar y no lo publiques en Git.
