import React from 'react'
import {DetachmentEditor} from '../sections/detachment/DetachmentEditor'
import {
  Events,
  ExpeditionGroup,
  Footer,
  HeroSection,
  History,
  Navbar,
  Organization,
  ProgramStructure,
} from '../sections'

export const GrabView = ({sectionActive}) => {
  // console.log('grabview:', sectionActive)
  switch (sectionActive?.sectionKey) {
    case 'home':
      return <div>Selecciona una sección del menú para editar su contenido.</div>
    case 'navbar':
      return <Navbar info={sectionActive} />
    case 'heroSection':
      return <HeroSection info={sectionActive} />
    case 'history':
      return <History info={sectionActive} />
    case 'programStructure':
      return <ProgramStructure info={sectionActive} />
    case 'expeditionGroup':
      return <ExpeditionGroup info={sectionActive} />
    case 'events':
      return <Events info={sectionActive} />
    case 'organization':
      return <Organization info={sectionActive} />
    case 'footer':
      return <Footer info={sectionActive} />
    case 'detachment':
      return <DetachmentEditor info={sectionActive} />

    default:
      return <div>Selecciona una sección del menú para editar su contenido.</div>
  }
}
