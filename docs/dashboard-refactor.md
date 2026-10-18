# Dashboard editorial: estructura y operación

La entrega conserva el contrato público de las nueve secciones y reemplaza los
editores administrativos repetidos por formularios específicos sobre un flujo
común. Incluye el login, refactor y corrección de errores de publicación, sesión,
concurrencia, imágenes y navegación. La página pública mantiene sus componentes
y su tema.

## Responsabilidades

- `src/dashboard/editorial/AdminApp.jsx` comprueba sesión y rol. `AdminFrame.jsx`
  compone navegación, preferencias y continuidad de sesión. Una identidad nueva
  crea un árbol nuevo y no hereda el borrador de otra cuenta.
- `useSectionDraft.js` distingue la publicación leída, la edición y las
  solicitudes. Conserva la revisión original y reconcilia respuestas perdidas
  antes de reintentar. Las publicaciones posteriores usan la base confirmada,
  incluso si la persona siguió editando después de perder una respuesta.
- `SectionEditor.jsx` aplica guardas, validación y publicación a los nueve
  formularios. `formChanges.js` actualiza rutas con funciones sobre el estado
  vigente: dos cargas simultáneas no reemplazan cambios vecinos.
- `CollectionEditor.jsx`, `ImageField.jsx` y `MapsField.jsx` comparten operaciones
  de listas, confirmaciones y solicitudes cancelables. Una baja modifica el
  borrador; publicar confirma el conjunto.
- `useFieldRequest.js` unifica cancelación y estado de solicitudes por campo;
  `useImageUpload.js` y `useMapPreview.js` contienen las operaciones de red y el
  debounce, separados de la presentación. Descartar cancela también resoluciones
  cuyo valor de entrada no cambió.
- `PreviewPage.jsx` utiliza los componentes públicos reales dentro de un iframe
  del mismo origen. Los mensajes verifican origen, emisor y sección. El tema
  administrativo no entra en el documento público. `usePreviewSurface` ajusta
  el contenido al ancho lógico elegido (escritorio, tablet o móvil) y a la columna
  disponible; `PreviewDialog` ofrece la misma vista ampliada sin perder el borrador.
- `server/services/siteSections.js` controla revisiones y la transacción de
  contenido/auditoría. Las rutas HTTP autentican y traducen errores; no contienen
  lógica de formularios. `activity.js` y `preferences.js` separan sus contratos.

## Persistencia

Las migraciones SQL versionadas agregan revisiones, identidades estables en
colecciones antiguas, actividad append-only y preferencias por usuario. Un trigger
incrementa la revisión incluso para escritores de mantenimiento. Los cuerpos
de lectura pública siguen siendo compatibles. Los identificadores existentes se
conservan; cambiar un nombre o número no cambia la identidad del registro.

Una publicación exige `If-Match` con el `ETag` leído. Falta de revisión devuelve
428; un conflicto devuelve 412 sin modificar datos ni historial. La publicación
y su evento se confirman juntos. Las imágenes usan disco y PostgreSQL: si no se
puede registrar la carga se intenta eliminar su archivo y se devuelve un error.
Una carga confirmada conserva su evento aunque se descarte su asociación después.

Los borradores viven en memoria de la pestaña. Solo antes de una redirección de
reautenticación se guarda contexto temporal en `sessionStorage`, ligado a usuario
y sección, sin credenciales y consumido una vez. No se promete recuperar ediciones
después de cerrar el navegador. Reingresar no publica automáticamente.

## Evidencia y límites

La spec aprobada y los 16 tickets están en `.scratch/dashboard-redesign/`.
Su índice registra la autorización posterior de implementación; las pausas
originales de la entrevista/spec son historia del proceso.

El prototipo se archivó antes de implementar en
`prototype/dashboard-editorial-20261018023734`, commit
`c26f7ae0e08c3df210ae11e7aecd787a9df73aa4`. Sus archivos están fuera del commit
de producto. Las pruebas del prototipo no sustituyen las del producto.

Las pruebas HTTP/navegador usan autenticación y PostgreSQL reales en un clúster
aislado, nunca la base del usuario. Cubren permisos, conflictos, rollback de
auditoría, imágenes, borradores, sesión y formularios. Google se prueba mediante
su frontera de red y una redirección simulada: el proveedor externo real requiere
credenciales configuradas. El login anónimo usa Carbon & Azure; las dos paletas
personales se aplican después de identificar la cuenta.

La matriz responsive revisa 320, 390, 768 y 1440 px. El ancho de 720 px representa
el espacio de diseño de una ventana de 1440 px con zoom del 200 %; no simula la
interfaz del navegador ni sustituye pruebas físicas de dispositivos. Se generan
capturas locales en `.tmp/dashboard-test.local/visuals/`.

El detalle de comandos, resultados y observaciones finales se registra en
[la validación de la entrega](../.scratch/dashboard-redesign/validation.md).

El [ajuste posterior de densidad](../.scratch/dashboard-redesign/density-refinement.md)
compacta navegación y formularios, resume Eventos y mantiene las acciones de
publicación visibles durante la edición. Su informe contiene mediciones y
regresiones propias, separadas del cierre original de los 16 tickets.
