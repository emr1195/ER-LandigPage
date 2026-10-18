# Tickets del dashboard y login

Los 16 tickets y sus dependencias fueron aprobados por el usuario y publicados
mediante `to-tickets`. La instrucción posterior `$implement haz todos los tickets`
autorizó la ejecución completa, incluidos refactor y cierre de lagunas. Las notas
de pausa de la publicación original son históricas y quedan superadas por esa
autorización. La especificación padre se conserva como referencia aprobada.

**Ejecución:** completada (16/16 tickets, 2026-10-18). Criterios marcados con
evidencia en cada ticket. Ver [validación](../validation.md), [revisión de código](../review.md)
y [estructura del refactor](../../../docs/dashboard-refactor.md).

Referencia: [spec publicada](../spec.md). La nota de la spec sobre ausencia de
tickets describe su fecha de publicación; este índice refleja el desglose posterior.

| Ticket | Entrega | Bloqueado por |
| --- | --- | --- |
| [01](01-inicio-editorial-y-rutas.md) | Abrir el dashboard editorial por sección | Ninguno |
| [02](02-login-editorial-y-destino.md) | Entrar con el login editorial y volver al destino | 01 |
| [03](03-portada-publicacion-y-cambios.md) | Editar y publicar Portada sin perder cambios | 01 |
| [04](04-publicacion-con-revisiones.md) | Detectar conflictos entre administradores al publicar | 03 |
| [05](05-auditoria-de-publicaciones.md) | Consultar quién publicó y qué cambió | 04 |
| [06](06-imagenes-seguras-y-auditadas.md) | Subir imágenes con progreso, reintento y auditoría | 05 |
| [07](07-sesion-vencida-y-continuidad.md) | Reautenticarse conservando la edición de la pestaña | 02, 04 |
| [08](08-apariencia-personal.md) | Guardar la apariencia personal entre dispositivos | 01 |
| [09](09-menu-de-navegacion.md) | Editar el menú de navegación con el flujo común | 06 |
| [10](10-pie-de-pagina.md) | Editar el pie de página sin perder sus colecciones | 06 |
| [11](11-historia-y-programa.md) | Editar Historia y Programa con vista previa real | 06 |
| [12](12-grupos.md) | Mantener Grupos desde cualquier tamaño de pantalla | 06 |
| [13](13-eventos.md) | Gestionar Eventos sin controles recortados | 06 |
| [14](14-organizacion.md) | Mantener Organización y sus categorías | 06 |
| [15](15-destacamentos.md) | Publicar Destacamentos y sus eliminaciones de forma uniforme | 06 |
| [16](16-validacion-integral.md) | Cerrar la transición y validar el dashboard completo | 07, 08, 09, 10, 11, 12, 13, 14, 15 |

La ejecución respetó el orden de dependencias: 01 abrió la estructura común;
02/03/08 establecieron acceso, publicación y preferencias; 04–07 completaron
concurrencia, auditoría, cargas y continuidad; 09–15 migraron los editores.
16 cerró la validación y retiró el código administrativo sustituido.

Cada ticket incorpora criterios verificables y pruebas en el nivel apropiado:
navegador para el recorrido del administrador, HTTP con PostgreSQL aislado para
permisos/concurrencia/atomicidad y regresiones existentes cuando aportan valor.
Las 58 historias de usuario tienen cobertura en el desglose. No usar la base ni
el directorio de cargas del usuario como entorno de pruebas.
