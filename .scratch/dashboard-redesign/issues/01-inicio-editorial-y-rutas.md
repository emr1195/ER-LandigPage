# 01: Abrir el dashboard editorial por sección

**What to build:** Inicio con guía de las nueve secciones, navegación responsive y URLs propias, conservando los editores actuales durante la transición.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

**Spec:** [Dashboard y login: rediseño editorial y publicación confiable](../spec.md).

**Historias de usuario:** 1, 2, 3, 14, 16, 17, 43, 52, 58.

- [ ] El inicio ofrece las nueve secciones con nombres cotidianos, descripciones y enlace a la página pública; no inventa estadísticas.
- [ ] La sección activa se deriva de una clave estable en la URL; acceso directo, recarga, Atrás/Adelante y destino desconocido tienen resultados útiles.
- [ ] Editorial encapsula tipografía, espaciado y las dos paletas claras; Carbon & Azure es el valor inicial. La preferencia persistida se entrega en el ticket 08.
- [ ] La navegación funciona en 320, 390, 768 y 1440 píxeles y con teclado; el menú móvil cierra al seleccionar. Los editores existentes siguen disponibles.
- [ ] El tema administrativo no altera la página pública ni sus vistas previas; preservar la fuente y el veredicto del prototipo como evidencia histórica fuera de producción.
- [ ] Los prefactors mínimos de navegación y tema se realizan antes de introducir el comportamiento nuevo, conservando el funcionamiento actual y evitando una reescritura.
- [ ] Introducir el recorrido de navegador reproducible con aplicación/API y base y cargas aisladas; demostrar autenticación existente, apertura de las nueve secciones y compatibilidad pública sin tocar la base del usuario.

## Comments

- 2026-10-18: desglose y dependencias aprobados por el usuario mediante “acepto”. Publicado con `to-tickets` en el tracker Markdown local.
- La publicación del ticket no autoriza iniciar implementación: el usuario mantiene esa fase en pausa. Su estado indica que está preparado para ejecución cuando se indique.

