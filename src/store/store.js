import {configureStore} from '@reduxjs/toolkit'
import {authSlice} from './auth'
import {dashboardSlice} from './dashboard'

/**
 * Redux store configuration using the @reduxjs/toolkit library.
 * The store combines reducers from different slices to manage the application's state.
 *
 * @type {import('@reduxjs/toolkit').EnhancedStore} The configured Redux store.
 * @property {Object} auth - The slice reducer managing authentication-related state.
 * @property {Object} dashboard - The slice reducer managing dashboard-related state.
 */
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    dashboard: dashboardSlice.reducer,
  },
})
