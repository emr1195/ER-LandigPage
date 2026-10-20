import React, {useState} from 'react'
import {cleanup, fireEvent, render, screen} from '@testing-library/react'
import {EventDate} from './EventsForm'
jest.mock('./datePicker.css', () => ({}))

afterEach(cleanup)

const Editor = ({initial}) => {
  const [value, onChange] = useState(initial)
  return <><EventDate value={value} onChange={onChange} /><output data-testid="date">{value}</output></>
}

test('carga fechas anteriores en el calendario y conserva la hora al cambiarlas', () => {
  render(<Editor initial="15 de Nov del 2026;1-6pm" />)
  const start = screen.getByLabelText('Fecha del evento')
  expect(start.value).toBe('11/15/2026')
  fireEvent.click(start)
  fireEvent.click(screen.getByRole('button', {name: 'Mes siguiente'}))
  fireEvent.click(screen.getByRole('button', {name: '2 de diciembre de 2026', exact: true}))
  expect(screen.getByTestId('date').textContent).toBe('2026-12-02;1-6pm')
  fireEvent.click(screen.getByLabelText('Fecha de finalización (opcional)'))
  fireEvent.click(screen.getByRole('button', {name: '4 de diciembre de 2026', exact: true}))
  expect(screen.getByTestId('date').textContent).toBe('2026-12-02 al 2026-12-04;1-6pm')
})

test('conserva rangos existentes y permite quitar la fecha final sin borrar la inicial', () => {
  render(<Editor initial="2 al 4 de Octubre 2026" />)
  expect(screen.getByLabelText('Fecha del evento').value).toBe('10/02/2026')
  expect(screen.getByLabelText('Fecha de finalización (opcional)').value).toBe('10/04/2026')
  fireEvent.click(screen.getByLabelText('Fecha de finalización (opcional)'))
  fireEvent.click(screen.getByRole('button', {name: 'Limpiar'}))
  expect(screen.getByTestId('date').textContent).toBe('2026-10-02')
})
