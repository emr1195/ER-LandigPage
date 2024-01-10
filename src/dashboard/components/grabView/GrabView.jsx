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
  // console.log(sectionActive)
  switch (sectionActive?.sectionTitle?.toLowerCase()) {
    case 'inicio':
      return <div>Inicio</div>
    case 'navbar':
      return <Navbar info={sectionActive} />
    case 'hero section':
      return <HeroSection />
    case 'historia':
      return <History info={sectionActive} />
    case 'estructura del programa':
      return <ProgramStructure />
    case 'grupos':
      return <ExpeditionGroup />
    case 'eventos':
      return <Events />
    case 'organizacion':
      return <Organization />
    case 'footer':
      return <Footer />

    default:
      return <div>GrabView</div>
  }
}
