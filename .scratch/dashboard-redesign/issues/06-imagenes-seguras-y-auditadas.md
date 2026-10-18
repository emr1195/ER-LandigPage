# 06: Subir imágenes con progreso, reintento y auditoría

**What to build:** Carga común de imágenes demostrable en Portada: conserva el resto de la edición, bloquea publicar mientras carga y registra cargas completadas.

**Blocked by:** [05 — Consultar quién publicó y qué cambió](05-auditoria-de-publicaciones.md)

**Status:** ready-for-agent

**Ejecución:** completada (2026-10-18).

**Evidencia:** images, upload-resilience, editor-images, review-regressions. Ver [validación](../validation.md) y [revisión](../review.md). La autorización posterior `$implement` supera la pausa histórica de los comentarios originales.

**Spec:** [Dashboard y login: rediseño editorial y publicación confiable](../spec.md).

**Historias de usuario:** 33, 34, 35, 36, 55.

- [x] Mostrar imagen actual, progreso real o estado indeterminado, error junto al campo y reintento, conservando tipos y límites actuales.
- [x] El editor no publica mientras tenga cargas pendientes o referencias sin resolver; completar una carga no publica su asociación con el contenido.
- [x] Cada resultado corresponde al campo, sección, identidad y edición que lo inició; resultados tardíos tras navegación, descarte o reemplazo no sobrescriben otros valores.
- [x] El servidor registra cargas completadas con actor de sesión, referencia de archivo y contexto validado cuando exista; Actividad las distingue de publicaciones.
- [x] Una carga completada y luego descartada conserva su evento. No confirmar éxito sin evento; ante fallo del registro compensar el archivo cuando corresponda y devolver error recuperable, sin prometer transacción entre disco y base.
- [x] El control compartido queda disponible para las demás secciones; Portada demuestra la experiencia completa en desktop, tablet y móvil.
- [x] Pruebas verifican fallo/reintento, bloqueo al publicar y resultados tardíos; HTTP/PostgreSQL verifica atribución, permisos y fallo del registro usando directorio de cargas aislado.

## Comments

- 2026-10-18: desglose y dependencias aprobados por el usuario mediante “acepto”. Publicado con `to-tickets` en el tracker Markdown local.
- La publicación del ticket no autoriza iniciar implementación: el usuario mantiene esa fase en pausa. Su estado indica que está preparado para ejecución cuando se indique.
