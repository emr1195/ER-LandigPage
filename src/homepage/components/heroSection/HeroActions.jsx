import React from 'react'
import {SiteLink} from '../navigation/SiteLink'

const defaultActions = [
  {title: 'Conoce el movimiento', url: 'historia', outsideURL: false, display: true},
  {title: 'Encuentra un destacamento', url: 'destacamento', outsideURL: false, display: true},
]

export const HeroActions = ({buttons = []}) => {
  const sorted = [...buttons].sort((a, b) => (Number(a.position) || 0) - (Number(b.position) || 0))
  const actions = Array.from({length: Math.max(2, sorted.length)}, (_, index) => {
    const configured = sorted[index] || {}
    const defaults = defaultActions[index]
    if (!defaults) return configured
    return {...defaults, ...configured, title: configured.title?.trim() || defaults.title, url: configured.url?.trim() || defaults.url, outsideURL: configured.url?.trim() ? Boolean(configured.outsideURL) : defaults.outsideURL}
  }).filter((item) => item.display !== false && item.title?.trim())
  return <div className="hero-actions">
    {actions.map((item, index) => <SiteLink key={item.id || index} item={item} className={`hero-action ${index === 0 ? 'hero-action--primary' : 'hero-action--secondary'}`}>
      {index === 1 && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>}
      {item.title}
      {index === 0 && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>}
    </SiteLink>)}
  </div>
}
