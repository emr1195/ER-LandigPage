# 16: Cerrar la transición y validar el dashboard completo

**What to build:** Las nueve secciones, login y Actividad funcionan juntas en las dos paletas, con accesibilidad, continuidad y compatibilidad pública verificadas.

**Blocked by:** [07 — Reautenticarse conservando la edición de la pestaña](07-sesion-vencida-y-continuidad.md); [08 — Guardar la apariencia personal entre dispositivos](08-apariencia-personal.md); [09 — Editar el menú de navegación con el flujo común](09-menu-de-navegacion.md); [10 — Editar el pie de página sin perder sus colecciones](10-pie-de-pagina.md); [11 — Editar Historia y Programa con vista previa real](11-historia-y-programa.md); [12 — Mantener Grupos desde cualquier tamaño de pantalla](12-grupos.md); [13 — Gestionar Eventos sin controles recortados](13-eventos.md); [14 — Mantener Organización y sus categorías](14-organizacion.md); [15 — Publicar Destacamentos y sus eliminaciones de forma uniforme](15-destacamentos.md)

**Status:** ready-for-agent

**Spec:** [Dashboard y login: rediseño editorial y publicación confiable](../spec.md).

**Historias de usuario:** 14, 15, 16, 17, 18, 19, 22, 29, 30, 31, 35, 36, 40, 43, 44, 45, 46, 52, 57, 58.

- [ ] Ejecutar recorridos integrados con los nueve editores, inicio, login, Actividad y preferencias; ninguna sección evita guardas, revisión, auditoría o cargas pendientes.
- [ ] Comprobar continuidad de sesión en editores migrados y conflictos entre administradores, sin duplicar todos los casos ya cubiertos en los niveles adecuados.
- [ ] Revisar ambas paletas en dashboard, login y Actividad a 320/390/768/1440 píxeles, teclado y zoom 200 %, contraste, foco, etiquetas y anuncios, sin desbordamientos ni acciones inaccesibles.
- [ ] Comparar la página pública con contenido equivalente y verificar que su tema y componentes no cambian por la apariencia administrativa.
- [ ] Retirar únicamente código administrativo sustituido y adaptadores transitorios ya sin consumidores, manteniendo las lecturas públicas y sin añadir funciones fuera de alcance.
- [ ] Pasar lint, build y pruebas relevantes de navegador/HTTP/editores; documentar evidencia, fallos preexistentes y limitaciones de Google configurado sin usar la base o cargas del usuario como entorno de pruebas.
- [ ] Conservar la referencia de fuente/veredicto del prototipo y dejar claro que sus comprobaciones no sustituyen la aceptación del producto real.

## Comments

- 2026-10-18: desglose y dependencias aprobados por el usuario mediante “acepto”. Publicado con `to-tickets` en el tracker Markdown local.
- La publicación del ticket no autoriza iniciar implementación: el usuario mantiene esa fase en pausa. Su estado indica que está preparado para ejecución cuando se indique.

