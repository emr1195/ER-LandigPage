import {getDetachments} from '../../../shared/detachments'
import {prepareSection} from '../../helpers/prepareSection'
import {findSection} from './sections'

const image = {title: '', icon: '', imageURL: ''}
const templates = {
  navbar: {logoTitle: '', logo: '', listMenu: []},
  heroSection: {
    textSection: {
      title: '',
      description: '',
      iconText: '',
      icon: '',
      buttons: [],
    },
    imageSection: {
      imageTopLeft: image,
      imageBottomLeft: image,
      imageRightCenter: image,
    },
  },
  history: {
    description: '',
    subTitle: '',
    subTitleText: '',
    imageSection: {imageLeft: '', imageRight: '', icon: '', iconText: ''},
    infoSection: [],
  },
  programStructure: {programValues: []},
  expeditionGroup: {expeditionGroups: []},
  events: {events: []},
  organization: {members: {coorNac: [], comNac: [], teamNac: [], cmDist: []}},
  detachment: {detachments: []},
  footer: {
    mainSection: {logo: '', logoTitle: '', moreInfo: []},
    menus: [],
    socialMedia: [],
    aditionalFooterInfo: [],
  },
}
const fillMissing = (value, fallback) => {
  if (value === null || value === undefined) return structuredClone(fallback)
  if (fallback && typeof fallback === 'object' && !Array.isArray(fallback)) {
    return {
      ...value,
      ...Object.fromEntries(
        Object.entries(fallback).map(([key, entry]) => [
          key,
          fillMissing(value[key], entry),
        ]),
      ),
    }
  }
  return value
}
export const normalizeDraft = (sectionKey, value) => {
  const data = fillMissing(value, {
    title: '',
    sectionTitle: findSection(sectionKey)?.label || '',
    ...templates[sectionKey],
  })
  if (sectionKey === 'detachment')
    data.detachments = getDetachments(value || {})
  return prepareSection(data)
}
