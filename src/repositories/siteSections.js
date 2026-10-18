import {apiRequest} from '../api'
import {prepareSection} from '../helpers/prepareSection'

export const getSiteSections = async () => {
  const data = await apiRequest('/api/site-sections')
  return data.map(({id, data: sectionData}) => ({...prepareSection(sectionData), id}))
}

export const getSiteSection = async (id) => {
  const data = await apiRequest(`/api/site-sections/${encodeURIComponent(id)}`)
  return data ? prepareSection(data) : null
}

export const saveSiteSection = async (id, sectionData, updatedBy) => {
  await apiRequest(`/api/site-sections/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(sectionData),
  })
}
