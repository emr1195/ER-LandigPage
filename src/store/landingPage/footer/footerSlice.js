import {createSlice} from '@reduxjs/toolkit'
import {initialStateFooter} from '../../../types'

export const footerSlice = createSlice({
  name: 'footer',
  initialState: initialStateFooter,
  reducers: {
    setSavingFooter: (state, action) => {
      state.isSaving = true
    },
    setFooterInfo: (state, action) => {
      state.info = action.payload
    },
    resetSavingFooter: (state, action) => {
      state.isSaving = false
    },
  },
})

// Action creators are generated for each case reducer function
export const {setFooterInfo, setSavingFooter, resetSavingFooter} =
  footerSlice.actions
