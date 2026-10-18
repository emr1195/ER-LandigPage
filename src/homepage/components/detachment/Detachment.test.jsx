import React from 'react'
import {render, screen, cleanup} from '@testing-library/react'
import {Detachment} from './Detachment'
import {emptyDetachment} from '../../../../shared/detachments'
jest.mock('./styles.css', () => ({}))
afterEach(cleanup)

test('la ficha pública muestra nombre, número y mapa sin exigir logo', () => {
  const {container} = render(<Detachment info={{...emptyDetachment, name: 'Ejemplo', number: '24', mapsUrl: 'https://www.google.com/maps?q=Panama'}} />)
  expect(screen.getByText('Ejemplo')).toBeTruthy()
  expect(screen.getByText('Destacamento n.º 24')).toBeTruthy()
  expect(container.querySelector('iframe')).not.toBeNull()
  expect(container.querySelector('img')).toBeNull()
})

test('el rediseño conserva el escudo y el destino original de Cómo llegar', () => {
  const info = {...emptyDetachment, name: 'Catedral de Vida', number: '1', logo: '/escudo-original.png', mapsUrl: 'https://maps.app.goo.gl/original', embedUrl: 'https://www.google.com/maps/embed?pb=ubicacion-original'}
  const before = JSON.stringify(info)
  const {container} = render(<Detachment info={info} />)
  expect(screen.getByRole('heading', {level: 2}).textContent).toBe('Destacamentos registrados')
  expect(screen.getByRole('heading', {level: 3}).textContent).toBe('Catedral de Vida')
  const link = screen.getByRole('link', {name: /Cómo llegar/})
  expect(link.getAttribute('href')).toBe(info.mapsUrl)
  expect(link.getAttribute('target')).toBe('_blank')
  expect(link.getAttribute('rel')).toBe('noopener noreferrer')
  expect(container.querySelector('iframe').getAttribute('src')).toBe(info.embedUrl)
  expect(screen.getByRole('img').getAttribute('src')).toBe(info.logo)
  expect(JSON.stringify(info)).toBe(before)
})

test('el directorio ordena por número, coloca códigos al final y no inventa mapas', () => {
  const info = {detachments: [{name: 'Código', number: 'ON'}, {name: 'Veinte', number: '20'}, {name: 'Dos', number: '2'}]}
  const {container} = render(<Detachment info={info} />)
  expect(screen.getAllByRole('heading', {level: 3}).map((item) => item.textContent)).toEqual(['Dos', 'Veinte', 'Código'])
  expect(screen.getByText('Código ON')).toBeTruthy()
  expect(container.querySelectorAll('iframe').length).toBe(0)
  expect(container.querySelectorAll('img').length).toBe(0)
})
