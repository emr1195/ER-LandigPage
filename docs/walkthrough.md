# Producción y verificación del walkthrough

El resultado publicado en el repositorio es una grabación real de la aplicación,
con datos ficticios. No contiene voz ni música. Las anotaciones de cursor, los
pulsos de clic y los acercamientos pertenecen a la captura y al montaje; no se
instalan en el dashboard utilizado por los administradores.

## Archivos de la entrega

- `public/walkthrough/exploradores-walkthrough.mp4`: H.264, 1920 × 1080, 25 fps, sin audio, preparado con faststart.
- `public/walkthrough/poster.jpg`: fotograma del recorrido.
- `public/walkthrough/exploradores-walkthrough.vtt`: textos con sus tiempos.
- `src/walkthrough/content.json`: capítulos y duración generados del mismo montaje.
- [Transcripción legible](walkthrough-transcripcion.md).
- [Informe del artefacto](../.scratch/dashboard-walkthrough/qa/render.json): tamaño, duración, SHA-256 y resultados reales de la captura.

Las tomas originales, ilustraciones temporales, herramientas Python y hojas de
revisión permanecen bajo `.tmp/*.local`, fuera de Git y de `dist`.
Los scripts de producción están en `scripts/walkthrough/`; no se requiere el
proyecto hermano de Aster para ejecutarlos.

## Requisitos de producción del material

Windows, Node.js/npm, Chrome, PostgreSQL 17/18, Python y las fuentes Segoe UI de
Windows. Instala primero las dependencias de la aplicación con `npm install`.
Las herramientas Python son dependencias de desarrollo separadas:

```powershell
python -m pip install --target .tmp/walkthrough-tools.local imageio-ffmpeg==0.6.0 Pillow==13.0.0
```

`imageio-ffmpeg` proporciona el ejecutable FFmpeg usado por el renderer.
Si están en otra carpeta, configura `WALKTHROUGH_PYTHON_TOOLS` con su ruta.
`PG_BIN` permite indicar la carpeta `bin` de PostgreSQL.

## Ensayo y grabación

No ejecutes Playwright y la grabación a la vez. El proceso reserva los puertos
3410/3411 y un archivo de exclusión del arnés; rechaza un entorno ocupado.
Usa únicamente `er_dashboard_test`, puerto 55439, y verifica el directorio del
clúster antes de escribir. La cuenta y las ilustraciones son de demostración.
Nunca utiliza las credenciales ni la base configuradas en `.env` para publicar.

```powershell
npm run walkthrough:rehearse
npm run walkthrough:record
```

El ensayo ejecuta el guion sin guardar video. La grabación completa crea una
carpeta `take-...` bajo `.tmp/walkthrough.local/` e imprime su ruta. Conserva
allí las tomas, capturas, el manifiesto de escenas y los resultados comprobados.
Registra el commit base del producto; si hay cambios sin commit, consérvalos
junto al manifiesto para poder reconstruir la versión exacta.

El guion comprueba que el título y la imagen pasan de borrador a publicación,
que el evento nuevo existe, que la baja se publica y que los registros vecinos
se mantienen. Reconcilia autor y Antes/Después con la API de Actividad. También
comprueba la apariencia tras recargar y el evento en un viewport móvil real de
390 × 844. Si la aplicación habitual está funcionando en 3002, compara su
contenido público antes y después sin modificarlo.

El modo `node scripts/walkthrough/record.mjs --pilot` genera solo el primer
segmento. Al renderizarlo, el reproductor lo identifica como provisional;
el video final reemplaza esos archivos sin cambiar las rutas del reproductor.

## Montaje

Usa la ruta de una toma real, no la del ensayo:

```powershell
npm run walkthrough:render -- .tmp/walkthrough.local/take-TIMESTAMP
```

El renderer sincroniza cada fuente con una marca del preroll, compone los
textos fuera de los controles y genera MP4, portada, VTT y capítulos. Decodifica
el archivo completo y prepara fotogramas cada dos segundos, en orden, dentro
de `review/`. También escribe el informe y su SHA-256.

Revisa todas las hojas cronológicas y los fotogramas a resolución completa de
campos, mensajes, diálogos, auditoría y móvil. Comprueba continuidad, legibilidad,
cursor y clics; la decodificación correcta por sí sola no aprueba el montaje.
Las capturas del README deben proceder de esa aplicación y esos datos. Después
de reemplazar un video, revisa también la transcripción Markdown generada y
actualiza las capturas si cambió el guion; no mezcles capítulos de tomas distintas.

## Verificación del reproductor

```powershell
npm run test:e2e -- tests/walkthrough.spec.mjs
node scripts/walkthrough/check-base.mjs
```

El primer comando compila y usa el servidor Express real para comprobar MIME,
descarga íntegra y solicitudes parciales HTTP 206. El navegador comprueba las dos
rutas, recarga anónima, reproducción/pausa, búsqueda por capítulos, pantalla
completa, error del medio, teclado y anchos 320/768/1024/1440. También verifica
que la portada pública y el login no solicitan archivos del video.

El segundo compila por separado bajo `/demo/` y utiliza la vista previa estática
de Vite en 3412 para comprobar rutas, recarga, enlaces, reproducción, búsqueda,
MIME, HTTP 206 y el mismo SHA-256. No inicia API ni accede a ninguna base.
Los informes de esta entrega se conservan en
[la carpeta de validación](../.scratch/dashboard-walkthrough/qa/).

## Aprobación y publicación

El propietario aprobó el README y el video y autorizó el push a `develop`.
Indicó que ese push activa el despliegue existente del cliente; esta tarea no
añade otro procedimiento manual de publicación en su instalación.

La rama `develop` fue confirmada por el propietario. El workflow Pages incluido
es manual (`workflow_dispatch`), así que por sí solo no demuestra cuál es la
automatización activa del cliente. Falta la URL efectiva para comprobar ambas
rutas, reproducción, descarga y SHA-256 en remoto. Las pruebas locales no son
evidencia de publicación remota. Véase el [registro de integración](../.scratch/dashboard-walkthrough/push-validation.md).
