import React from 'react'
import {fireEvent, render, screen, within} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import {Footer} from './Footer'

jest.mock('./styles.css', () => ({}))
const mount = (props = {}) => render(<MemoryRouter basename="/ER-LandigPage/" initialEntries={['/ER-LandigPage/']} future={{v7_startTransition: true, v7_relativeSplatPath: true}}><Footer {...props} /></MemoryRouter>)

test('muestra cuatro bloques, identidad y navegación con rutas compatibles con Pages', () => {
  const {container} = mount({navbarInfo: {logo: '/original.png', listMenu: [{title: 'Tienda', url: 'https://store.example.test', outsideURL: true}]}})
  expect(container.querySelector('.site-footer__grid').children).toHaveLength(4)
  expect(screen.getByRole('img').getAttribute('src')).toBe('/original.png')
  expect(screen.getByRole('link', {name: 'Inicio'}).getAttribute('href')).toBe('/ER-LandigPage/#home')
  expect(screen.getByRole('link', {name: 'Destacamentos'}).getAttribute('href')).toBe('/ER-LandigPage/#destacamento')
  expect(screen.getByRole('link', {name: 'Tienda'}).getAttribute('href')).toBe('https://store.example.test')
  expect(screen.getByText(/© \d{4} Exploradores del Rey Panamá/)).toBeTruthy()
  expect(screen.getByText('Formación · Liderazgo · Servicio.')).toBeTruthy()
})

test('conserva logo, contacto, enlaces personalizados y redes originales sin mutar datos', () => {
  const footerInfo = {
    mainSection: {logo: '/footer-original.png', logoTitle: 'Nombre institucional', moreInfo: [{name: 'Correo', description: 'info@example.test'}]},
    menus: [{title: 'Enlaces', links: [{name: 'Inicio', url: 'portada'}, {name: 'Recursos', outsideURL: true, url: 'https://example.test/recursos'}]}],
    socialMedia: [{name: 'Instagram', icon: 'InstagramIcon', url: 'https://instagram.com/original', position: 2}, {name: 'Facebook', icon: 'FacebookIcon', url: 'https://facebook.com/original', position: 1}],
    aditionalFooterInfo: [{name: 'Privacidad', url: '/privacidad'}],
  }
  const original = JSON.stringify(footerInfo)
  mount({footerInfo})
  expect(screen.getByRole('img').getAttribute('src')).toBe('/footer-original.png')
  expect(screen.getByText('info@example.test')).toBeTruthy()
  expect(screen.getByRole('link', {name: 'Inicio'}).getAttribute('href')).toBe('/ER-LandigPage/#portada')
  expect(screen.getByRole('link', {name: 'Recursos'}).getAttribute('href')).toBe('https://example.test/recursos')
  const socialLinks = within(screen.getByRole('list', {name: 'Redes sociales'})).getAllByRole('link')
  expect(socialLinks.map((link) => link.getAttribute('href'))).toEqual(['https://facebook.com/original', 'https://instagram.com/original'])
  expect(socialLinks.every((link) => link.getAttribute('target') === '_blank' && link.getAttribute('rel') === 'noopener noreferrer')).toBe(true)
  expect(screen.getByRole('link', {name: 'Privacidad'}).getAttribute('href')).toBe('/ER-LandigPage/privacidad')
  expect(JSON.stringify(footerInfo)).toBe(original)
})

test('no inventa destinos para redes sin configurar ni muestra datos vacíos', () => {
  const {container} = mount({footerInfo: {socialMedia: [{name: '', icon: '', url: ''}], mainSection: {moreInfo: [{name: '', description: ''}]}}})
  const socials = screen.getByRole('list', {name: 'Redes sociales'})
  expect(within(socials).queryAllByRole('link')).toHaveLength(0)
  expect(socials.querySelectorAll('[aria-disabled="true"]')).toHaveLength(3)
  expect(container.querySelector('dl')).toBeNull()
  expect(container.querySelector('img')).toBeNull()
})

test('respeta ambas variantes de desactivación de enlaces existentes', () => {
  mount({footerInfo: {aditionalFooterInfo: [{name: 'Legal', url: 'legal', disable: true}, {name: 'Ayuda', url: 'ayuda', disabled: true}]}})
  for (const name of ['Legal', 'Ayuda']) {
    const link = screen.getByRole('link', {name})
    expect(link.getAttribute('aria-disabled')).toBe('true')
    expect(fireEvent.click(link)).toBe(false)
  }
})
