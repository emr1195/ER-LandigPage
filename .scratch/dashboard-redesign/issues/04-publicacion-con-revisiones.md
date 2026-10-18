# 04: Detectar conflictos entre administradores al publicar

**What to build:** Una publicación detecta versiones obsoletas y conserva el trabajo del administrador en conflicto; todos los editores usan revisiones válidas.

**Blocked by:** [03 — Editar y publicar Portada sin perder cambios](03-portada-publicacion-y-cambios.md)

**Status:** ready-for-agent

**Ejecución:** completada (2026-10-18).

**Evidencia:** concurrency, resilience, access. Ver [validación](../validation.md) y [revisión](../review.md). La autorización posterior `$implement` supera la pausa histórica de los comentarios originales.

**Spec:** [Dashboard y login: rediseño editorial y publicación confiable](../spec.md).

**Historias de usuario:** 25, 26, 28, 41, 42.

- [x] Una migración aditiva incorpora revisión persistida conservando contenido existente; las lecturas públicas mantienen sus cuerpos compatibles.
- [x] La lectura individual devuelve ETag, incluida una sección ausente; la escritura exige If-Match de la base realmente leída al iniciar la edición, nunca una lectura inmediatamente anterior para eludir el conflicto.
- [x] Actualizar los adaptadores de lectura/guardado de los nueve editores antes de exigir la revisión, sin dejar una transición que rompa editores aún sin rediseñar.
- [x] La comprobación y escritura en PostgreSQL es atómica: falta de revisión devuelve 428, revisión obsoleta 412 sin cambios y éxito devuelve contenido canónico y nueva revisión.
- [x] El cliente distingue estados HTTP mediante datos estructurados; el conflicto conserva la edición y permite consultar la versión vigente. Adoptarla exige descartar conscientemente, sin mezcla ni sobrescritura automática.
- [x] Un guardado de resultado incierto se reconcilia con la revisión/contenido vigentes antes de reintentar; no asumir fracaso por timeout ni anunciar éxito sin comprobarlo.
- [x] Las herramientas de mantenimiento que escriben secciones mantienen coherentes las revisiones; no habilitar una vía alternativa que el panel use para omitir el control.
- [x] Pruebas HTTP/PostgreSQL real con dos administradores y creación concurrente demuestran un único ganador; navegador demuestra aviso y conservación del borrador. Conservar las pruebas de permisos y validación.

## Comments

- 2026-10-18: desglose y dependencias aprobados por el usuario mediante “acepto”. Publicado con `to-tickets` en el tracker Markdown local.
- La publicación del ticket no autoriza iniciar implementación: el usuario mantiene esa fase en pausa. Su estado indica que está preparado para ejecución cuando se indique.
