# Ajuste de densidad del dashboard

Autorización: después de revisar las capturas de la entrega, el usuario señaló
logo y controles grandes, scroll del sidebar, paddings excesivos, espacio vacío
en Eventos y una vista previa poco aprovechada. Aprobó proceder con el ajuste.
Base de este seguimiento: `03c44f4`; la spec y los 16 tickets originales conservan
su historial. Se mantiene Editorial y las dos paletas claras aceptadas.

## Alcance implementado

- Sidebar de 220 px, monograma de 32 × 36 px y navegación de escritorio más
  compacta. A 1280 × 720, 1366 × 768 y 1280 × 800 caben navegación, apariencia
  y cuenta sin scroll interno. El drawer conserva controles táctiles de 44 px.
- Encabezado, paneles y separación de campos más contenidos; campos cortos
  emparejados en escritorio. Los metadatos secundarios pasan a Ajustes de sección.
- Eventos inicia con resúmenes de nombre, fecha y lugar. Agregar abre el registro
  nuevo. La validación abre el evento afectado y enfoca su campo inválido.
- Preview con anchos lógicos de escritorio (1280), tablet (768) y móvil (390),
  escalado a la columna. Su altura sigue al contenido real y permanece junto al
  formulario en escritorio. Ampliar abre un diálogo con el mismo borrador;
  Escape cierra y devuelve el foco. No publica ni cambia el diseño público.
- Barra de publicación fija, con espacio reservado al final del contenido y
  margen de scroll para enfocar campos sin ocultarlos detrás de las acciones.
- La medición y mensajería del preview se encapsulan en `usePreviewSurface`;
  `PreviewSurface`, `PreviewDialog` y `PublishBar` separan presentación y ciclo
  de vida. Se conservan publicación, cargas, guardas, revisión y auditoría.

## Comparación visual

Mediciones en Chrome a 1280 × 800, mismo contenido local:

| Elemento | Antes | Después |
| --- | ---: | ---: |
| Sidebar: ancho | 244 px | 220 px |
| Sidebar: contenido / alto disponible | 866 / 800 px | 800 / 800 px |
| Monograma | 44 × 48 px | 32 × 36 px |
| Panel de Historia | 2223 px | 1453 px |
| Primer evento abierto | 971 px | 593 px |
| Primer evento resumido | — | 66 px |
| Ancho lógico del preview de escritorio | 395 px | 1280 px a escala |
| Título de Historia dentro del preview: posición vertical | 870 px | 92 px |

El preview de Historia queda a 16 px del borde superior al desplazar 500 px el
documento. En móvil se conserva la disposición pública móvil, incluidas sus
imágenes antes del texto; el panel puede desplazarse o ampliarse.

Se capturaron Historia, Eventos y Portada a 1280, 768 y 375 px, más vista ampliada,
preview móvil/tablet y scroll de Historia. Evidencia local ignorada por Git:
`.design/dashboard-redesign/screenshots/after-density-*`; métricas antes/después
en `review-density-metrics.json` y `after-density-metrics.json`. El recorrido
de capturas comparó el JSON público antes/después: contenido idéntico.

## Validación

Las siete regresiones de `tests/density.spec.mjs` pasan: navegación sin scroll,
edición/publicación de Eventos conservando fecha, dispositivos y ampliación sin
perder borrador, acciones persistentes, teclado en diálogo móvil, preview sticky
y validación de registro plegado. También pasaron 18 recorridos afectados de
colecciones, editores y cargas de imágenes.

Se reprodujo un fallo de foco antes de corregirlo: `:invalid` seleccionaba el
fieldset inválido antes que el input. La búsqueda ahora apunta a los controles
invalidables. La prueba exige registro abierto, foco y publicación corregida.

La matriz responsive agrega 1024 px a 320/390/768/1440 y al espacio equivalente
de zoom 200 %. Pendiente al preparar la revisión: ejecución integral, build y
resultados de los dos ejes de revisión. Las pruebas de escritura usan únicamente
PostgreSQL de prueba aislado en 55439; no la base del usuario.
