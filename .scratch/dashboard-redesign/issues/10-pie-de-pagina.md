# 10: Editar el pie de página sin perder sus colecciones

**What to build:** Mantener las distintas colecciones de enlaces, contacto e información del pie con una publicación consistente.

**Blocked by:** [06 — Subir imágenes con progreso, reintento y auditoría](06-imagenes-seguras-y-auditadas.md)

**Status:** ready-for-agent

**Ejecución:** completada (2026-10-18).

**Evidencia:** editors, editor-images, collections. Ver [validación](../validation.md) y [revisión](../review.md). La autorización posterior `$implement` supera la pausa histórica de los comentarios originales.

**Spec:** [Dashboard y login: rediseño editorial y publicación confiable](../spec.md).

**Historias de usuario:** 13, 14, 37, 38, 39, 40.

- [x] Conservar las colecciones y campos existentes de enlaces, redes, información adicional y contacto; no reducir el modelo al ejemplo del prototipo.
- [x] Adoptar Editorial responsive y el contrato común de edición, vista previa real, cargas donde existan, publicación, errores y conflictos.
- [x] Las eliminaciones identifican su elemento y esperan publicación; cancelar o descartar conserva el contenido publicado y el resto de la edición.
- [x] Las identidades de registros permanecen estables y las colecciones vacías válidas tienen estado útil.
- [x] Pruebas de navegador modifican colecciones representativas, cancelan/eliminan y publican, verificando resultado público y antes/después sin perder registros ajenos a la edición.

## Comments

- 2026-10-18: desglose y dependencias aprobados por el usuario mediante “acepto”. Publicado con `to-tickets` en el tracker Markdown local.
- La publicación del ticket no autoriza iniciar implementación: el usuario mantiene esa fase en pausa. Su estado indica que está preparado para ejecución cuando se indique.
