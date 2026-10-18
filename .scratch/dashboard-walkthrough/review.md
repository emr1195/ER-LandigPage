# Revisión del walkthrough

Base confirmada por el usuario: `611f16f`. Candidato inicial: `5e5003b`.
Comando: `git diff 611f16f...HEAD`. Dos revisiones independientes de solo lectura,
según `code-review`; las comprobaciones remotas permanecen retenidas por la
instrucción del usuario de aprobar antes README y video.

## Standards

Sin infracciones documentadas. El diff respeta las convenciones del tracker
local, las etiquetas permitidas y el vocabulario del dominio. Fuentes:
`AGENTS.md`, `docs/agents/issue-tracker.md`, `docs/agents/triage-labels.md`,
`docs/agents/domain.md` y `GLOSSARY.md`. No hay ADR aplicables.

Observación opcional, no bloqueante — **Duplicated Code / Shotgun Surgery**:
`scripts/walkthrough/stack.mjs` repetía la resolución de `PG_BIN` y las
instalaciones PostgreSQL 18/17 de `tests/support/run-stack.mjs`, comprobando
ejecutables distintos. Al cambiar versiones admitidas, ambas rutas podían
divergir. Se recomendó compartir una función pequeña.

Corrección: `tests/support/postgres.mjs` resuelve una sola carpeta válida con
`initdb.exe` y `pg_ctl.exe`. Arranque y limpieza utilizan esa misma selección.
Se verifica a través del ensayo real y el arnés del reproductor, sin añadir
pruebas acopladas a la implementación del helper.

## Spec

**P2 — Faltaba mostrar la auditoría de Portada.** La primera toma abría solo
«Ver cambios» de Eventos. El guion pide «Abrir Actividad y Ver cambios de las
publicaciones realizadas», y el ticket 02 exige «comparación Antes/Después de
las publicaciones del recorrido». Contar dos publicaciones en la API no
demostraba la comparación de la primera edición en el video.

Corrección: el capítulo abre primero la publicación de Portada, muestra el
título nuevo dentro de su comparación y comprueba título y descripción contra
la API; después abre Eventos y muestra la baja. Se repite el recorrido completo
con publicaciones reales en una misma sesión aislada. El manifiesto registra
`detailsShown: [heroSection, events]` y verifica ambos detalles.

No se detectó expansión material del alcance ni defectos claros en rutas
anónimas, ruta base, controles nativos o documentación. El segmento móvil
coincide con la acción concreta del guion: desplegar el evento y revisar su
vista previa. Los dos criterios remotos pendientes respetan la instrucción
posterior del usuario y no son un defecto de la entrega local.

Inicial: Standards **0 infracciones y 1 observación opcional**; Spec **1 P2**.
Las dos observaciones tienen corrección; la comprobación final se registra
en [validación](validation.md).

Segunda revisión de `c25bb49`: Standards confirma que no quedan infracciones
ni observaciones accionables. Spec confirma que el guion corregido cierra P2
y no encuentra otro problema material; el cierre del artefacto requiere que
la nueva toma se incorpore al MP4 y pase la revisión visual registrada.

Verificación del artefacto completada: la toma `take-1792343332238` muestra
Portada a 2:44–2:46 y Eventos a continuación. Se revisó el fotograma completo
de Portada (2:45), las diez hojas cronológicas y el informe generado con ambos
detalles. MP4 de 234,60 s, SHA-256
`aa3350351ab7cdc5e77f05024b7199e9ebdcaa75b47a2425e2aab6ac751c3dec`.
El reproductor final pasó 9/9 pruebas y la comprobación de ruta base.

Cierre: **Standards 0 hallazgos pendientes; Spec 0 hallazgos pendientes**.
