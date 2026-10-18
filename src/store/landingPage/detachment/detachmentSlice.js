import {createSlice} from '@reduxjs/toolkit'
import {getSiteSection, saveSiteSection} from '../../../repositories/siteSections'
import {handleError, resetIsSaving, setActiveSection, setMessageSaved, setSaving} from '../../dashboard/dashboardSlice'
import {emptyDetachment, getDetachments} from '../../../../shared/detachments'

export {emptyDetachment}
export const detachmentSlice = createSlice({
  name: 'detachment',
  initialState: {info: {sectionTitle: 'Destacamento', detachments: []}},
  reducers: {
    setDetachmentInfo: (state, action) => { state.info = {sectionTitle: 'Destacamento', detachments: getDetachments(action.payload)} },
  },
})
export const {setDetachmentInfo} = detachmentSlice.actions

export const saveDetachment = (info, message = 'Destacamento guardado correctamente.') => async (dispatch, getState) => {
  dispatch(setSaving())
  try {
    await saveSiteSection('detachment', info)
    const saved = await getSiteSection('detachment')
    if (!saved) throw new Error('No se pudo confirmar el guardado del destacamento.')
    dispatch(setDetachmentInfo(saved))
    if (getState().dashboard.section?.sectionKey === 'detachment') {
      dispatch(setActiveSection({...saved, sectionKey: 'detachment'}))
    }
    dispatch(setMessageSaved(message))
    return true
  } catch (error) {
    dispatch(handleError(error.message))
    return false
  } finally {
    dispatch(resetIsSaving())
  }
}
