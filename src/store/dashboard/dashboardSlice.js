import {createSlice} from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    isSaving: false,
    messageSaved: '',
    section: [],
    active: null,
    errorDB: '',
    // active: {
    //     id: 'ABC123',
    //     title: '',
    //     body: '',
    //     date: 1234567,
    //     imagesUrls: [], // arreglo de links de imagenes
    // }
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload)
      state.isSaving = false
      state.messageSaved = 'Nueva entrada guardada exitosamente!'
    },
    setActiveSection: (state, action) => {
      // console.log(action.payload)
      state.section = action.payload
    },
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    setSaving: (state) => {
      state.isSaving = true
      //TODO: mensaje de error...
    },
    updateNote: (state, action) => {
      //payload: note
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload
        }

        return note
      })

      //TODO: mostrar mensaje de actualizacion
      state.messageSaved = `${action.payload.title}, actualizada correctamente`
    },
    deleteNoteById: (state, action) => {
      state.active = null
      state.notes = state.notes.filter((note) => note.id !== action.payload)
    },

    setPhotosToActiveNote: (state, action) => {
      state.active.imagesUrls = [...state.active.imagesUrls, ...action.payload]
    },
    clearNotesLogout: (state) => {
      resetIsSaving()
      resetMessageSaved()
      resetError()
      state.notes = []
      state.active = null
    },
    // New action to handle errors during the save process
    handleError: (state, action) => {
      state.isSaving = false
      state.errorDB = action.payload // Set the error in the state
    },
    // Reset error state to an empty string
    resetError: (state) => {
      state.errorDB = ''
    },
    resetMessageSaved: (state) => {
      state.messageSaved = ''
    },
    resetIsSaving: (state) => {
      state.isSaving = false
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  handleError,
  resetError,
  resetIsSaving,
  resetMessageSaved,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,

  ////////////////////////////
  setActiveSection,
} = dashboardSlice.actions

// export const {setActiveSection} = dashboardSlice.actions
