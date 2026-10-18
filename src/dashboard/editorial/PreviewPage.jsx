import React, {useEffect, useRef, useState} from 'react'
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
  const region = useRef(null)
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
    window.parent.postMessage(
      {type: 'preview-ready', sectionKey},
      window.location.origin,
    )
    return () => window.removeEventListener('message', receive)
  }, [sectionKey])
  useEffect(() => {
    if (!region.current) return
    let active = true
    let pending = 0
    let previous = 0
    const measure = () => {
      cancelAnimationFrame(pending)
      pending = requestAnimationFrame(() => {
        if (!active) return
        const height = Math.ceil(region.current.getBoundingClientRect().height)
        if (height === previous) return
        previous = height
        window.parent.postMessage(
          {type: 'preview-size', sectionKey, height},
          window.location.origin,
        )
      })
    }
    const observer = new ResizeObserver(measure)
    observer.observe(region.current)
    document.fonts.ready.then(() => {
      if (active) measure()
    })
    measure()
    return () => {
      active = false
      observer.disconnect()
      cancelAnimationFrame(pending)
    }
  }, [sectionKey, data])
  const [Component, prop] = views[sectionKey] || []
  if (!Component || !data) return <p role="status">Preparando vista previa…</p>
  return (
    <div
      ref={region}
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
