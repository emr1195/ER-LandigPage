import {createSlice} from '@reduxjs/toolkit'
import {initialStateOrganization} from '../../../types'

export const organizationSlice = createSlice({
  name: 'organization',
  initialState: initialStateOrganization,
  reducers: {
    setSavingOrganization: (state, action) => {
      state.isSaving = true
    },
    setOrganizationInfo: (state, action) => {
      state.info = action.payload
    },
    resetSavingOrganization: (state, action) => {
      state.isSaving = false
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  resetSavingOrganization,
  setSavingOrganization,
  setOrganizationInfo,
} = organizationSlice.actions
