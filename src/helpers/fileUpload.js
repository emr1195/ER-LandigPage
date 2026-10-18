/**
 * Uploads an image to the authenticated local API.
 *
 * @param {File} file - The file to be uploaded.
 * @returns {Promise<string>} A Promise that resolves to the secure URL of the uploaded file.
 * @throws {Error} Throws an error if the file is not provided or if the upload fails.
 */
export const fileUpload = async (file) => {
  if (!file) throw new Error('Ningún archivo fue enviado.')

  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/uploads', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })

    const payload = await response.json().catch(() => null)
    if (!response.ok) {
      throw new Error(payload?.error || 'No se pudo subir la imagen.')
    }
    return payload.url
  } catch (error) {
    throw new Error(`Error subiendo la imagen: ${error.message}`)
  }
}
