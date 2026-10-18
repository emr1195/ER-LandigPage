# Header y Hero institucional

El rediseño conserva React, MUI, CSS, el modelo de contenido, la API y el
dashboard. No se modificó la base de datos ni se añadieron dependencias.

## Causas corregidas

- La API entregaba dos botones visibles con título y URL vacíos. `HeroActions`
  aplica las etiquetas solicitadas y destinos existentes como valores de
  presentación, conservando los valores personalizados y `display: false`.
- Las tres URLs de imágenes del Hero estaban vacías. Las cajas antiguas usaban
  fondos CSS de tamaño fijo y parecían fotografías que no cargaban. La nueva
  galería usa imágenes semánticas y avisos claros cuando falta una fotografía
  o no se puede cargar su URL.
- Los objetos iniciales de Redux existían antes de terminar la petición. La
  página ahora espera la petición, evitando mostrar temporalmente campos vacíos.
- El menú móvil anterior no tenía enlaces. Ahora comparte los destinos de
  escritorio, se cierra al seleccionar, admite Escape y devuelve el foco.
- Faltaban los identificadores de Historia, Organización, Grupos y Contacto.
  Se añadieron a las secciones existentes, sin crear rutas o páginas nuevas.

## Fotografías y contenido

La imagen principal utiliza primero una imagen configurada en Hero Section,
en el orden `imageRightCenter`, `imageTopLeft`, `imageBottomLeft`. Si ninguna
está configurada, la portada reutiliza la fotografía institucional ya existente
en `history.imageSection.imageRight`. No se copia ni modifica ese archivo.

Las siguientes dos imágenes configuradas completan la composición. Mientras
faltan se muestran avisos «Fotografía de campamento pendiente» y «Fotografía
de aventura pendiente». Añadir fotografías reales en Dashboard → Hero Section
para sustituirlos. No se han generado fotografías ni asignado imágenes ajenas.

El título editable se mantiene como identificación institucional y la misión
guardada se presenta sin reescribirla. El lema conmemorativo nuevo es contenido
de presentación solicitado, no una modificación de los datos.

**Pendiente:** Tienda sigue sin un destino real (solo `#`). Contáctanos conserva
su destino al footer, pero los datos del footer deben configurarse desde el
dashboard para que exista información de contacto útil.

## Archivos principales

- `navbar/Navbar.jsx`, `navbar/InstitutionalHeader.jsx`, `navbar/institutional.css` y `navbar/components/logo/Logo.jsx`.
- `heroSection/HeroSection.jsx`, `InstitutionalHero.jsx`, `HeroContent.jsx`, `HeroActions.jsx`,
  `HeroImageGallery.jsx` e `institutional.css`.
- `navigation/SiteLink.jsx`: enlaces nativos con soporte del basename de React Router.
- `pages/HomePage.jsx`: espera de carga y fotografía de respaldo.
- `common/sectionContainer/SectionContainer.jsx` y `organization/Organization.jsx`:
  únicamente los identificadores necesarios para la navegación existente.

Las rutas de los componentes de esta lista parten de `src/homepage/components/`;
la página parte de `src/homepage/`.

## Validación realizada

- API pública: confirma las URLs de Hero vacías y la misión original, sin
  ejecutar escrituras o cambiar la autenticación.
- Navegador: logotipo oficial y fotografía real cargados con dimensiones
  naturales válidas. No hay peticiones de imágenes con una URL vacía.
- Anchos de 320, 390, 768 y 1440 px: sin desplazamiento horizontal del header
  ni del Hero. Composición de una o dos columnas según el espacio disponible.
- Menú: abre/cierra; Escape devuelve el foco al botón; seleccionar Historia
  cierra el menú y deja `#historia` alineado al inicio de la sección.
- CTA de destacamentos: llega a `#destacamento`, sin cambiar la ruta de la página.
- Consola observada: sin errores ni advertencias durante la revisión.
- Pruebas: suite completa de regresión y pruebas de misión, enlaces, fotos,
  placeholders, menú, basename de Pages y espera de la API verificadas.
- ESLint y build de Vite: correctos. Se conserva la advertencia preexistente
  de bundle mayor de 500 kB; no se agregaron dependencias para el rediseño.

La fotografía reutilizada ya era un JPEG de aproximadamente 289 kB. Se conserva
su archivo original: se prioriza la imagen principal, se reservan las relaciones
de aspecto y se usa lazy loading para las imágenes complementarias configuradas.
