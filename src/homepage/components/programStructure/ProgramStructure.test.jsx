import React from 'react'
import {cleanup, fireEvent, render, screen} from '@testing-library/react'
import {ProgramStructure} from './ProgramStructure'

jest.mock('./values.css', () => ({}))
jest.mock('../common/editorial/editorial.css', () => ({}))
const items = [
  {id: 'consigna', position: 30, title: 'Consigna', description: 'Texto íntegro de la consigna.', image: '/consigna.png', display: true},
  {id: 'mision', position: 10, title: 'Misión', description: 'Texto íntegro de la misión.', image: '/mision.png', display: true},
  {id: 'promesa', position: 20, title: 'Promesa', description: 'Texto íntegro de la promesa.', image: '/promesa.png', display: true},
]
const mount = () => render(<ProgramStructure programStructureInfo={{sectionTitle: 'Estructura del Programa', title: 'Estos son nuestros Valores', programValues: items}} />)
afterEach(() => { cleanup(); jest.restoreAllMocks() })

test('omite la ayuda visual y conserva el anuncio accesible del valor seleccionado', () => {
  mount()
  expect(screen.queryByText('Selecciona un valor para conocer lo que nos inspira.')).toBeNull()
  expect(screen.getByRole('status').className).toBe('values-current')
  fireEvent.click(screen.getByRole('button', {name: 'Promesa', exact: true}))
  expect(screen.getByRole('status').textContent).toBe('Promesa · 2 de 3')
})

test('ordena antes de renderizar y mueve cada tarjeta al frente sin alterar contenido', () => {
  const before = JSON.stringify(items)
  const {container} = mount()
  const controls = screen.getByRole('group', {name: 'Seleccionar valor del programa'})
  expect([...controls.querySelectorAll('button')].map(button => button.textContent)).toEqual(['Misión', 'Promesa', 'Consigna'])
  for (const title of ['Misión', 'Promesa', 'Consigna', 'Misión']) {
    const button = screen.getByRole('button', {name: title, exact: true})
    fireEvent.click(button)
    expect(button.getAttribute('aria-pressed')).toBe('true')
    expect(container.querySelectorAll('[data-side="active"]')).toHaveLength(1)
    expect(container.querySelector('[data-side="active"] h3').textContent).toBe(title)
    expect(document.getElementById(button.getAttribute('aria-controls'))).toBe(container.querySelector('[data-side="active"]'))
  }
  items.forEach(item => expect(container.textContent).toContain(item.description))
  expect(JSON.stringify(items)).toBe(before)
})

test('selecciona una tarjeta secundaria y sincroniza sus controles', () => {
  const {container} = mount()
  fireEvent.click(screen.getByRole('button', {name: 'Mostrar Promesa'}))
  expect(container.querySelector('[data-side="active"] h3').textContent).toBe('Promesa')
  expect(screen.getByRole('button', {name: 'Promesa', exact: true}).getAttribute('aria-pressed')).toBe('true')
  expect(document.activeElement).toBe(screen.getByRole('button', {name: 'Promesa', exact: true}))
})

test('admite teclado y gestos horizontales sin interceptar el desplazamiento vertical', () => {
  const {container} = mount()
  const control = screen.getByRole('button', {name: 'Misión', exact: true})
  fireEvent.keyDown(control, {key: 'ArrowRight'})
  expect(document.activeElement).toBe(screen.getByRole('button', {name: 'Promesa', exact: true}))
  const stage = screen.getByRole('group', {name: 'Carrusel de valores'})
  fireEvent.touchStart(stage, {touches: [{clientX: 200, clientY: 100}]})
  fireEvent.touchEnd(stage, {changedTouches: [{clientX: 90, clientY: 105}]})
  expect(container.querySelector('[data-side="active"] h3').textContent).toBe('Consigna')
  fireEvent.touchStart(stage, {touches: [{clientX: 200, clientY: 100}]})
  fireEvent.touchEnd(stage, {changedTouches: [{clientX: 190, clientY: 300}]})
  expect(container.querySelector('[data-side="active"] h3').textContent).toBe('Consigna')
})

test('conserva los ocho puntos de un código largo y permite enfocar su lectura', () => {
  const lines = Array.from({length: 8}, (_, index) => `• Valor ${index + 1}: explicación institucional completa sin recortar.`)
  const code = {id: 'codigo', title: 'Código', description: lines.join('\n'), position: 1, display: true}
  const {container} = render(<ProgramStructure programStructureInfo={{title: 'Nuestros Valores', programValues: [code, ...items]}} />)
  const region = screen.getByRole('region', {name: 'Texto completo de Código'})
  expect(region.getAttribute('tabindex')).toBe('0')
  expect(region.querySelectorAll('li')).toHaveLength(8)
  expect([...region.querySelectorAll('li')].map(item => item.textContent)).toEqual(lines.map(line => line.slice(2)))
  fireEvent.click(screen.getByRole('button', {name: 'Misión', exact: true}))
  expect(region.getAttribute('tabindex')).toBe('-1')
  expect(screen.getByRole('region', {name: 'Texto completo de Misión'}).getAttribute('tabindex')).toBe('0')
  expect(container.textContent).toContain('Valor 8: explicación institucional completa sin recortar.')
})

test('muestra una indicación cuando el texto necesita desplazamiento interno', () => {
  jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(600)
  jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(200)
  const {container} = mount()
  expect(container.querySelector('[data-side="active"] .value-card__scroll-hint').textContent).toContain('leer más')
})
