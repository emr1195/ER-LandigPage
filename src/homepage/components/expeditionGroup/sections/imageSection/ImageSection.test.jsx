import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import {ThemeProvider} from '@mui/material'
import {lightTheme} from '../../../../../theme/lightTheme'
import {ImageSection} from './ImageSection'

test('coloca el título móvil antes del selector y conserva todos los grupos seleccionables', () => {
  const groups = ['Navegantes', 'Pioneros', 'Exploradores'].map((title, id) => ({id, title, emblema: `/grupo-${id}.png`, colors: {primary: '#102a43', secondary: '#fff'}}))
  const select = jest.fn()
  const {container} = render(<ThemeProvider theme={lightTheme}><ImageSection group={groups[0]} expeditionGroups={groups} selectedGroupIndex={0} setSelectedGroupIndex={select} sectionTitle="Grupos" /></ThemeProvider>)
  const title = screen.getByRole('heading', {name: 'Grupos'})
  const selector = screen.getByRole('group', {name: 'Seleccionar grupo'})
  expect(title.compareDocumentPosition(selector) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  expect(screen.getAllByRole('button')).toHaveLength(3)
  expect(screen.getByRole('button', {name: 'Ver grupo Navegantes'}).getAttribute('aria-pressed')).toBe('true')
  fireEvent.click(screen.getByRole('button', {name: 'Ver grupo Pioneros'}))
  expect(select).toHaveBeenCalledWith(1)
  // The decorative block is kept for tablet/desktop; responsive CSS hides it on phones.
  expect(container.querySelector('.BackgroundBox-Color img').getAttribute('src')).toBe('/grupo-0.png')
})
