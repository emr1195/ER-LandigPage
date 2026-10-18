import {handleError, resetInfo, resetIsSaving, setSaving} from '../../dashboard'
import {resetSavingHistory, setSavingHistory} from './historySlice'
import {saveSiteSection} from '../../../repositories/siteSections'

export const savingNewHistory = (newHistoryInfo) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSavingHistory())
      dispatch(setSaving())

      const {email} = getState().auth
      const date = new Date()

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let currentDate = `${day}-${month}-${year}`

      // cloning newHistoryInfo  to remove property disabled from listMenu
      const copyNNI = structuredClone(newHistoryInfo)

      copyNNI.lastModified = currentDate
      copyNNI.updatedBy = email

      await saveSiteSection('history', copyNNI, email)

      dispatch(resetInfo('history', false))
    } catch (error) {
      // Handle errors during file uploads
      dispatch(handleError(error.message))
      throw new Error(
        'Error guardando la informacion de history!!',
        error.message,
      )
    } finally {
      dispatch(resetSavingHistory())
      dispatch(resetIsSaving())
    }
  }
}
