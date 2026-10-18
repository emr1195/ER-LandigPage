# 13: Gestionar Eventos sin controles recortados

**What to build:** Mantener eventos completos en formularios adaptables, sin filas rígidas que impidan editar en móvil.

**Blocked by:** [06 — Subir imágenes con progreso, reintento y auditoría](06-imagenes-seguras-y-auditadas.md)

**Status:** ready-for-agent

**Spec:** [Dashboard y login: rediseño editorial y publicación confiable](../spec.md).

**Historias de usuario:** 9, 14, 37, 38, 39, 40.

- [ ] Conservar fechas, textos, ubicaciones, imágenes y demás campos/capacidades actuales; no introducir cambios de formato o zona horaria como efecto accidental del rediseño.
- [ ] Eliminar limitaciones de ancho fijo y filas sin ajuste; la edición y acciones son completas a 320/390/768/1440 píxeles.
- [ ] Usar publicación, vista previa, cargas, validación, guardas y conflictos comunes; mantener identidades estables y el orden cuando ya sea editable.
- [ ] Confirmar cada eliminación por nombre y mantenerla pendiente hasta publicar; cancelar, descartar y eliminar el último elemento permitido tienen resultados correctos.
- [ ] Pruebas de navegador cubren edición de un evento, fecha, carga y eliminación pendiente, verificando persistencia, auditoría y presentación pública sin perder los demás eventos.

## Comments

- 2026-10-18: desglose y dependencias aprobados por el usuario mediante “acepto”. Publicado con `to-tickets` en el tracker Markdown local.
- La publicación del ticket no autoriza iniciar implementación: el usuario mantiene esa fase en pausa. Su estado indica que está preparado para ejecución cuando se indique.

