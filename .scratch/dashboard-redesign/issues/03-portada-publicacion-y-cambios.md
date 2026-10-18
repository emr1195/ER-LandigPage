# 03: Editar y publicar Portada sin perder cambios

**What to build:** Primer editor completo: textos y botones de Portada, vista previa pública real, publicación explícita, descarte y protección de la edición.

**Blocked by:** [01 — Abrir el dashboard editorial por sección](01-inicio-editorial-y-rutas.md)

**Status:** ready-for-agent

**Spec:** [Dashboard y login: rediseño editorial y publicación confiable](../spec.md).

**Historias de usuario:** 5, 15, 18, 19, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 37, 38, 39, 52.

- [ ] El editor conserva todos los campos y capacidades actuales de Portada y separa contenido publicado, borrador local y solicitudes. Las imágenes actuales se conservan; el flujo de cargas se completa en 06.
- [ ] La vista previa usa componentes públicos reales con su tema, en paralelo donde cabe y mediante Editar/Vista previa en pantallas pequeñas sin reiniciar la edición.
- [ ] Mostrar Cambios sin guardar; Guardar y publicar explica el efecto, evita envíos duplicados y solo anuncia éxito tras la confirmación del servidor.
- [ ] Fallo de validación o red conserva los campos, muestra errores útiles y permite reintentar. Una respuesta tardía no borra edición posterior.
- [ ] Seguir editando / Descartar cambios protege cambio de sección, navegación del historial, salida y cierre de sesión. Recargar/cerrar usa aviso nativo cuando el navegador lo permite.
- [ ] Descartar restaura el contenido publicado; los cambios o eliminaciones permitidos de colecciones no se publican por separado.
- [ ] Establecer la interfaz compartida de edición y publicación, realizando primero los prefactors mínimos con el comportamiento existente cubierto. No migrar visualmente las otras ocho secciones en este ticket.
- [ ] Pruebas de navegador demuestran edición, vista previa, publicación visible en la página pública, descarte, guardas y recuperación de fallos usando recursos aislados.

## Comments

- 2026-10-18: desglose y dependencias aprobados por el usuario mediante “acepto”. Publicado con `to-tickets` en el tracker Markdown local.
- La publicación del ticket no autoriza iniciar implementación: el usuario mantiene esa fase en pausa. Su estado indica que está preparado para ejecución cuando se indique.

