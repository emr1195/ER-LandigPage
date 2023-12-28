import {collection, getDocs} from 'firebase/firestore/lite'
import {FirebaseDB} from '../../firebase/config'
import {setNavbarInfo} from './navbar'
import {startLoadingHeroSection} from './heroSection'
import {setHistoryInfo} from './history'
import {setProgramStructureInfo} from './programStructure'
import {setExpeditionGroupInfo} from './expeditionGroup'
import {setEventsInfo} from './events'
import {setOrganizationInfo} from './organization'
import {setFooterInfo} from './footer'

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
        // hero_section: setHeroSectionInfo, // is special because it has a collection inside
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
        if (element.id === 'heroSection') {
          dispatch(startLoadingHeroSection())
        }
      })
    } catch (error) {
      // Handle errors related to loading notes from the database
      throw new Error('Error cargando Toda la Info de la DB!', error)
    }
  }
}
