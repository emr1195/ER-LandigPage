import React from 'react'
import {fireEvent, render, cleanup} from '@testing-library/react'
import {prepareSection} from '../../helpers/prepareSection'
import {initialStateEvents, initialStateOrganization, initialStateProgramStructure, initialStateHeroSection} from '../../types'
import {Events} from './sections/events/Events'
import {Organization} from './sections/organization/Organization'
import {ProgramStructure} from './sections/programStructure/ProgramStructure'
import {HeroSection} from './sections/heroSection/HeroSection'
import {GrabView} from './grabView/GrabView'
import {AppTheme} from '../../theme/AppTheme'

jest.mock('react-redux', () => ({useDispatch: () => jest.fn(), useSelector: () => ({isSaving: false})}))
jest.mock('../../store/dashboard', () => ({resetInfo: jest.fn()}))
jest.mock('../../store/landingPage', () => ({}))
jest.mock('../../homepage/components', () => ({
  Events: () => null, Organization: () => null, ProgramStructure: () => null,
}))
jest.mock('../../homepage/components/heroSection/HeroSection', () => ({HeroSection: () => null}))
jest.mock('../../homepage/components/common', () => ({TypographyPersonalized: ({title}) => <span>{title}</span>}))
jest.mock('./ImageUploadField', () => ({ImageUploadField: () => null}))
jest.mock('@mui/icons-material', () => ({DeleteOutline: () => null}))
jest.mock('./sections/navbar/Navbar', () => ({Navbar: () => null}))
jest.mock('./sections/footer/Footer', () => ({Footer: () => null}))
jest.mock('./sections/history/History', () => ({History: () => null}))
jest.mock('./sections/detachment/DetachmentEditor', () => ({DetachmentEditor: () => null}))

beforeAll(() => {
  global.structuredClone = (value) => JSON.parse(JSON.stringify(value))
  Object.defineProperty(global.crypto, 'randomUUID', {value: require('node:crypto').randomUUID, configurable: true})
})
afterEach(cleanup)

test.each([
  ['Eventos', Events, initialStateEvents, '.events-0 input[name="title"]'],
  ['Organización', Organization, initialStateOrganization, '.members-0 input[name="name"]'],
  ['Estructura', ProgramStructure, initialStateProgramStructure, '.programValue-0 input[name="title"]'],
])('%s permite editar la primera fila de una sección nueva', (_name, Component, initial, selector) => {
  const {container} = render(<AppTheme><Component info={prepareSection(initial.info)} /></AppTheme>)
  const input = container.querySelector(selector)
  expect(input).not.toBeNull()
  fireEvent.change(input, {target: {value: 'Contenido editado'}})
  expect(container.querySelector(selector).value).toBe('Contenido editado')
})

test('Hero edita independientemente el título y la URL de cada botón', () => {
  const {container} = render(<AppTheme><HeroSection info={prepareSection(initialStateHeroSection.info)} /></AppTheme>)
  const title = container.querySelector('.button-0-title input[name="title"]')
  const url = container.querySelector('.button-0-title input[name="url"]')
  expect(title).not.toBeNull()
  expect(url).not.toBeNull()
  fireEvent.change(title, {target: {value: 'Conocer más'}})
  fireEvent.change(url, {target: {value: '#historia'}})
  expect(container.querySelector('.button-0-title input[name="title"]').value).toBe('Conocer más')
  expect(container.querySelector('.button-0-title input[name="url"]').value).toBe('#historia')
  expect(container.querySelector('.button-1-title input[name="title"]').value).toBe('')
})

test('el editor se abre por su clave aunque cambie el título visible', () => {
  const {container} = render(<AppTheme><GrabView sectionActive={{...prepareSection(initialStateEvents.info), sectionTitle: 'Próximas actividades', sectionKey: 'events'}} /></AppTheme>)
  expect(container.querySelector('.Events-Dashboard')).not.toBeNull()
})
