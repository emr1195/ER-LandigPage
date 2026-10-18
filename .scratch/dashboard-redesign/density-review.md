# Revisión del ajuste de densidad

Skill: `code-review`. Base fija `03c44f48ccb9fd6e4860018c054dc916cf1d180e`;
primer candidato `b81f0f7`. Dos revisores independientes, solo lectura.

## Standards

Incumplimientos de estándares documentados: **0**. El cambio respeta las
responsabilidades descritas en `docs/dashboard-refactor.md`. Los nuevos efectos
eliminan listeners, desconectan observadores y cancelan el trabajo diferido al
desmontarse.

Heurísticas de mantenibilidad: **1 menor**.

- **Posible Primitive Obsession — FormFields.jsx.** El hunk
  `field.key === 'sectionTitle' || field.label === 'Título de referencia'`
  utiliza el texto de presentación como señal estructural para plegar campos.
  Una corrección de redacción puede mover silenciosamente un campo fuera de
  Ajustes de sección. Conviene declarar la intención mediante metadatos de campo,
  por ejemplo `secondary: true`, desde las configuraciones correspondientes.
  Es un juicio de mantenibilidad, no una infracción documentada ni un bloqueo.

**Resolución:** los cuatro formularios afectados declaran `secondary: true`.
El formulario compartido ya no compara texto visible para decidir la disposición.

## Spec

**1 hallazgo P2: la validación del servidor no devuelve al campo del evento
afectado.** El seguimiento exige: «La validación abre el evento afectado y enfoca
su campo inválido».

Reproducción: en Eventos, escribir solo espacios en Fecha, plegar el evento,
cambiar a Vista previa en móvil y publicar. `required` admite espacios, pero
el servidor rechaza la fecha vacía tras aplicar `trim()`. CollectionEditor abre
el registro al recibir el error; no enfoca su campo. SectionEditor vuelve a
Editar y enfoca únicamente cuando falla la validación nativa. El formulario
permanece oculto y el administrador queda en Vista previa con un error general.

No se identificaron ampliaciones de alcance ni otros requisitos faltantes.

**Resolución:** `useEditorValidation` trata errores nativos y del servidor,
muestra Editar, abre los contenedores del campo y lo enfoca. La prueba con fecha
de espacios falló antes del arreglo, y después pasó, incluyendo la publicación
corregida. Se verificó también retorno a la pestaña Texto de Portada desde otra
pestaña y desde Preview.

El revisor señaló además comprobar el menú móvil/tablet del preview. Se confirmó
el recorte con navegador (16/32 px), se reservó altura de viewport para esos
menús portaleados y las dos regresiones pasaron. Los componentes públicos quedan
intactos.

Resumen inicial: Standards 0 infracciones / 1 heurística menor; Spec 1 P2.
Los dos hallazgos y la comprobación adicional quedaron corregidos. Pendiente
al registrar este informe: seguimiento estático de los revisores y suite final.
