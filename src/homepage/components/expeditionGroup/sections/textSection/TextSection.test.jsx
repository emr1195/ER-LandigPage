import React from 'react'
import {cleanup, render, screen} from '@testing-library/react'
import {TextSection} from './TextSection'

jest.mock('../../../common', () => ({
  TypographyPersonalized: ({title}) => <span>{title}</span>,
}))

afterEach(cleanup)

test('conserva la imagen completa en un contenedor compacto sin alterar el texto', () => {
  const {container} = render(<TextSection group={{title: 'Navegantes', age: '5,6,7 Años', description: 'Descripción original.', image: '/insignias.png'}} sectionTitle="Grupos" />)
  const image = screen.getByRole('img', {name: 'Insignias e información visual de Navegantes'})
  expect(image.getAttribute('src')).toBe('/insignias.png')
  expect(image.closest('figure').className).toContain('group-supporting-image')
  expect(container.textContent).toContain('Descripción original.')
})

test('no deja un marco vacío cuando el grupo no tiene imagen adicional', () => {
  const {container} = render(<TextSection group={{title: 'Pioneros'}} sectionTitle="Grupos" />)
  expect(container.querySelector('figure')).toBeNull()
  expect(screen.queryByRole('img')).toBeNull()
})
