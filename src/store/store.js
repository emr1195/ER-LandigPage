import {configureStore} from '@reduxjs/toolkit'
import {authSlice} from './auth'
import {dashboardSlice} from './dashboard'
import {navbarSlice} from './landingPage/navbar/navbarSlice'
import {heroSectionSlice} from './landingPage/heroSection'
import {historySlice} from './landingPage/history/historySlice'
import {programStructureSlice} from './landingPage/programStructure/programStructureSlice'
import {expeditionGroupSlice} from './landingPage/expeditionGroup/expeditionGroupSlice'
import {eventsSlice} from './landingPage/events/eventsSlice'
import {organizationSlice} from './landingPage/organization/organizationSlice'
import {footerSlice} from './landingPage/footer/footerSlice'

/**
 * Redux store configuration using the @reduxjs/toolkit library.
 * The store combines reducers from different slices to manage the application's state.
 *
 * @type {import('@reduxjs/toolkit').EnhancedStore} The configured Redux store.
 * @property {Object} auth - The slice reducer managing authentication-related state.
 * @property {Object} dashboard - The slice reducer managing dashboard-related state.
 * @property {Object} navbar - The slice reducer managing navbar-related state.
 * @property {Object} heroSection - The slice reducer managing hero section-related state.
 * @property {Object} history - The slice reducer managing history-related state.
 * @property {Object} programStructure - The slice reducer managing programStructure-related state.
 * @property {Object} expeditionGroup - The slice reducer managing expeditionGroup-related state.
 * @property {Object} events - The slice reducer managing events-related state.
 * @property {Object} organization - The slice reducer managing organization-related state.
 * @property {Object} footer - The slice reducer managing footer-related state.
 */
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    dashboard: dashboardSlice.reducer,
    navbar: navbarSlice.reducer,
    heroSection: heroSectionSlice.reducer,
    history: historySlice.reducer,
    programStructure: programStructureSlice.reducer,
    expeditionGroup: expeditionGroupSlice.reducer,
    events: eventsSlice.reducer,
    organization: organizationSlice.reducer,
    footer: footerSlice.reducer,
  },
})
