import React from 'react'
import {act, cleanup, fireEvent, render, screen, within} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import {Events} from './Events'

jest.mock('./events.css', () => ({}))
jest.mock('../common/editorial/editorial.css', () => ({}))
const event = {id: 'camp', title: 'Campamento Nacional INVICTUS', date: '2 al 4 de Octubre 2026', ubication: 'Monte Carmelo;Pedregal', byWho: 'Equipo nacional', image: '/invictus.png'}
const mount = (events = [event]) => render(<MemoryRouter><Events eventsInfo={{title: 'Eventos y Actividades', sectionTitle: 'Eventos', events}} /></MemoryRouter>)
beforeEach(() => { jest.useFakeTimers(); jest.setSystemTime(new Date('2026-10-18T12:00:00-05:00')) })
afterEach(() => { cleanup(); jest.useRealTimers() })
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', '') }
  HTMLDialogElement.prototype.close = function () { this.removeAttribute('open') }
})

test('el evento real aparece finalizado, destacado y con sus datos intactos', () => {
  const before = JSON.stringify(event)
  const {container} = mount()
  expect(screen.getByText('Finalizada')).toBeTruthy()
  expect(screen.queryByText('Próxima')).toBeNull()
  expect(screen.getByRole('heading', {name: event.title})).toBeTruthy()
  expect(screen.getByRole('img').getAttribute('src')).toBe(event.image)
  expect(container.querySelector('.events-grid').getAttribute('data-single')).toBe('true')
  expect(container.querySelectorAll('.event-card')).toHaveLength(1)
  expect(JSON.stringify(event)).toBe(before)
})

test('Ver detalles abre información real y se puede cerrar, sin inventar rutas', () => {
  mount()
  fireEvent.click(screen.getByRole('button', {name: `Ver detalles de ${event.title}`}))
  const dialog = screen.getByRole('dialog', {name: event.title})
  expect(within(dialog).getByText(event.date)).toBeTruthy()
  expect(within(dialog).getByText(event.byWho)).toBeTruthy()
  fireEvent.click(within(dialog).getByRole('button', {name: 'Volver a eventos'}))
  expect(screen.queryByRole('dialog')).toBeNull()
})

test('muestra todos los eventos, conserva destinos externos y no duplica registros', () => {
  const events = Array.from({length: 5}, (_, index) => ({...event, id: `e${index}`, title: `Encuentro ${index}`, date: '2027-02-20', url: `https://example.test/e/${index}`, outsideURL: true}))
  const {container} = mount(events)
  expect(container.querySelectorAll('.event-card')).toHaveLength(5)
  expect(screen.getAllByText('Próxima')).toHaveLength(5)
  expect(screen.getAllByRole('link').map(link => link.getAttribute('href'))).toEqual(events.map(item => item.url))
  expect(screen.getAllByRole('link')[0].getAttribute('rel')).toBe('noopener noreferrer')
})

test('actualiza el estado si cambia el día mientras la página permanece abierta', () => {
  jest.setSystemTime(new Date('2026-10-04T23:59:30-05:00'))
  const {unmount} = mount()
  expect(screen.getByText('En curso')).toBeTruthy()
  act(() => jest.advanceTimersByTime(60000))
  expect(screen.getByText('Finalizada')).toBeTruthy()
  unmount()
  expect(jest.getTimerCount()).toBe(0)
})

test('una fecha imprecisa no se presenta como próxima', () => {
  mount([{...event, date: 'Por definir'}])
  expect(screen.getByText('Fecha por confirmar')).toBeTruthy()
  expect(screen.queryByText('Próxima')).toBeNull()
})

test('coloca el fondo detrás de la imagen principal también en los detalles', () => {
  const {container} = mount([{...event, date: '2026-11-15;1-6pm', backgroundImage: '/fondo.jpg'}])
  expect(screen.getByText('Próxima')).toBeTruthy()
  expect(container.querySelector('.event-artwork__background').getAttribute('src')).toBe('/fondo.jpg')
  expect(container.querySelector('.event-artwork__foreground').getAttribute('src')).toBe(event.image)
  expect(container.querySelector('time').textContent).toContain('15 de noviembre de 2026')
  fireEvent.click(screen.getByRole('button', {name: `Ver detalles de ${event.title}`}))
  expect(screen.getByRole('dialog').querySelector('.event-artwork__background').getAttribute('src')).toBe('/fondo.jpg')
})

test('el nombre del lugar abre Google Maps sin mostrar la URL, también en detalles', () => {
  const mapsUrl = 'https://maps.app.goo.gl/lugarEjemplo'
  mount([{...event, ubication: 'CREAD Pedregal', mapsUrl}])
  const link = screen.getByRole('link', {name: /CREAD Pedregal/})
  expect(link.textContent).toBe('CREAD Pedregal')
  expect(link.getAttribute('href')).toBe(mapsUrl)
  expect(link.getAttribute('target')).toBe('_blank')
  expect(link.getAttribute('rel')).toBe('noopener noreferrer')
  expect(screen.queryByText(mapsUrl)).toBeNull()
  fireEvent.click(screen.getByRole('button', {name: `Ver detalles de ${event.title}`}))
  expect(within(screen.getByRole('dialog')).getByRole('link', {name: /CREAD Pedregal/}).getAttribute('href')).toBe(mapsUrl)
})

test('una URL ajena o insegura no convierte el lugar en enlace', () => {
  mount([{...event, mapsUrl: 'javascript:alert(1)'}])
  expect(screen.queryByRole('link')).toBeNull()
})
