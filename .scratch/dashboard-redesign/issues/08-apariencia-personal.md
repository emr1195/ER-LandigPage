# 08: Guardar la apariencia personal entre dispositivos

**What to build:** Cada administrador elige Carbon & Azure o Petrol & Apricot y recupera su preferencia al entrar desde otro dispositivo.

**Blocked by:** [01 — Abrir el dashboard editorial por sección](01-inicio-editorial-y-rutas.md)

**Status:** ready-for-agent

**Ejecución:** completada (2026-10-18).

**Evidencia:** appearance, access. Ver [validación](../validation.md) y [revisión](../review.md). La autorización posterior `$implement` supera la pausa histórica de los comentarios originales.

**Spec:** [Dashboard y login: rediseño editorial y publicación confiable](../spec.md).

**Historias de usuario:** 20, 21, 22.

- [x] Persistir la preferencia por usuario estable separada del contenido público y del esquema interno del proveedor de autenticación, con migración aditiva.
- [x] Lectura y actualización derivan la identidad de la sesión; aceptar solo las dos paletas y no un usuario destino enviado por el cliente.
- [x] Carbon & Azure es el valor predeterminado antes de identificar la cuenta y para cuentas sin preferencia; el panel aplica la elección guardada tras autenticar.
- [x] El selector modifica apariencia sin perder el borrador de contenido. Un error al cargar/guardar se informa y permite reintentar, sin anunciar como guardado un valor no confirmado.
- [x] Otra cuenta y la página pública conservan su apariencia; no agregar modo oscuro ni Sistema/Claro/Oscuro.
- [x] HTTP/PostgreSQL comprueba permisos y aislamiento; navegador verifica dos contextos de una misma cuenta, otra cuenta y conservación de la edición al cambiar la paleta.

## Comments

- 2026-10-18: desglose y dependencias aprobados por el usuario mediante “acepto”. Publicado con `to-tickets` en el tracker Markdown local.
- La publicación del ticket no autoriza iniciar implementación: el usuario mantiene esa fase en pausa. Su estado indica que está preparado para ejecución cuando se indique.
