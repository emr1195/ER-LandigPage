# 02: Eventos y registro de auditoría en el recorrido grabado

Status: ready-for-agent

**What to build:** continuación del recorrido que permite seguir una creación y una
eliminación de Eventos hasta su publicación y su registro de auditoría.

**Blocked by:** 01 — Primer clip real: de Portada a la página pública

- [x] Agrega «Jornada de exploradores» con fecha, lugar, organizador e imagen ficticios.
- [x] Confirma la baja de un evento de demostración existente y muestra que sigue
  pendiente de publicación.
- [x] Publica el conjunto: el evento nuevo existe y el eliminado deja de aparecer
  en la página pública; se preservan los registros vecinos.
- [x] Actividad muestra autor, fecha y comparación Antes/Después de las publicaciones
  del recorrido, incluida la baja. Los resultados corresponden a acciones reales.
- [x] El ensayo reconcilia identidades, datos publicados y auditoría; no fabrica
  confirmaciones mediante anotaciones de video.
- [x] El segmento grabado mantiene continuidad con Portada, textos legibles, cursor,
  clics y énfasis puntual en los cambios.

**Spec:** [Walkthrough del dashboard y README en español](../spec.md).

Cobertura principal: historias 15–19 y 41.


## Ejecución

Implementado y comprobado en local. Evidencia y alcance en
[la validación de entrega](../validation.md).
