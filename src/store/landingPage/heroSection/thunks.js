import {collection, doc, getDocs, setDoc} from 'firebase/firestore/lite'
import {FirebaseDB} from '../../../firebase/config'
import {
  resetSavingHeroSection,
  setHeroSectionInfo,
  setSavingHeroSection,
} from './heroSectionSlice'
import {handleError, resetInfo, resetIsSaving, setSaving} from '../../dashboard'

export const startLoadingHeroSection = () => {
  return async (dispatch, getState) => {
    try {
      // Reference to the Firestore collection containing user's notes
      const collectionRef = collection(
        FirebaseDB,
        `er_landing_page/heroSection/infoSection`,
      )

      // Retrieve documents (notes) from the collection
      const querySnapshot = await getDocs(collectionRef)

      // Extract notes from the query snapshot
      const newHeroSection = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      dispatch(setHeroSectionInfo(newHeroSection))
    } catch (error) {
      // Handle errors related to loading notes from the database
      throw new Error('Error cargando HeroSection de la DB!', error)
    }
  }
}

// export const updateListMenu = () => {
//   return async (dispatch, getState) => {
//     dispatch(setSavingNavbar())

//     const {uid, displayName} = getState().auth
//     const {listMenu: menuModified} = getState().navbar

//     // Construct the Firestore document reference for the active note
//     const docRef = doc(FirebaseDB, `notes/journal/notes/${activeNote.id}`)
//   }
// }

export const savingNewHeroSection = (newHeroSectionInfo) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSavingHeroSection())
      dispatch(setSaving())

      const {displayName, email, uid} = getState().auth
      const date = new Date()

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let currentDate = `${day}-${month}-${year}`

      // cloning newHeroSectionInfo  to remove property disabled from listMenu
      const copyNNI = structuredClone(newHeroSectionInfo)

      copyNNI.lastModified = currentDate
      copyNNI.updatedBy = email

      const docRef = doc(FirebaseDB, `er_landing_page/heroSection`)

      await setDoc(docRef, copyNNI, {merge: true})

      dispatch(resetInfo('heroSection', false))
    } catch (error) {
      // Handle errors during file uploads
      dispatch(handleError(error.message))
      throw new Error(
        'Error guardando la informacion de heroSection!!',
        error.message,
      )
    } finally {
      dispatch(resetSavingHeroSection())
      dispatch(resetIsSaving())
    }
  }
}
