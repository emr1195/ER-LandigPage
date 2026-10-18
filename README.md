# Exploradores del Rey

Un sitio público y un dashboard para que el equipo administrador mantenga su
contenido sin editar código. Cambia textos e imágenes, prepara eventos y revisa
el resultado antes de publicarlo. Cada publicación conserva su autor y sus cambios.

El dashboard tiene diseño Editorial para escritorio, tablet y móvil, con dos
apariencias claras por cuenta: **Carbon & Azure** y **Petrol & Apricot**.

## Mira el recorrido

[![Recorrido del dashboard: edición, vista previa, publicación y auditoría](public/walkthrough/poster.jpg)](public/walkthrough/exploradores-walkthrough.mp4)

Video en español, sin audio, con textos integrados, cursor suave, indicación de
clics y acercamientos puntuales. Todo el contenido mostrado es ficticio.

- [Ver el reproductor en local](http://localhost:3002/walkthrough) — requiere la aplicación iniciada. También funciona `/walktrough`.
- [Abrir o descargar el MP4](public/walkthrough/exploradores-walkthrough.mp4).
- [Leer la transcripción por capítulos](docs/walkthrough-transcripcion.md) o [descargar los textos VTT](public/walkthrough/exploradores-walkthrough.vtt).

**Entrega aprobada:** el propietario revisó el video y este README y autorizó
su entrega en `develop`, la rama que utiliza el cliente. Los enlaces locales
requieren iniciar la aplicación; la disponibilidad remota depende del despliegue
existente del cliente.

### El panel en uso

![Portada con su borrador y vista previa en la apariencia Carbon & Azure](docs/screenshots/dashboard-portada.png)

![Detalle de Actividad con autor y comparación Antes y Después de una publicación](docs/screenshots/dashboard-actividad.png)

![Portada en la apariencia clara Petrol & Apricot](docs/screenshots/dashboard-petrol.png)

## Cómo actualizar el sitio

1. Entra en [el acceso administrativo local](http://localhost:3002/auth/login) con tu cuenta de administrador.
2. Elige una sección y modifica sus campos. Los cambios son un **borrador de esa pestaña**: todavía no aparecen en el sitio público.
3. Comprueba la **vista previa** en escritorio, tablet o móvil. Puedes ampliarla para revisarla mejor.
4. Pulsa **Guardar y publicar**. La confirmación indica que el conjunto de cambios de esa sección ya es público. Si eliminas un registro, la baja también espera esta publicación.
5. Revisa la página pública y consulta **Actividad** para ver quién publicó, cuándo y qué había Antes y Después.

El panel avisa antes de abandonar cambios pendientes y señala los campos que
necesitan corrección. Si otra persona publica primero, conserva tu edición y
permite consultar la versión vigente antes de descartarla conscientemente.
Los borradores no se recuperan después de cerrar el navegador.

### Las nueve secciones

| Sección | Qué puedes mantener |
| --- | --- |
| Navegación | Marca y enlaces de navegación. |
| Portada | Mensaje principal, imágenes y botones. |
| Historia | Relato, imágenes y datos destacados. |
| Programa | Contenido y características del programa. |
| Grupos | Grupos y sus datos. |
| Eventos | Actividades, fechas, lugares, organizadores e imágenes. |
| Organización | Integrantes y estructura del equipo. |
| Destacamentos | Ubicaciones, contactos y mapas. |
| Pie de página | Información y enlaces del cierre del sitio. |

Inicio ayuda a localizar las secciones. Actividad es privada y de solo lectura;
la apariencia personal se conserva por cuenta y no cambia el tema del sitio público.

## Instalación local

React/Vite sirve la interfaz; Express proporciona la API; PostgreSQL almacena
autenticación, contenido, revisiones, preferencias y auditoría. La contraseña
de PostgreSQL permanece en el servidor.

Necesitas Node.js con npm y PostgreSQL. Las herramientas de video se instalan
por separado y no son necesarias para usar la aplicación.

1. Copia `.env.example` a `.env` y configura al menos:

```env
DATABASE_URL=postgresql://USUARIO:CONTRASENA@localhost:5432/er_landing
BETTER_AUTH_SECRET=UNA_CADENA_ALEATORIA_DE_AL_MENOS_32_CARACTERES
ADMIN_NAME=Administrador
ADMIN_EMAIL=tu-correo@example.com
ADMIN_PASSWORD=UNA_CONTRASENA_SEGURA
```

El último segmento de `DATABASE_URL` es el nombre de la base. No necesitas
agregar `?schema=public`. Usa el nombre real de tu base; `er_landing` es el
ejemplo local. Si el proveedor exige TLS, configura `DATABASE_SSL=true`.
Conserva los orígenes y puertos locales de `.env.example` para este arranque.

2. Instala dependencias y prepara la base:

```powershell
npm install
npm run db:setup
```

`db:setup` crea la base indicada si no existe (el usuario PostgreSQL debe tener
permiso), aplica las migraciones y crea o promueve al administrador de `.env`.
Si la base ya está provisionada, puedes ejecutar `npm run db:migrate` y
`npm run db:seed-admin` por separado. El registro público está deshabilitado.

3. Opcionalmente, agrega datos de muestra y arranca:

```powershell
npm run db:seed-demo
npm run dev
```

El seed completa las nueve secciones con textos, cuatro eventos, tres grupos,
seis integrantes ficticios y cinco destacamentos. Sus ilustraciones no necesitan
servicios externos. Solo funciona contra PostgreSQL local fuera de producción;
conserva las secciones existentes al repetirlo y no cambia usuarios ni contraseñas.
Los nombres, edades, fechas y contactos de muestra no son datos oficiales.

| Destino | URL local |
| --- | --- |
| Sitio público | <http://localhost:3002/> |
| Login | <http://localhost:3002/auth/login> |
| Dashboard | <http://localhost:3002/dashboard> |
| Video | <http://localhost:3002/walkthrough> |
| Salud de la API | <http://localhost:3002/api/health> |

### Acceso con Google, opcional

Configura `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` en `.env`. El callback local
es `http://localhost:3001/api/auth/callback/google`. El botón aparece cuando
ambas variables están configuradas. Después del primer acceso, ejecuta
`npm run db:seed-admin` con ese correo en `ADMIN_EMAIL` para conceder acceso administrativo.

## Pruebas

```powershell
npm run lint
npm run build
npm test
npm run test:e2e
```

`test:e2e` compila antes de probar los archivos estáticos con Express y los
recorridos de navegador con Chrome. Usa API y PostgreSQL reales en un clúster
**aislado**: `.tmp/dashboard-test.local/postgres`, puerto 55439, base
`er_dashboard_test`; frontend 3410 y API 3411. Ignora el `DATABASE_URL` del
usuario y comprueba el directorio del clúster antes de preparar datos.

Requiere Chrome y PostgreSQL 17/18 en Windows (`PG_BIN` permite indicar la
carpeta `bin`). Los datos, cuentas y archivos de prueba son desechables.
No ejecutes dos suites ni una suite y la grabación simultáneamente. La captura
reserva el arnés para evitar que una prueba restablezca sus datos.

El login por correo usa autenticación real. Google se verifica mediante su
frontera de red con retorno simulado, mientras no haya credenciales reales.
La guía de [producción y verificación del video](docs/walkthrough.md) explica
cómo repetir el ensayo, grabar, renderizar y comprobar una ruta base.

## Operación y despliegue

```powershell
npm run build
npm start
```

Express sirve `dist` y la API desde el mismo proceso. Ajusta `BETTER_AUTH_URL`
y `CLIENT_ORIGIN` al dominio público. Para GitHub Pages y una API en VPS,
consulta [la guía de despliegue](deploy/README.md); describe la alternativa de
infraestructura incluida en el repositorio. El flujo efectivo del cliente se
conserva y la entrega aprobada se integra en `develop`.

Antes de migrar o actualizar, respalda **PostgreSQL y `uploads/`**. Las imágenes
subidas se guardan en esa carpeta y sus rutas en la base; Git no sustituye ese
respaldo. `npm run db:migrate` aplica migraciones versionadas sin reemplazar el
contenido existente. En Docker conserva los volúmenes persistentes.

Las publicaciones y su auditoría se confirman en una transacción. Las cargas
de imágenes tienen eventos separados, incluso si después se descarta su
asociación. Actividad no tiene caducidad automática; no se inventa historial
de contenido anterior o del seed.

El respaldo histórico de Firebase se importa a `site_sections` y, si contiene
notas, a `notes`. Conserva el original sin modificar y fuera de Git.

La [guía del refactor](docs/dashboard-refactor.md) describe módulos, persistencia
y validación del dashboard. El prototipo aprobado se conserva en la rama local
`prototype/dashboard-editorial-20261018023734` (`c26f7ae`); sus variantes son
evidencia histórica y no sustituyen las pruebas del producto actual.
