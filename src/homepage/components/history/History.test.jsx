import React from 'react'
import {act, cleanup, render, screen} from '@testing-library/react'
import {History} from './History'
import {splitHistoryDescription} from './historyText'

jest.mock('./history.css', () => ({}))
jest.mock('../common/crossfadeImage.css', () => ({}))
jest.mock('../common/editorial/editorial.css', () => ({}))
afterEach(cleanup)

test('la foto secundaria usa la galería compartida y rota cada 8 segundos sin cambiar al fundador', () => {
  jest.useFakeTimers()
  const visibility = jest.spyOn(document, 'hidden', 'get').mockReturnValue(false)
  try {
    const photos = Array.from({length: 4}, (_, index) => ({imageURL: `/foto-${index}.jpg`, title: `Foto ${index}`}))
    const {container, unmount} = render(<History historyInfo={{title: 'Historia', imageSection: {imageLeft: '/fundador.jpg', imageRight: '/anterior.jpg'}}} galleryInfo={{carouselImages: photos}} />)
    expect(container.querySelector('.history-visual__gathering img').getAttribute('src')).toBe('/foto-2.jpg')
    act(() => jest.advanceTimersByTime(8000))
    expect(container.querySelector('.history-visual__gathering img').getAttribute('src')).toBe('/foto-3.jpg')
    expect(container.querySelector('.history-visual__portrait img').getAttribute('src')).toBe('/fundador.jpg')
    expect(container.querySelector('.history-visual__gathering figcaption')).toBeNull()
    unmount()
    expect(jest.getTimerCount()).toBe(0)
  } finally { visibility.mockRestore(); jest.useRealTimers() }
})

test('separa párrafos sin resumir ni perder frases del contenido original', () => {
  const text = Array.from({length: 20}, (_, index) => `Esta es la frase número ${index} de nuestra historia.`).join(' ')
  const paragraphs = splitHistoryDescription(text)
  expect(paragraphs.length).toBeGreaterThan(2)
  expect(paragraphs.join(' ')).toBe(text)
})

test('presenta énfasis seguro y guarda todo el texto en la lectura ampliable', () => {
  const description = 'Primer párrafo con **énfasis institucional**.;Segundo párrafo.;Tercer párrafo intacto. <script>no ejecutar</script>'
  const {container} = render(<History historyInfo={{sectionTitle: 'Historia', title: 'Nuestra historia', description, imageSection: {imageLeft: '/fundador.jpg', imageRight: '/encuentro.jpg', iconText: 'Fundador'}}} />)
  expect(container.querySelector('strong').textContent).toBe('énfasis institucional')
  expect(container.querySelector('script')).toBeNull()
  expect(container.querySelectorAll('.history-prose p')).toHaveLength(3)
  expect(container.querySelector('details').hasAttribute('open')).toBe(false)
  expect(container.querySelector('details').textContent).toContain('Tercer párrafo intacto.')
  expect(screen.getByText('Leer historia completa')).toBeTruthy()
  expect(screen.getAllByRole('img').map(img => img.getAttribute('src'))).toEqual(['/fundador.jpg', '/encuentro.jpg'])
  expect(container.querySelector('#historia')).toBeTruthy()
})
