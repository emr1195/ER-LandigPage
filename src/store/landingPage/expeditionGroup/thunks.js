import {handleError, resetInfo, resetIsSaving, setSaving} from '../../dashboard'
import {
  resetSavingExpeditionGroup,
  setSavingExpeditionGroup,
} from './expeditionGroupSlice'
import {saveSiteSection} from '../../../repositories/siteSections'

export const savingNewExpeditionGroupInfo = (newExpeditionGroupInfo) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSavingExpeditionGroup())
      dispatch(setSaving())

      const {email} = getState().auth
      const date = new Date()

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let currentDate = `${day}-${month}-${year}`

      const copyNNI = structuredClone(newExpeditionGroupInfo)

      copyNNI.lastModified = currentDate
      copyNNI.updatedBy = email

      await saveSiteSection('expeditionGroup', copyNNI, email)

      dispatch(resetInfo('expeditionGroup', false))
    } catch (error) {
      // Handle errors during file uploads
      dispatch(handleError(error.message))
      throw new Error(
        'Error guardando la informacion de Grupos de Expediciones!!',
        error.message,
      )
    } finally {
      dispatch(resetSavingExpeditionGroup())
      dispatch(resetIsSaving())
    }
  }
}
