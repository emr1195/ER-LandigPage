# Rediseño del dashboard y login: acuerdos de la entrevista

Documento histórico de preparación. La especificación vigente está en
[spec.md](spec.md), publicada después de aceptar el entendimiento compartido y
el enfoque de pruebas. Las referencias a revisiones pendientes que siguen
describen el estado anterior a esa publicación, no bloqueos actuales.

## Estado del trabajo

Preparación mediante `grill-with-docs`: las decisiones de diseño están
confirmadas, incluidas Q14–Q18, y el usuario aceptó el entendimiento compartido.
`to-spec` está en curso; el borrador formal completo está en `spec.draft.md`.
El usuario pidió revisar los puntos de prueba propuestos antes de confirmarlos.
Este archivo conserva los acuerdos de la entrevista hasta publicar la spec
formal. `needs-info` corresponde únicamente a esa confirmación de pruebas,
no a decisiones de diseño abiertas ni a autorización para implementar.

El usuario pide completar la preparación y después seguir con `to-spec` y
`to-tickets`, en ese orden. **No implementar todavía el rediseño ni las nuevas
funciones.** El seed local solicitado es preparación del entorno, no la
implementación del rediseño. No se han creado tickets de implementación.

## Objetivo

Permitir que administradores con pocos conocimientos técnicos mantengan el
contenido de la página pública sin editar su código manualmente. Refactorizar
y rediseñar el dashboard existente y su login, investigando y corrigiendo los
fallos de esos flujos.

## Decisiones confirmadas

- Mantener las funciones y datos existentes; se pueden reorganizar pantallas,
  navegación, formularios y código interno.
- Mantener visualmente intacta la página pública. Permitir cambios de API
  necesarios para corregir fallos administrativos y soportar las funciones
  expresamente acordadas, como auditoría, preferencias y conflictos de edición.
- Permitir edición completa, incluidas imágenes, en desktop, tablet y mobile.
- Priorizar claridad, nombres cotidianos, instrucciones breves y acciones
  evidentes para administradores con pocos conocimientos técnicos.
- Adoptar un estilo editorial sobrio, legible y con espacio para editar.
- Dirección visual elegida por el usuario: **Editorial**, con dos apariencias
  claras seleccionables: **Industrial Carbon & Azure** y **Petrol & Apricot**.
  La elección es una preferencia personal de cada administrador; la composición,
  tipografía y funciones son las mismas. Estudio y Guiado son históricos.
- Primera versión solo en claro. El usuario considera demasiado oscuras las
  propuestas oscuras y permite proceder sin modo oscuro. Se aplaza su elección
  e implementación, sin abrir otra ronda visual para bloquear la entrega.
- Las cinco paletas exploradas permanecen en las fuentes como evidencia
  histórica; el comparador vigente ofrece las dos apariencias claras elegidas.
- Definir tipografía, espaciado y comportamiento responsive como parte del
  rediseño completo.
- Conservar correo/contraseña y Google cuando esté configurado.
- Mejorar el login con mostrar contraseña, autocompletado correcto, validación,
  errores claros y estados de carga.
- Excluir recuperación de contraseña y nuevas funciones de gestión de usuarios.
- El inicio no necesita estadísticas que el sistema no produce.
- Mantener publicación inmediata mediante una acción explícita llamada
  "Guardar y publicar", con una explicación breve de su efecto.
- Mostrar "Cambios sin guardar" y proteger cambios de sección, salida del
  dashboard y cierre de sesión con las opciones "Seguir editando" y
  "Descartar cambios". Usar el aviso del navegador al recargar o cerrar pestaña.
- Conservar lo escrito si falla el guardado.
- Mantener la vista previa como parte central: en paralelo con el editor
  cuando haya espacio y mediante "Editar" / "Vista previa" en pantallas menores.
- La vista previa conserva la apariencia propia de la página pública.
- Usar el inicio como guía para encontrar contenido: accesos a secciones,
  descripciones breves y un enlace a la página pública.
- Usar nombres cotidianos en español, incluyendo "Portada", "Menú de
  navegación" y "Pie de página".
- Unificar subidas y formularios: imagen actual, progreso, errores junto al
  campo, reintento y bloqueo del guardado mientras haya subidas pendientes.
- Conservar la edición ante errores de conexión e indicar qué corregir en
  cada error de validación.
- Aplazar el selector Sistema / Claro / Oscuro y la preferencia de tema junto
  con el modo oscuro. La primera versión del dashboard y login siempre es clara,
  con selección personal entre las dos paletas aceptadas. Guardar la elección
  en la cuenta del administrador para conservarla entre dispositivos (Q15).
- Preparar variantes visuales iniciales de dashboard y login para elegir la
  dirección antes de implementar el rediseño.
- Incluir un historial de auditoría de solo lectura para administradores, con
  autor, fecha, sección/registro afectado, acción y valores antes/después.
  Registrar desde el servidor los cambios confirmados y las cargas de imágenes
  completadas. Sin caducidad automática en esta versión ni restauración de
  versiones; no permitir editar ni borrar el historial desde el panel (Q14).
- Detectar cambios de otro administrador al guardar, bloquear sobrescrituras
  silenciosas y conservar la edición local para resolver el conflicto. No
  mezclar automáticamente el contenido (Q16).
- Confirmar eliminaciones mostrando el nombre del elemento. Mantenerlas
  pendientes hasta "Guardar y publicar", también en Destacamentos, para que
  todas las secciones se comporten igual (Q17).
- Usar una URL por sección y regresar a ella al recargar o iniciar sesión.
  Si vence la sesión, conservar la edición en la pestaña actual, permitir
  reingresar y requerir una publicación explícita posterior. No se ha acordado
  persistencia de borradores entre cierres de navegador (Q18).

## Hechos de la exploración

- El dashboard administra contenido por sección y presenta vistas previas de
  componentes públicos.
- El guardado actual actualiza directamente el contenido público; no existe
  un modelo persistido de borrador/publicación ni versiones.
- La selección de sección vive en estado interno, sin URL individual.
- El tema visual actual se comparte con la página pública.
- No existe historial de auditoría; `updated_by` y `updated_at` conservan solo
  el autor y la fecha del último guardado. La identidad fiable del administrador
  está disponible en la sesión del servidor.
- Las dos suites existentes de editores pasaron: 14 pruebas.
- La lectura del código muestra falta de protección de cambios al navegar,
  controles de ancho fijo que limitan mobile, sidebar fijo desde 600px y un
  reinicio incompleto del estado al cerrar sesión.
- Las interacciones entre subidas de imágenes, edición y guardado requieren
  reproducción específica antes de fijar sus correcciones.
- El guardado actual reemplaza el JSON completo de una sección sin comprobar
  una versión previa; dos administradores pueden sobrescribirse.
- Destacamentos elimina inmediatamente registros guardados; los otros editores
  mantienen esas eliminaciones pendientes hasta guardar.

## Cierre y siguiente procedimiento

Q14, Q15, Q16, Q17 y Q18 fueron aceptadas con "sí". No quedan decisiones
pendientes de esas preguntas. El usuario aceptó el cierre del entendimiento
compartido y solicitó `to-spec`; eso no habilita implementación por sí mismo.

`to-spec` está convirtiendo estos acuerdos y los hallazgos verificados en alcance,
contratos y validación. El borrador está completo, pendiente de confirmar los
puntos de prueba que exige su paso 2. Después de publicar la especificación,
seguir con `to-tickets` para dividir el trabajo en tickets Markdown locales.
Todavía no se ejecutó `to-tickets` ni se crearon tickets.

La especificación debe cubrir los recorridos acordados: edición y vista previa
en los tres tamaños, publicación y errores sin pérdida de cambios, subidas
pendientes, navegación y cierre de sesión con cambios, eliminaciones pendientes,
conflictos entre administradores, sesión vencida, historial y preferencia de
apariencia entre dispositivos. Debe separar los fallos comprobados de los
riesgos que requieren reproducción; la muestra visual no acredita que esas
funciones ya existan.

## Variantes iniciales para revisión

Comparación local principal: <http://127.0.0.1:5197/dashboard/>. Sigue el enfoque
del proyecto hermano `projectManagement`: servidor aislado, controles externos
de variante/pantalla/tema/tamaño y selección conservada en la URL. Se inicia con
`npm run design:preview`. Fuente y alcance: `.design/dashboard-redesign/REVIEW.md`.

La muestra en conversación se conserva en `dashboard-variants.html`. Ambas
presentaciones son conceptuales, sin conexión a datos o sesiones reales.
Las fuentes históricas incluyen editor de Portada, login y Actividad de ejemplo
en cada variante, con tema claro/oscuro y ancho móvil/tablet/desktop. La revisión
vigente se centra en Editorial y las dos paletas claras elegidas.

- **Editorial:** navegación lateral petrol, títulos con serif, formularios
  espaciosos y vista previa en paralelo. Login dividido entre marca y acceso.
- **Estudio:** navegación superior y más ancho para editor/vista previa;
  tipografía sans serif. Login compacto y centrado.
- **Guiado:** navegación lateral clara y edición separada en pasos de texto,
  imágenes y revisión. Login con bienvenida centrada y formulario debajo.

Veredicto del usuario: "editorial me gusta quedaremos con editorial, light theme
esta bien, pero el dark esta muy oscuro". El screenshot adjunto corresponde al
oscuro anterior, no a una nueva referencia visual.

Se compararon cinco paletas claras y oscuras; el usuario eligió conservar tanto
Industrial Carbon & Azure claro como Petrol & Apricot claro, a elección personal
de cada administrador. Las propuestas oscuras, incluido el petrol suavizado,
permanecen históricas y no requieren aprobación para avanzar con la versión clara.

Referencia vigente:
<http://127.0.0.1:5197/dashboard/?variant=editorial&palette=carbon-azure&view=dashboard&theme=light&width=1440>.

La vista previa pública de la muestra es esquemática; la implementación deberá
usar el contenido y los componentes públicos reales con su tema encapsulado.
La pantalla Actividad y la publicación de la muestra son interacciones locales:
la auditoría persistente todavía debe diseñarse e implementarse en el servidor.

El comparador local centra su selector en las dos paletas claras aceptadas.
Las flechas inferiores alternan ambas conservando estructura, pantalla y tamaño.
El parámetro `palette` de la URL conserva la elección al recargar. Las otras
paletas y los temas oscuros se conservan en las fuentes como evidencia histórica.

## Fuera de alcance confirmado

- Rediseño visual de la página pública.
- Recuperación de contraseña.
- Nuevas funciones de gestión de usuarios.
- Modo oscuro y selector de tema en la primera versión.
- Restauración de versiones, edición o borrado del historial de auditoría.
- Mezcla automática de ediciones simultáneas.
- Borradores persistidos entre cierres de navegador.

## Preparación del entorno local

- Seed preparado y ejecutado mediante `npm run db:seed-demo` sobre `er_landing`.
- Se cargaron las nueve secciones, con cuatro eventos, tres grupos, seis
  integrantes ficticios y cinco destacamentos de demostración.
- Las imágenes son ilustraciones SVG autocontenidas; los datos no dependen de
  servicios de imágenes externos ni representan información oficial.
- El seed omite las secciones ya existentes y usa una transacción. Se verificó
  que ejecutarlo otra vez conserva contenido, autor y fechas de modificación.
- Se comprobaron las restricciones contra producción y destinos remotos, el
  contrato de destacamentos, sintaxis y lint de los archivos nuevos.
- El login existente, la landing y los nueve editores se abrieron contra la
  base poblada sin errores JavaScript en ese recorrido; no se publicaron cambios
  desde la interfaz.
- Aplicación actual: <http://localhost:3002/dashboard>. El comparador visual en
  5197 conserva sus datos de muestra propios y no escribe en esta base.

## Comments

- 2026-10-18: el usuario respondió "q14 si, q15 si, q16 si, q17 si, q18 si".
  Se incorporaron las cinco recomendaciones como decisiones confirmadas.
  Se mantiene la instrucción de preparar primero, seguir con `to-spec` y
  `to-tickets` y no implementar todavía.
- 2026-10-18: el usuario aceptó el resumen final y solicitó `to-spec`. Se preparó
  `spec.draft.md`; eligió revisar el enfoque de pruebas antes de confirmarlo.
- 2026-10-18: el usuario aceptó el enfoque de pruebas. Se publicó la especificación
  definitiva en `spec.md` con estado `ready-for-agent`; estos acuerdos se
  conservaron como referencia histórica. La implementación sigue en pausa.
