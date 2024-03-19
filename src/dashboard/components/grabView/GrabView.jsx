import React from 'react'
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
  switch (sectionActive?.sectionTitle?.toLowerCase()) {
    case 'inicio':
      return <div>Inicio</div>
    case 'navbar':
      return <Navbar info={sectionActive} />
    case 'hero section':
      return <HeroSection info={sectionActive} />
    case 'historia':
      return <History info={sectionActive} />
    case 'estructura del programa':
      return <ProgramStructure info={sectionActive} />
    case 'grupos':
      return <ExpeditionGroup info={sectionActive} />
    case 'eventos':
      return <Events info={sectionActive} />
    case 'organizacion':
      return <Organization info={sectionActive} />
    case 'footer':
      return <Footer info={sectionActive} />

    default:
      return <div>GrabView</div>
  }
}
