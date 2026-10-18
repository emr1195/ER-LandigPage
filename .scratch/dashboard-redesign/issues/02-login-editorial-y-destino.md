# 02: Entrar con el login editorial y volver al destino

**What to build:** Acceso responsive con correo/contraseña, Google cuando esté configurado, errores claros y regreso a la sección solicitada.

**Blocked by:** [01 — Abrir el dashboard editorial por sección](01-inicio-editorial-y-rutas.md)

**Status:** ready-for-agent

**Ejecución:** completada (2026-10-18).

**Evidencia:** login, session-identity, access. Ver [validación](../validation.md) y [revisión](../review.md). La autorización posterior `$implement` supera la pausa histórica de los comentarios originales.

**Spec:** [Dashboard y login: rediseño editorial y publicación confiable](../spec.md).

**Historias de usuario:** 43, 47, 48, 49, 50, 51, 52.

- [x] El login adopta Editorial: composición de marca/formulario en desktop, simple en móvil, etiquetas accesibles y sin desbordamientos.
- [x] Correo y contraseña admiten gestores de contraseñas y autocompletado correcto; mostrar/ocultar contraseña funciona por teclado y tiene nombre accesible.
- [x] Distinguir validación local, credenciales incorrectas, falta de permiso y fallo de conexión; el estado de carga impide envíos duplicados y permite recuperación tras fallo.
- [x] Google aparece solo cuando la configuración lo habilita; probar retorno y errores sin depender de cuentas reales no configuradas.
- [x] Tras entrar se recupera únicamente un destino administrativo interno permitido; mantener la redirección al origen seguro cuando la página pública está separada.
- [x] No mostrar contenido administrativo durante la comprobación inicial de sesión/rol. No agregar recuperación, registro ni gestión de usuarios.
- [x] Pruebas de navegador verifican login, fallo, reintento, destino directo y teclado; los endpoints privados siguen negando acceso a usuarios no autorizados.

## Comments

- 2026-10-18: desglose y dependencias aprobados por el usuario mediante “acepto”. Publicado con `to-tickets` en el tracker Markdown local.
- La publicación del ticket no autoriza iniciar implementación: el usuario mantiene esa fase en pausa. Su estado indica que está preparado para ejecución cuando se indique.
