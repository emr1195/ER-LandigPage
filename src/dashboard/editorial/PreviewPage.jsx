import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {
  Navbar,
  HeroSection,
  History,
  ProgramStructure,
  ExpeditionGroup,
  Events,
  Organization,
  Footer,
} from '../../homepage/components'
import {Detachment} from '../../homepage/components/detachment/Detachment'
import '../../homepage/pages/styles.css'

const views = {
  navbar: [Navbar, 'navbarInfo'],
  heroSection: [HeroSection, 'heroSectionInfo'],
  history: [History, 'historyInfo'],
  programStructure: [ProgramStructure, 'programStructureInfo'],
  expeditionGroup: [ExpeditionGroup, 'expeditionGroupInfo'],
  events: [Events, 'eventsInfo'],
  organization: [Organization, 'organizationInfo'],
  footer: [Footer, 'footerInfo'],
  detachment: [Detachment, 'info'],
}
export const PreviewPage = () => {
  const {sectionKey} = useParams()
  const [data, setData] = useState(null)
  useEffect(() => {
    const receive = (event) => {
      if (
        event.origin === window.location.origin &&
        event.source === window.parent &&
        event.data?.type === 'admin-preview' &&
        event.data.sectionKey === sectionKey
      )
        setData(event.data.data)
    }
    window.addEventListener('message', receive)
    window.parent.postMessage({type: 'preview-ready'}, window.location.origin)
    return () => window.removeEventListener('message', receive)
  }, [sectionKey])
  const [Component, prop] = views[sectionKey] || []
  if (!Component || !data) return <p role="status">Preparando vista previa…</p>
  return (
    <div
      role="region"
      aria-label="Contenido de la vista previa"
      onClickCapture={(event) => {
        if (event.target.closest('a')) event.preventDefault()
      }}
    >
      <Component {...{[prop]: data}} />
    </div>
  )
}
