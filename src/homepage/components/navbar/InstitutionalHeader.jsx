import React, {useEffect, useId, useMemo, useRef, useState} from 'react'
import {Logo} from './components/logo/Logo'
import {SiteLink} from '../navigation/SiteLink'
import {useHeaderNavigation} from './useHeaderNavigation'
import './institutional.css'

export const InstitutionalHeader = ({navbarInfo = {}}) => {
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(() => window.innerWidth < 1180)
  const header = useRef(null)
  const toggle = useRef(null)
  const menuId = useId()
  const links = useMemo(() => [...(navbarInfo.listMenu || [])].filter((item) => item.title?.trim()).sort((a, b) => (Number(a.position) || 0) - (Number(b.position) || 0)), [navbarInfo.listMenu])
  const {activeIndex, scrolled} = useHeaderNavigation(links, header)
  useEffect(() => {
    const resize = () => {
      const next = window.innerWidth < 1180
      setCompact(next)
      if (!next) setOpen(false)
    }
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])
  useEffect(() => {
    if (!open) return undefined
    const closeOutside = (event) => { if (!header.current?.contains(event.target)) setOpen(false) }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [open])
  const onKeyDown = (event) => {
    if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus() }
  }
  const displayTitle = (title) => {
    const normalized = title.normalize('NFD').replace(/[\u0300-\u036f¿?]/g, '').replace(/\s+/g, ' ').trim().toLowerCase()
    if (normalized === 'quienes somos') return '¿Quiénes Somos?'
    if (normalized === 'contactanos') return 'Contáctanos'
    if (normalized === 'exploradores del rey panama') return 'Exploradores del Rey Panamá'
    return title
  }
  return (
    <header className="Header site-header" data-scrolled={scrolled} ref={header} onKeyDown={onKeyDown} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}>
      <div className="site-header__inner">
        <Logo logo={navbarInfo.logo} title={displayTitle(navbarInfo.logoTitle || 'Exploradores del Rey Panamá')} showTitle />
        <button className="site-header__toggle" type="button" ref={toggle} aria-label={open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'} aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((value) => !value)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">{open ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}</svg>
        </button>
        <nav id={menuId} className="site-header__nav" aria-label="Navegación principal" data-open={open} aria-hidden={compact && !open ? true : undefined} {...(compact && !open ? {inert: ''} : {})}>
          {links.map((item, index) => {
            const title = displayTitle(item.title)
            const contact = item.eventButton || title === 'Contáctanos'
            return <SiteLink key={item.id || index} item={item} className={`site-header__link${contact ? ' site-header__contact' : ''}`} aria-current={activeIndex === index ? 'location' : undefined} onClick={() => { setOpen(false); if (compact) toggle.current?.focus() }}>
              <span>{title}</span>
              {contact && <svg className="site-header__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>}
            </SiteLink>
          })}
        </nav>
      </div>
    </header>
  )
}
