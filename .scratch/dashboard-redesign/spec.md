# Dashboard y login: rediseño editorial y publicación confiable

Status: ready-for-agent

Especificación publicada mediante `to-spec` en el tracker Markdown local.
El usuario confirmó el entendimiento compartido y el enfoque de pruebas.
El estado indica que la especificación está preparada; **la implementación
continúa expresamente en pausa**. El siguiente paso acordado es `to-tickets`.
No se han creado tickets de implementación.

## Problem Statement

Los administradores de Exploradores del Rey necesitan mantener el contenido de
la página pública sin modificar código. El panel actual presenta controles,
nombres y comportamientos inconsistentes que dificultan esta tarea a personas
con pocos conocimientos técnicos, especialmente en tablet y móvil.

La edición puede perderse al navegar, los fallos de conexión no ofrecen una
continuidad uniforme y los guardados simultáneos pueden sobrescribir trabajo.
Las eliminaciones no siguen una regla común: Destacamentos puede publicarlas
inmediatamente, mientras otras secciones esperan el guardado. Solo se conserva
el último autor de una sección; no hay registro de auditoría para saber quién
guardó, modificó o eliminó un contenido y qué cambió.

El login también necesita una presentación clara, autocompletado correcto y un
manejo comprensible de errores y carga. El objetivo es resolver estos problemas
en el área administrativa conservando los datos, las capacidades actuales y la
identidad visual de la página pública.

## Solution

Rediseñar el dashboard y el login con la dirección **Editorial** elegida:
encabezados serif, cuerpo y controles Manrope, jerarquía legible y espacio útil
para editar. Ofrecer dos apariencias claras, **Industrial Carbon & Azure** y
**Petrol & Apricot**, como preferencia personal de la cuenta del administrador.

Organizar el inicio como guía de las nueve secciones, usar nombres cotidianos
en español y permitir la edición completa, incluidas imágenes, en desktop,
tablet y móvil. Mostrar la vista previa pública real en paralelo cuando haya
espacio y permitir alternar entre Editar y Vista previa en pantallas pequeñas.

Unificar la publicación en **Guardar y publicar**, proteger los cambios
pendientes, conservarlos ante errores o sesión vencida y detectar conflictos
entre administradores. Incorporar un historial de solo lectura respaldado por
el servidor, con autor, momento, acción, contenido afectado y antes/después.

## User Stories

1. Como administrador, quiero encontrar las secciones desde un inicio con descripciones breves, para saber dónde cambiar cada contenido.
2. Como administrador, quiero abrir la página pública desde el panel, para consultar el resultado visible a los visitantes.
3. Como administrador, quiero nombres e instrucciones en español cotidiano, para editar sin conocer términos de desarrollo.
4. Como administrador, quiero editar el menú de navegación, para mantener la identidad y los enlaces del sitio.
5. Como administrador, quiero editar la Portada, sus textos, imágenes y botones, para actualizar la primera impresión del sitio.
6. Como administrador, quiero editar Historia, para mantener su relato y contenido visual.
7. Como administrador, quiero editar la estructura del programa y sus elementos, para explicar el programa correctamente.
8. Como administrador, quiero editar los grupos y sus datos e imágenes, para mantener su presentación.
9. Como administrador, quiero crear, modificar, ordenar cuando ya se permita y eliminar eventos, para comunicar las actividades vigentes.
10. Como administrador, quiero mantener los integrantes y categorías de Organización, para mostrar la información correcta.
11. Como administrador, quiero mantener el directorio de Destacamentos, para actualizar nombres, números, escudos y ubicaciones.
12. Como administrador, quiero conservar destacamentos sin logo o ubicación cuando esos datos sean opcionales, para no inventar información.
13. Como administrador, quiero editar el Pie de página, sus enlaces e información de contacto, para mantenerlo actualizado.
14. Como administrador, quiero conservar los contenidos existentes al estrenar el panel, para continuar mi trabajo sin reconstruirlos.
15. Como administrador de desktop, quiero ver edición y vista previa juntas cuando haya espacio, para revisar el efecto de mis cambios.
16. Como administrador de tablet, quiero que navegación, formularios y acciones se adapten al ancho disponible, para trabajar sin controles recortados.
17. Como administrador de móvil, quiero realizar la misma edición y carga de imágenes que en desktop, para completar tareas desde mi teléfono.
18. Como administrador de móvil, quiero alternar Editar y Vista previa sin perder lo escrito, para revisar y seguir trabajando.
19. Como administrador, quiero que la vista previa conserve el diseño de la página pública, para evaluar el contenido con su apariencia real.
20. Como administrador, quiero elegir una de las dos apariencias claras, para usar la que me resulte más cómoda.
21. Como administrador, quiero recuperar mi apariencia al entrar desde otro dispositivo, para mantener mi preferencia personal.
22. Como administrador, quiero que mi apariencia no cambie la de otros administradores ni la página pública, para mantener independientes esas preferencias.
23. Como administrador, quiero ver cuándo tengo Cambios sin guardar, para saber si falta publicar.
24. Como administrador, quiero una acción explícita Guardar y publicar que explique su efecto, para saber cuándo se hará público el contenido.
25. Como administrador, quiero recibir confirmación solo después de que el servidor guarde, para confiar en el resultado anunciado.
26. Como administrador, quiero conservar mi edición si falla la conexión o el guardado, para corregir el problema y reintentar.
27. Como administrador, quiero errores de validación junto a los campos afectados, para saber qué debo corregir.
28. Como administrador, quiero que el panel evite envíos repetidos mientras publica, para no ejecutar varias veces una acción por impaciencia.
29. Como administrador, quiero elegir Seguir editando o Descartar cambios antes de abandonar una edición, para evitar pérdidas accidentales.
30. Como administrador, quiero la misma protección al cambiar sección, salir del dashboard o cerrar sesión, para reconocer un comportamiento consistente.
31. Como administrador, quiero un aviso del navegador al recargar o cerrar una pestaña con cambios, para decidir si deseo abandonar el trabajo.
32. Como administrador, quiero descartar una edición y volver al contenido publicado, para cancelar cambios sin publicarlos.
33. Como administrador, quiero revisar la imagen actual y el progreso de una carga, para entender su estado.
34. Como administrador, quiero un error junto a la imagen y una opción de reintento si falla la carga, para recuperarme sin perder otros campos.
35. Como administrador, quiero que no se publique mientras haya imágenes cargándose, para evitar publicar referencias incompletas.
36. Como administrador, quiero que una carga tardía no reemplace contenido de otra sección ni restaure valores anteriores, para conservar la edición correcta.
37. Como administrador, quiero confirmar la eliminación viendo el nombre del elemento, para evitar quitar el registro equivocado.
38. Como administrador, quiero que toda eliminación espere Guardar y publicar, incluido Destacamentos, para revisar el conjunto de cambios antes de hacerlo público.
39. Como administrador, quiero poder cancelar una eliminación o descartar el conjunto de cambios antes de publicar, para conservar los registros originales.
40. Como administrador, quiero un estado vacío útil cuando elimine el último elemento permitido, para saber cómo agregar contenido de nuevo.
41. Como administrador, quiero ser avisado si alguien publicó después de que cargué una sección, para evitar sobrescribir su trabajo.
42. Como administrador, quiero conservar mi edición al detectar ese conflicto y poder consultar la versión vigente, para resolverlo de forma consciente.
43. Como administrador, quiero una URL propia por sección, para abrirla directamente y regresar a ella tras recargar o iniciar sesión.
44. Como administrador, quiero reautenticarme cuando venza la sesión conservando la edición en la pestaña, para continuar sin reconstruirla.
45. Como administrador, quiero decidir explícitamente cuándo publicar después de reautenticarme, para que el reingreso no publique por sí solo.
46. Como administrador, quiero cerrar sesión sin que queden datos privados de mi sesión en la interfaz siguiente, para que otra cuenta comience con su propio estado.
47. Como administrador, quiero entrar con correo y contraseña usando mi gestor de contraseñas, para acceder con facilidad.
48. Como administrador, quiero mostrar u ocultar la contraseña con un control accesible, para comprobar lo escrito.
49. Como administrador, quiero distinguir campos inválidos, credenciales incorrectas, falta de permiso y problemas de conexión, para saber qué hacer después.
50. Como administrador, quiero ver el estado de acceso en curso y evitar envíos duplicados, para entender que mi solicitud está siendo procesada.
51. Como administrador, quiero acceder mediante Google únicamente cuando esté configurado, para no encontrar una opción que no funciona.
52. Como administrador, quiero navegar con teclado, reconocer el foco y leer los errores y estados, para utilizar el panel con tecnologías de apoyo.
53. Como administrador, quiero consultar Actividad, para saber quién guardó, modificó o eliminó contenido.
54. Como administrador, quiero ver fecha, acción, sección o registro y valores antes/después, para comprender qué cambió.
55. Como administrador, quiero distinguir una carga de imagen completada de su publicación dentro de una sección, para interpretar el historial correctamente.
56. Como administrador, quiero que el autor y la fecha del historial provengan del servidor, para confiar en su atribución.
57. Como administrador, quiero que los registros permanezcan disponibles sin caducidad automática y sean de solo lectura, para conservar la evidencia de los cambios.
58. Como visitante, quiero seguir consultando el mismo diseño y contenido publicado, para que el rediseño administrativo no altere mi experiencia.

## Implementation Decisions

Las decisiones de producto proceden de la entrevista y su cierre aceptado. Los
detalles técnicos siguientes concretan esos comportamientos para la futura
implementación; no describen código ya construido.

### Alcance, estructura y compatibilidad

- Conservar React, el router, Redux, MUI, Express, PostgreSQL y la autenticación
  existentes. Refactorizar los módulos administrativos por responsabilidades:
  estructura y navegación, edición/publicación, cargas, apariencia, sesión e
  historial. Evitar una reescritura del sitio o un cambio de stack.
- Conservar las nueve claves de contenido y todos sus campos, colecciones,
  validaciones y capacidades existentes. Los nombres visibles pueden mejorar
  sin usar esos nombres como identidad de sección.
- Separar estado publicado, edición local y estado de solicitudes. Una respuesta
  de otra sección, sesión o carga obsoleta no puede sustituir el borrador activo.
- Mantener las lecturas públicas compatibles y limitar sus respuestas a
  contenido público. La auditoría, preferencias e identidad administrativa no
  deben quedar expuestas en esos datos.
- Los riesgos observados en cargas y reinicios asíncronos deben reproducirse
  antes de atribuirles una causa o fijar una corrección. Los casos demostrados
  de pérdida al navegar, selección sin URL, cierre incompleto, ancho fijo y
  eliminación inmediata de Destacamentos tienen cobertura de regresión.

### Sistema visual y navegación

- Aplicar Editorial al dashboard y login: encabezados serif y Manrope para
  texto y controles, escalas consistentes de tipografía, espacio y estados.
  Las dos paletas comparten composición y capacidades; no son dos aplicaciones.
- Encapsular el tema administrativo. Renderizar los componentes públicos reales
  de vista previa con su propio tema y estilos, sin modificarlos para adaptarlos
  a la paleta del panel.
- Establecer Carbon & Azure claro como apariencia inicial antes de identificar
  la cuenta y para cuentas sin preferencia. Tras autenticar, cargar la elección
  guardada. No introducir reconocimiento de cuentas en el formulario de login.
- Dar al inicio accesos y descripciones de las nueve secciones, enlace público
  y acceso a Actividad. No incorporar estadísticas ficticias.
- Usar rutas del dashboard por clave estable de sección y una ruta de Actividad.
  La URL debe ser la fuente de la selección; una recarga conserva el destino.
  Un destino desconocido presenta una salida útil hacia Inicio.
- Conservar el destino administrativo solicitado durante el login, aceptando
  únicamente destinos internos permitidos. Mantener el redireccionamiento al
  origen seguro del dashboard en despliegues con página pública separada.
- Navegación lateral donde haya espacio; navegación móvil accesible que cierre
  tras seleccionar. Mantener campos, vista previa y acciones utilizables en los
  anchos intermedios, sin depender solo de categorías de dispositivo.
- Verificar 320, 390, 768 y 1440 píxeles, zoom al 200 %, teclado y foco visible.
  Evitar desplazamiento horizontal de la página y acciones ocultas por barras
  fijas. Los errores y estados deben ser identificables sin depender del color.

### Edición, publicación y eliminaciones

- El contenido publicado solo cambia al confirmar **Guardar y publicar**.
  Las cargas guardan archivos, pero no publican automáticamente su asociación
  con una sección. No se añade un sistema persistido de borrador/publicación.
- El borrador pertenece a una sección y a la identidad que lo inició. Detectar
  cambios respecto de su base, mostrar **Cambios sin guardar**, permitir descartar
  y volver al contenido publicado, y anunciar confirmación tras éxito real.
- Proteger cambio de sección, Atrás/Adelante, salida del dashboard y cierre de
  sesión con **Seguir editando** / **Descartar cambios**. Al recargar o cerrar,
  usar el aviso nativo cuando el navegador lo permita; su texto no es controlable.
- Evitar publicaciones duplicadas mientras una solicitud está en curso y
  controlar ediciones/cargas durante ese intervalo para que el éxito no borre
  trabajo más reciente. Conservar la edición ante fallos, validación o conflicto.
- La confirmación de eliminación identifica el elemento. Confirmarla modifica
  únicamente el borrador; publicar aplica el conjunto. Descartar restaura la
  base publicada. También se aplica al último elemento y a Destacamentos,
  respetando las validaciones del dominio.
- Un timeout no acredita que el servidor haya rechazado la operación. Antes de
  reintentar una publicación de resultado incierto, reconciliar la revisión
  vigente y el contenido, sin anunciar éxito ni repetir escrituras a ciegas.

### Contrato de publicación y concurrencia

- Mantener las lecturas existentes de secciones y su contenido; añadir una
  revisión opaca en la respuesta de lectura individual mediante ETag, sin
  introducir metadatos administrativos dentro del JSON de la página pública.
- La actualización existente de una sección conserva su cuerpo de contenido y
  exige la revisión leída mediante If-Match. Una lectura de sección inexistente
  también proporciona una revisión que permita su primera publicación segura.
- El servidor compara y escribe atómicamente en PostgreSQL. Una revisión
  ausente devuelve 428; una revisión obsoleta devuelve 412 sin escritura ni
  evento de publicación. Una actualización correcta devuelve contenido
  canónico y nueva revisión. No usar la hora del navegador para este control.
- El cliente distingue validación (400), falta de sesión (401), falta de permiso
  (403), conflicto de revisión (412), precondición ausente (428), error del
  servidor y error de red mediante datos estructurados, no comparando mensajes.
- Un conflicto muestra que existe una publicación más reciente, mantiene la
  edición local y permite consultar la vigente. Adoptar la versión vigente
  requiere descartar explícitamente el borrador; no rebasar su revisión ni
  mezclar/publicar automáticamente.
- Incorporar una revisión persistida por sección mediante migración aditiva,
  inicializando contenido existente sin borrarlo. Todas las escrituras del
  panel deben atravesar el mismo control; las herramientas de mantenimiento
  no pueden dejar revisiones incoherentes para editores abiertos.

### Imágenes y sesión

- Reutilizar la interfaz de cargas existente con autenticación administrativa,
  límites y tipos admitidos actuales. Comunicar imagen actual, progreso real o
  estado indeterminado, error y reintento. Bloquear publicación si hay cargas
  pendientes o referencias aún no resueltas.
- Vincular cada resultado al campo, sección y edición que lo inició. Una carga
  completada después de descartar o navegar no debe modificar otro borrador.
- Mantener correo/contraseña y Google condicionado por configuración. Usar
  autocompletado adecuado para credenciales existentes, mostrar contraseña y
  mensajes claros sin exponer detalles internos. No habilitar registro público.
- Verificar sesión y rol antes de mostrar funciones privadas. Ante vencimiento,
  suspender solicitudes privadas, mantener el borrador en la pestaña y ofrecer
  reautenticación sin reemplazar el editor ni publicar al volver.
- La continuidad se limita a la pestaña activa. Una reautenticación que requiera
  redirección completa debe conservar ese contexto de forma temporal por pestaña;
  no guardar credenciales ni ofrecer borradores recuperables tras cerrar el
  navegador. La conservación por vencimiento no sustituye el aviso al recargar.
- Restaurar la edición solo para la misma identidad. No mostrarla ni publicarla
  con otra cuenta; el cierre de sesión explícito limpia los datos administrativos
  después de resolver la protección de cambios.

### Preferencia personal

- Persistir la apariencia por identificador estable de usuario en PostgreSQL,
  separada del contenido público y sin modificar el esquema interno del proveedor
  de autenticación. Aceptar únicamente las dos paletas aprobadas.
- Exponer lectura y actualización de la preferencia del usuario autenticado,
  derivando su identidad de la sesión. No aceptar un usuario destino del cliente.
- Aplicar la preferencia entre sesiones y dispositivos; informar errores al
  guardarla y permitir reintentar sin afectar el borrador de contenido. El valor
  predeterminado no se anuncia como una preferencia guardada si su carga falló.

### Registro de auditoría

- Persistir eventos append-only con identificador, actor estable y nombre/correo
  de referencia, fecha del servidor, acción, sección, registros afectados y
  antes/después. Para publicaciones, conservar las revisiones de origen/destino
  y suficiente contenido para mostrar el cambio sin reconstruirlo desde el
  estado actual. No registrar contraseñas, cookies, tokens o archivos binarios.
- Una publicación y su evento se confirman en la misma transacción. Si falla
  cualquiera, no debe quedar una publicación sin historial ni una publicación
  ficticia en el historial. Los rechazos, cambios locales y cancelaciones no
  son publicaciones y no generan eventos de publicación.
- Un evento por publicación identifica el guardado y sus altas, modificaciones
  o eliminaciones internas. Usar identidades estables de registros: renombrar,
  cambiar un número o reordenar no debe inventar una eliminación y creación.
- Las cargas completadas generan un evento separado, atribuible a la sesión,
  con referencia de archivo y contexto validado cuando exista. Un archivo
  subido y luego descartado sigue siendo una carga completada, no una publicación.
  No confirmar una carga exitosa sin registrar su evento; manejar la compensación
  de archivos si falla el registro. No se presupone una transacción entre disco
  y PostgreSQL ni se amplía esto a un sistema de gestión de medios.
- Derivar identidad y momento del servidor; ignorar esos valores si vienen del
  navegador. La consulta y el detalle requieren rol administrador y no son
  parte de los endpoints públicos.
- Mostrar Actividad en orden temporal con paginación y estados de carga, vacío,
  error y reintento; permitir consultar el detalle antes/después. No exponer
  controles ni endpoints de edición o borrado del historial.
- Conservar registros sin caducidad automática en esta versión. La migración
  empieza un historial real desde su instalación; no inventar actores ni
  reconstruir eventos antiguos a partir de la última modificación o del seed.

## Testing Decisions

Enfoque confirmado por el usuario: usar dos puntos principales de prueba, con
el navegador como nivel preferido y HTTP/PostgreSQL para invariantes que
necesitan concurrencia o fallo transaccional controlados. Reutilizar las pruebas
existentes para regresiones puntuales y evitar duplicar cobertura entre niveles.

- Una buena prueba observa comportamiento externo: contenido publicado,
  resultado HTTP, estado visible, permisos e historial resultante. No acoplarse
  al árbol interno de componentes, acciones Redux, SQL exacto o clases de estilo.
- **Navegador con aplicación, API y PostgreSQL de prueba reales:** cubrir login,
  rutas protegidas, las nueve secciones, edición y vista previa, publicación,
  eliminación pendiente, navegación con cambios, errores, carga de imágenes,
  apariencia por cuenta, Actividad y continuidad tras vencimiento. Comprobar
  también el resultado en la página pública. Establecer un arnés de navegador
  reproducible como el único nuevo acceso de pruebas de recorridos completos.
- **HTTP con PostgreSQL de prueba real:** reutilizar el límite de rutas existente
  para comprobar autenticación/rol, lectura privada, revisión obligatoria,
  guardados concurrentes, transacción contenido/auditoría, historial y aislamiento
  de preferencias. Los casos de permisos deben atravesar el middleware real;
  no sustituirlo por una autorización que siempre concede acceso.
- Para concurrencia, dos sesiones leen la misma revisión y guardan: solo una
  gana, la otra obtiene conflicto y el contenido/auditoría reflejan únicamente
  el guardado aceptado. Incluir creación concurrente de una sección ausente.
- Para atomicidad, provocar un fallo controlado del registro de auditoría y
  comprobar desde otra conexión que ni contenido ni revisión se confirmaron.
  Probar además la compensación/error de una carga cuyo evento no se registra.
- Probar vencimiento con edición pendiente y reautenticación de la misma cuenta;
  no se publica al volver. Una cuenta distinta no recibe ese borrador.
- Verificar preferencia persistida con dos contextos de navegador de la misma
  cuenta y una cuenta diferente, no solo inspeccionando el estado de un componente.
- Usar los editores actuales de React Testing Library y Jest como antecedente
  para regresiones locales cuando aporten diagnóstico, sin duplicar todos los
  recorridos ni crear una suite independiente por componente. Las pruebas de
  eliminación inmediata de Destacamentos deberán cambiar para el nuevo contrato.
- Las pruebas HTTP existentes montan Express y hacen solicitudes reales, pero
  simulan PostgreSQL y autorización; son antecedente de transporte, no evidencia
  de atomicidad, persistencia o permisos reales. Mantener los casos útiles de
  validación y compatibilidad mientras se eleva la cobertura de esos invariantes.
- Cubrir vacío, carga, validación, red, rechazo de permiso y conflicto en los
  flujos afectados. Una respuesta tardía no debe reemplazar cambios posteriores.
- Revisar visualmente las dos paletas con dashboard, login y Actividad en 320,
  390, 768 y 1440 píxeles. Verificar contraste de texto y controles, foco, orden
  de teclado, etiquetas, anuncios de error/éxito, zoom y ausencia de desbordamiento.
  No convertir cada combinación visual en un recorrido funcional completo.
- Comparar página pública antes/después con contenido equivalente para detectar
  filtraciones del tema administrativo y conservar las pruebas públicas existentes.
- Usar base y directorio de cargas aislados, cuentas de prueba y limpieza
  controlada. No borrar, reconstruir ni alterar la base local del usuario para
  ejecutar pruebas. Google real solo se valida si está configurado para pruebas;
  automatizar configuración y estados de retorno sin depender de cuentas reales.
- Cierre de implementación: lint, build, pruebas relevantes existentes, recorridos
  nuevos y revisión visual. Registrar limitaciones reales y fallos preexistentes;
  las comprobaciones del prototipo no equivalen a validación del producto final.

## Out of Scope

- Rediseñar la página pública o cambiar su identidad visual.
- Recuperación de contraseña, registro público, gestión de usuarios o nuevos roles.
- Modo oscuro, nuevas paletas y selector Sistema / Claro / Oscuro.
- Estadísticas inventadas, analítica de negocio y reactivación de la función de
  notas actualmente sin navegación visible.
- Borradores persistentes entre cierres de navegador, publicación programada,
  aprobación editorial, autoguardado público y edición colaborativa en tiempo real.
- Mezcla automática de conflictos o una acción para sobrescribir sin comprobar
  la revisión vigente.
- Restaurar versiones, editar o borrar auditoría desde el panel, caducidad
  automática, exportaciones y auditoría general de autenticación, notas o toda
  actividad ajena a las publicaciones y cargas acordadas.
- Biblioteca de medios, limpieza retroactiva de archivos y migración a otro
  proveedor de almacenamiento.
- Cambios generales de infraestructura, despliegue, stack o correcciones de la
  página pública no necesarias para los flujos administrativos acordados.
- Implementar el producto o crear tickets como parte de esta ejecución de `to-spec`.

## Further Notes

- El usuario aceptó el cierre del entendimiento compartido y pidió pasar a
  `to-spec`. El procedimiento acordado es especificación, luego `to-tickets`;
  la implementación sigue en pausa hasta una instrucción posterior.
- La comparación visual local está en <http://127.0.0.1:5197/dashboard/> y se
  ejecuta con `npm run design:preview`. Editorial con Carbon & Azure claro y
  Petrol & Apricot claro es el veredicto; las otras variantes son históricas.
- El prototipo es evidencia visual desechable, sin autenticación, persistencia,
  auditoría ni publicación real. Conservar fuente y veredicto como referencia
  histórica; la implementación se realizará sobre la aplicación real.
- La aplicación existente se preparó en <http://localhost:3002/dashboard> con
  PostgreSQL local y un seed idempotente de nueve secciones de demostración.
  Las imágenes y personas son de ejemplo, no información oficial. No incluir
  credenciales ni valores del entorno en la especificación o los tickets.
- Se verificaron previamente build, recorridos locales y pruebas de editores.
  Eso describe la preparación existente; no acredita la aceptación de funciones
  futuras. Este paso solo produce documentación y no ejecuta migraciones nuevas.

## Comments

- 2026-10-18: Q14–Q18 aceptadas: auditoría de solo lectura, apariencia por cuenta,
  conflictos sin sobrescritura silenciosa, eliminaciones pendientes y continuidad.
- 2026-10-18: el usuario aceptó el resumen final y solicitó explícitamente `to-spec`.
- 2026-10-18: borrador preparado conforme al template; pendiente confirmar los
  puntos de prueba antes de publicarlo en el tracker local como `ready-for-agent`.
- 2026-10-18: el usuario respondió "acepto" al enfoque de navegador,
  HTTP/PostgreSQL aislado y regresiones existentes. Se publicó esta spec con
  estado `ready-for-agent`; el borrador queda sustituido por este documento.
  Se conserva la entrevista como referencia histórica en `interview-notes.md`.
  No se implementaron funciones ni se crearon tickets en este paso.
