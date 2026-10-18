import React from 'react'
import {act, cleanup, render, screen} from '@testing-library/react'
import {HomePage} from './HomePage'

const mockDispatch = jest.fn()
const mockState = Object.fromEntries(['navbar', 'heroSection', 'history', 'programStructure', 'expeditionGroup', 'events', 'organization', 'footer', 'detachment'].map((key) => [key, {info: {}}]))
jest.mock('./styles.css', () => ({}))
jest.mock('react-redux', () => ({useDispatch: () => mockDispatch, useSelector: (selector) => selector(mockState)}))
jest.mock('../../store/landingPage', () => ({startLoadingLandingPage: () => ({type: 'test/load'})}))
jest.mock('../components', () => ({Navbar: () => <div>Header listo</div>, HeroSection: () => <div>Hero listo</div>, History: () => null, ProgramStructure: () => null, ExpeditionGroup: () => null, Events: () => null, Organization: () => null, Footer: () => null}))
jest.mock('../components/detachment/Detachment', () => ({Detachment: () => null}))
afterEach(() => { cleanup(); jest.clearAllMocks() })

test('espera la carga real antes de mostrar campos iniciales vacíos', async () => {
  let finish
  mockDispatch.mockReturnValue(new Promise((resolve) => { finish = resolve }))
  render(<HomePage />)
  expect(screen.getByRole('progressbar', {name: 'Cargando información del sitio'})).toBeTruthy()
  expect(screen.queryByText('Header listo')).toBeNull()
  await act(async () => { finish() })
  expect(screen.getByText('Header listo')).toBeTruthy()
  expect(screen.getByText('Hero listo')).toBeTruthy()
  expect(screen.queryByRole('progressbar')).toBeNull()
})
