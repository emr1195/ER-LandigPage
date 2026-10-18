# Desglose aprobado de tickets del walkthrough

Desglose aprobado por el usuario mediante `to-tickets`.
Los seis [tickets individuales](issues/README.md) están publicados como
`ready-for-agent`. No se ha iniciado implementación. La spec padre permanece
sin cambios.

## Desglose y dependencias

| Nº | Entrega comprobable | Bloqueado por |
| --- | --- | --- |
| 01 | Primer clip real: de Portada a la página pública | Ninguno |
| 02 | Eventos y registro de auditoría en el recorrido grabado | 01 |
| 03 | Walkthrough completo con apariencias y móvil | 02 |
| 04 | Reproductor público accesible y descargable | 01 |
| 05 | README en español con capturas y video verificados | 03, 04 |
| 06 | Entrega verificada mediante el despliegue existente | 05 |

Cada entrega incluye comprobaciones de su comportamiento. La revisión visual y
las pruebas del reproductor no se posponen íntegramente al último ticket.

No se propone un refactor amplio previo: existe un arnés aislado y los flujos
del dashboard están implementados. Las adaptaciones mínimas de preparación,
captura y render se prueban a través del primer clip real.

## 01 — Primer clip real: de Portada a la página pública

**Entrega:** un clip reproducible a partir de una sesión de demostración
repetible que muestra el acceso, la edición de Portada y su resultado publicado. Es el primer
recorrido completo desde interacción real hasta MP4 verificable, con la calidad
de cursor, clics y textos que tendrá la entrega final.

**Bloqueado por:** ninguno.

Criterios propuestos:

- Reutiliza el entorno local aislado con `er_dashboard_test`, cuenta y datos
  ficticios; no necesita la base del cliente ni modifica `er_landing`.
- El procedimiento prepara, ensaya y repite el segmento sin depender de datos
  residuales; coordina el uso exclusivo del arnés durante ensayo y captura.
- Registra la versión de la aplicación capturada y conserva trazabilidad de
  la toma y de los resultados comprobados.
- Muestra acceso, Inicio, cambio de texto e imagen de Portada, vista previa por
  tamaño y ampliada, aviso de cambios sin guardar y corrección de un campo
  obligatorio antes de publicar.
- La publicación y la carga se realizan contra API/PostgreSQL locales. El título
  y la imagen aparecen realmente en la página pública de demostración.
- Produce un primer MP4 real, en español, Full HD a 25 fps y sin pista de audio,
  reproducible y decodificable completamente.
- Cursor suave, indicación de clics y acercamientos puntuales permanecen visibles
  sobre diálogos; los textos dejan libres los controles. Se revisa el clip.
- Las adaptaciones de Aster son herramientas de producción del material y no
  cambian las interacciones del producto ni añaden grabación en runtime.

Cobertura principal: historias 1, 4–14, 23–29 y 41.

## 02 — Eventos y registro de auditoría en el recorrido grabado

**Entrega:** continuación del recorrido que permite seguir una creación y una
eliminación de Eventos hasta su publicación y su registro de auditoría.

**Bloqueado por:** 01, por la sesión de demostración reproducible y el flujo de
captura/render ya comprobado.

Criterios propuestos:

- Agrega «Jornada de exploradores» con fecha, lugar, organizador e imagen ficticios.
- Confirma la baja de un evento de demostración existente y muestra que sigue
  pendiente de publicación.
- Publica el conjunto: el evento nuevo existe y el eliminado deja de aparecer
  en la página pública; se preservan los registros vecinos.
- Actividad muestra autor, fecha y comparación Antes/Después de las publicaciones
  del recorrido, incluida la baja. Los resultados corresponden a acciones reales.
- El ensayo reconcilia identidades, datos publicados y auditoría; no fabrica
  confirmaciones mediante anotaciones de video.
- El segmento grabado mantiene continuidad con Portada, textos legibles, cursor,
  clics y énfasis puntual en los cambios.

Cobertura principal: historias 15–19 y 41.

## 03 — Walkthrough completo con apariencias y móvil

**Entrega:** video completo listo para reproducirse y distribuirse, siguiendo el
guion aprobado con sus dos apariencias claras y un segmento móvil real.

**Bloqueado por:** 02, que ya incluye la continuidad con 01.

Criterios propuestos:

- Ensambla todos los capítulos del guion en aproximadamente 3:45–4:00, ajustando
  tiempos para leer sin acelerar artificialmente las acciones importantes.
- Muestra Carbon & Azure y Petrol & Apricot, y comprueba la apariencia retenida
  al recargar.
- Captura navegación, edición del evento nuevo y vista previa en un viewport
  móvil real sobre los mismos datos de demostración. El plano de tablet es
  opcional si mantiene el ritmo.
- Conserva español, ausencia de voz/música, cursor suave, pulsos de clic,
  acercamientos puntuales, capítulos y textos sin tapar controles.
- Incluye apertura y cierre legibles, sin inventar una URL pública disponible.
- Exporta el MP4 final H.264 1080p/25 fps preparado para reproducción web y
  apertura directa; genera portada y transcripción coherentes con el montaje.
- Se decodifica el archivo completo y se revisan el video entero y fotogramas
  cronológicos: no hay escenas faltantes, flashes vacíos, errores de continuidad
  ni afirmaciones que contradigan el resultado real.
- Las tomas originales y herramientas temporales se conservan fuera de la
  publicación; los artefactos finales quedan identificados y verificables.

Cobertura principal: historias 2, 3, 20–29 y 41.

## 04 — Reproductor público accesible y descargable

**Entrega:** un visitante anónimo puede abrir el material, reproducirlo,
consultar su transcripción y descargar el MP4 desde escritorio, tablet o móvil.

**Bloqueado por:** 01, que proporciona un clip real para desarrollar y comprobar
la página. No necesita esperar al montaje completo de 03.

Criterios propuestos:

- Funcionan la entrada directa y la recarga de `/walkthrough` y `/walktrough`,
  incluida la ruta base configurada, sin exigir sesión administrativa.
- Ofrece portada, controles nativos, pausa, búsqueda temporal, pantalla completa,
  transcripción en español, descarga y enlaces de retorno coherentes.
- El clip inicial se identifica como provisional. El reproductor admite
  sustituir el material por el montaje definitivo sin cambiar sus rutas o
  controles; esa integración con 03 se comprueba en 05 y 06.
- Los controles y el contenido son utilizables mediante teclado y en escritorio,
  tablet y móvil; el foco es visible y no hay desbordamiento horizontal.
- Reproduce y permite avanzar usando el servidor estático de la aplicación;
  se comprueban tipo de contenido, respuestas parciales y archivo descargado.
- La descarga coincide con el artefacto revisado. El video no se descarga al
  visitar otras pantallas ni forma parte del paquete JavaScript del dashboard.
- Conserva la estética aprobada sin rediseñar el sitio público, alterar el
  sidebar ni consultar datos privados para reproducir la demostración.

Cobertura principal: historias 30–35 y 42.

## 05 — README en español con capturas y video verificados

**Entrega:** el cliente o visitante del repositorio encuentra primero qué hace
el proyecto, cómo verlo y cómo utilizarlo, seguido de instrucciones operativas
que siguen siendo válidas.

**Bloqueado por:** 03, por el material final; y 04, por los enlaces y el
reproductor comprobados.

Criterios propuestos:

- Sigue el orden aceptado: presentación, capturas/video, recorrido de uso,
  funcionalidades, instalación/configuración/demostración, pruebas y operación.
- Incorpora capturas del producto actual con textos alternativos y enlaces al
  reproductor, transcripción y MP4 que ya existen y funcionan.
- El reproductor enlazado presenta el MP4, portada y transcripción finales de
  03, y sus metadatos corresponden a ese montaje.
- Explica las nueve secciones y distingue borrador, vista previa, publicación,
  bajas pendientes y registro de auditoría.
- Conserva instrucciones válidas de PostgreSQL, autenticación, imágenes,
  migraciones, datos de muestra, pruebas aisladas, respaldos y despliegue.
- La documentación para reproducir o verificar el video identifica sus
  herramientas de desarrollo y separa los artefactos finales de las tomas.
- Distingue revisión local de disponibilidad publicada. Refleja que el push
  activa el despliegue existente, sin añadir otra publicación manual.
- Se revisan enlaces, comandos y capturas sin incluir credenciales ni datos
  personales del cliente.

Cobertura principal: historias 1–3, 36–39 y 42.

## 06 — Entrega verificada mediante el despliegue existente

**Entrega:** el reproductor, el video y el README corresponden a los mismos
artefactos verificados, y su disponibilidad se comprueba usando el flujo de
despliegue que ya utiliza el cliente.

**Bloqueado por:** 05; sus dependencias 03 y 04 son transitivas.

Criterios propuestos:

- Revisa la integración final con los artefactos definitivos: ambas rutas,
  reproducción, búsquedas temporales, pantalla completa, descarga, transcripción,
  enlaces, ruta base y pantallas de escritorio/tablet/móvil.
- Lint y compilación pasan; se ejecutan los recorridos de dashboard afectados
  y se registra el alcance real de las comprobaciones sin atribuir pruebas
  o publicaciones no ejecutadas.
- Comprueba que se conserva la aplicación aprobada y que la toma utiliza la
  base de demostración; no necesita acceso a la base del cliente.
- Identifica la integración y rama efectivas del cliente antes del push de
  entrega. Según confirmó el usuario, ese push activa su despliegue automático;
  se conserva ese mecanismo y no se añade un segundo despliegue manual.
- Después del push de entrega, verifica la ejecución real del flujo y la URL
  efectiva del reproductor, sus enlaces y la correspondencia del MP4 publicado
  con el artefacto revisado. No presenta una prueba local como evidencia remota.
- Si un control externo impide confirmar el despliegue, registra qué sí se
  comprobó y la condición pendiente en lugar de declarar publicación exitosa.

Cobertura principal: historias 40 y 42; comprobación integrada del resto.

## Observaciones de secuencia

04 puede desarrollarse con el clip de 01 mientras se prepara el montaje de
02–03, coordinando el uso exclusivo del entorno de grabación. La integración
del material definitivo se comprueba antes de cerrar 05 y 06.

El workflow de Pages versionado tiene activación manual; esto no identifica por
sí solo el servicio externo del cliente. 06 debe verificar el flujo efectivo
que el usuario indicó, sin sustituirlo ni asumir que ese workflow es su despliegue.

El usuario aprobó la granularidad, los bloqueos y el desglose sin cambios.
Se publicaron seis archivos individuales con estado `ready-for-agent` y sus
dependencias explícitas. No se ejecuta push en esta fase.
