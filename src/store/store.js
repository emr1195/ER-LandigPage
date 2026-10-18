import {configureStore} from '@reduxjs/toolkit'
import {navbarSlice} from './landingPage/navbar/navbarSlice'
import {heroSectionSlice} from './landingPage/heroSection/heroSectionSlice'
import {historySlice} from './landingPage/history/historySlice'
import {programStructureSlice} from './landingPage/programStructure/programStructureSlice'
import {expeditionGroupSlice} from './landingPage/expeditionGroup/expeditionGroupSlice'
import {eventsSlice} from './landingPage/events/eventsSlice'
import {organizationSlice} from './landingPage/organization/organizationSlice'
import {footerSlice} from './landingPage/footer/footerSlice'
import {detachmentSlice} from './landingPage/detachment/detachmentSlice'

// Published public content only. Private drafts and sessions belong to the dashboard.
export const store = configureStore({reducer: {
  navbar: navbarSlice.reducer, heroSection: heroSectionSlice.reducer, history: historySlice.reducer,
  programStructure: programStructureSlice.reducer, expeditionGroup: expeditionGroupSlice.reducer,
  events: eventsSlice.reducer, organization: organizationSlice.reducer, footer: footerSlice.reducer,
  detachment: detachmentSlice.reducer,
}})
