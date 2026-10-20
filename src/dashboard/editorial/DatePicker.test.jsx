import React, {useState} from 'react'
import {act, cleanup, fireEvent, render, screen} from '@testing-library/react'
import {DatePicker} from './DatePicker'
jest.mock('./datePicker.css', () => ({}))

const Editor = ({initial = '2026-11-15', ...props}) => {
  const [value, onChange] = useState(initial)
  return <DatePicker label="Fecha" value={value} onChange={onChange} {...props} />
}
beforeEach(() => { jest.useFakeTimers(); jest.setSystemTime(new Date(2026, 10, 18, 12)) })
afterEach(() => { cleanup(); jest.useRealTimers() })

test('muestra formato MM/DD/YYYY y selecciona sin cambiar el formato de almacenamiento', () => {
  const onChange = jest.fn()
  render(<DatePicker label="Fecha" value="2026-11-15" onChange={onChange} />)
  expect(screen.getByLabelText('Fecha').value).toBe('11/15/2026')
  fireEvent.click(screen.getByLabelText('Fecha'))
  expect(screen.getByRole('dialog', {name: 'Calendario: Fecha'})).toBeTruthy()
  fireEvent.click(screen.getByRole('button', {name: '20 de noviembre de 2026', exact: true}))
  expect(onChange).toHaveBeenCalledWith('2026-11-20')
  expect(screen.getByLabelText('Fecha').getAttribute('aria-expanded')).toBe('false')
})

test('permite navegar por mes y año y bloquea fechas anteriores al mínimo', () => {
  render(<Editor min="2026-11-15" />)
  fireEvent.click(screen.getByLabelText('Fecha'))
  expect(screen.getByRole('button', {name: '14 de noviembre de 2026', exact: true}).disabled).toBe(true)
  fireEvent.change(screen.getByRole('combobox', {name: 'Mes'}), {target: {value: '11'}})
  fireEvent.change(screen.getByRole('combobox', {name: 'Año'}), {target: {value: '2027'}})
  fireEvent.click(screen.getByRole('button', {name: '3 de diciembre de 2027', exact: true}))
  expect(screen.getByLabelText('Fecha').value).toBe('12/03/2027')
})

test('Hoy y Limpiar actualizan la fecha y cierran el calendario', () => {
  render(<Editor />)
  fireEvent.click(screen.getByLabelText('Fecha'))
  fireEvent.click(screen.getByRole('button', {name: 'Hoy'}))
  expect(screen.getByLabelText('Fecha').value).toBe('11/18/2026')
  act(() => jest.advanceTimersByTime(250))
  fireEvent.click(screen.getByLabelText('Fecha'))
  fireEvent.click(screen.getByRole('button', {name: 'Limpiar'}))
  expect(screen.getByLabelText('Fecha').value).toBe('')
})

test('admite teclado, Escape y clic fuera sin modificar la selección', () => {
  render(<Editor />)
  fireEvent.keyDown(screen.getByLabelText('Fecha'), {key: 'ArrowDown'})
  const day = screen.getByRole('button', {name: '15 de noviembre de 2026', exact: true})
  fireEvent.keyDown(day, {key: 'ArrowRight'})
  act(() => jest.advanceTimersByTime(250))
  expect(document.activeElement.getAttribute('data-date')).toBe('2026-11-16')
  fireEvent.keyDown(document.activeElement, {key: 'Escape'})
  expect(screen.getByLabelText('Fecha').getAttribute('aria-expanded')).toBe('false')
  expect(screen.getByLabelText('Fecha').value).toBe('11/15/2026')
  act(() => jest.advanceTimersByTime(250))
  fireEvent.click(screen.getByLabelText('Fecha'))
  fireEvent.click(document.querySelector('.MuiBackdrop-root'))
  expect(screen.getByLabelText('Fecha').getAttribute('aria-expanded')).toBe('false')
})

test('conserva la entrada por teclado y valida fechas imposibles o fuera del rango', () => {
  render(<Editor min="2026-11-15" />)
  const input = screen.getByLabelText('Fecha')
  fireEvent.change(input, {target: {value: '02/31/2026'}})
  expect(input.checkValidity()).toBe(false)
  fireEvent.change(input, {target: {value: '11/14/2026'}})
  expect(input.checkValidity()).toBe(false)
  fireEvent.change(input, {target: {value: '11/20/2026'}})
  expect(input.checkValidity()).toBe(true)
  expect(input.value).toBe('11/20/2026')
})
