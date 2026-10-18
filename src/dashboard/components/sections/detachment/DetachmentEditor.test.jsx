import React from 'react'
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import {render, screen, fireEvent, waitFor, cleanup} from '@testing-library/react'
import {DetachmentEditor} from './DetachmentEditor'
import {Detachment} from '../../../../homepage/components/detachment/Detachment'
import {detachmentSlice, emptyDetachment} from '../../../../store/landingPage/detachment/detachmentSlice'
import {dashboardSlice} from '../../../../store/dashboard/dashboardSlice'
import {saveSiteSection, getSiteSection} from '../../../../repositories/siteSections'

jest.mock('../../../../homepage/components/detachment/styles.css', () => ({}))
jest.mock('../../../../repositories/siteSections', () => ({saveSiteSection: jest.fn(), getSiteSection: jest.fn()}))
jest.mock('../../ImageUploadField', () => ({ImageUploadField: ({label}) => <div>{label}</div>}))
afterEach(() => { cleanup(); jest.clearAllMocks() })
beforeAll(() => {
  Object.defineProperty(global.crypto, 'randomUUID', {value: require('node:crypto').randomUUID, configurable: true})
})

test('permite guardar un destacamento con todos los campos vacíos', async () => {
  const store = configureStore({reducer: {dashboard: dashboardSlice.reducer, detachment: detachmentSlice.reducer}})
  saveSiteSection.mockResolvedValue(undefined)
  getSiteSection.mockResolvedValue({detachments: [{...emptyDetachment, id: 'draft-empty'}]})
  const {container} = render(<Provider store={store}><DetachmentEditor info={emptyDetachment} /></Provider>)
  expect(container.querySelector('[required]')).toBeNull()
  expect(screen.getByRole('button', {name: 'Guardar destacamento'}).disabled).toBe(false)
  fireEvent.click(screen.getByRole('button', {name: 'Guardar destacamento'}))
  await waitFor(() => expect(saveSiteSection).toHaveBeenCalledWith('detachment', expect.objectContaining({detachments: [expect.objectContaining(emptyDetachment)]})))
  await waitFor(() => expect(store.getState().detachment.info.detachments[0].id).toBe('draft-empty'))
})

test('confirma la eliminación y conserva los demás registros guardados', async () => {
  const store = configureStore({reducer: {dashboard: dashboardSlice.reducer, detachment: detachmentSlice.reducer}})
  const first = {...emptyDetachment, id: 'detachment-1', name: 'Primero', number: '1'}
  const second = {...emptyDetachment, id: 'detachment-2', name: 'Segundo', number: '2'}
  saveSiteSection.mockResolvedValue(undefined)
  getSiteSection.mockResolvedValue({detachments: [first]})
  render(<Provider store={store}><DetachmentEditor info={{detachments: [first, second]}} /></Provider>)
  fireEvent.click(screen.getByRole('button', {name: 'Eliminar Segundo (2)'}))
  expect(screen.getByRole('dialog')).toBeTruthy()
  expect(saveSiteSection).not.toHaveBeenCalled()
  fireEvent.click(screen.getByRole('button', {name: 'Confirmar eliminación'}))
  await waitFor(() => expect(saveSiteSection).toHaveBeenCalledWith('detachment', {sectionTitle: 'Destacamento', detachments: [first]}))
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
  await waitFor(() => expect(screen.queryByRole('button', {name: 'Editar Segundo (2)'})).toBeNull())
  expect(screen.getByRole('button', {name: 'Editar Primero (1)'})).toBeTruthy()
})

test('permite cancelar y no quita registros si falla la eliminación del último', async () => {
  const store = configureStore({reducer: {dashboard: dashboardSlice.reducer, detachment: detachmentSlice.reducer}})
  const info = {detachments: [{...emptyDetachment, id: 'detachment-1', name: 'Único', number: '1'}]}
  saveSiteSection.mockRejectedValueOnce(new Error('Error de conexión'))
  render(<Provider store={store}><DetachmentEditor info={info} /></Provider>)
  fireEvent.click(screen.getByRole('button', {name: 'Eliminar Único (1)'}))
  fireEvent.click(screen.getAllByRole('button', {name: 'Cancelar'}).at(-1))
  expect(saveSiteSection).not.toHaveBeenCalled()
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
  fireEvent.click(screen.getByRole('button', {name: 'Eliminar Único (1)'}))
  fireEvent.click(screen.getByRole('button', {name: 'Confirmar eliminación'}))
  await waitFor(() => expect(saveSiteSection).toHaveBeenCalledTimes(1))
  await waitFor(() => expect(screen.getByRole('button', {name: 'Confirmar eliminación'}).disabled).toBe(false))
  expect(screen.getByRole('dialog')).toBeTruthy()
  saveSiteSection.mockResolvedValue(undefined)
  getSiteSection.mockResolvedValue({detachments: []})
  fireEvent.click(screen.getByRole('button', {name: 'Confirmar eliminación'}))
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
  expect(screen.queryByRole('button', {name: 'Editar Único (1)'})).toBeNull()
  expect(screen.getByText(/No hay destacamentos registrados/)).toBeTruthy()
  expect(store.getState().detachment.info.detachments).toEqual([])
})

test('permite guardar sin logo y carga la ubicación en el mapa', async () => {
  const store = configureStore({reducer: {dashboard: dashboardSlice.reducer, detachment: detachmentSlice.reducer}})
  saveSiteSection.mockResolvedValue(undefined)
  getSiteSection.mockResolvedValue({name: 'Destacamento de prueba', number: '24', mapsUrl: 'https://www.google.com/maps?q=8.9,-79.5', logo: '', embedUrl: 'https://www.google.com/maps?q=8.9%2C-79.5&output=embed&z=16'})
  const {container} = render(<Provider store={store}><DetachmentEditor info={emptyDetachment} /></Provider>)
  fireEvent.change(screen.getByLabelText(/Nombre del destacamento/), {target: {value: 'Destacamento de prueba'}})
  fireEvent.change(screen.getByLabelText(/Número de destacamento/), {target: {value: '24'}})
  fireEvent.change(screen.getByLabelText(/Ubicación — enlace de Google Maps/), {target: {value: 'https://www.google.com/maps?q=8.9,-79.5'}})
  await waitFor(() => expect(container.querySelector('iframe')).not.toBeNull())
  fireEvent.click(screen.getByRole('button', {name: 'Guardar destacamento'}))
  await waitFor(() => expect(saveSiteSection).toHaveBeenCalledWith('detachment', expect.objectContaining({detachments: [expect.objectContaining({name: 'Destacamento de prueba', number: '24', logo: ''})]})))
  await waitFor(() => expect(store.getState().detachment.info.detachments[0].number).toBe('24'))
})

test('un enlace inválido no crea un iframe y bloquea el guardado', async () => {
  const store = configureStore({reducer: {dashboard: dashboardSlice.reducer, detachment: detachmentSlice.reducer}})
  const {container} = render(<Provider store={store}><DetachmentEditor info={emptyDetachment} /></Provider>)
  fireEvent.change(screen.getByLabelText(/Nombre del destacamento/), {target: {value: 'Ejemplo'}})
  fireEvent.change(screen.getByLabelText(/Número de destacamento/), {target: {value: '24'}})
  fireEvent.change(screen.getByLabelText(/Ubicación — enlace de Google Maps/), {target: {value: 'https://example.com/'}})
  await waitFor(() => expect(screen.getByRole('button', {name: 'Guardar destacamento'}).disabled).toBe(true))
  expect(container.querySelector('iframe')).toBeNull()
  expect(saveSiteSection).not.toHaveBeenCalled()
})

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

test('guarda un destacamento sin logo ni ubicación', async () => {
  const store = configureStore({reducer: {dashboard: dashboardSlice.reducer, detachment: detachmentSlice.reducer}})
  saveSiteSection.mockResolvedValue(undefined)
  getSiteSection.mockResolvedValue({detachments: [{name: 'Ejemplo', number: '57', mapsUrl: '', logo: ''}]})
  const {container} = render(<Provider store={store}><DetachmentEditor info={emptyDetachment} /></Provider>)
  fireEvent.change(screen.getByLabelText(/Nombre del destacamento/), {target: {value: 'Ejemplo'}})
  fireEvent.change(screen.getByLabelText(/Número de destacamento/), {target: {value: '57'}})
  expect(screen.getByRole('button', {name: 'Guardar destacamento'}).disabled).toBe(false)
  fireEvent.click(screen.getByRole('button', {name: 'Guardar destacamento'}))
  await waitFor(() => expect(saveSiteSection).toHaveBeenCalledWith('detachment', expect.objectContaining({detachments: [expect.objectContaining({name: 'Ejemplo', number: '57', logo: '', mapsUrl: ''})]})))
  expect(container.querySelector('iframe')).toBeNull()
  expect(container.querySelector('.detachment-map')).toBeNull()
})

test('el directorio ordena por número, coloca códigos al final y no inventa mapas', () => {
  const info = {detachments: [{name: 'Código', number: 'ON'}, {name: 'Veinte', number: '20'}, {name: 'Dos', number: '2'}]}
  const {container} = render(<Detachment info={info} />)
  expect(screen.getAllByRole('heading', {level: 3}).map((item) => item.textContent)).toEqual(['Dos', 'Veinte', 'Código'])
  expect(screen.getByText('Código ON')).toBeTruthy()
  expect(container.querySelectorAll('iframe').length).toBe(0)
  expect(container.querySelectorAll('img').length).toBe(0)
})

test('permite editar un registro importado y conserva los demás al guardar', async () => {
  const store = configureStore({reducer: {dashboard: dashboardSlice.reducer, detachment: detachmentSlice.reducer}})
  const records = [
    {...emptyDetachment, id: 'detachment-1', name: 'Catedral de Vida', number: '1', logo: '/original.png'},
    {...emptyDetachment, id: 'detachment-2', name: 'Templo Jerusalen', number: '2'},
    {...emptyDetachment, id: 'detachment-57', name: 'Templo Génesis', number: '57'},
  ]
  const saved = {detachments: records.map((record) => record.number === '2' ? {...record, name: 'Templo Jerusalén actualizado'} : record)}
  saveSiteSection.mockResolvedValue(undefined)
  getSiteSection.mockResolvedValue(saved)
  const {rerender} = render(<Provider store={store}><DetachmentEditor info={{detachments: records}} /></Provider>)
  expect(screen.getAllByRole('button', {name: /^Editar /}).length).toBe(3)
  fireEvent.click(screen.getByRole('button', {name: 'Editar Templo Jerusalen (2)'}))
  expect(screen.getByLabelText(/Nombre del destacamento/).value).toBe('Templo Jerusalen')
  expect(screen.getByLabelText(/Número de destacamento/).value).toBe('2')
  fireEvent.change(screen.getByLabelText(/Nombre del destacamento/), {target: {value: 'Templo Jerusalén actualizado'}})
  fireEvent.click(screen.getByRole('button', {name: 'Guardar destacamento'}))
  await waitFor(() => expect(saveSiteSection).toHaveBeenCalledWith('detachment', {sectionTitle: 'Destacamento', ...saved}))
  await waitFor(() => expect(store.getState().detachment.info.detachments).toEqual(saved.detachments))
  rerender(<Provider store={store}><DetachmentEditor info={store.getState().detachment.info} /></Provider>)
  fireEvent.click(screen.getByRole('button', {name: 'Editar Templo Génesis (57)'}))
  expect(screen.getByLabelText(/Nombre del destacamento/).value).toBe('Templo Génesis')
  fireEvent.click(screen.getByRole('button', {name: 'Editar Templo Jerusalén actualizado (2)'}))
  expect(screen.getByLabelText(/Nombre del destacamento/).value).toBe('Templo Jerusalén actualizado')
})
