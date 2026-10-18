import {
  resetSavingHeroSection,
  setHeroSectionInfo,
  setSavingHeroSection,
} from './heroSectionSlice'
import {handleError, resetInfo, resetIsSaving, setSaving} from '../../dashboard'
import {
  getSiteSection,
  saveSiteSection,
} from '../../../repositories/siteSections'

export const startLoadingHeroSection = () => {
  return async (dispatch, getState) => {
    try {
      const newHeroSection = await getSiteSection('heroSection')
      if (newHeroSection) dispatch(setHeroSectionInfo(newHeroSection))
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

      const {email} = getState().auth
      const date = new Date()

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let currentDate = `${day}-${month}-${year}`

      // cloning newHeroSectionInfo  to remove property disabled from listMenu
      const copyNNI = structuredClone(newHeroSectionInfo)

      copyNNI.lastModified = currentDate
      copyNNI.updatedBy = email

      await saveSiteSection('heroSection', copyNNI, email)

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
