# 06: Entrega verificada mediante el despliegue existente

Status: ready-for-agent

**What to build:** el reproductor, el video y el README corresponden a los mismos
artefactos verificados, y su disponibilidad se comprueba usando el flujo de
despliegue que ya utiliza el cliente.

**Blocked by:** 05 — README en español con capturas y video verificados

- [x] Revisa la integración final con los artefactos definitivos: ambas rutas,
  reproducción, búsquedas temporales, pantalla completa, descarga, transcripción,
  enlaces, ruta base y pantallas de escritorio/tablet/móvil.
- [x] Lint y compilación pasan; se ejecutan los recorridos de dashboard afectados
  y se registra el alcance real de las comprobaciones sin atribuir pruebas
  o publicaciones no ejecutadas.
- [x] Comprueba que se conserva la aplicación aprobada y que la toma utiliza la
  base de demostración; no necesita acceso a la base del cliente.
- [ ] Identifica la integración y rama efectivas del cliente antes del push de
  entrega. Según confirmó el usuario, ese push activa su despliegue automático;
  se conserva ese mecanismo y no se añade un segundo despliegue manual.
- [ ] Después del push de entrega, verifica la ejecución real del flujo y la URL
  efectiva del reproductor, sus enlaces y la correspondencia del MP4 publicado
  con el artefacto revisado. No presenta una prueba local como evidencia remota.
- [x] Si un control externo impide confirmar el despliegue, registra qué sí se
  comprobó y la condición pendiente en lugar de declarar publicación exitosa.

**Spec:** [Walkthrough del dashboard y README en español](../spec.md).

Cobertura principal: historias 40 y 42; comprobación integrada del resto.


## Ejecución

Verificación local completada. El usuario aprobó README y video, autorizó el push
y confirmó la rama `develop`. La automatización efectiva y la URL del cliente
no se han podido identificar mediante la información disponible en GitHub.
Se conserva el mecanismo existente sin iniciar un despliegue manual adicional.
Véanse [validación](../validation.md) y [registro de integración](../push-validation.md).
