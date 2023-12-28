import {createSlice} from '@reduxjs/toolkit'
import {initialStateProgramStructure} from '../../../types'

export const programStructureSlice = createSlice({
  name: 'programStructure',
  initialState: initialStateProgramStructure,
  reducers: {
    setSavingProgramStructure: (state, action) => {
      state.isSaving = true
    },

    setProgramStructureInfo: (state, action) => {
      // grab update from DB
      state.info = action.payload
    },
    resetSavingProgramStructure: (state, action) => {
      state.isSaving = false
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setSavingProgramStructure,
  setProgramStructureInfo,
  resetSavingProgramStructure,
} = programStructureSlice.actions
