# Implementación del dashboard: seguimiento

Autorización: el usuario invocó `implement` para **todos los tickets** y levantó
expresamente la pausa. Incluye refactor, corrección de lagunas, pruebas,
revisión de código y commit en la rama actual. No pedir permiso para continuar.

Rama: `develop`. Punto anterior a implementación/preparación:
`6840eaf`. No había cambios ajenos: el seed, documentación y prototipo pendientes
proceden de esta misma conversación. No se ha hecho el commit de implementación.
Usar ese punto fijo para la revisión final, sin volver a preguntarlo.

## Avance comprobado

- 01: estructura Editorial, nueve rutas, Inicio, aislamiento del tema. Prueba de
  navegador pasó; falta revisión visual integral de tamaños y retirar transición.
- 02: nuevo LoginScreen/LoginForm, credenciales, errores, mostrar contraseña y
  regreso al destino. Prueba de navegador pasó.
- 03: Portada con borrador/publicación/vista previa real en iframe y guardas de
  navegación/cierre. Prueba pasó. La aplicación usa ahora el data router instalado
  para `useBlocker`.
- 04: ETag/If-Match, revisión persistida, trigger para escritores de mantenimiento,
  comparación atómica 428/412, consulta de versión vigente y reconciliación de
  resultado incierto. Pruebas HTTP concurrente y navegador de conflicto pasaron.
- 05: actividad append-only, publicación/evento en una transacción, consulta
  privada paginada y antes/después. Pruebas de navegador y rollback real pasaron.
- 06: cargas comunes con aborto/identidad de solicitud, bloqueo, reintento y
  registro de archivo compensado al fallar auditoría. Primer recorrido pasó.
  Aún ampliar pruebas de fallos y respuestas tardías.
- 07: reingreso modal ante 401 conserva borrador; mismo usuario no publica
  automáticamente. Prueba pasó. El retorno Google tiene borrador temporal por
  pestaña (15 min); aún probar diferente cuenta/retorno/limpieza.
- 08: migración, API y selector personal de dos paletas por cuenta. Prueba de dos
  dispositivos y cuenta diferente pasó.
- 09–15: migrados los nueve formularios. Pasaron por separado Navegación,
  Footer, Historia, Programa, Grupos (edición+baja pendiente), Eventos en móvil,
  Organización y Destacamentos (edición+baja pendiente). Repetir pruebas dirigidas
  tras los cambios funcionales de formularios descritos abajo.
- 16: pendiente integración, accesibilidad, lint completo/build, suites completas,
  revisión final y commit. No marcar tickets terminados antes de verificar.

## Arquitectura y pruebas

- Área nueva: `src/dashboard/editorial`, con formularios por sección, Fields,
  CollectionEditor, useSectionDraft, useUploadQueue, sesión, apariencia y Actividad.
  Se retiraron LegacySection, rutas/editores/auth UI antiguos, acciones antiguas
  de publicación y stores privados antiguos. Redux conserva solo contenido público.
  La carga pública mantiene su fallback. Se conservaron las tres pruebas públicas
  de Destacamentos en su módulo; ya pasaron. Los casos HTTP antiguos se trasladaron
  a tests/detachments-api.spec.mjs con PostgreSQL y middleware real: 2 casos pasaron.
  Los 2 casos de tests/access.spec.mjs también pasaron (401/403, actor, revisión,
  preferencias privadas, sin registro público ni borrado de auditoría).
- Vista previa real: ruta `/preview/:sectionKey`, recibe borrador por postMessage
  con comprobación de origen y ventana. Usa componentes públicos sin cambiarlos.
- API: servicios separados de rutas, errores tipados. Migraciones 002/003/004
  versionadas mediante schema_migrations. Aplicadas a la base local del usuario
  tras copia en backups/dashboard-before-migrations-2026-10-18T08-12-59-110Z.json.
  Se compararon recursivamente las nueve secciones: conservan contenido, IDs ya
  existentes y updated_by. Solo se eliminan metadatos administrativos del JSON
  público y se estabilizan IDs faltantes; la copia conserva su estado anterior.
- Nuevos errores de validación del servidor para campos/listas y URLs peligrosas.
  content-validation.spec.mjs pasó sus dos casos: rechazo sin cambiar contenido/
  revisión/historial y error junto al campo que se limpia al corregirlo.
- formChanges.js aporta setters funcionales por ruta y ValidationContext. **Todos
  los formularios se convirtieron a at(onChange,...keys)**; Fields y CollectionEditor
  pasan funciones hasta el setDraft raíz. Así no pierden cambios con subidas en
  paralelo. MapsField actualiza embedUrl mediante función para no pisar otros datos.
  Aún añadir prueba fuerte de cargas simultáneas y edición anidada.
- defaultContent.js inicializa cada sección ausente sin fabricar filas. normalizeDraft
  se usa al leer/publicar/reconciliar/conflicto. new-content.spec.mjs pasó creando
  el primer evento en una sección ausente. Detachments se normaliza solo al cargar,
  no en cada render, para mantener el foco e IDs al cambiar número.
- Playwright instalado localmente, versión fijada 1.64.1. Config en
  `playwright.config.mjs`. Ejecutar un archivo cada ciclo con
  `npx playwright test tests/ARCHIVO.spec.mjs`. **Serializar ejecuciones**:
  dos procesos limpian el mismo directorio de trazas y chocan en puertos.
- Arnés `tests/support/run-stack.mjs`: PostgreSQL 18 aislado en
  `.tmp/dashboard-test.local/postgres`, localhost:55439, DB er_dashboard_test;
  usuario test_admin, trust solo loopback. API3411 y Vite3410. Se crea/migra/reinicia
  contenido y actividad/preferencias solo allí. Cargas en su carpeta temporal.
  No usar la DB er_landing ni uploads del usuario para pruebas.
- En Windows pg_ctl debe usar stdio ignore para que no bloquee spawnSync por
  handles heredados del servidor. Reutiliza el clúster si pg_ctl status lo detecta;
  Playwright termina procesos web al acabar. El clúster aislado puede permanecer
  y se detiene al cierre con pg_ctl -D ruta exacta -m fast -w stop.
- Credenciales de pruebas: admin@example.test, second@example.test (admin),
  reader@example.test (sin rol), contraseña Dashboard-test-2026!.
  Son exclusivas del entorno de pruebas, nunca credenciales del usuario.
- Jest existente tiene mocks de internos y pruebas de editores viejos; mantener
  validación útil migrándola al nivel acordado cuando se retiren esos módulos.
  La suite HTTP antigua de Destacamentos asume guardado sin revisión y necesita
  adaptación al contrato nuevo.
- Build pasó después de retirar código viejo: 1241 módulos (antes 11876),
  paquete 568 kB con aviso previo de tamaño. Lint dirigido pasó antes de la retirada;
  volver a ejecutar. Corregidas advertencias de hooks y regex de control.
  Corregida .eslintignore que impedía descubrir directorios nuevos.
- No hay TypeScript ni comando de typecheck; usar build, lint y tests reales,
  no añadir un typecheck ficticio.

## Prototipo

Fuente y veredicto capturados con índice Git aislado, sin tocar rama/índice principal:
`prototype/dashboard-editorial-20261018023734`,
commit `c26f7ae0e08c3df210ae11e7aecd787a9df73aa4`.
Antes del commit final, excluir .design/dashboard-redesign y el HTML histórico
del commit de producto (mantenerlos locales y accesibles desde esa rama);
añadir referencia a la rama en ticket 01/documentación.

## Cierre pendiente

Comprobar dashboard en localhost:3002/API3001, capturas en dos paletas y tamaños.
Pendientes importantes de auto-revisión:

- Mover API/red del LoginForm a hook, separar Sidebar/Home y ActivityDetail para
  claridad; formatear archivos nuevos con Prettier fijado sin reformat público.
- Campo icono todavía texto libre: convertir a selector amigable conservando el
  valor original si no está entre iconos conocidos. Mejorar control de imágenes
  para no mostrar data URLs gigantes como tarea principal, mantener URL avanzada.
- Navegación móvil: ocultar de tabulación/lector cuando está cerrada y atrapar foco
  al abrir; Escape/cierre/foco devuelto. Revisar zoom/ancho y tabs de Portada accesibles.
- Probar logout explícito con borrador: useBlocker puede bloquear navigate tras
  cerrar sesión. Autorizar salida confirmada con ref y restaurarla si logout falla.
  Bloquear salida con confirmación de descarte mientras hay publicación en curso.
- Descartar debería consultar la publicación actual (y conservar edición si falla),
  no solo volver a la snapshot antigua tras un conflicto.
- Probar sesión distinta, cancelación/error de guardado, ACK perdido sin duplicar,
  cargas simultáneas, fallo de auditoría de carga con compensación de archivo,
  creación concurrente ausente, paginación y cursor inválido.
- Preview/página pública Navbar con lista sin botón: EventButton accede displayInfo
  sin guard cuando falta. Caso necesario para listas vacías: probar y añadir guard
  sin cambio visual para contenido válido si se confirma.
- Clúster de tests: verificar SHOW data_directory antes de escribir; arrancar Vite
  después de health de API para evitar ruido de proxy.
- Configurar scripts test:e2e, puerto local coherente 3002 y docs; lazy AdminApp para
  separar bundle privado. No hay typecheck TypeScript.
- Error handler API imprime errores esperados completos: limitar a fallos 500 y
  stack/message sin detalle de filas/secretos. Cursor de activity validar tipo/rango.
- Revisar npm audit solo si hay vulnerabilidades directas relevantes al login/API;
  no hacer actualizaciones masivas ajenas al alcance.

Usar skill code-review al terminar: dos subagentes autorizados por ese skill,
Standards y Spec, sobre el diff desde 6840eaf; resolver hallazgos.
El skill exige commits: configurar identidad solo por comando si falta nombre
(último autor: enoc mena; email global configurado) sin cambiar configuración global.
Actualizar criterios de tickets con evidencia real y autorización vigente.
