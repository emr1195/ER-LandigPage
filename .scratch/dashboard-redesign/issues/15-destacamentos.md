# 15: Publicar Destacamentos y sus eliminaciones de forma uniforme

**What to build:** Mantener el directorio sin que una eliminación publique inmediatamente o descarte otras modificaciones.

**Blocked by:** [06 — Subir imágenes con progreso, reintento y auditoría](06-imagenes-seguras-y-auditadas.md)

**Status:** ready-for-agent

**Spec:** [Dashboard y login: rediseño editorial y publicación confiable](../spec.md).

**Historias de usuario:** 11, 12, 14, 37, 38, 39, 40.

- [ ] Conservar directorio, números, nombres, logos y enlaces de mapas originales; mantener opcionales logo y ubicación, normalización/validación y orden actuales.
- [ ] Aplicar Editorial responsive y contratos comunes de edición, cargas, vista previa, revisión y publicación auditada.
- [ ] Confirmar una eliminación por nombre solo la aplica al borrador; no escribir al servidor ni descartar otros registros editados hasta Guardar y publicar.
- [ ] Cancelar o descartar restaura el directorio; eliminar el último registro válido publica un directorio vacío con estado útil.
- [ ] Renombrar o cambiar el número no cambia la identidad histórica del registro; no inventar mapas ni sustituir destinos originales de Cómo llegar.
- [ ] Actualizar las pruebas que esperan eliminación inmediata y agregar navegador para varias modificaciones más una baja, fallo de publicación y éxito con auditoría; conservar las validaciones y pruebas públicas existentes.

## Comments

- 2026-10-18: desglose y dependencias aprobados por el usuario mediante “acepto”. Publicado con `to-tickets` en el tracker Markdown local.
- La publicación del ticket no autoriza iniciar implementación: el usuario mantiene esa fase en pausa. Su estado indica que está preparado para ejecución cuando se indique.

