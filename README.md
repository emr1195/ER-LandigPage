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

Para poblar la base local con contenido de demostración, después de `db:setup`:

```powershell
npm run db:seed-demo
```

El seed completa las nueve secciones del sitio con textos, cuatro eventos,
tres grupos, seis integrantes ficticios y cinco destacamentos de ejemplo.
Las ilustraciones están incluidas en los datos y no necesitan servicios externos.
Los nombres, edades, fechas y contactos de esta muestra no son datos oficiales.
Solo funciona contra PostgreSQL local, fuera de producción, y conserva las
secciones existentes al ejecutarlo de nuevo. No cambia usuarios ni contraseñas.

5. Inicia frontend y API:

```powershell
npm run dev
```

## URLs locales

- Landing: `http://localhost:3002/`
- Login: `http://localhost:3002/auth/login`
- Dashboard: `http://localhost:3002/dashboard`
- Salud de la API: `http://localhost:3002/api/health`

El dashboard usa Editorial y permite elegir dos apariencias claras por cuenta.
Cada sección tiene su URL, vista previa y un borrador en la pestaña. **Guardar y
publicar** hace visible el conjunto de cambios; las eliminaciones esperan esa
publicación. Si otra persona publica primero, el panel conserva tu edición y
permite consultar la versión vigente antes de descartarla conscientemente.

`npm run db:migrate` aplica migraciones versionadas y conserva el contenido
existente. Antes de actualizar una instalación, respalda PostgreSQL y `uploads/`.
Las publicaciones y su auditoría se confirman en una transacción; las cargas de
imágenes tienen eventos separados. Actividad es privada y de solo lectura, sin
caducidad automática. No se inventa historial de contenido anterior o del seed.

## Pruebas del dashboard

```powershell
npm run lint
npm run build
npm test
npm run test:e2e
```

Los recorridos de Playwright usan Chrome y un clúster PostgreSQL **aislado** en
`.tmp/dashboard-test.local/postgres`, puerto 55439, base `er_dashboard_test`.
El arnés ignora el `DATABASE_URL` del usuario y verifica el directorio del clúster
antes de preparar datos. API y frontend de pruebas usan 3411 y 3410; no ejecutes
dos suites de Playwright a la vez. Requiere PostgreSQL local 17/18 en Windows
(`PG_BIN` permite indicar su carpeta `bin`) y Chrome instalado.

Los registros y archivos de prueba son desechables. Las pruebas usan cuentas
exclusivas de ese clúster; nunca las credenciales de `.env`. La integración con
Google se verifica en su frontera de red con retorno simulado mientras no haya
credenciales reales configuradas. El login con correo sí usa autenticación real.

El prototipo aprobado se conserva en la rama local
`prototype/dashboard-editorial-20261018023734` (commit `c26f7ae`). Sus variantes
son evidencia histórica; el producto se valida con las pruebas anteriores.
`npm run design:preview` requiere los archivos locales del prototipo; en esa rama
también puedes usar `python -m http.server 5197 --bind 127.0.0.1 --directory .design/dashboard-redesign`.

## Google opcional

Agrega `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` al `.env`. La URL de callback local es:

```text
http://localhost:3001/api/auth/callback/google
```

El botón de Google solo aparece cuando ambas variables están configuradas. Después del primer acceso debes ejecutar `npm run db:seed-admin` usando el mismo correo en `ADMIN_EMAIL` para otorgarle permisos administrativos.

## Producción

Para GitHub Pages conectado a un VPS con PostgreSQL independiente, ver
[la guía de despliegue](deploy/README.md). Incluye HTTPS, Docker, volúmenes
persistentes, migración del contenido y publicación del frontend.

```powershell
npm run build
npm start
```

Express sirve la carpeta `dist` y la API desde el mismo proceso. Ajusta `BETTER_AUTH_URL` y `CLIENT_ORIGIN` al dominio público.

## Respaldo de Firebase

El respaldo se importará a `site_sections` y, si contiene notas, a `notes`. Conserva el archivo original sin modificar y no lo publiques en Git.
