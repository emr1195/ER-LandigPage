# Walkthrough del dashboard y README en español

Status: ready-for-agent

Guion, alcance funcional y enfoque de pruebas confirmados por el usuario.
Especificación publicada en el tracker local; implementación aún no iniciada.

## Problem Statement

El dashboard aprobado permite administrar el contenido de Exploradores del Rey,
pero el repositorio todavía no ofrece un video que explique su flujo completo
ni una presentación inicial del README que reúna el resultado visual y su uso.
El cliente actual necesita una explicación en español que distinga borrador,
vista previa y publicación, y muestre cómo comprobar los cambios y su autoría.
Quien descubre el proyecto también necesita entender qué resuelve antes de
entrar en instrucciones técnicas de instalación.

## Solution

Entregar un walkthrough real de aproximadamente cuatro minutos, en español,
sin voz ni música, inspirado en el estilo aprobado de Aster. El video seguirá
una historia conectada: editar → previsualizar → publicar → comprobar → auditar.
Incluirá cursor suave, indicación de clics, acercamientos puntuales, textos
breves, ambas apariencias claras y navegación en un viewport móvil real.

Ofrecer el resultado en una página con reproductor, portada, descarga del MP4
y transcripción. Reorganizar el README en español para presentar primero el
producto, sus capturas y el video, seguido de uso y operación técnica.

La revisión inicial será local. Según la aclaración del usuario, el push al
repositorio activa el despliegue que ya utiliza el cliente; se aprovechará ese
flujo, sin un paso manual adicional en otra instalación.

## User Stories

1. Como administrador, quiero entender para qué sirve el panel, para actualizar el sitio sin editar código.
2. Como cliente hispanohablante, quiero un video y documentación en español, para comprender las acciones sin traducirlas.
3. Como visitante del repositorio, quiero ver un recorrido conectado del producto, para evaluar su utilidad antes de instalarlo.
4. Como espectador, quiero ver el acceso con una cuenta de demostración, para reconocer cómo comienza el flujo administrativo.
5. Como administrador, quiero reconocer Inicio y la navegación de secciones, para localizar el contenido que necesito editar.
6. Como administrador, quiero ver cómo se cambia el título y la descripción de Portada, para actualizar el mensaje principal.
7. Como administrador, quiero ver la carga de una imagen, para reconocer cómo actualizar el contenido visual.
8. Como administrador, quiero distinguir el borrador del contenido publicado, para saber cuándo los visitantes verán mis cambios.
9. Como administrador, quiero revisar la vista previa en varios tamaños, para comprobar el resultado antes de publicar.
10. Como administrador, quiero ver cómo ampliar y cerrar la vista previa, para inspeccionar el contenido y volver a la edición.
11. Como administrador, quiero reconocer el aviso de cambios sin guardar y la opción de seguir editando, para evitar perder trabajo.
12. Como administrador, quiero ver un campo obligatorio incompleto y su corrección, para saber cómo continuar ante un error.
13. Como administrador, quiero reconocer Guardar y publicar y su confirmación, para identificar cuándo terminó la publicación.
14. Como administrador, quiero comprobar título e imagen en la página pública, para relacionar la edición con el resultado visible.
15. Como administrador, quiero ver cómo agregar un evento con sus datos e imagen, para preparar una nueva actividad.
16. Como administrador, quiero distinguir la eliminación pendiente de la eliminación publicada, para comprender el efecto de confirmar una baja.
17. Como administrador, quiero publicar juntos los cambios del formulario de Eventos, para reconocer el alcance de Guardar y publicar.
18. Como administrador, quiero consultar Actividad tras una publicación, para saber quién la realizó y cuándo.
19. Como administrador, quiero ver Antes y Después, incluida la eliminación de un evento, para comprender qué cambió.
20. Como administrador, quiero conocer Carbon & Azure y Petrol & Apricot, para elegir la apariencia de mi espacio de trabajo.
21. Como administrador, quiero ver que la apariencia se conserva al recargar, para reconocer que es una preferencia de mi cuenta.
22. Como usuario móvil, quiero ver navegación, edición y vista previa en una pantalla móvil real, para reconocer cómo utilizar el panel desde ese tamaño.
23. Como espectador, quiero seguir un cursor de movimiento suave, para localizar cada acción sin saltos bruscos.
24. Como espectador, quiero identificar los clics mediante una señal discreta, para entender cuándo se ejecuta una acción.
25. Como espectador, quiero acercamientos puntuales con contexto suficiente, para leer resultados importantes sin perder la orientación.
26. Como espectador, quiero textos breves que mantengan visibles los controles, para leer la explicación mientras observo la acción.
27. Como espectador, quiero seguir el video completo sin audio, para comprenderlo mediante los textos en español.
28. Como espectador, quiero un recorrido legible de unos cuatro minutos, para conocer el flujo sin recorrer repetidamente todos los formularios.
29. Como espectador, quiero una imagen Full HD y una edición sin fotogramas vacíos, para apreciar claramente la interfaz aprobada.
30. Como visitante, quiero acceder directamente a la página del video sin iniciar sesión, para ver la demostración antes de entrar al dashboard.
31. Como visitante, quiero que funcionen los dos enlaces de walkthrough acordados, para abrir el reproductor con cualquiera de ellos.
32. Como espectador, quiero pausar, avanzar y usar pantalla completa, para revisar las partes que necesito.
33. Como espectador, quiero descargar el MP4, para abrirlo directamente sin desplegar la aplicación.
34. Como lector, quiero una transcripción en español, para consultar el contenido sin reproducir el video.
35. Como usuario de teclado o de una pantalla pequeña, quiero operar el reproductor y sus enlaces, para acceder al material desde mi dispositivo.
36. Como visitante del repositorio, quiero encontrar presentación, capturas y video al principio del README, para entender rápidamente el resultado del proyecto.
37. Como administrador, quiero una guía breve de uso y una lista de las nueve secciones, para relacionar el video con el resto del panel.
38. Como responsable técnico, quiero conservar las instrucciones de configuración, PostgreSQL y datos de demostración, para iniciar una instalación correctamente.
39. Como responsable técnico, quiero conservar instrucciones de pruebas, respaldos, imágenes y despliegue, para mantener la aplicación y sus datos.
40. Como cliente, quiero recibir esta entrega mediante el despliegue que ya se activa con el push, para evitar un segundo procedimiento de publicación.
41. Como propietario del contenido, quiero que la grabación use datos ficticios y una base separada, para mantener intactos mis contenidos durante la demostración.
42. Como lector del README, quiero enlaces comprobados y una distinción clara entre revisión local y publicación efectiva, para acceder a material disponible.

## Implementation Decisions

- Reutilizar el guion aprobado, con una duración objetivo de 3:45–4:00. Sus
  tiempos son una guía de montaje: se ajustan en el ensayo para conservar la
  legibilidad, manteniendo los capítulos y resultados acordados.
- Mostrar acceso e Inicio; edición de texto e imagen de Portada; vista previa
  por dispositivo y ampliada; aviso de cambios sin guardar; corrección de un
  campo obligatorio; publicación y resultado en la página pública; creación y
  eliminación de Eventos; detalle de Actividad; apariencias; y segmento móvil.
- Usar el título de demostración «Una nueva aventura comienza aquí» y un evento
  «Jornada de exploradores». Publicar la creación del evento junto con la baja
  de un evento ficticio existente, mostrando que la baja espera la publicación.
- Las publicaciones, cargas y registros de auditoría de la captura serán reales
  dentro del entorno de demostración. No simular confirmaciones ni resultados
  que la aplicación no haya producido.
- Reutilizar el arnés existente de navegador, API y PostgreSQL aislado, con la
  base local `er_dashboard_test` en el puerto 55439. Preparar datos y cuenta
  ficticios, y reservarlo exclusivamente durante ensayo y captura para evitar
  que una ejecución de pruebas restablezca la sesión de grabación. No se requiere
  acceso a la base del cliente y no se utilizará la base habitual `er_landing`.
- Ensayar el recorrido y comprobar sus resultados antes de capturar. Registrar
  la versión del producto y los datos necesarios para reproducir la toma.
- Capturar el navegador real y renderizar un MP4 H.264 de 1920 × 1080 a 25 fps,
  compatible con reproducción web y apertura directa. Preparar el archivo para
  iniciar la reproducción sin esperar a descargarlo entero.
- No incluir pista de voz ni música. Integrar textos explicativos breves en
  español y una transcripción que conserve la explicación del recorrido.
- Preparar una portada representativa del producto y capturas actuales para el
  README. Describirlas con texto alternativo adecuado.
- Mantener movimiento de cursor con aceleración y frenado suaves, pausas antes
  de pulsar y señales de clic sincronizadas con las acciones. Conservar su
  visibilidad sobre diálogos.
- Aplicar acercamientos breves al editor, la confirmación de publicación y la
  comparación de cambios. Evitar recortes de mensajes o controles; volver al
  plano general antes de navegar. Los efectos pertenecen a la grabación.
- Componer los textos fuera de los controles de la aplicación y de los controles
  del reproductor. Cortar esperas vacías sin ocultar transiciones significativas.
- Mostrar Carbon & Azure y Petrol & Apricot, incluida la preferencia retenida al
  recargar. Capturar móvil con un viewport móvil real y los mismos datos
  publicados; no representar móvil reduciendo una captura de escritorio.
- El plano de tablet es opcional si cabe sin acelerar el recorrido. La
  compatibilidad del reproductor con tablet sí forma parte de la entrega.
- Incorporar una página pública de reproducción en `/walkthrough`, con
  `/walktrough` como acceso equivalente, respetando la ruta base de la aplicación.
  No exigirá sesión ni consultará datos privados para mostrar la demostración.
- Ofrecer controles nativos de reproducción, pausa, búsqueda temporal, volumen
  si lo presenta el navegador y pantalla completa; portada, descarga del MP4,
  transcripción y navegación al sitio o al acceso administrativo.
- Cargar el video únicamente cuando se visite su página. Evitar incorporarlo al
  paquete JavaScript del dashboard o descargarlo al entrar a la página pública.
  La página debe adaptarse a escritorio, tablet y móvil y ofrecer foco visible.
- Conservar la estética Editorial y las dos apariencias del dashboard ya
  aprobadas. El reproductor no introduce un rediseño del sitio público ni
  nuevas opciones en el sidebar.
- Adaptar el flujo de captura y render utilizado en Aster a los contratos y al
  contenido de este proyecto. Las herramientas de producción de video serán
  herramientas de desarrollo, sin dependencias nuevas de grabación en runtime.
- Mantener las tomas originales y herramientas temporales fuera de los archivos
  publicados. Incorporar los artefactos finales revisados y las instrucciones
  necesarias para reproducir y verificar su generación.
- Reorganizar el README en español: presentación y audiencia; capturas y video;
  recorrido de uso; funcionalidades; instalación, configuración y datos de
  muestra; pruebas, respaldo y despliegue. Conservar las instrucciones técnicas
  válidas y los enlaces a guías existentes.
- Explicar las nueve secciones, la diferencia entre borrador y publicación,
  las bajas pendientes, la vista previa y el registro de auditoría. El video
  muestra casos representativos en lugar de repetir nueve editores.
- Los enlaces iniciales deben indicar su condición local. Agregar enlaces a
  artefactos existentes y comprobados; no presentar como publicado un material
  que todavía no esté disponible.
- Según confirmó el usuario, el push al repositorio activa el despliegue que
  utiliza el cliente. Conservar ese mecanismo y verificar reproductor y
  artefactos en el despliegue automático cuando se ejecute el push de entrega;
  no diseñar un segundo despliegue manual en la instalación del cliente.
- No modificar esquemas de PostgreSQL, roles, autenticación, contratos de
  publicación, auditoría ni API de contenido para producir este material.

## Testing Decisions

Enfoque aceptado por el usuario tras aclarar que «API y PostgreSQL reales» se
refiere a servicios funcionando en su equipo con datos ficticios, no a la base
del cliente ni a su base local habitual.

- Preferir una sola frontera funcional existente: recorridos de navegador con
  la aplicación, API y PostgreSQL de prueba reales. Usar exclusivamente la base
  local aislada `er_dashboard_test`. Verificar comportamiento visible y
  resultados publicados, sin acoplar pruebas a estados internos, clases CSS o
  detalles del renderer.
- Reutilizar los antecedentes de login, navegación, publicación, imágenes,
  Eventos, guardas, validación, Actividad, preferencias y responsive del
  dashboard. El ensayo reproduce el guion y reconcilia sus resultados con la
  página pública y el registro de auditoría.
- Cubrir el reproductor con navegador anónimo: entrada directa y recarga en
  ambas rutas; portada; reproducción y pausa; búsqueda en varios puntos del
  video; controles y pantalla completa; descarga; transcripción; enlaces de
  retorno; teclado y disposición en escritorio, tablet y móvil. Comprobar que
  las rutas y los artefactos funcionan con la ruta base configurada.
- Comprobar las respuestas reales del servidor de archivos estáticos que usa
  la aplicación: tipo de contenido, solicitudes parciales necesarias para
  avanzar en el video y descarga íntegra igual al archivo final revisado.
  No crear un servidor de reproducción paralelo para suplir fallos del producto.
- Verificar los enlaces y las instrucciones conservadas del README contra los
  artefactos y comandos reales. Revisar el resultado con capturas del producto
  actual y sin credenciales del cliente.
- Como validación del artefacto, decodificar el MP4 completo y comprobar formato,
  duración, resolución y ausencia de audio. Esta comprobación complementa el
  recorrido de navegador; no introduce otra frontera interna de aplicación.
- Revisar visualmente el video completo, con fotogramas cronológicos y atención
  a cursor, clics, acercamientos, textos, pausas, continuidad, diálogos y móvil.
  La ausencia de errores de decodificación no basta para aprobar el montaje.
- Ejecutar lint y compilación; reutilizar las pruebas de dashboard afectadas.
  Ampliar regresión solo si el alcance real o un fallo lo justifica. No añadir
  pruebas que repliquen el código del generador o comprobaciones frágiles de
  posiciones exactas del cursor.
- Verificar primero en local. Después del push de entrega, comprobar el resultado
  del flujo automático y la reproducción del mismo artefacto en la URL efectiva;
  no considerar una compilación local como evidencia de publicación remota.

## Out of Scope

- Otro rediseño del dashboard, login, sidebar o página pública.
- Nuevas funcionalidades de contenido, recuperación de contraseña, roles,
  auditoría, publicación o concurrencia.
- Mostrar todos los campos de los nueve editores en el video.
- Voz, música, traducción al inglés, temas oscuros o una segunda versión extensa
  de formación.
- Usar datos reales del cliente o publicar ediciones de demostración en su base.
- Demostrar login real con Google, conflictos entre administradores o fallos de
  red como capítulos adicionales; conservar la documentación técnica aplicable.
- Modificar la infraestructura o sustituir el mecanismo de despliegue existente.
- Un paso manual separado para publicar en la instalación del cliente.
- Iniciar grabaciones, implementar el reproductor o ejecutar push durante la
  fase de síntesis de esta especificación.

## Further Notes

El usuario confirmó Q1–Q6 y el guion completo, incluyendo cursor suave,
indicación de clics y acercamientos puntuales. Después aclaró expresamente que
el push ya publica para el cliente. Esa aclaración reemplaza la propuesta
anterior de coordinar otra publicación manual posterior.

La referencia de Aster se revisó mediante su guion, subtítulos, reproductor y
fotogramas del MP4. Ya existen herramientas locales para captura y render; la
implementación deberá adaptarlas y verificar el resultado real de este proyecto.

La terminología se ajusta al glosario del proyecto. Borrador y vista previa no
hacen visibles los cambios; Guardar y publicar confirma el conjunto. El registro
de auditoría debe corresponder a las acciones efectivamente realizadas.

El usuario confirmó el enfoque de pruebas del paso 2 de `to-spec` después de
aclarar que no dispone de acceso a la base del cliente. Esa confirmación permite
publicar esta especificación como `ready-for-agent`. La producción del video,
el reproductor y el README corresponden a la fase de implementación posterior.
