import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {startLoadingLandingPage} from '../../store/landingPage'
import './styles.css'
import {
  Events,
  ExpeditionGroup,
  Footer,
  HeroSection,
  History,
  Navbar,
  Organization,
  ProgramStructure,
} from '../components'
import {CircularProgress} from '@mui/material'
import {Detachment} from '../components/detachment/Detachment'
export const HomePage = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const {info: navbarInfo} = useSelector((state) => state.navbar)
  const {info: heroSectionInfo} = useSelector((state) => state.heroSection)
  const {info: historyInfo} = useSelector((state) => state.history)
  const {info: programStructureInfo} = useSelector(
    (state) => state.programStructure,
  )
  const {info: expeditionGroupInfo} = useSelector(
    (state) => state.expeditionGroup,
  )
  const {info: eventsInfo} = useSelector((state) => state.events)
  const {info: organizationInfo} = useSelector((state) => state.organization)
  const {info: footerInfo} = useSelector((state) => state.footer)
  const {info: detachmentInfo} = useSelector((state) => state.detachment)

  useEffect(() => {
    let active = true
    // Initial Redux objects exist before the API responds; wait for the request
    // rather than flashing empty logos, buttons and images from those objects.
    Promise.resolve(dispatch(startLoadingLandingPage())).finally(() => {
      if (active) setLoading(false)
    })
    return () => { active = false }
  }, [dispatch])

  if (loading) {
    return <CircularProgress aria-label="Cargando información del sitio" />
  }

  return (
    <main>
      <Navbar navbarInfo={navbarInfo} />
      <HeroSection heroSectionInfo={heroSectionInfo} fallbackImage={{imageURL: historyInfo.imageSection?.imageRight, title: 'Encuentro institucional de Exploradores del Rey Panamá'}} />
      <History historyInfo={historyInfo} />
      <ProgramStructure programStructureInfo={programStructureInfo} />
      <ExpeditionGroup expeditionGroupInfo={expeditionGroupInfo} />
      <Events eventsInfo={eventsInfo} />
      <Organization organizationInfo={organizationInfo} />
      <Detachment info={detachmentInfo} />
      <Footer footerInfo={footerInfo} />
      {/* {info.listMenu.map((item, index) => (
        <div key={index}>{item.title}</div>
      ))} */}
      {/* Hola Mundo */}
    </main>
  )
}
