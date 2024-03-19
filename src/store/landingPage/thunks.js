import {collection, doc, getDocs, setDoc} from 'firebase/firestore/lite'
import {FirebaseDB} from '../../firebase/config'
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
import {handleError, resetInfo, resetIsSaving, setSaving} from '../dashboard'

export const startLoadingLandingPage = () => {
  return async (dispatch, getState) => {
    try {
      const collectionRef = collection(FirebaseDB, `er_landing_page`)

      const querySnapshot = await getDocs(collectionRef)

      const allInfo = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

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
      // Handle errors related to loading notes from the database
      throw new Error('Error cargando Toda la Info de la DB!', error)
    }
  }
}

export const savingNewProgramStructure = (newProgramStructureInfo) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSavingProgramStructure())
      dispatch(setSaving())

      const {displayName, email, uid} = getState().auth
      const date = new Date()

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let currentDate = `${day}-${month}-${year}`

      const copyNNI = structuredClone(newProgramStructureInfo)

      copyNNI.lastModified = currentDate
      copyNNI.updatedBy = email

      const docRef = doc(FirebaseDB, `er_landing_page/programStructure`)

      await setDoc(docRef, copyNNI, {merge: true})

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
