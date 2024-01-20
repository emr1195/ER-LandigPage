import {doc, setDoc} from 'firebase/firestore/lite'
import {FirebaseDB} from '../../../firebase/config'
import {fileUpload} from '../../../helpers'
import {
  handleError,
  resetInfo,
  resetIsSaving,
  setActiveSection,
  setSaving,
} from '../../dashboard'
import {resetSavingNavbar, setLogoImage, setSavingNavbar} from './navbarSlice'

/**
 * Initiates the uploading of multiple files and updates the active note with the corresponding photo URLs.
 *
 * @param {File[]} files - An array of File objects to be uploaded.
 * @returns {Promise<void>} A Promise that resolves once all files are successfully uploaded.
 * @throws {Error} Throws an error if there is an issue with file uploads.
 */
export const startUploadingLogo = (file = '') => {
  return async (dispatch, getState) => {
    try {
      // Dispatch an action to indicate that saving is in progress
      dispatch(setSavingNavbar())

      // upload file
      const newLogoUrl = await fileUpload(file)

      // Dispatch an action to set the photo URLs to the active note
      dispatch(setLogoImage(newLogoUrl))

      // Get navbar info again that has been updated
      const {info} = getState().navbar

      //   updated dashboard info
      dispatch(setActiveSection(info))
    } catch (error) {
      // Handle errors during file uploads
      dispatch(handleError(error.message))
      throw new Error('Error subiendo imagen!!', error.message)
    } finally {
      // Dispatch an action to reset the isSaving state
      dispatch(resetSavingNavbar())
    }
  }
}

export const savingNewNavbar = (newNavbarInfo) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSavingNavbar())
      dispatch(setSaving())

      // cloning newNavbarInfo  to remove property disabled from listMenu
      const copyNNI = structuredClone(newNavbarInfo)

      const newListMenu = copyNNI.listMenu.map((item) => {
        const QRWV = {...item}
        delete QRWV.disabled // cleaning up disabled for DB
        return QRWV
      })

      copyNNI.listMenu = newListMenu // updating copyNNI with the latest newListMenu

      const docRef = doc(FirebaseDB, `er_landing_page/navbar`)

      await setDoc(docRef, copyNNI, {merge: true})

      dispatch(resetInfo('navbar'))
    } catch (error) {
      // Handle errors during file uploads
      dispatch(handleError(error.message))
      throw new Error(
        'Error guardando la informacion de navbar!!',
        error.message,
      )
    } finally {
      dispatch(resetSavingNavbar())
      dispatch(resetIsSaving())
    }
  }
}
