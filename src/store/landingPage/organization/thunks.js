import {handleError, resetInfo, resetIsSaving, setSaving} from '../../dashboard'
import {
  resetSavingOrganization,
  setSavingOrganization,
} from './organizationSlice'
import {saveSiteSection} from '../../../repositories/siteSections'

export const savingNewOrganization = (newOrganizationInfo) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSavingOrganization())
      dispatch(setSaving())

      const {email} = getState().auth
      const date = new Date()

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let currentDate = `${day}-${month}-${year}`

      // cloning newHistoryInfo  to remove property disabled from listMenu
      const copyNNI = structuredClone(newOrganizationInfo)

      copyNNI.lastModified = currentDate
      copyNNI.updatedBy = email

      await saveSiteSection('organization', copyNNI, email)

      dispatch(resetInfo('organization', false))
    } catch (error) {
      // Handle errors during file uploads
      dispatch(handleError(error.message))
      throw new Error(
        'Error guardando la informacion de Organizacion!!',
        error.message,
      )
    } finally {
      dispatch(resetSavingOrganization())
      dispatch(resetIsSaving())
    }
  }
}
