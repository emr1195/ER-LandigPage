# 12: Mantener Grupos desde cualquier tamaño de pantalla

**What to build:** Editar grupos y sus datos e imágenes, con publicación conjunta y eliminaciones pendientes.

**Blocked by:** [06 — Subir imágenes con progreso, reintento y auditoría](06-imagenes-seguras-y-auditadas.md)

**Status:** ready-for-agent

**Ejecución:** completada (2026-10-18).

**Evidencia:** editors, editor-images. Ver [validación](../validation.md) y [revisión](../review.md). La autorización posterior `$implement` supera la pausa histórica de los comentarios originales.

**Spec:** [Dashboard y login: rediseño editorial y publicación confiable](../spec.md).

**Historias de usuario:** 8, 14, 37, 38, 39, 40.

- [x] Conservar todos los datos actuales de grupos, imágenes, emblemas, colores y colecciones, sin introducir valores oficiales ficticios.
- [x] Adaptar formularios y vista previa al sistema editorial y contrato común de carga, edición, validación, publicación y conflictos.
- [x] Crear, modificar y eliminar según capacidades existentes con identidades estables; confirmar con nombre y publicar el conjunto, no cada baja por separado.
- [x] Conservar el borrador ante fallos y soportar colecciones vacías cuando el contrato actual lo permita.
- [x] Pruebas de navegador editan datos e imagen, descartan o publican una eliminación y verifican contenido público/auditoría en un ancho pequeño y en desktop.

## Comments

- 2026-10-18: desglose y dependencias aprobados por el usuario mediante “acepto”. Publicado con `to-tickets` en el tracker Markdown local.
- La publicación del ticket no autoriza iniciar implementación: el usuario mantiene esa fase en pausa. Su estado indica que está preparado para ejecución cuando se indique.
