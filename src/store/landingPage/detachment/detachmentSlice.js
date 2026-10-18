import {createSlice} from '@reduxjs/toolkit'
import {getDetachments} from '../../../../shared/detachments'

export const detachmentSlice = createSlice({
  name: 'detachment',
  initialState: {info: {sectionTitle: 'Destacamento', detachments: []}},
  reducers: {
    setDetachmentInfo: (state, action) => {state.info = {...action.payload, sectionTitle: action.payload.sectionTitle || 'Destacamento', detachments: getDetachments(action.payload)}},
  },
})
export const {setDetachmentInfo} = detachmentSlice.actions
