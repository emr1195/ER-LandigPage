/**
 * Uploads a file to a cloud storage service (e.g., Cloudinary).
 *
 * @param {File} file - The file to be uploaded.
 * @returns {Promise<string>} A Promise that resolves to the secure URL of the uploaded file.
 * @throws {Error} Throws an error if the file is not provided or if the upload fails.
 */
export const fileUpload = async (file) => {
  // Check if a file is provided
  if (!file) throw new Error('Ningun archivo fue enviado!')

  try {
    // Cloudinary API URL for file upload
    const cloudURL = 'https://api.cloudinary.com/v1_1/er-landing-page/upload'

    // Create a FormData object and append necessary parameters
    const formData = new FormData()
    formData.append('upload_preset', 'er-landing-page')
    formData.append('file', file)

    // Send a POST request to the cloud storage service
    const resp = await fetch(cloudURL, {
      method: 'POST',
      body: formData,
    })

    // Check if the request was successful
    if (!resp.ok) throw new Error('No se pudo subir la imagen!')

    // Parse the JSON response from the cloud storage service
    const cloudResp = await resp.json()

    // Return the secure URL of the uploaded file
    return cloudResp.secure_url
  } catch (error) {
    // Handle any errors that occurred during the file upload
    throw new Error(`Error subiendo la imagen: ${error.message}`)
  }
}
