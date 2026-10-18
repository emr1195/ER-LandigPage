# 01: Primer clip real: de Portada a la página pública

Status: ready-for-agent

**What to build:** un clip reproducible a partir de una sesión de demostración
repetible que muestra el acceso, la edición de Portada y su resultado publicado. Es el primer
recorrido completo desde interacción real hasta MP4 verificable, con la calidad
de cursor, clics y textos que tendrá la entrega final.

**Blocked by:** None (can start immediately).

- [x] Reutiliza el entorno local aislado con `er_dashboard_test`, cuenta y datos
  ficticios; no necesita la base del cliente ni modifica `er_landing`.
- [x] El procedimiento prepara, ensaya y repite el segmento sin depender de datos
  residuales; coordina el uso exclusivo del arnés durante ensayo y captura.
- [x] Registra la versión de la aplicación capturada y conserva trazabilidad de
  la toma y de los resultados comprobados.
- [x] Muestra acceso, Inicio, cambio de texto e imagen de Portada, vista previa por
  tamaño y ampliada, aviso de cambios sin guardar y corrección de un campo
  obligatorio antes de publicar.
- [x] La publicación y la carga se realizan contra API/PostgreSQL locales. El título
  y la imagen aparecen realmente en la página pública de demostración.
- [x] Produce un primer MP4 real, en español, Full HD a 25 fps y sin pista de audio,
  reproducible y decodificable completamente.
- [x] Cursor suave, indicación de clics y acercamientos puntuales permanecen visibles
  sobre diálogos; los textos dejan libres los controles. Se revisa el clip.
- [x] Las adaptaciones de Aster son herramientas de producción del material y no
  cambian las interacciones del producto ni añaden grabación en runtime.

**Spec:** [Walkthrough del dashboard y README en español](../spec.md).

Cobertura principal: historias 1, 4–14, 23–29 y 41.


## Ejecución

Implementado y comprobado en local. Evidencia y alcance en
[la validación de entrega](../validation.md).
