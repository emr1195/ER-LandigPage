# 09: Editar el menú de navegación con el flujo común

**What to build:** Editar identidad, logo y enlaces del menú con vista previa, guardas, carga común y publicación auditada.

**Blocked by:** [06 — Subir imágenes con progreso, reintento y auditoría](06-imagenes-seguras-y-auditadas.md)

**Status:** ready-for-agent

**Ejecución:** completada (2026-10-18).

**Evidencia:** editors, editor-images, review-regressions. Ver [validación](../validation.md) y [revisión](../review.md). La autorización posterior `$implement` supera la pausa histórica de los comentarios originales.

**Spec:** [Dashboard y login: rediseño editorial y publicación confiable](../spec.md).

**Historias de usuario:** 4, 14, 37, 38, 39, 40.

- [x] Conservar todos los campos, registros y capacidades actuales del menú; nombres visibles y ayuda usan español cotidiano.
- [x] Adoptar Editorial responsive, vista previa pública encapsulada y el contrato común de borrador, carga, publicación, errores y conflicto.
- [x] Altas, cambios y eliminaciones permitidos solo alteran el borrador; una eliminación identifica el elemento y espera Guardar y publicar. Cancelar o descartar no cambia la página pública.
- [x] Conservar identidades de elementos, enlaces y orden cuando ya se admita; estados vacío/validación no inventan contenido.
- [x] Un recorrido de navegador verifica edición representativa y carga de logo hasta la publicación y su auditoría, conservando el resultado público y las regresiones relevantes.

## Comments

- 2026-10-18: desglose y dependencias aprobados por el usuario mediante “acepto”. Publicado con `to-tickets` en el tracker Markdown local.
- La publicación del ticket no autoriza iniciar implementación: el usuario mantiene esa fase en pausa. Su estado indica que está preparado para ejecución cuando se indique.
