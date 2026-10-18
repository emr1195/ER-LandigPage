# Walkthrough y actualización del README

## Decisiones confirmadas

- El usuario aprobó el dashboard y su pulido final, y solicitó preparar el video
  y actualizar el README mediante `grill-with-docs`.
- Q1: recorrido para presentar el proyecto, con referencia al video de Aster.
  Propuesta aceptada de unos 3–4 minutos y una historia conectada.
- Q2: video y README en español. Ya existe un cliente usando el repositorio;
  el lenguaje debe ser comprensible para esa audiencia.
- Q3: formato como Aster, sin voz ni música, con textos explicativos breves y
  salida MP4 1080p.
- Aclaración posterior explícita: cursor suave, indicación de clics y
  acercamientos puntuales. Los movimientos y énfasis se preparan para la captura.

## Secuencia propuesta y aceptada como orientación

1. Acceso e inicio: propósito del dashboard para el administrador.
2. Portada: editar texto e imagen, revisar el borrador y ampliar su vista previa.
3. Guardar y publicar, y comprobar el resultado en la página pública.
4. Eventos: crear y mostrar que una eliminación espera a la publicación.
5. Actividad: identificar autor y cambios, incluida una eliminación.
6. Ambas apariencias claras y navegación en un viewport móvil real.

Hilo del recorrido: editar → previsualizar → publicar → comprobar → auditar.
La terminología de borrador, publicación y vista previa debe coincidir con
`GLOSSARY.md`; la vista previa no hace públicos los cambios.

## Referencia y hechos verificados

Se revisaron guion, subtítulos, reproductor y fotogramas del MP4 de
`../dashboard` (Aster). Su entrega es una captura real de 3:06, 1920 × 1080,
25 fps, sin audio, con capítulos, cursor, pulsos de clic, énfasis selectivo,
subtítulos, segmento móvil y transcripción.

Playwright/Chrome y FFmpeg local están disponibles. El flujo de Aster puede
adaptarse; no necesita añadir dependencias de grabación al producto.

La grabación de escritura puede utilizar el entorno aislado existente en
3410/3411, con PostgreSQL de demostración en 55439 y datos ficticios. Su arranque
restablece esa base; no debe ejecutarse junto con Playwright. Las publicaciones
y los registros de auditoría serían reales dentro de esa demostración.

## Segunda ronda confirmada

- Q4: incluir una breve demostración de validación y cambios sin guardar.
- Q5: añadir una página con reproductor, descarga y transcripción, enlazada
  desde el README, siguiendo la referencia de Aster. Se revisará primero en
  local: el cliente tiene una instalación desplegada por separado. El usuario
  escribió `/walktrough` al confirmar la propuesta `/walkthrough`; el guion
  contempla ambos accesos para que los enlaces funcionen en cualquiera de ellos.
- Q6: reorganizar el README con presentación, capturas y video primero, seguida
  por uso, instalación, pruebas y enlaces a documentación técnica existente.

Q4, Q5 y Q6 fueron aceptadas. El usuario confirmó después el [guion completo](script.md)
y solicitó `$to-spec`; la entrevista queda cerrada.

## Aclaración de publicación

El usuario aclaró que el push al repositorio ya activa el despliegue que utiliza
el cliente. Queda superada la propuesta de coordinar una publicación manual
posterior en su instalación. Se revisará primero en local y, cuando se ejecute
el push correspondiente, se utilizará el flujo automático existente.

Todavía no se inició la grabación ni se implementó el reproductor ni se
reescribió el README. La fase actual prepara la especificación.

## Comments

El usuario aclaró que no tiene acceso a la base del cliente. Se confirmó que
«API y PostgreSQL reales» significa utilizar los servicios locales con la base
aislada `er_dashboard_test`, datos ficticios y publicaciones/auditoría reales
dentro de esa demostración. La base habitual `er_landing` queda fuera de las
pruebas y de la grabación.

El usuario respondió «sí, acepto» al enfoque de pruebas aclarado. Se publica
la [especificación](spec.md) con `Status: ready-for-agent`. No se inició la
implementación ni se ejecutó push.
