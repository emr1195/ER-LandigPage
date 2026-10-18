import {handleError, resetInfo, resetIsSaving, setSaving} from '../../dashboard'
import {resetSavingEvents, setSavingEvents} from './eventsSlice'
import {saveSiteSection} from '../../../repositories/siteSections'

export const savingNewEventsInfo = (newEventsInfo) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSavingEvents())
      dispatch(setSaving())

      // cloning newNavbarInfo  to remove property disabled from listMenu
      const copyNNI = structuredClone(newEventsInfo)

      const date = new Date()
      const {email} = getState().auth

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let currentDate = `${day}-${month}-${year}`

      copyNNI.lastModified = currentDate
      copyNNI.updatedBy = email

      await saveSiteSection('events', copyNNI, email)

      dispatch(resetInfo('events', false))
    } catch (error) {
      // Handle errors during file uploads
      dispatch(handleError(error.message))
      throw new Error(
        'Error guardando la informacion de Eventos!!',
        error.message,
      )
    } finally {
      dispatch(resetSavingEvents())
      dispatch(resetIsSaving())
    }
  }
}
