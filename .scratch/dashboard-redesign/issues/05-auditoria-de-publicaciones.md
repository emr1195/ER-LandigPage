# 05: Consultar quién publicó y qué cambió

**What to build:** Cada publicación genera auditoría en la misma transacción y puede revisarse en Actividad con autor, fecha y antes/después.

**Blocked by:** [04 — Detectar conflictos entre administradores al publicar](04-publicacion-con-revisiones.md)

**Status:** ready-for-agent

**Ejecución:** completada (2026-10-18).

**Evidencia:** audit, resilience, access. Ver [validación](../validation.md) y [revisión](../review.md). La autorización posterior `$implement` supera la pausa histórica de los comentarios originales.

**Spec:** [Dashboard y login: rediseño editorial y publicación confiable](../spec.md).

**Historias de usuario:** 53, 54, 56, 57.

- [x] Persistir eventos append-only con actor estable y nombre/correo de referencia, fecha del servidor, acción, contenido afectado, revisiones y antes/después suficientes para consultar cambios antiguos.
- [x] Una publicación y su evento se confirman juntos; si falla el evento no cambian contenido ni revisión. No registrar publicaciones por rechazos, conflictos, borradores o cancelaciones.
- [x] Un evento por publicación identifica altas, modificaciones y eliminaciones internas con identidades estables; renombrar, cambiar número o reordenar no inventa bajas y altas.
- [x] Actividad y detalle son privados para administradores, con orden temporal, paginación y estados de carga, vacío, error y reintento; no exponerlos en lecturas públicas.
- [x] La identidad y fecha proceden de la sesión/servidor; no confiar en metadatos del navegador ni registrar secretos o binarios.
- [x] No hay caducidad automática, restauración ni operaciones de edición/borrado desde el panel. El historial empieza desde su instalación sin inventar publicaciones previas ni atribuir el seed a personas.
- [x] Pruebas HTTP/PostgreSQL real verifican permisos y rollback desde otra conexión ante fallo del evento; un recorrido de navegador publica, consulta Actividad y revisa antes/después.

## Comments

- 2026-10-18: desglose y dependencias aprobados por el usuario mediante “acepto”. Publicado con `to-tickets` en el tracker Markdown local.
- La publicación del ticket no autoriza iniciar implementación: el usuario mantiene esa fase en pausa. Su estado indica que está preparado para ejecución cuando se indique.
