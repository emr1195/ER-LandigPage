import {createSlice} from '@reduxjs/toolkit'
import {initialStateNavbar} from '../../../types'

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState: initialStateNavbar,
  reducers: {
    setNavbarInfo: (state, action) => {
      // grab update from DB
      state.info = action.payload
    },

    //saving
    setSavingNavbar: (state, action) => {
      state.isSaving = true
    },
    resetSavingNavbar: (state, action) => {
      state.isSaving = false
    },

    //logo image
    setLogoImage: (state, action) => {
      state.info.logo = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {setNavbarInfo, setSavingNavbar, resetSavingNavbar, setLogoImage} =
  navbarSlice.actions
