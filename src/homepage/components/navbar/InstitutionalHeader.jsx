import React, {useEffect, useId, useRef, useState} from 'react'
import {Logo} from './components/logo/Logo'
import {SiteLink} from '../navigation/SiteLink'
import './institutional.css'

export const InstitutionalHeader = ({navbarInfo = {}}) => {
  const [open, setOpen] = useState(false)
  const header = useRef(null)
  const toggle = useRef(null)
  const menuId = useId()
  const links = [...(navbarInfo.listMenu || [])].filter((item) => item.title?.trim()).sort((a, b) => (Number(a.position) || 0) - (Number(b.position) || 0))
  useEffect(() => {
    if (!open) return undefined
    const closeOutside = (event) => { if (!header.current?.contains(event.target)) setOpen(false) }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [open])
  const onKeyDown = (event) => {
    if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus() }
  }
  return (
    <header className="Header site-header" ref={header} onKeyDown={onKeyDown}>
      <div className="site-header__inner">
        <Logo logo={navbarInfo.logo} title={navbarInfo.logoTitle || 'Exploradores del Rey Panamá'} showTitle />
        <button className="site-header__toggle" type="button" ref={toggle} aria-label={open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'} aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((value) => !value)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">{open ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}</svg>
        </button>
        <nav id={menuId} className="site-header__nav" aria-label="Navegación principal" data-open={open}>
          {links.map((item, index) => <SiteLink key={item.id || index} item={item} className={`site-header__link${item.eventButton ? ' site-header__contact' : ''}`} onClick={() => setOpen(false)}>{item.title}</SiteLink>)}
        </nav>
      </div>
    </header>
  )
}
