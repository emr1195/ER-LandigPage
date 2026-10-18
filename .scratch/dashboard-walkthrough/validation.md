# Validación de la entrega local

Fecha: 18 de octubre de 2026. Rama: `develop`.

El usuario pidió revisar el README y el video terminados **antes de desplegar**.
Esta entrega no ejecuta push ni publicación remota. La verificación posterior
del despliegue permanece pendiente de esa aprobación.

## Artefacto revisado

- Toma completa: `.tmp/walkthrough.local/take-1792343332238`.
- Base de la aplicación capturada: `5e5003b3e0d96a9139d4f9b044cda77d348d72ed`.
  Los componentes administrativos capturados no se modifican en esta entrega.
  Las correcciones de las herramientas de captura estaban en el árbol de trabajo
  y se guardaron después en `c25bb49`; el dashboard conserva el código aprobado.
- Montaje: 16 capítulos, **234,60 s**, H.264 High/yuv420p, 1920 × 1080,
  25 fps, sin streams de audio, faststart. Tamaño: **16.990.217 bytes**.
- SHA-256: `aa3350351ab7cdc5e77f05024b7199e9ebdcaa75b47a2425e2aab6ac751c3dec`.
- [Informe generado](qa/render.json), [video](../../public/walkthrough/exploradores-walkthrough.mp4)
  y [transcripción](../../docs/walkthrough-transcripcion.md).

El primer piloto real duró 56,04 s y se decodificó completo. Su
[informe histórico](qa/pilot-render.json) conserva su identidad; el reproductor
ahora sirve el montaje definitivo, no aquel archivo provisional.

## Resultados de captura

El ensayo completo se ejecutó antes de grabar y se repitió tras ajustar la
limpieza del entorno y ampliar auditoría (`rehearsal-1792343299210`). Usa solo el clúster aislado
`er_dashboard_test`, puerto 55439; no requiere acceso a la base del cliente.

La toma comprueba título e imagen de Portada publicados; creación de Jornada
de exploradores; baja de Encuentro de familias (demo); cuatro eventos finales,
preservando los otros tres; dos publicaciones con autor `admin@example.test`
y Antes/Después reales de **Portada y Eventos**, abiertos ambos en el video.
Conserva Petrol & Apricot tras recargar y utiliza un
viewport móvil real de 390 × 844 sobre el mismo contenido.

El contenido público de la aplicación habitual en 3002 se comparó antes y
después: sin cambios. No hubo errores JavaScript de página en la captura.

## Revisión visual y técnica del video

Decodificación íntegra correcta. Se revisaron las diez hojas cronológicas,
con un fotograma cada dos segundos, de acceso a cierre, más los fotogramas
completos de guardas, publicación, auditoría y móvil. Se comprobó la presencia
del cursor y los pulsos sobre diálogos, los tres acercamientos y el regreso al
plano general. Los textos permanecen fuera de la aplicación y de la franja
reservada para controles nativos.

El segundo montaje añade el acercamiento a la confirmación de publicación;
se volvió a decodificar completo y a revisar ese segmento. No se simulan
confirmaciones ni se sustituyen estados de la aplicación. Las capturas del
README proceden de esa toma y muestran únicamente datos ficticios.

La composición definitiva reserva 160 px al pie para los controles nativos y
su degradado, con los textos encima de esa franja. Se ajustó tras comprobar el
video pausado en el reproductor real y se volvió a decodificar íntegramente.

## Comprobaciones de aplicación

- Lint de aplicación y herramientas: correcto.
- Jest: 5 suites, 21 pruebas correctas.
- Build: correcto; conserva la advertencia previa sobre el chunk público de
  unos 501 kB. El reproductor se carga de forma diferida y el MP4 no se incluye
  en JavaScript.
- Navegador: suite general completa, **78 pruebas correctas** (69 antecedentes
  del dashboard y nueve del reproductor). Después del ajuste visual se volvió
  a compilar y ejecutar el archivo del reproductor: **9/9 correctas**, con la
  nueva comprobación de ancho y orden de la transcripción en cuatro tamaños.
  Tras la revisión se grabó la sesión definitiva con ambas auditorías y se
  ejecutó otra vez el archivo: **9/9 correctas** sobre el MP4 final y el
  resolver PostgreSQL compartido.
- Ruta base `/demo/`: reproducción, recarga de ambos alias, enlaces, búsqueda,
  MIME, HTTP 206 y SHA-256 correctos. La repetición con la regresión visual
  reforzada se registra en `qa/base-path.json`.
- Enlaces relativos del README y las dos guías: todos apuntan a archivos existentes.

La revisión visual del reproductor detectó que el grid global de la landing
se heredaba en su `main`. La primera comprobación de ausencia de scroll
horizontal era insuficiente porque el sitio oculta el desbordamiento global.
Se añadió una regresión que exige un video ancho y la transcripción debajo:
falló antes del arreglo (video de 75,7 px en viewport de 320 px) y pasó tras
restablecer el flujo en bloque y el padding del `main` de esta página.

Entorno verificado: Windows, Node 24.13.0, Python 3.12.10, Chrome, PostgreSQL
18 de prueba, Pillow 13.0.0 e imageio-ffmpeg 0.6.0 (FFmpeg 7.1).

## Revisión de estándares y spec

Dos revisores independientes compararon con `611f16f`, referencia confirmada
por el usuario. Se corrigieron una observación opcional de duplicación y un P2
por no abrir la comparación de Portada. La revisión posterior no encontró otros
problemas materiales. El nuevo MP4 incorpora ambas comparaciones; se revisaron
las diez hojas de esta toma, incluido el título antes/después y la baja.
Detalle separado por eje en [el informe de revisión](review.md).

## Publicación pendiente

El remoto visible es `https://github.com/emr1195/ER-LandigPage.git`.
El archivo `.github/workflows/pages.yml` incluido usa `workflow_dispatch`, por
lo que no basta para identificar la automatización efectiva que, según el
propietario, publica con el push. Antes de entregar a remoto se confirmará la
integración y rama efectivas; después se verificarán la URL real y el mismo
MP4 por SHA-256. No se cambió infraestructura ni se añadió otro despliegue manual.

### Aprobación e integración posterior

El propietario aprobó el README y el video, autorizó el push y confirmó `develop`
como rama del cliente. Se integró el trabajo público remoto manteniendo el
dashboard y las validaciones aprobadas. La evidencia actual y los límites de la
verificación remota se registran en [push-validation.md](push-validation.md).
