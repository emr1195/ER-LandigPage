import {createSlice} from '@reduxjs/toolkit'
import {initialStateEvents} from '../../../types'

export const eventsSlice = createSlice({
  name: 'events',
  initialState: initialStateEvents,
  reducers: {
    setSavingEvents: (state, action) => {
      state.isSaving = true
    },
    setEventsInfo: (state, action) => {
      state.info = action.payload
    },
    resetSavingEvents: (state, action) => {
      state.isSaving = false
    },
  },
})

// Action creators are generated for each case reducer function
export const {setSavingEvents, setEventsInfo, resetSavingEvents} =
  eventsSlice.actions
