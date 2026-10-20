import React, {useState} from 'react'
import {cleanup, fireEvent, render, screen, waitFor} from '@testing-library/react'
import {GalleryUpload} from './GalleryUpload'
import {UploadContext, useUploadQueue} from './useUploads'
import {apiResponse} from '../../api/client'

jest.mock('../../api/client', () => ({apiResponse: jest.fn()}))
const Wrapper = () => {
  const queue = useUploadQueue()
  const [photos, setPhotos] = useState([{id: 'original', imageURL: '/original.jpg'}])
  return <UploadContext.Provider value={{...queue, sectionKey: 'heroSection'}}><GalleryUpload onChange={setPhotos} count={photos.length} /><output data-testid="photos">{JSON.stringify(photos)}</output></UploadContext.Provider>
}
const files = () => [new File(['one'], 'campamento.png', {type: 'image/png'}), new File(['two'], 'aventura.jpg', {type: 'image/jpeg'})]
const uploaded = url => ({json: async () => ({url})})
let originalUUID
beforeEach(() => {
  originalUUID = Object.getOwnPropertyDescriptor(crypto, 'randomUUID')
  Object.defineProperty(crypto, 'randomUUID', {configurable: true, value: jest.fn(() => `foto-${Math.random()}`)})
})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
  if (originalUUID) Object.defineProperty(crypto, 'randomUUID', originalUUID)
  else delete crypto.randomUUID
})

test('sube varias imágenes en una selección y conserva las anteriores en la misma lista', async () => {
  apiResponse.mockResolvedValueOnce(uploaded('/uno.png')).mockResolvedValueOnce(uploaded('/dos.jpg'))
  render(<Wrapper />)
  const input = screen.getByLabelText('Subir bloque de imágenes a la galería')
  expect(input.multiple).toBe(true)
  fireEvent.change(input, {target: {files: files()}})
  await screen.findByText(/2 de 2 imágenes subidas/)
  const photos = JSON.parse(screen.getByTestId('photos').textContent)
  expect(photos.map(photo => photo.imageURL)).toEqual(['/original.jpg', '/uno.png', '/dos.jpg'])
  expect(apiResponse.mock.calls[0][1].body.get('sectionKey')).toBe('heroSection')
  expect(photos[1].title).toBe('campamento')
})

test('reintenta solo las pendientes sin duplicar las ya subidas', async () => {
  apiResponse.mockResolvedValueOnce(uploaded('/uno.png')).mockRejectedValueOnce(new Error('Sin conexión')).mockResolvedValueOnce(uploaded('/dos.jpg'))
  render(<Wrapper />)
  fireEvent.change(screen.getByLabelText('Subir bloque de imágenes a la galería'), {target: {files: files()}})
  await screen.findByRole('alert')
  fireEvent.click(screen.getByRole('button', {name: 'Reintentar pendientes'}))
  await screen.findByText(/2 de 2 imágenes subidas/)
  expect(apiResponse).toHaveBeenCalledTimes(3)
  expect(JSON.parse(screen.getByTestId('photos').textContent)).toHaveLength(3)
})

test('rechaza archivos no admitidos antes de subir el bloque', async () => {
  render(<Wrapper />)
  fireEvent.change(screen.getByLabelText('Subir bloque de imágenes a la galería'), {target: {files: [...files(), new File(['bad'], 'archivo.pdf', {type: 'application/pdf'})]}})
  await waitFor(() => expect(screen.getByRole('alert').textContent).toContain('archivo.pdf'))
  expect(apiResponse).not.toHaveBeenCalled()
  expect(JSON.parse(screen.getByTestId('photos').textContent)).toHaveLength(1)
})
