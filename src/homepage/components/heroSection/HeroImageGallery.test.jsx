import React from 'react'
import {act, cleanup, fireEvent, render, screen, within} from '@testing-library/react'
import {HeroImageGallery} from './HeroImageGallery'
import {heroCarouselPhotos} from './heroPhotos'
jest.mock('../common/crossfadeImage.css', () => ({}))

const photo = name => ({imageURL: `/${name}.jpg`, title: name})
const info = {
  imageRightCenter: {...photo('Principal'), images: [photo('No rotar')]},
  imageTopLeft: {...photo('Campamento'), images: [photo('Campamento2')]},
  imageBottomLeft: {...photo('Aventura'), images: [photo('Aventura2')]},
}
beforeEach(() => { jest.useFakeTimers(); jest.spyOn(document, 'hidden', 'get').mockReturnValue(false) })
afterEach(() => { cleanup(); jest.useRealTimers(); jest.restoreAllMocks() })

test('solo los dos recuadros inferiores rotan cada 8 segundos y la principal permanece fija', () => {
  const before = JSON.stringify(info)
  const {unmount} = render(<HeroImageGallery info={info} />)
  expect(screen.getAllByRole('img').map(img => img.alt)).toEqual(['Principal', 'Campamento', 'Campamento2'])
  act(() => jest.advanceTimersByTime(7999))
  expect(screen.getByRole('img', {name: 'Campamento'})).toBeTruthy()
  act(() => jest.advanceTimersByTime(1))
  expect(screen.getAllByRole('img').map(img => img.alt)).toEqual(['Principal', 'Aventura', 'Aventura2'])
  act(() => jest.advanceTimersByTime(8000))
  expect(screen.getAllByRole('img').map(img => img.alt)).toEqual(['Principal', 'Campamento', 'Campamento2'])
  expect(within(screen.getByRole('group', {name: 'Fotografía principal'})).queryByRole('button')).toBeNull()
  expect(JSON.stringify(info)).toBe(before)
  unmount()
  expect(jest.getTimerCount()).toBe(0)
})

test('avanza automáticamente incluso con el cursor encima y mantiene una pausa accesible', () => {
  render(<HeroImageGallery info={info} />)
  const gallery = screen.getByRole('group', {name: 'Galería compartida'})
  expect(screen.queryByRole('button', {name: 'Fotografías siguientes'})).toBeNull()
  expect(screen.queryByRole('button', {name: 'Fotografías anteriores'})).toBeNull()
  fireEvent.mouseEnter(gallery)
  act(() => jest.advanceTimersByTime(8000))
  expect(within(gallery).getAllByRole('img').map(img => img.alt)).toEqual(['Aventura', 'Aventura2'])
  fireEvent.click(within(gallery).getByRole('button', {name: 'Pausar galería'}))
  act(() => jest.advanceTimersByTime(8000))
  expect(within(gallery).getAllByRole('img').map(img => img.alt)).toEqual(['Aventura', 'Aventura2'])
  fireEvent.click(within(gallery).getByRole('button', {name: 'Reanudar galería'}))
  act(() => jest.advanceTimersByTime(8000))
  expect(within(gallery).getAllByRole('img').map(img => img.alt)).toEqual(['Campamento', 'Campamento2'])
})

test('si solo hay una foto no la duplica en el segundo recuadro', () => {
  render(<HeroImageGallery info={{imageBottomLeft: {images: [photo('Solo aventura')]}}} />)
  expect(within(screen.getByRole('group', {name: 'Galería compartida'})).getAllByRole('img')).toHaveLength(1)
  expect(screen.getByText('Fotografía institucional pendiente')).toBeTruthy()
  expect(screen.queryByRole('button')).toBeNull()
})

test.each([2, 3, 5])('nunca repite una imagen entre los dos recuadros con %s fotos', count => {
  const photos = Array.from({length: count}, (_, index) => photo(`Foto${index}`))
  render(<HeroImageGallery info={{carouselImages: [...photos, photos[0]]}} />)
  const gallery = screen.getByRole('group', {name: 'Galería compartida'})
  for (let index = 0; index < 12; index++) {
    const images = within(gallery).getAllByRole('img')
    expect(images).toHaveLength(2)
    expect(images[0].getAttribute('src')).not.toBe(images[1].getAttribute('src'))
    act(() => jest.advanceTimersByTime(8000))
  }
})

test('la lista compartida conserva fotos antiguas y permite eliminarlas definitivamente de la galería', () => {
  expect(heroCarouselPhotos(info)).toHaveLength(4)
  expect(heroCarouselPhotos({...info, carouselImages: []})).toEqual([])
})

test('no muestra nombres de archivo debajo de las fotos del carrusel y conserva el texto alternativo', () => {
  const {container} = render(<HeroImageGallery info={{carouselImages: [photo('WhatsApp Image 2026'), photo('Otra fotografía')]}} />)
  expect(container.querySelector('.hero-gallery__secondary figcaption')).toBeNull()
  expect(screen.getByRole('img', {name: 'WhatsApp Image 2026'})).toBeTruthy()
  expect(screen.queryByText('WhatsApp Image 2026')).toBeNull()
})
