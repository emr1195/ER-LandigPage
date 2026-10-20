import React from 'react'
import {act, cleanup, fireEvent, render, screen} from '@testing-library/react'
import {CrossfadeImage} from './CrossfadeImage'
jest.mock('./crossfadeImage.css', () => ({}))
afterEach(() => { cleanup(); jest.useRealTimers() })

test('conserva la foto anterior hasta que la siguiente carga y termina el fundido', () => {
  jest.useFakeTimers()
  const {container, rerender, unmount} = render(<CrossfadeImage src="/uno.jpg" alt="Foto" />)
  rerender(<CrossfadeImage src="/dos.jpg" alt="Foto" />)
  expect(screen.getByRole('img', {name: 'Foto'}).style.opacity).toBe('0')
  expect(container.querySelector('.crossfade-image__previous').getAttribute('src')).toBe('/uno.jpg')
  fireEvent.load(screen.getByRole('img', {name: 'Foto'}))
  expect(screen.getByRole('img', {name: 'Foto'}).style.opacity).toBe('1')
  act(() => jest.advanceTimersByTime(850))
  expect(container.querySelector('.crossfade-image__previous')).toBeNull()
  unmount()
  expect(jest.getTimerCount()).toBe(0)
})
