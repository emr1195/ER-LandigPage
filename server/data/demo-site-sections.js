// Fictional local content for exploring the existing dashboard, not official site data.
const xmlText = (value) => value.replace(/[&<>"']/g, (character) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'}[character]))
const svgUrl = (markup) => `data:image/svg+xml,${encodeURIComponent(markup)}`
const badge = (label, color = '#155e63') => svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240"><rect width="240" height="240" rx="48" fill="${color}"/><circle cx="120" cy="105" r="70" fill="#ffffff" opacity=".12"/><text x="120" y="125" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="54" font-weight="bold">${xmlText(label)}</text><text x="120" y="198" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="19">DEMO LOCAL</text></svg>`)
const landscape = (label, color = '#155e63') => svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480"><rect width="640" height="480" fill="#e7f0eb"/><circle cx="490" cy="100" r="54" fill="#f4b393"/><path d="M0 360L180 145L370 360Z" fill="${color}" opacity=".65"/><path d="M170 360L390 100L640 360Z" fill="${color}"/><path d="M330 172L390 100L457 179L414 161L390 181L366 158Z" fill="#ffffff"/><rect y="350" width="640" height="130" fill="#233b3d"/><text x="320" y="408" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="27">${xmlText(label)}</text><text x="320" y="446" text-anchor="middle" fill="#f4b393" font-family="sans-serif" font-size="18">CONTENIDO DE DEMOSTRACIÓN</text></svg>`)

const row = (id, position, data) => ({id: `demo-${id}`, position, ...data})
const menuLink = (id, position, title, url, eventButton = false) => row(id, position, {title, url, outsideURL: false, active: true, disabled: false, eventButton})
const member = (id, position, name, role, initials) => row(id, position, {name, role, image: badge(initials)})

export const createDemoSiteSections = (today = new Date()) => {
  const metadata = {updatedBy: 'seed:local-demo', lastModified: `${today.getUTCDate()}-${today.getUTCMonth() + 1}-${today.getUTCFullYear()}`}
  const section = (sectionTitle, title, data) => ({sectionTitle, title, ...data, ...metadata})
  const eventDate = (days) => {
    const date = new Date(today)
    date.setUTCDate(date.getUTCDate() + days)
    return `${new Intl.DateTimeFormat('es', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'}).format(date)};09:00 a. m.`
  }

  return {
    navbar: section('Menú de navegación', 'Exploradores del Rey · Demo', {
      logo: badge('ER'), logoTitle: 'Exploradores del Rey',
      listMenu: [
        menuLink('menu-inicio', 1, 'Inicio', ''),
        menuLink('menu-historia', 2, 'Historia', 'historia'),
        menuLink('menu-programa', 3, 'Programa', 'programa'),
        menuLink('menu-grupos', 4, 'Grupos', 'grupos'),
        menuLink('menu-eventos', 5, 'Eventos', 'eventos'),
        menuLink('menu-contacto', 6, 'Contáctanos', 'contactanos', true),
      ],
    }),
    heroSection: section('Portada', 'Bienvenidos a Exploradores del Rey', {
      textSection: {
        title: 'Formamos líderes para la vida',
        description: 'Contenido de demostración local. Una aventura de fe, amistad y servicio para descubrir nuevas habilidades y crecer en comunidad.',
        iconText: 'Crecer juntos. Servir mejor.', icon: 'ElectricBoltOutlinedIcon',
        buttons: [
          row('hero-programa', 1, {title: 'Conoce el programa', url: 'programa', outsideURL: false, display: true, color: '#155e63', primary: true}),
          row('hero-contacto', 2, {title: 'Quiero participar', url: 'contactanos', outsideURL: false, display: true, color: '#233b3d', primary: false}),
        ],
      },
      imageSection: {
        imageTopLeft: {title: 'Aventura', icon: 'LocationOnIcon', imageURL: landscape('Aventura y descubrimiento')},
        imageBottomLeft: {title: 'Amistad', icon: 'PersonIcon', imageURL: landscape('Amistad y equipo', '#2467bd')},
        imageRightCenter: {title: 'Servicio', icon: 'ElectricBoltOutlinedIcon', imageURL: landscape('Servicio a la comunidad', '#7140a7')},
        ...metadata,
      },
    }),
    history: section('Historia', 'Una historia que seguimos construyendo', {
      subTitle: 'Aprender, compartir y servir', subTitleText: 'Texto de ejemplo para probar la edición de nuestra historia.',
      description: 'Esta es una historia de demostración para la base local;Nuestro equipo reúne a niños, jóvenes y líderes que aprenden a servir a su comunidad;Edita estos párrafos desde el dashboard y revisa el resultado antes de publicar.',
      imageSection: {imageLeft: landscape('Aprender haciendo'), imageRight: landscape('Compartir el camino', '#2467bd'), icon: 'PersonIcon', iconText: 'Una comunidad que acompaña'},
      infoSection: [
        row('historia-formacion', 1, {title: 'Formación', description: 'Actividades que desarrollan habilidades y valores.', icon: 'PersonIcon', backgroundColor: '#155e63'}),
        row('historia-servicio', 2, {title: 'Servicio', description: 'Pequeñas acciones para apoyar a nuestra comunidad.', icon: 'ElectricBoltOutlinedIcon', backgroundColor: '#2467bd'}),
      ],
    }),
    programStructure: section('Estructura del Programa', 'Aprendemos con propósito', {
      programValues: [
        row('programa-aprender', 1, {title: 'Aprender', description: 'Exploramos habilidades prácticas mediante actividades guiadas y trabajo en equipo.', display: true, active: true, image: badge('AP'), details: []}),
        row('programa-crecer', 2, {title: 'Crecer', description: 'Fortalecemos la amistad, la responsabilidad y la confianza con retos adecuados a cada grupo.', display: true, active: true, image: badge('CR', '#2467bd'), details: []}),
        row('programa-servir', 3, {title: 'Servir', description: 'Ponemos lo aprendido al servicio de otras personas en proyectos de la comunidad.', display: true, active: true, image: badge('SE', '#7140a7'), details: []}),
      ],
    }),
    expeditionGroup: section('Grupos', 'Un lugar para cada explorador', {
      expeditionGroups: [
        row('grupo-inicial', 0, {title: 'Exploradores iniciales · Demo', age: '6 a 8 años (ejemplo)', description: 'Primeras aventuras, juegos y experiencias para aprender a colaborar.', emblema: badge('EI'), image: landscape('Exploradores iniciales'), colors: {primary: '#155e63', secondary: '#dcebe6'}, aditionalInfo: []}),
        row('grupo-accion', 1, {title: 'Exploradores en acción · Demo', age: '9 a 11 años (ejemplo)', description: 'Retos al aire libre, nuevas habilidades y proyectos de servicio.', emblema: badge('EA', '#2467bd'), image: landscape('Exploradores en acción', '#2467bd'), colors: {primary: '#2467bd', secondary: '#e0edff'}, aditionalInfo: []}),
        row('grupo-avanzado', 2, {title: 'Exploradores avanzados · Demo', age: '12 a 15 años (ejemplo)', description: 'Oportunidades para asumir responsabilidades y acompañar a otros exploradores.', emblema: badge('AV', '#7140a7'), image: landscape('Exploradores avanzados', '#7140a7'), colors: {primary: '#7140a7', secondary: '#eee3f8'}, aditionalInfo: []}),
      ],
    }),
    events: section('Eventos', 'Próximas aventuras · Demostración', {
      events: [
        ['campamento', 'Campamento de exploradores', 'Sede de ejemplo;Área de campamento', 14],
        ['liderazgo', 'Taller de liderazgo', 'Salón de formación;Sede de ejemplo', 28],
        ['servicio', 'Jornada de servicio', 'Punto de encuentro;Comunidad de ejemplo', 42],
        ['encuentro', 'Encuentro de familias', 'Auditorio de ejemplo;Entrada principal', 56],
      ].map(([id, title, ubication, days], index) => row(`evento-${id}`, index + 1, {title: `${title} (demo)`, date: eventDate(days), ubication, byWho: 'Equipo de demostración', image: landscape(title, index % 2 ? '#2467bd' : '#155e63')})),
    }),
    organization: section('Organización', 'Organización Nacional · Demostración', {
      members: {
        coorNac: [member('lider-ana', 1, 'Ana Ejemplo', 'Coordinador Nacional', 'AE')],
        comNac: [member('lider-luis', 1, 'Luis Ejemplo', 'Comandante Nacional', 'LE')],
        teamNac: [member('lider-maria', 1, 'María Demo', 'Equipo Nacional de Formación', 'MD'), member('lider-carlos', 2, 'Carlos Demo', 'Equipo Nacional de Servicio', 'CD')],
        cmDist: [member('lider-sofia', 1, 'Sofía Ejemplo', 'Coordinadora Distrital', 'SE'), member('lider-diego', 2, 'Diego Demo', 'Coordinador Distrital', 'DD')],
      },
    }),
    detachment: section('Destacamento', 'Destacamentos de demostración', {
      detachments: ['Amanecer', 'Sendero', 'Horizonte', 'Esperanza', 'Encuentro'].map((name, index) => ({id: `detachment-DEMO${index + 1}`, name: `Destacamento ${name} (demo)`, number: `DEMO${index + 1}`, mapsUrl: '', embedUrl: '', logo: badge(`D${index + 1}`)})),
    }),
    footer: section('Pie de página', 'Exploradores del Rey · Demostración local', {
      mainSection: {logo: badge('ER'), logoTitle: 'Exploradores del Rey', moreInfo: [row('footer-demo', 1, {name: 'Contenido', description: 'Demostración local'}), row('footer-contacto', 2, {name: 'Contacto', description: 'contacto@example.test'})]},
      menus: [
        row('footer-conocer', 1, {title: 'Conócenos', links: [row('footer-historia', 1, {name: 'Historia', url: 'historia', outsideURL: false}), row('footer-programa', 2, {name: 'Programa', url: 'programa', outsideURL: false})]}),
        row('footer-participar', 2, {title: 'Participa', links: [row('footer-eventos', 1, {name: 'Eventos', url: 'eventos', outsideURL: false}), row('footer-destacamentos', 2, {name: 'Destacamentos', url: 'destacamentos', outsideURL: false})]}),
      ],
      socialMedia: [row('social-instagram', 1, {name: 'Instagram (ejemplo)', icon: 'InstagramIcon', url: 'https://www.instagram.com/'}), row('social-youtube', 2, {name: 'YouTube (ejemplo)', icon: 'YouTubeIcon', url: 'https://www.youtube.com/'})],
      aditionalFooterInfo: [row('footer-aviso', 1, {name: 'Contenido de demostración local', url: '', outsideURL: false, disabled: true, disable: true}), row('footer-acceso', 2, {name: 'Acceso al dashboard', url: '/auth/login', outsideURL: true, disabled: false, disable: false})],
    }),
  }
}
