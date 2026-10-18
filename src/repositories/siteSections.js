import {apiRequest} from '../api/client'
import {prepareSection} from '../helpers/prepareSection'

export const getSiteSections = async () => {
  const data = await apiRequest('/api/site-sections')
  return data.map(({id, data: sectionData}) => ({...prepareSection(sectionData), id}))
}
