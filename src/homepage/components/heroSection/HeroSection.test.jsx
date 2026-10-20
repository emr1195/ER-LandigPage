import React from 'react'
import {render, screen, fireEvent, cleanup} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import {HeroSection} from './HeroSection'
import {Navbar} from '../navbar/Navbar'
import {SectionContainer} from '../common/sectionContainer/SectionContainer'

jest.mock('./institutional.css', () => ({}))
jest.mock('../common/crossfadeImage.css', () => ({}))
jest.mock('../navbar/institutional.css', () => ({}))
afterEach(cleanup)

const mission = 'Alcanzar, Evangelizar y Empoderar a la nueva generacion de lideres Siervos'
const renderHero = (info = {}, fallbackImage) => render(<MemoryRouter><HeroSection heroSectionInfo={info} fallbackImage={fallbackImage} /></MemoryRouter>)

test('conserva la misión oficial y corrige botones vacíos sin modificar los datos', () => {
  const info = {textSection: {title: 'Exploradores del Rey Panamá', description: mission, buttons: [{title: '', url: '', display: true, outsideURL: true}, {title: '', url: '', display: true}]}}
  const before = JSON.stringify(info)
  const {container} = renderHero(info)
  expect(screen.getByRole('heading', {level: 1}).textContent).toBe('Formando líderes. Inspirando generaciones.')
  expect(screen.getByText(mission)).toBeTruthy()
  expect(screen.getByRole('link', {name: /Conoce el movimiento/}).getAttribute('href')).toBe('/#historia')
  expect(screen.getByRole('link', {name: /Encuentra un destacamento/}).getAttribute('href')).toBe('/#destacamento')
  expect(container.querySelectorAll('button a').length).toBe(0)
  expect(JSON.stringify(info)).toBe(before)
})

test('respeta enlaces personalizados, destinos externos y acciones desactivadas', () => {
  renderHero({textSection: {buttons: [{title: 'Inscripción', url: 'https://example.test/evento', outsideURL: true, display: true}, {title: 'No mostrar', display: false}]}})
  const action = screen.getByRole('link', {name: 'Inscripción'})
  expect(action.getAttribute('href')).toBe('https://example.test/evento')
  expect(action.getAttribute('target')).toBe('_blank')
  expect(action.getAttribute('rel')).toBe('noopener noreferrer')
  expect(screen.queryByText('No mostrar')).toBeNull()
})

test('reutiliza fotografía real disponible y explica las fotografías pendientes', () => {
  const {container} = renderHero({}, {imageURL: '/encuentro-real.jpg', title: 'Encuentro institucional'})
  const main = screen.getByRole('img', {name: 'Encuentro institucional'})
  expect(main.getAttribute('src')).toBe('/encuentro-real.jpg')
  expect(main.getAttribute('loading')).toBe('eager')
  expect(main.getAttribute('fetchpriority')).toBe('high')
  expect(container.querySelectorAll('img')).toHaveLength(1)
  expect(screen.getByText('Fotografía de campamento pendiente')).toBeTruthy()
  expect(screen.getByText('Fotografía de aventura pendiente')).toBeTruthy()
  fireEvent.error(main)
  expect(screen.getByText('Fotografía no disponible')).toBeTruthy()
  expect(screen.getByText('Revisa la URL de esta imagen en el dashboard.')).toBeTruthy()
})

test('las imágenes configuradas sustituyen al respaldo y conservan sus títulos', () => {
  const image = (title) => ({imageURL: `/${title}.jpg`, title})
  renderHero({imageSection: {imageRightCenter: image('Principal'), imageTopLeft: image('Campamento'), imageBottomLeft: image('Aventura')}}, image('Respaldo'))
  expect(screen.getAllByRole('img').map((img) => img.getAttribute('alt'))).toEqual(['Principal', 'Campamento', 'Aventura'])
  expect(screen.queryByRole('img', {name: 'Respaldo'})).toBeNull()
  expect(screen.getByRole('img', {name: 'Campamento'}).getAttribute('loading')).toBe('lazy')
})

test('el menú móvil abre, enlaza destinos y cierra con Escape devolviendo el foco', () => {
  const listMenu = [{title: 'Inicio', url: 'home'}, {title: 'Organización', url: 'organizacion'}, {title: 'Tienda', url: '#'}, {title: 'Contáctanos', url: 'contactanos', eventButton: true}]
  const before = JSON.stringify(listMenu)
  const {container} = render(<MemoryRouter><Navbar navbarInfo={{logo: '/oficial.png', logoTitle: 'Exploradores del Rey Panamá', listMenu}} /></MemoryRouter>)
  const toggle = screen.getByRole('button', {name: 'Abrir menú de navegación'})
  expect(toggle.getAttribute('aria-expanded')).toBe('false')
  fireEvent.click(toggle)
  expect(toggle.getAttribute('aria-expanded')).toBe('true')
  expect(screen.getByRole('link', {name: 'Organización'}).getAttribute('href')).toBe('/#organizacion')
  expect(screen.getByRole('link', {name: 'Tienda'}).getAttribute('href')).toBe('/')
  fireEvent.keyDown(toggle, {key: 'Escape'})
  expect(toggle.getAttribute('aria-expanded')).toBe('false')
  expect(document.activeElement).toBe(toggle)
  expect(container.querySelector('img').getAttribute('width')).toBe('72')
  expect(JSON.stringify(listMenu)).toBe(before)
})

test('los destinos del menú identifican las secciones existentes', () => {
  const {container} = render(<MemoryRouter>
    <SectionContainer className="History">Historia existente</SectionContainer>
    <SectionContainer className="ExpeditionGroup">Grupos existentes</SectionContainer>
    <SectionContainer className="FooterSection">Contacto existente</SectionContainer>
  </MemoryRouter>)
  for (const id of ['historia', 'grupos', 'contactanos']) expect(container.querySelector(`#${id}`)).not.toBeNull()
})

test('los enlaces conservan el subdirectorio de GitHub Pages', () => {
  render(<MemoryRouter basename="/ER-LandigPage/" initialEntries={['/ER-LandigPage/']}><HeroSection /></MemoryRouter>)
  expect(screen.getByRole('link', {name: /Conoce el movimiento/}).getAttribute('href')).toBe('/ER-LandigPage/#historia')
  expect(screen.getByRole('link', {name: /Encuentra un destacamento/}).getAttribute('href')).toBe('/ER-LandigPage/#destacamento')
})
