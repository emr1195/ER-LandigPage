import {createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
    accessed: false,
  },
  reducers: {
    login: (state, {payload}) => {
      state.status = 'authenticated'
      state.uid = payload.uid
      state.email = payload.email
      state.displayName = payload.displayName
      state.photoURL = payload.photoURL
      ;(state.errorMessage = null), (state.accessed = true)
    },
    logout: (state, {payload}) => {
      state.status = 'not-authenticated'
      state.uid = null
      state.email = null
      state.displayName = null
      state.photoURL = null
      ;(state.errorMessage = payload?.errorMessage), (state.accessed = false)
    },
    checkingCredentials: (state) => {
      state.status = 'checking'
    },
  },
})

// Action creators are generated for each case reducer function
export const {login, logout, checkingCredentials} = authSlice.actions

/**
 * Redux slice responsible for managing authentication state.
 *
 * @typedef {Object} AuthState
 * @property {string} status - The authentication status. Possible values: 'checking', 'not-authenticated', 'authenticated'.
 * @property {string|null} uid - The user's unique identifier.
 * @property {string|null} email - The user's email address.
 * @property {string|null} displayName - The user's display name.
 * @property {string|null} photoURL - The URL of the user's profile photo.
 * @property {string|null} errorMessage - An error message associated with authentication.
 *
 * @example
 * // Initial state of the auth slice
 * const initialState = {
 *   status: 'not-authenticated',
 *   uid: null,
 *   email: null,
 *   displayName: null,
 *   photoURL: null,
 *   errorMessage: null,
 * };
 *
 * // Usage in a Redux store
 * const authSlice = createSlice({
 *   displayName: 'auth',
 *   initialState,
 *   reducers: {
 *     login: (state, {payload}) => {
 *       // Reducer logic for handling login action
 *     },
 *     logout: (state, {payload}) => {
 *       // Reducer logic for handling logout action
 *     },
 *     checkingCredentials: (state) => {
 *       // Reducer logic for handling checkingCredentials action
 *     },
 *   },
 * });
 *
 * // Action creators generated for each case reducer function
 * const {login, logout, checkingCredentials} = authSlice.actions;
 *
 * // Export the authSlice and its actions for Redux store integration
 * export {authSlice, login, logout, checkingCredentials};
 */
