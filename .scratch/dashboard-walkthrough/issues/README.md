# Tickets: walkthrough del dashboard y README

Desglose aprobado por el usuario y publicado mediante `to-tickets`.
[Spec padre](../spec.md) · [Guion aprobado](../script.md) · [Plan y criterios aprobados](../ticket-plan.md).

## Tickets

| Ticket | Bloqueado por | Status |
| --- | --- | --- |
| [01 — Primer clip real: de Portada a la página pública](01-clip-portada-publicacion.md) | Ninguno | ready-for-agent |
| [02 — Eventos y registro de auditoría en el recorrido grabado](02-eventos-auditoria.md) | 01 | ready-for-agent |
| [03 — Walkthrough completo con apariencias y móvil](03-video-completo-responsive.md) | 02 | ready-for-agent |
| [04 — Reproductor público accesible y descargable](04-reproductor-publico.md) | 01 | ready-for-agent |
| [05 — README en español con capturas y video verificados](05-readme-guia.md) | 03, 04 | ready-for-agent |
| [06 — Entrega verificada mediante el despliegue existente](06-verificacion-despliegue.md) | 05 | ready-for-agent |

Cada ticket contiene sus propios criterios de aceptación: **43 criterios**
en total, con cobertura de las **42 historias** de la spec. La spec padre no se
modifica ni se cierra al publicar estos tickets.

## Orden de trabajo

La frontera inicial es **01**, único ticket sin bloqueos. Al completarlo se
habilitan **02** y **04**. Después de 02 se habilita **03**; 05 requiere 03 y 04,
y 06 requiere 05. Los bloqueos transitivos no se duplican.

`ready-for-agent` indica que el ticket está especificado; no elimina sus bloqueos
ni significa que esté ejecutado. Comprobar sus dependencias antes de comenzar.
El entorno de demostración debe usarse de manera exclusiva al grabar para evitar
que una ejecución de pruebas restablezca sus datos.

## Límites de esta fase

Se publican únicamente documentos de planificación. La grabación, el reproductor,
el README y el push corresponden a la implementación. Se usará la base local
`er_dashboard_test`, sin acceso necesario a la base del cliente ni escritura en
la base local habitual `er_landing`.

La entrega aprovechará el despliegue existente que el usuario indicó que se
activa con el push; no se añade otra publicación manual. El último ticket exige
identificar y comprobar el flujo efectivo y la disponibilidad del mismo MP4.

## Comments

### Implementación autorizada y revisión local

El usuario invocó `implement` para todos los tickets y pidió aprobar el README
y el video antes de desplegar. Los tickets 01–05 están implementados; 06 tiene
la verificación local completada y conserva dos criterios remotos pendientes.
**41 de 43 criterios comprobados**; `Status` mantiene la etiqueta de triage,
y la ejecución se registra por separado en cada ticket y en
[la validación](../validation.md). No hubo push ni despliegue.

El usuario respondió «acepto» al desglose de seis tickets, sus tamaños y sus
bloqueos. Se publican seis archivos individuales con estado `ready-for-agent`.
No se inició la implementación ni se ejecutó push.
