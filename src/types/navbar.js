export const initialMenu = [
  {
    title: 'Home',
    url: 'home',
    outsideURL: false, // will decide if open outside or just scroll the page
    active: false,
    eventButton: false,
  },
  {
    title: '¿Quienes Somos?',
    url: 'historia',
    outsideURL: false, // will decide if open outside or just scroll the page
    active: false,
    eventButton: false,
  },
  {
    title: 'Organización',
    url: 'organizacion',
    outsideURL: false, // will decide if open outside or just scroll the page
    active: false,
    eventButton: false,
  },
  {
    title: 'Grupos',
    url: 'grupos',
    outsideURL: false, // will decide if open outside or just scroll the page
    active: false,
    eventButton: false,
  },
  {
    title: 'Tienda',
    url: '#',
    outsideURL: false, // will decide if open outside or just scroll the page
    active: false,
    eventButton: false,
  },
  {
    title: 'Contactanos',
    url: 'contactanos',
    outsideURL: false, // will decide if open outside or just scroll the page
    active: false,
    eventButton: true,
  },
]

export const initialStateNavbar = {
  isSaving: false,
  info: {
    listMenu: initialMenu,
    sectionTitle: '',
    title: '',
    updatedBy: '',
    lastModified: '',
    logo: '',
  },
  active: false,
}
