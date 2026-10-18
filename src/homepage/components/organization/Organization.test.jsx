import React from 'react'
import {fireEvent, render, screen, cleanup} from '@testing-library/react'
import {Organization} from './Organization'

jest.mock('./styles.css', () => ({}))
afterEach(cleanup)

test('conserva nombres, cargos, fotografías y orden institucional al presentar las tarjetas', () => {
  const members = {
    coorNac: [{name: 'Persona A', role: 'Coordinador Nacional', image: '/original-a.png'}],
    comNac: [{name: 'Persona B', role: 'Cargo original B', image: '/original-b.png'}],
    teamNac: [{name: 'Persona C', role: 'Cargo original C', image: '/original-c.png'}],
    cmDist: [{name: 'Persona D', role: 'Cargo original D', image: '/original-d.png', district: 'Distrito original'}],
  }
  const before = JSON.stringify(members)
  const {container} = render(<Organization organizationInfo={{title: '.Organización Nacional', members}} />)
  expect(screen.getByRole('heading', {level: 2}).textContent).toBe('Organización Nacional')
  expect(screen.getAllByRole('heading', {level: 4}).map((node) => node.textContent)).toEqual(['Persona A', 'Persona B', 'Persona C', 'Persona D'])
  expect(screen.getAllByRole('heading', {level: 3}).map((node) => node.textContent)).toEqual(['Coordinador Nacional', 'Coordinadores Nacionales', 'Coordinadores Distritales'])
  expect(screen.getAllByRole('img').map((node) => node.getAttribute('src'))).toEqual(['/original-a.png', '/original-b.png', '/original-c.png', '/original-d.png'])
  expect(container.querySelectorAll('.organization-leader--featured').length).toBe(1)
  expect(screen.getByText('Distrito original')).toBeTruthy()
  expect(JSON.stringify(members)).toBe(before)
})

test('no atribuye el cargo nacional a un perfil distinto y admite fotografías ausentes', () => {
  const {container} = render(<Organization organizationInfo={{members: {coorNac: [{name: 'Persona A', role: 'Coordinador Nacional de Programa', image: '/ausente.png'}]}}} />)
  expect(container.querySelector('.organization-leader--featured')).toBeNull()
  fireEvent.error(screen.getByRole('img'))
  expect(screen.getByLabelText('Fotografía no disponible')).toBeTruthy()
  expect(screen.getByText('Persona A')).toBeTruthy()
})
