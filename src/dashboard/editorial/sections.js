export const sections = [
  {
    key: 'navbar',
    label: 'Menú de navegación',
    short: 'Navegación',
    description: 'La identidad y los enlaces que dan la bienvenida a tu sitio.',
    icon: 'menu',
  },
  {
    key: 'heroSection',
    label: 'Portada',
    description: 'La primera impresión: tu mensaje, imágenes y botones.',
    icon: 'sun',
  },
  {
    key: 'history',
    label: 'Historia',
    description: 'Cuenta de dónde venimos y qué nos mueve.',
    icon: 'book',
  },
  {
    key: 'programStructure',
    label: 'Programa',
    description: 'Presenta los valores y el aprendizaje del programa.',
    icon: 'layers',
  },
  {
    key: 'expeditionGroup',
    label: 'Grupos',
    description: 'Un lugar para cada etapa de nuestros exploradores.',
    icon: 'flag',
  },
  {
    key: 'events',
    label: 'Eventos',
    description: 'Comparte las próximas actividades y encuentros.',
    icon: 'calendar',
  },
  {
    key: 'organization',
    label: 'Organización',
    description: 'Las personas que acompañan la aventura.',
    icon: 'users',
  },
  {
    key: 'detachment',
    label: 'Destacamentos',
    description: 'Mantén el directorio, los escudos y las ubicaciones.',
    icon: 'pin',
  },
  {
    key: 'footer',
    label: 'Pie de página',
    description: 'Los contactos y enlaces para seguir conectados.',
    icon: 'menu',
  },
]
export const findSection = (key) =>
  sections.find((section) => section.key === key)
