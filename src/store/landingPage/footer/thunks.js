import {handleError, resetInfo, resetIsSaving, setSaving} from '../../dashboard'
import {resetSavingFooter, setSavingFooter} from './footerSlice'
import {saveSiteSection} from '../../../repositories/siteSections'

export const savingNewFooter = (newFooterInfo) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSavingFooter())
      dispatch(setSaving())

      const {email} = getState().auth
      const date = new Date()

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let currentDate = `${day}-${month}-${year}`

      // cloning newHistoryInfo  to remove property disabled from listMenu
      const copyNNI = structuredClone(newFooterInfo)

      copyNNI.lastModified = currentDate
      copyNNI.updatedBy = email

      await saveSiteSection('footer', copyNNI, email)

      dispatch(resetInfo('footer', false))
    } catch (error) {
      // Handle errors during file uploads
      dispatch(handleError(error.message))
      throw new Error(
        'Error guardando la informacion de Footer!!',
        error.message,
      )
    } finally {
      dispatch(resetSavingFooter())
      dispatch(resetIsSaving())
    }
  }
}
