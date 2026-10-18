import {getSiteSections} from '../../repositories/siteSections'
import {setNavbarInfo} from './navbar/navbarSlice'
import {setHeroSectionInfo} from './heroSection/heroSectionSlice'
import {setHistoryInfo} from './history/historySlice'
import {setProgramStructureInfo} from './programStructure/programStructureSlice'
import {setExpeditionGroupInfo} from './expeditionGroup/expeditionGroupSlice'
import {setEventsInfo} from './events/eventsSlice'
import {setOrganizationInfo} from './organization/organizationSlice'
import {setFooterInfo} from './footer/footerSlice'
import {setDetachmentInfo} from './detachment/detachmentSlice'

const receivers = {navbar: setNavbarInfo, heroSection: setHeroSectionInfo, history: setHistoryInfo, programStructure: setProgramStructureInfo, expeditionGroup: setExpeditionGroupInfo, events: setEventsInfo, organization: setOrganizationInfo, footer: setFooterInfo, detachment: setDetachmentInfo}
export const startLoadingLandingPage = () => async dispatch => {
  try {
    for (const section of await getSiteSections()) if (receivers[section.id]) dispatch(receivers[section.id](section))
    return {ok: true}
  } catch (error) {
    // Preserve the public site's existing fallback content when its API is unavailable.
    return {ok: false, error: error.message}
  }
}
