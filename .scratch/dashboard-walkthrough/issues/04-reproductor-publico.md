# 04: Reproductor público accesible y descargable

Status: ready-for-agent

**What to build:** un visitante anónimo puede abrir el material, reproducirlo,
consultar su transcripción y descargar el MP4 desde escritorio, tablet o móvil.

**Blocked by:** 01 — Primer clip real: de Portada a la página pública

- [x] Funcionan la entrada directa y la recarga de `/walkthrough` y `/walktrough`,
  incluida la ruta base configurada, sin exigir sesión administrativa.
- [x] Ofrece portada, controles nativos, pausa, búsqueda temporal, pantalla completa,
  transcripción en español, descarga y enlaces de retorno coherentes.
- [x] El clip inicial se identifica como provisional. El reproductor admite
  sustituir el material por el montaje definitivo sin cambiar sus rutas o
  controles; esa integración con 03 se comprueba en 05 y 06.
- [x] Los controles y el contenido son utilizables mediante teclado y en escritorio,
  tablet y móvil; el foco es visible y no hay desbordamiento horizontal.
- [x] Reproduce y permite avanzar usando el servidor estático de la aplicación;
  se comprueban tipo de contenido, respuestas parciales y archivo descargado.
- [x] La descarga coincide con el artefacto revisado. El video no se descarga al
  visitar otras pantallas ni forma parte del paquete JavaScript del dashboard.
- [x] Conserva la estética aprobada sin rediseñar el sitio público, alterar el
  sidebar ni consultar datos privados para reproducir la demostración.

**Spec:** [Walkthrough del dashboard y README en español](../spec.md).

Cobertura principal: historias 30–35 y 42.


## Ejecución

Implementado y comprobado en local. Evidencia y alcance en
[la validación de entrega](../validation.md).
