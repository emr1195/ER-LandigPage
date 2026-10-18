# 11: Editar Historia y Programa con vista previa real

**What to build:** Actualizar los contenidos narrativos y la estructura del programa desde formularios editoriales adaptables.

**Blocked by:** [06 — Subir imágenes con progreso, reintento y auditoría](06-imagenes-seguras-y-auditadas.md)

**Status:** ready-for-agent

**Ejecución:** completada (2026-10-18).

**Evidencia:** editors, editor-images, review-regressions. Ver [validación](../validation.md) y [revisión](../review.md). La autorización posterior `$implement` supera la pausa histórica de los comentarios originales.

**Spec:** [Dashboard y login: rediseño editorial y publicación confiable](../spec.md).

**Historias de usuario:** 6, 7, 14.

- [x] Conservar los campos narrativos, imágenes, valores y listas de detalles actuales de ambas secciones, incluidas sus representaciones de texto existentes.
- [x] Usar el contrato común de edición/publicación y las vistas previas públicas reales con tema propio, sin cambiar el diseño público.
- [x] Permitir edición completa de listas y cargas existentes en móvil, tablet y desktop; estados vacío, validación y errores ofrecen una salida útil.
- [x] Altas, cambios, orden cuando ya exista y eliminaciones respetan identidad y publicación pendiente; la confirmación nombra el elemento.
- [x] Pruebas de navegador publican un cambio narrativo y uno de una lista, comprueban vista pública/auditoría y conservan las regresiones actuales que aporten valor.

## Comments

- 2026-10-18: desglose y dependencias aprobados por el usuario mediante “acepto”. Publicado con `to-tickets` en el tracker Markdown local.
- La publicación del ticket no autoriza iniciar implementación: el usuario mantiene esa fase en pausa. Su estado indica que está preparado para ejecución cuando se indique.
