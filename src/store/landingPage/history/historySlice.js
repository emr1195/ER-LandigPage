import {createSlice} from '@reduxjs/toolkit'
import {initlaStateHistory} from '../../../types'

export const historySlice = createSlice({
  name: 'history',
  initialState: initlaStateHistory,
  reducers: {
    setSavingHistory: (state, action) => {
      state.isSaving = true
    },
    setHistoryInfo: (state, action) => {
      // sadsfas
      // console.log('here', action.payload)
      state.info = action.payload
    },
    resetSavingHistory: (state, action) => {
      state.isSaving = false
    },
  },
})

// Action creators are generated for each case reducer function
export const {setHistoryInfo, setSavingHistory, resetSavingHistory} =
  historySlice.actions
