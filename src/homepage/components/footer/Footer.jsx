import React, {useId} from 'react'
import {Link} from 'react-router-dom'
import {GrabIcon} from '../common'
import {SiteLink} from '../navigation/SiteLink'
import './styles.css'

const institution = 'Exploradores del Rey Panamá'
const normalize = (text = '') => text.normalize('NFD').replace(/[\u0300-\u036f¿?]/g, '').trim().toLowerCase()
const navigation = [
  {name: 'Inicio', url: 'home'},
  {name: '¿Quiénes Somos?', url: 'historia'},
  {name: 'Organización', url: 'organizacion'},
  {name: 'Grupos', url: 'grupos'},
  {name: 'Destacamentos', url: 'destacamento'},
  {name: 'Tienda', url: '#'},
]
const networks = ['Facebook', 'Instagram', 'YouTube']
const resolveLinks = (menus, headerLinks) => {
  const configured = menus.flatMap((menu) => menu.links || []).filter((link) => link.name?.trim())
  const header = headerLinks.map((link) => ({...link, name: link.title || ''}))
  const links = navigation.map((fallback) => {
    const match = [...configured, ...header].find((link) => normalize(link.name) === normalize(fallback.name))
    return {...fallback, ...match, name: fallback.name}
  })
  const extra = configured.filter((link) => !navigation.some((item) => normalize(item.name) === normalize(link.name)))
  return [links.slice(0, 3), [...links.slice(3), ...extra]]
}

const FooterLinks = ({title, links, id}) => (
  <nav className="site-footer__column" aria-labelledby={id}>
    <h2 id={id} className="site-footer__heading">{title}</h2>
    <ul className="site-footer__links">
      {links.map((item, index) => <li key={item.id || index}><SiteLink item={item}>{item.name}</SiteLink></li>)}
    </ul>
  </nav>
)

export const Footer = ({footerInfo = {}, navbarInfo = {}}) => {
  const id = useId()
  const {mainSection = {}, menus = [], socialMedia = [], aditionalFooterInfo = []} = footerInfo
  const [mainLinks, exploreLinks] = resolveLinks(menus, navbarInfo.listMenu || [])
  const logo = mainSection.logo || navbarInfo.logo
  const title = mainSection.logoTitle?.trim() || institution
  const contacts = (mainSection.moreInfo || []).filter((item) => item.name?.trim() || item.description?.trim())
  const configuredSocials = [...socialMedia].filter((item) => item.url?.trim() || item.name?.trim() || item.icon?.trim()).sort((a, b) => (Number(a.position) || 0) - (Number(b.position) || 0))
  const socials = [...configuredSocials, ...networks.filter((name) => !configuredSocials.some((item) => normalize(item.name || item.icon?.replace(/Icon$/, '')) === normalize(name))).map((name) => ({name}))]
  const additionalLinks = aditionalFooterInfo.filter((item) => item.name?.trim())

  return (
    <footer className="FooterSection site-footer" id="contactanos" aria-label="Pie de página institucional">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__identity">
            <Link to="/" className="site-footer__brand" aria-label={`${title} — Inicio`}>
              {logo && <img src={logo} alt="Emblema de los Exploradores del Rey" width="64" height="64" loading="lazy" decoding="async" />}
              <span>{title}</span>
            </Link>
            <p className="site-footer__description">{mainSection.description || 'Formamos nuevas generaciones con fe, aventura y servicio, desarrollando líderes comprometidos con Dios y su comunidad.'}</p>
            {contacts.length > 0 && <dl className="site-footer__contacts">{contacts.map((item, index) => <div key={item.id || index}>{item.name && <dt>{item.name}</dt>}{item.description && <dd>{item.description}</dd>}</div>)}</dl>}
          </div>
          <FooterLinks title="Navegación" links={mainLinks} id={`${id}-navigation`} />
          <FooterLinks title="Explorar" links={exploreLinks} id={`${id}-explore`} />
          <div className="site-footer__column">
            <h2 className="site-footer__heading">Redes sociales</h2>
            <ul className="site-footer__socials" aria-label="Redes sociales">
              {socials.map((item, index) => {
                const name = item.name?.trim() || item.icon?.replace(/Icon$/, '') || 'Red social'
                const icon = item.icon?.trim() || `${networks.find((network) => normalize(network) === normalize(name)) || ''}Icon`
                const content = <><span aria-hidden="true"><GrabIcon icon={icon} width="18px" height="18px" color="inherit" /></span><span>{name}</span></>
                return <li key={item.id || index}>{item.url?.trim() ? <SiteLink item={{...item, outsideURL: true}} className="site-footer__social" aria-label={`${name} (abre en otra pestaña)`}>{content}</SiteLink> : <span className="site-footer__social" aria-disabled="true" title="Enlace pendiente de configurar">{content}</span>}</li>
              })}
            </ul>
          </div>
        </div>
        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} {institution}.</p>
          <p>Formación · Liderazgo · Servicio.</p>
          {additionalLinks.length > 0 && <ul className="site-footer__additional">{additionalLinks.map((item, index) => <li key={item.id || index}><SiteLink item={item}>{item.name}</SiteLink></li>)}</ul>}
        </div>
      </div>
    </footer>
  )
}
