# 07: Reautenticarse conservando la edición de la pestaña

**What to build:** Al vencer la sesión se conserva la edición, se permite reingresar con la misma cuenta y se exige publicar explícitamente después.

**Blocked by:** [02 — Entrar con el login editorial y volver al destino](02-login-editorial-y-destino.md); [04 — Detectar conflictos entre administradores al publicar](04-publicacion-con-revisiones.md)

**Status:** ready-for-agent

**Spec:** [Dashboard y login: rediseño editorial y publicación confiable](../spec.md).

**Historias de usuario:** 29, 30, 44, 45, 46.

- [ ] Un 401 detiene solicitudes privadas y ofrece reautenticación sin destruir borrador, sección, base de revisión ni valores visibles.
- [ ] El reingreso de la misma identidad recupera la edición y no publica automáticamente; comprobar la revisión al publicar si otro administrador cambió el contenido durante la ausencia.
- [ ] Si la autenticación requiere redirección completa, el contexto temporal pertenece a la pestaña e identidad y no contiene credenciales; no ofrecer borradores persistentes entre cierres de navegador.
- [ ] Una cuenta diferente no recibe ni puede publicar el borrador anterior; el cierre explícito resuelve primero la guarda de cambios y limpia selección, mensajes y estado privado.
- [ ] El flujo usa el contrato de edición común para que los editores migrados después hereden continuidad sin una implementación por sección.
- [ ] Pruebas de navegador cubren vencimiento, fallo de reingreso, misma cuenta, cuenta diferente, conflicto posterior y cierre explícito; Google se prueba según configuración y límites acordados.

## Comments

- 2026-10-18: desglose y dependencias aprobados por el usuario mediante “acepto”. Publicado con `to-tickets` en el tracker Markdown local.
- La publicación del ticket no autoriza iniciar implementación: el usuario mantiene esa fase en pausa. Su estado indica que está preparado para ejecución cuando se indique.

