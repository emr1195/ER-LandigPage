import {apiResponse} from '../../api/client'

export const readContent = async (key) => {
  const response = await apiResponse(
    '/api/site-sections/' + encodeURIComponent(key),
    {cache: 'no-store'},
  )
  const revision = response.headers.get('etag')
  if (!revision)
    throw new Error(
      'No recibimos la revisión del contenido. Reintenta la carga antes de publicar.',
    )
  return {data: await response.json(), revision}
}
export const publishContent = async (key, data, revision) => {
  const response = await apiResponse(
    '/api/site-sections/' + encodeURIComponent(key),
    {
      method: 'PUT',
      headers: {'If-Match': revision},
      body: JSON.stringify(data),
    },
  )
  const saved = await response.json()
  return {data: saved.data, revision: response.headers.get('etag')}
}
