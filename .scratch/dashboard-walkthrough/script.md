# Guion: administrar el contenido de Exploradores del Rey

Estado: guion aprobado por el usuario tras Q1–Q6. Base de la
[especificación publicada](spec.md) mediante `$to-spec`.
Este documento no es un video grabado.

## Intención y formato

Un recorrido en español para presentar el proyecto y orientar al cliente que ya
utiliza el repositorio. Hilo: editar → previsualizar → publicar → comprobar →
auditar. Duración objetivo aproximada: 3:45–4:00.

Captura real del producto, MP4 1920 × 1080 a 25 fps, sin voz ni música. Textos
breves de una o dos líneas, capítulos claros y pausas suficientes para leer.
Referencia visual: Aster (`../dashboard/public/walkthrough/aster-walkthrough.mp4`).

## Recorrido y textos

Los tiempos orientan el montaje; se ajustarán en el ensayo para conservar la
legibilidad de las acciones y de los textos.

| Tiempo | Acción visible | Textos explicativos propuestos |
| --- | --- | --- |
| 0:00–0:16 | Presentación breve sobre la aplicación. Acceso con cuenta de demostración; contraseña enmascarada. | «Exploradores del Rey · Administración del sitio». «Actualiza el contenido de tu comunidad sin editar código». «Demostración con datos ficticios». |
| 0:16–0:30 | Inicio y navegación hasta Portada. Breve pausa sobre el listado de secciones. | «Elige la sección que quieres actualizar». |
| 0:30–1:02 | Cambiar el título a «Una nueva aventura comienza aquí». Editar la descripción y subir una ilustración de demostración desde Imágenes. | «Edita el mensaje principal y sus imágenes». «Tus cambios todavía son un borrador». |
| 1:02–1:24 | Revisar la vista previa, alternar escritorio/móvil y abrir Ampliar. Cerrar y volver al editor. | «Comprueba cómo quedará antes de publicar». «Amplía la vista y revisa otros tamaños de pantalla». |
| 1:24–1:44 | Intentar navegar con cambios pendientes; elegir Seguir editando. Vaciar el título, intentar publicar, mostrar el error y restaurar el título acordado. | «El panel avisa si intentas salir con cambios sin guardar». «Corrige los campos necesarios antes de publicar». |
| 1:44–2:02 | Guardar y publicar. Mostrar la confirmación y abrir la página pública de la misma demostración para comprobar título e imagen. | «Guardar y publicar hace visibles los cambios». «El resultado ya aparece en la página pública». |
| 2:02–2:42 | Eventos: agregar «Jornada de exploradores», fecha «30 de noviembre de 2026», lugar «Parque de la comunidad», organizador «Equipo de demostración» e imagen de muestra. Confirmar la eliminación de «Encuentro de familias (demo)» y publicar el conjunto. | «Prepara una nueva actividad». «Eliminar un elemento lo retira del borrador». «La eliminación se hace pública al guardar y publicar». |
| 2:42–3:08 | Abrir Actividad y Ver cambios de las publicaciones realizadas. Mostrar autor, fecha y comparación Antes/Después, incluida la eliminación del evento. | «Consulta quién publicó y qué cambió». «Actividad conserva el detalle de la publicación». |
| 3:08–3:24 | Cambiar Apariencia personal de Carbon & Azure a Petrol & Apricot; recargar y comprobar la preferencia. | «Dos apariencias claras para tu espacio de trabajo». «Tu cuenta recuerda la apariencia elegida». |
| 3:24–3:48 | Corte a un viewport móvil real. Abrir navegación, entrar en Eventos, desplegar el evento nuevo y revisar el preview. Breve plano de tablet si cabe sin acelerar el recorrido. | «El mismo contenido, también desde el móvil». «Navegación, edición y vista previa adaptadas a la pantalla». |
| 3:48–3:56 | Cierre en una vista legible del dashboard. Indicar repositorio y acceso al reproductor local, sin inventar una URL pública nueva. | «Edita, revisa y publica con un registro de tus cambios». «Encuentra la guía y la configuración en el README». |

El video recorre casos representativos; el README enumera las nueve secciones.
No se dedica una escena repetida a cada formulario. El segmento de validación
se presenta como demostración deliberada, seguido de la corrección.

## Cursor, clics y cámara

- Movimientos suaves, con aceleración y frenado gradual; sin saltos entre
  controles. El cursor llega, hace una pausa breve y después pulsa.
- Pulso discreto en cada clic relevante, sincronizado con la acción real y
  visible también sobre diálogos.
- Acercamientos breves y suaves al editor de Portada, confirmación de publicación
  y comparación Antes/Después. Mantener suficiente contexto alrededor del foco
  y volver al plano general antes de navegar.
- Desplazamiento gradual del contenido. Cortar esperas vacías sin ocultar las
  transiciones que explican cómo funciona el producto.
- Reservar una zona para los textos fuera de los controles de la aplicación y
  de los controles del reproductor. Dar tiempo para leer tras cada cambio.
- El segmento móvil utiliza una captura con viewport móvil; no es una imagen
  del escritorio encogida. Las anotaciones son recursos del video.

## Preparación y comprobaciones

Usar exclusivamente el entorno aislado de demostración (3410/3411, PostgreSQL
55439), con cuenta y contenido ficticios. Los cambios de contenido y auditoría
se ejecutan realmente en esa base. Evitar ejecución simultánea del arnés de
pruebas, que restablece sus datos. La base y la instalación del cliente quedan
fuera de este recorrido.

Ensayar antes de capturar. Comprobar título e imagen publicados, identidad del
evento añadido, ausencia del evento eliminado y correspondencia de ambos en
Actividad. Capturar el segmento móvil sobre esos mismos datos de demostración.

Revisar el video completo: ritmo, legibilidad, cursor sobre diálogos, ausencia
de fotogramas vacíos y coherencia de los resultados. Comprobar reproducción,
búsqueda temporal, pantalla completa, descarga y transcripción del reproductor
en escritorio y móvil. El README solo enlazará artefactos existentes y verificados.

## Entrega inicial y README

- Página local en `/walkthrough`, con `/walktrough` como acceso equivalente.
  Respetar la ruta base del proyecto cuando se publique bajo un subdirectorio.
- Reproductor con controles, portada, descarga del MP4 y transcripción en español.
  El MP4 también se podrá abrir directamente, sin desplegar el proyecto.
- Presentar el enlace local como local durante la revisión. Según confirmó el
  usuario, el push al repositorio activa el despliegue que utiliza el cliente;
  no se necesita otro paso manual de publicación en su instalación. Conservar
  el mecanismo de despliegue existente y verificar sus enlaces cuando se publique.
- README en español: presentación y audiencia → capturas y video → recorrido
  breve de uso → funcionalidades → instalación/configuración/datos de muestra
  → pruebas/respaldo/despliegue.
- Conservar las instrucciones vigentes de PostgreSQL, autenticación, imágenes,
  migraciones y pruebas aisladas, y los enlaces a las guías técnicas.
- Explicar que la vista previa no publica, que las bajas esperan la publicación
  y que Actividad permite revisar autor y cambios. Mantener el vocabulario del
  glosario y distinguir la aplicación funcional de sus datos de demostración.
