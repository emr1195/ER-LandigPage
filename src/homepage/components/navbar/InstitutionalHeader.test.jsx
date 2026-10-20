import React from 'react'
import {act, cleanup, fireEvent, render, screen} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import {InstitutionalHeader} from './InstitutionalHeader'

jest.mock('./institutional.css', () => ({}))
const listMenu = [
  {title: 'Inicio', url: 'home'},
  {title: '¿Quiénes Somos?', url: 'historia'},
  {title: 'Organización', url: 'organizacion'},
  {title: 'Grupos', url: 'grupos'},
  {title: 'Tienda', url: 'https://example.test/tienda', outsideURL: true},
  {title: 'Contáctanos', url: 'contactanos'},
]
const mount = (items = listMenu) => render(<MemoryRouter><InstitutionalHeader navbarInfo={{logo: '/original.png', logoTitle: 'Exploradores del Rey  Panama', listMenu: items}} /></MemoryRouter>)
beforeEach(() => { window.innerWidth = 1440; window.scrollY = 0 })
afterEach(() => { cleanup(); jest.restoreAllMocks() })

test('preserva el logo, las seis opciones y los destinos sin mutar los datos', () => {
  const before = JSON.stringify(listMenu)
  const {container} = mount()
  expect(screen.getByRole('navigation').textContent).toBe(listMenu.map(item => item.title).join(''))
  expect(screen.getByRole('img').getAttribute('src')).toBe('/original.png')
  expect(screen.getByText('Exploradores del Rey Panamá')).toBeTruthy()
  expect(screen.getByRole('link', {name: '¿Quiénes Somos?'}).getAttribute('href')).toBe('/#historia')
  const shop = screen.getByRole('link', {name: 'Tienda'})
  expect(shop.getAttribute('href')).toBe('https://example.test/tienda')
  expect(shop.getAttribute('rel')).toBe('noopener noreferrer')
  const contact = screen.getByRole('link', {name: 'Contáctanos'})
  expect(contact.className).toContain('site-header__contact')
  expect(contact.querySelector('svg').getAttribute('aria-hidden')).toBe('true')
  expect(container.querySelectorAll('button a')).toHaveLength(0)
  expect(JSON.stringify(listMenu)).toBe(before)
})

test('oculta el menú móvil del teclado, cierra al navegar y devuelve el foco', () => {
  window.innerWidth = 390
  mount()
  const toggle = screen.getByRole('button')
  const nav = document.querySelector('nav')
  expect(nav.hasAttribute('inert')).toBe(true)
  expect(screen.queryByRole('navigation')).toBeNull()
  fireEvent.click(toggle)
  expect(nav.hasAttribute('inert')).toBe(false)
  fireEvent.click(screen.getByRole('link', {name: 'Grupos'}))
  expect(toggle.getAttribute('aria-expanded')).toBe('false')
  expect(document.activeElement).toBe(toggle)
  fireEvent.click(toggle)
  fireEvent.keyDown(nav, {key: 'Escape'})
  expect(toggle.getAttribute('aria-expanded')).toBe('false')
  fireEvent.click(toggle)
  fireEvent.pointerDown(document.body)
  expect(toggle.getAttribute('aria-expanded')).toBe('false')
})

test('no activa enlaces externos o deshabilitados y actualiza sombra y sección al desplazar', () => {
  const section = document.createElement('section')
  section.id = 'grupos'
  let top = 500
  section.getBoundingClientRect = () => ({top})
  document.body.append(section)
  let callback
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(fn => { callback = fn; return 1 })
  const {container} = mount([...listMenu, {title: 'No disponible', url: 'grupos', disabled: true}])
  expect(screen.getByRole('link', {name: 'Grupos'}).hasAttribute('aria-current')).toBe(false)
  top = 90
  window.scrollY = 420
  fireEvent.scroll(window)
  act(() => callback())
  expect(screen.getByRole('link', {name: 'Grupos'}).getAttribute('aria-current')).toBe('location')
  expect(screen.getByRole('link', {name: 'No disponible'}).hasAttribute('aria-current')).toBe(false)
  expect(screen.getByRole('link', {name: 'Tienda'}).hasAttribute('aria-current')).toBe(false)
  expect(container.querySelector('header').getAttribute('data-scrolled')).toBe('true')
  section.remove()
})

test('al pasar a escritorio el menú deja de estar oculto y se reinicia el panel', () => {
  window.innerWidth = 768
  mount()
  fireEvent.click(screen.getByRole('button'))
  window.innerWidth = 1280
  fireEvent.resize(window)
  expect(screen.getByRole('navigation').hasAttribute('inert')).toBe(false)
  expect(screen.getByRole('button').getAttribute('aria-expanded')).toBe('false')
})

test('presenta las etiquetas oficiales sin alterar destinos ni textos guardados', () => {
  const items = [{title: '¿Quienes Somos?', url: 'historia'}, {title: 'Contactanos', url: 'contactanos'}]
  mount(items)
  expect(screen.getByRole('link', {name: '¿Quiénes Somos?'}).getAttribute('href')).toBe('/#historia')
  expect(screen.getByRole('link', {name: 'Contáctanos'}).className).toContain('site-header__contact')
  expect(items[1].title).toBe('Contactanos')
})
