# Integración de la entrega aprobada

Fecha: 18 de octubre de 2026.

El propietario aprobó el video y el README y autorizó el push a `develop`.
Confirmó que esa es la rama usada por el cliente. No se inicia una publicación
manual adicional ni se modifica su infraestructura.

## Resolución del trabajo remoto

La rama local contenía once commits y el remoto añadió `f419f6c` desde su base
común. Se integran ambas historias mediante merge, sin force push.

- Se conserva el dashboard Editorial, su refactor, auditoría y validaciones
  obligatorias, según la elección expresa del propietario.
- Se conserva el rediseño institucional público remoto y sus pruebas.
- No se restauran los editores antiguos eliminados por el refactor ni su prueba
  de campos completamente opcionales.
- Se adaptan los selectores de pruebas y futuras grabaciones al nuevo Hero y
  menú público. El MP4 aprobado permanece intacto y conserva su versión de origen.

## Comprobaciones

- Lint: correcto.
- Jest: 9 suites y 38 pruebas correctas.
- Compilación: correcta.
- Navegador: ejecución integrada de 78 casos; 77 correctos y un fallo de
  interacción en la consulta de conflictos. Una carga controlada confirmó que
  la vista previa desplazaba el botón 75 px. Se colocó la acción antes del iframe
  y se añadió una regresión que comprueba estabilidad y adopción de la versión.
- Después de la corrección: 42 ejecuciones correctas de concurrencia, densidad,
  errores y recuperación (21 casos, dos repeticiones). No se atribuye una segunda
  ejecución de toda la suite: los otros 57 casos ya habían pasado en la integrada.
- La API local se reinició sin migrar ni modificar datos; `/api/health` confirmó
  PostgreSQL disponible.
- SHA-256 del MP4 aprobado, sin cambios:
  `aa3350351ab7cdc5e77f05024b7199e9ebdcaa75b47a2425e2aab6ac751c3dec`.

## Disponibilidad remota

GitHub Pages señala `gh-pages`; el workflow incluido es manual. No se observan
runs de Actions ni estados de despliegue que identifiquen el hosting del cliente
para `develop`. La URL efectiva no fue proporcionada. Por ello, un push confirmado
no se presentará como comprobación del reproductor desplegado.

## Intento de push

Merge local: `3b0b56c` (padres `3b52262` y `f419f6c`).
`git push origin develop` fue ejecutado tras la aprobación y GitHub respondió
HTTP 403: permiso denegado a `EPraz`. `gh repo view` confirmó
`viewerPermission: READ`; es la única cuenta configurada tanto en GitHub CLI
como en Git Credential Manager.

El push directo no se completó y el remoto no recibió esta entrega. No se
alteraron credenciales ni se inició otro despliegue.

El propietario indicó después que se envíe como Pull Request. Se creó el fork
`EPraz/ER-LandigPage` para publicar la rama de entrega y proponer su integración
en `emr1195/ER-LandigPage:develop`, conservando el merge y todo el historial.
La apertura del PR no equivale a un merge ni a una verificación de despliegue.
