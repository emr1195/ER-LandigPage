import React from 'react'
import {render, fireEvent, screen, cleanup} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import * as initial from '../../types'
import {prepareSection} from '../../helpers/prepareSection'
import {AppTheme} from '../../theme/AppTheme'
import {Navbar} from './sections/navbar/Navbar'
import {HeroSection} from './sections/heroSection/HeroSection'
import {History} from './sections/history/History'
import {ProgramStructure} from './sections/programStructure/ProgramStructure'
import {ExpeditionGroup} from './sections/expeditionGroup/ExpeditionGroup'
import {Events} from './sections/events/Events'
import {Organization} from './sections/organization/Organization'
import {Footer} from './sections/footer/Footer'

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({useDispatch: () => mockDispatch, useSelector: () => ({isSaving: false})}))
jest.mock('../../store/dashboard', () => ({resetInfo: jest.fn()}))
jest.mock('../../store/landingPage', () => Object.fromEntries([
  'savingNewHeroSection', 'savingNewHistory', 'savingNewProgramStructure',
  'savingNewExpeditionGroupInfo', 'savingNewEventsInfo', 'savingNewOrganization',
].map((name) => [name, (info) => ({type: 'test/save', payload: info})])))
jest.mock('../../store/landingPage/navbar/thunks', () => ({savingNewNavbar: (info) => ({type: 'test/save', payload: info})}))
jest.mock('../../store/landingPage/footer', () => ({savingNewFooter: (info) => ({type: 'test/save', payload: info})}))
jest.mock('../../homepage/components', () => ({Navbar: () => null, History: () => null, ProgramStructure: () => null, ExpeditionGroup: () => null, Events: () => null, Organization: () => null, Footer: () => null}))
jest.mock('../../homepage/components/heroSection/HeroSection', () => ({HeroSection: () => null}))
jest.mock('../../homepage/components/common', () => ({TypographyPersonalized: ({title}) => <span>{title}</span>}))
jest.mock('./ImageUploadField', () => ({ImageUploadField: ({name, value, onChange, required}) => <input name={name} value={value || ''} onChange={onChange} required={required} />}))
jest.mock('@mui/icons-material', () => ({DeleteOutline: () => null}))

beforeAll(() => {
  global.structuredClone = (value) => JSON.parse(JSON.stringify(value))
  Object.defineProperty(global.crypto, 'randomUUID', {value: require('node:crypto').randomUUID, configurable: true})
})
afterEach(() => { cleanup(); jest.clearAllMocks() })

const blankFields = (value, key) => {
  if (typeof value === 'string' || key === 'position') return ''
  if (Array.isArray(value)) return value.map((item) => blankFields(item))
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([name, item]) => [name, blankFields(item, name)]))
  return value
}

test.each([
  ['Navbar', Navbar, initial.initialStateNavbar],
  ['Hero', HeroSection, initial.initialStateHeroSection],
  ['Historia', History, initial.initlaStateHistory],
  ['Programa', ProgramStructure, initial.initialStateProgramStructure],
  ['Grupos', ExpeditionGroup, initial.initialStateExpeditionGroup],
  ['Eventos', Events, initial.initialStateEvents],
  ['Organización', Organization, initial.initialStateOrganization],
  ['Footer', Footer, initial.initialStateFooter],
])('%s permite enviar todos los campos de contenido vacíos', (_name, Component, state) => {
  const {container} = render(<MemoryRouter><AppTheme><Component info={prepareSection(blankFields(state.info))} /></AppTheme></MemoryRouter>)
  expect(container.querySelector('[required]')).toBeNull()
  expect(container.querySelector('[aria-invalid="true"]')).toBeNull()
  expect(screen.queryByText(/Es obligatorio/)).toBeNull()
  const submit = screen.getByRole('button', {name: /^Save$/i})
  expect(submit.disabled).toBe(false)
  expect(container.querySelector('form').checkValidity()).toBe(true)
  fireEvent.submit(container.querySelector('form'))
  expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({type: 'test/save'}))
})
