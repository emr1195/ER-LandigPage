import {createSlice} from '@reduxjs/toolkit'
import {initialStateNavbar} from '../../../types'

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState: initialStateNavbar,
  reducers: {
    setSavingNavbar: (state, action) => {
      state.isSaving = true
    },

    setNavbarInfo: (state, action) => {
      // grab update from DB
      state.info = action.payload
    },
    resetSavingNavbar: (state, action) => {
      state.isSaving = false
    },
  },
})

// Action creators are generated for each case reducer function
export const {resetSavingNavbar, setNavbarInfo, setSavingNavbar} =
  navbarSlice.actions
