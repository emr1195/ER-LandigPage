import {setNavbarInfo} from './navbar'
import {setHeroSectionInfo, startLoadingHeroSection} from './heroSection'
import {setHistoryInfo} from './history'
import {
  resetSavingProgramStructure,
  setProgramStructureInfo,
  setSavingProgramStructure,
} from './programStructure'
import {setExpeditionGroupInfo} from './expeditionGroup'
import {setEventsInfo} from './events'
import {setOrganizationInfo} from './organization'
import {setFooterInfo} from './footer'
import {setDetachmentInfo} from './detachment/detachmentSlice'
import {handleError, resetInfo, resetIsSaving, setSaving} from '../dashboard'
import {getSiteSections, saveSiteSection} from '../../repositories/siteSections'

export const startLoadingLandingPage = () => {
  return async (dispatch, getState) => {
    try {
      const allInfo = await getSiteSections()

      // console.log(allInfo)

      const idToDispatchMap = {
        /* Corresponding dispatch action for 'navbar' */
        navbar: setNavbarInfo,
        /* Corresponding dispatch action for 'hero_section' */
        heroSection: setHeroSectionInfo, // is special because it has a collection inside
        /* Corresponding dispatch action for 'historia' */
        history: setHistoryInfo,
        /* Corresponding dispatch action for 'program_structure' */
        programStructure: setProgramStructureInfo,
        /* Corresponding dispatch action for 'expedition_group' */
        expeditionGroup: setExpeditionGroupInfo,
        /* Corresponding dispatch action for 'events' */
        events: setEventsInfo,
        /* Corresponding dispatch action for 'organization' */
        organization: setOrganizationInfo,
        /* Corresponding dispatch action for 'footer' */
        footer: setFooterInfo,
        detachment: setDetachmentInfo,
      }

      allInfo.forEach((element) => {
        const dispatchAction = idToDispatchMap[element.id]
        if (dispatchAction) {
          dispatch(dispatchAction(element))
          // console.log(dispatchAction(element))
        }
        // if (element.id === 'heroSection') {
        //   dispatch(startLoadingHeroSection())
        // }
      })
    } catch (error) {
      dispatch(handleError(error.message))
    }
  }
}

export const savingNewProgramStructure = (newProgramStructureInfo) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSavingProgramStructure())
      dispatch(setSaving())

      const {email} = getState().auth
      const date = new Date()

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let currentDate = `${day}-${month}-${year}`

      const copyNNI = structuredClone(newProgramStructureInfo)

      copyNNI.lastModified = currentDate
      copyNNI.updatedBy = email

      await saveSiteSection('programStructure', copyNNI, email)

      dispatch(resetInfo('programStructure', false))
    } catch (error) {
      // Handle errors during file uploads
      dispatch(handleError(error.message))
      throw new Error(
        'Error guardando la informacion de Estructure del Programa!!',
        error.message,
      )
    } finally {
      dispatch(resetSavingProgramStructure())
      dispatch(resetIsSaving())
    }
  }
}
