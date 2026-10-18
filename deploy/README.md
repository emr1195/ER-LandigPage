# Producción: GitHub Pages + VPS

Preparación solamente: estos archivos no contratan un VPS, no configuran DNS y
no publican una API hasta ejecutar los pasos siguientes en un servidor real.
No exponer PostgreSQL ni la PC personal a internet.

## Requisitos

- VPS Linux con Docker Engine y Compose v2 instalados desde Docker oficial.
- Un dominio/subdominio propio (por ejemplo `admin.tudominio.com`) apuntando
  mediante DNS A a la IP del VPS. Solo agregar AAAA si IPv6 funciona allí.
- Puertos 80/443 abiertos; acceso SSH restringido por clave. No abrir 3001/5432.
- Acceso al repositorio GitHub; el VPS no necesita acceso al PostgreSQL de tu PC.

## 1. Configurar el VPS

Clonar el repositorio y entrar en `deploy/`. Copiar `.env.example` a `.env`
y editarlo **en el servidor**, sin compartir secretos por chat ni subirlos a Git.

```sh
git clone --branch develop https://github.com/emr1195/ER-LandigPage.git
cd ER-LandigPage/deploy
cp .env.example .env
chmod 600 .env
```

Configurar DOMAIN, ADMIN_EMAIL y ADMIN_PASSWORD. Generar dos secretos diferentes
con `openssl rand -hex 32`: uno para POSTGRES_PASSWORD y otro BETTER_AUTH_SECRET.
Usar una contraseña de administrador nueva, única y de al menos 16 caracteres.
PUBLIC_SITE_ORIGIN es `https://emr1195.github.io` (sin ruta de repositorio).

```sh
docker compose config --quiet
docker compose build
docker compose run --rm --no-deps app node server/scripts/check-production.js
docker compose up -d db
docker compose run --rm app npm run db:migrate
docker compose run --rm app npm run db:seed-admin
docker compose up -d
docker compose ps
```

Caddy obtiene/renueva HTTPS con DNS y puertos correctos. Entrar a
`https://TU_DOMINIO/auth/login`; comprobar inicio de sesión, guardar un cambio,
subir imagen y consultar `https://TU_DOMINIO/api/health`.

## 2. Migrar el contenido y las imágenes de la PC

La instalación nueva empieza vacía: Git no contiene los datos ni las imágenes.
Antes de publicar Pages se necesita migrar ambos. No reutilizar los usuarios y
contraseñas locales: el nuevo administrador se crea en el paso anterior.

Para transferir solo el contenido público actual, exportar en la PC con
`pg_dump` de la misma versión mayor del origen, apuntando a la base local:

```sh
pg_dump --host=localhost --username=postgres --dbname=er_landing --format=custom --data-only --table=public.site_sections --no-owner --no-privileges --file=site-sections.dump
```

Se pedirá la contraseña; no ponerla en la línea de comandos. Copiar por SCP
`site-sections.dump` y una copia completa de la carpeta local `uploads/` al VPS.
El dump debe mantenerse fuera del repositorio. Restaurar solo sobre la nueva
base, con `site_sections` vacía; no usar estos pasos si ya hay contenido remoto.

```sh
docker compose cp /RUTA/SEGURA/site-sections.dump db:/tmp/site-sections.dump
docker compose exec -T db pg_restore --username=er_app --dbname=er_landing --data-only --no-owner --no-privileges --exit-on-error /tmp/site-sections.dump
docker compose cp /RUTA/SEGURA/uploads/. app:/app/uploads/
docker compose exec --user root app chown -R node:node /app/uploads
```

Verificar que se muestran todas las secciones y logos antes de activar Pages.
Las notas privadas no se migran con este procedimiento; requieren un respaldo
separado si se desea conservarlas en el servidor.

## 3. Conectar GitHub Pages

En GitHub → repositorio → Settings:

1. Pages → Build and deployment → Source: **GitHub Actions**.
2. Secrets and variables → Actions → Variables: agregar `PUBLIC_API_ORIGIN`
   con `https://TU_DOMINIO` (sin barra final). No es un secreto: será público.
3. Actions → Public website (live API) → Run workflow desde `develop`.

El flujo está inactivo mientras falta PUBLIC_API_ORIGIN, para no reemplazar
la web publicada con una página sin datos. El workflow debe estar previamente
subido al repositorio. Publica en `https://emr1195.github.io/ER-LandigPage/`.
Si se usa un dominio personalizado para Pages, ajustar VITE_BASE_PATH a `/`
y PUBLIC_SITE_ORIGIN al origen de ese dominio antes de publicar.

La web consulta datos actuales del VPS sin cookies de administrador. Las rutas
`/ER-LandigPage/dashboard` y `/ER-LandigPage/auth/login` redirigen al login del
VPS, donde cookies y API comparten dominio. Los cambios guardados se ven al
recargar la web pública, sin tener que reconstruir Pages.

## Actualizaciones y respaldos

```sh
git pull --ff-only origin develop
docker compose build
docker compose run --rm app npm run db:migrate
docker compose up -d
```

Hacer respaldo de PostgreSQL **y** del volumen uploads antes de actualizar,
guardándolo cifrado fuera del VPS. Ejemplo de dump en el VPS:

```sh
docker compose exec -T db pg_dump --username=er_app --dbname=er_landing --format=custom > /RUTA/SEGURA/respaldo.dump
```

Los volúmenes mantienen datos al reconstruir. **No ejecutar `docker compose
down -v`**: eliminaría base, imágenes y certificados. Configurar respaldos
programados con el proveedor antes de considerar producción terminada.

Referencias oficiales: [Docker Compose](https://docs.docker.com/compose/how-tos/startup-order/),
[imagen PostgreSQL](https://hub.docker.com/_/postgres),
[HTTPS de Caddy](https://caddyserver.com/docs/automatic-https),
[GitHub Pages Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
