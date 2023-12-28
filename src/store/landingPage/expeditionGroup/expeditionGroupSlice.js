import {createSlice} from '@reduxjs/toolkit'
import {initialStateExpeditionGroup} from '../../../types'

export const expeditionGroupSlice = createSlice({
  name: 'expeditionGroup',
  initialState: initialStateExpeditionGroup,
  reducers: {
    setSavingExpeditionGroup: (state, action) => {
      state.isSaving = true
    },
    setExpeditionGroupInfo: (state, action) => {
      state.info = action.payload
    },
    resetSavingExpeditionGroup: (state, action) => {
      state.isSaving = false
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setExpeditionGroupInfo,
  setSavingExpeditionGroup,
  resetSavingExpeditionGroup,
} = expeditionGroupSlice.actions
