import {createSlice} from '@reduxjs/toolkit'

export const footerSlice = createSlice({
  name: 'footer',
  initialState: {
    isSaving: false,
    info: {},
    active: false,
  },
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
