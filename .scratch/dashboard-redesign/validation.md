# Validación de la entrega

Autorización: `$implement haz todos los tickets`; incluye el refactor y la
corrección de lagunas confirmada después por el usuario. Base de comparación:
`6840eaf`, rama de trabajo `develop`. La pausa de documentos anteriores queda
superada por esta instrucción; se conserva la spec aprobada sin reescribirla.

## Comprobaciones

- `npm run lint`: pasó sin errores ni advertencias.
- `npm run build`: pasó; administración y vista previa se cargan por separado.
  Persiste el aviso de tamaño del paquete público, aproximadamente 501 kB.
- `npm test`: 5 suites, 21 pruebas pasaron.
- Playwright: recorridos con API, autenticación y PostgreSQL reales, más fallos
  de red/proveedor introducidos en fronteras externas. Primera ejecución conjunta:
  47/50; tres fallos del arnés (dos por contenido compartido entre escenarios y
  uno por buscar un `img` en lugar del fondo CSS real de Historia). Se añadió
  preparación independiente por escenario y se corrige la comprobación visual.
  La repetición integral ampliada pasó: **53/53**. Después de la revisión se
  volvieron a comprobar 19 escenarios afectados y se añadieron 3 regresiones;
  todos pasaron. El archivo nuevo es `tests/review-regressions.spec.mjs`.
  Tras asegurar cancelación antes de restaurar el contenido o adoptar la versión
  vigente, pasaron otros 13 recorridos dirigidos de publicación, conflicto,
  descarte y cargas; lint y build se ejecutaron de nuevo con éxito.
- Matriz responsive dirigida: ambas paletas, inicio, nueve editores y actividad,
  a 320/390/768/1440 px y espacio equivalente a zoom 200 %; pasó. Se comprobó
  teclado en navegación móvil, foco retenido/devuelto, login y tabs accesibles.
- Contraste de tokens: texto principal 10.92–13.05:1; texto secundario 5.04–5.67:1;
  primario sobre superficie 5.60–7.40:1; navegación 10.10–11.42:1; selección
  6.77–8.00:1. Bordes de controles oscurecidos a más de 3:1.
- Página pública: conserva componentes y tema; cambiar la apariencia personal no
  modifica sus colores. Las vistas previas cargan esos mismos componentes.

## Casos de fondo cubiertos

Publicar y descartar; guardas; bajas pendientes; creación sin datos; fechas sin
conversión de zona horaria; conservación de colecciones vecinas; carga de imagen
en cada editor; cargas simultáneas; error/reintento/cancelación de cargas; sesión
vencida, misma cuenta y otra cuenta; cierre explícito; Google con retorno
simulado; preferencias entre contextos; permisos 401/403; validación 400;
revisiones 428/412; dos administradores y creación concurrente; respuesta perdida
sin duplicar; seguir editando después de una respuesta perdida; paginación;
rollback real de publicación/auditoría y compensación de archivo al fallar su
evento.

## Datos y entorno

La base del usuario se pobló con el seed local solicitado. Se verificó que
repetirlo conserva las secciones y sus metadatos. Antes de migrar se respaldó
la base en `backups/dashboard-before-migrations-2026-10-18T08-12-59-110Z.json`;
la comparación posterior confirmó conservación del contenido, IDs existentes y
autor previo. Se estabilizaron IDs faltantes y retiraron metadatos administrativos
del JSON público. No se publicaron ediciones de prueba en esa base.

Los tests usan exclusivamente `er_dashboard_test`/55439 y cargas temporales bajo
`.tmp/dashboard-test.local/`. El arnés verifica el directorio del clúster antes
de escribir. La aplicación del usuario responde en `http://localhost:3002` con
API PostgreSQL saludable. El recorrido local final abrió login y los nueve
editores, sin errores del navegador; la comparación antes/después confirmó
que no se modificó el contenido del usuario. Se cerró esa sesión de verificación.

Google real no está configurado: no se atribuye una validación del proveedor
externo que no se ejecutó. El zoom se revisa por espacio de diseño equivalente;
no se afirma una certificación completa de accesibilidad ni pruebas en equipos
físicos. Quedan avisos de dependencias heredadas ajenas al cambio: no se aplicó
una actualización mayor indiscriminada.

## Prototipo y revisión

Fuente/veredicto: rama `prototype/dashboard-editorial-20261018023734`, commit
`c26f7ae0e08c3df210ae11e7aecd787a9df73aa4`; excluido del producto. Revisión final
de Standards y Spec mediante `code-review`: completada, con seguimiento estático
de las correcciones. [Informes separados y resolución](review.md).

Los tres hallazgos iniciales se reprodujeron antes de corregirlos: cancelación
del mapa con valores restaurados idénticos, exclusividad del botón de contacto y
validaciones obligatorias heredadas. Se centralizó la cancelación en
`useFieldRequest`, se separaron operaciones en `useImageUpload`/`useMapPreview` y
se restauraron restricciones tanto en formulario como en servidor. Un fallo de
sincronización en la nueva prueba UI se corrigió esperando la carga del formulario
antes de contar registros; no se añadió una espera fija.

Resultado: los 16 tickets quedan ejecutados y sus criterios verificados. Triage
mantiene el vocabulario del repositorio; el campo Ejecución registra la finalización.
