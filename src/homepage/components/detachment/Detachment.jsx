import React, {useEffect, useId, useRef} from 'react'
import {googleMapsEmbedUrl, parseGoogleMapsUrl} from '../../../../shared/googleMaps'
import {emptyDetachment, getDetachments} from '../../../../shared/detachments'
import './styles.css'

const DetachmentCard = ({info}) => {
  const cardRef = useRef(null)
  useEffect(() => {
    const card = cardRef.current
    if (!card || !window.IntersectionObserver || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        card.dataset.reveal = 'visible'
        observer.disconnect()
      }
    }, {threshold: 0.08})
    card.dataset.reveal = 'waiting'
    observer.observe(card)
    return () => { observer.disconnect(); delete card.dataset.reveal }
  }, [])
  let embedUrl = ''
  let mapsUrl = ''
  try {
    parseGoogleMapsUrl(info.mapsUrl)
    mapsUrl = info.mapsUrl
    embedUrl = googleMapsEmbedUrl(info.embedUrl || info.mapsUrl) || ''
  } catch { /* An incomplete form has no map yet. */ }

  return (
      <article className={`detachment-card${embedUrl ? ' detachment-card--with-map' : ' detachment-card--without-map'}`} ref={cardRef}>
        <div className="detachment-details">
          <div className="detachment-brand">
            {info.logo && <img className="detachment-logo" src={info.logo} alt={`Logo de ${info.name || 'destacamento'}`} loading="lazy" width="112" height="112" />}
            <div>
              <p className="detachment-eyebrow">Exploradores del Rey</p>
              <p className="detachment-number">{!info.number ? 'Destacamento' : /^\d+$/.test(info.number) ? `Destacamento n.º ${info.number}` : `Código ${info.number}`}</p>
            </div>
          </div>
          <h3>{info.name || 'Nombre del destacamento'}</h3>
          {mapsUrl && <p className="detachment-location">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
            Nuestra ubicación
          </p>}
          {mapsUrl && (
            <a className="detachment-directions" href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={`Cómo llegar a ${info.name || 'este destacamento'} (abre Google Maps en una pestaña nueva)`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m21 3-7 18-3-8-8-3L21 3Z" /><path d="m11 13 5-5" /></svg>
              Cómo llegar
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M10 5H5a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-5" /></svg>
            </a>
          )}
        </div>
        {embedUrl && <div className="detachment-map">
            <iframe
              title={`Ubicación del destacamento ${info.name || ''}`}
              src={embedUrl}
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
        </div>}
      </article>
  )
}

export const Detachment = ({info = {}, preview = false}) => {
  const titleId = useId()
  const records = preview && !Array.isArray(info.detachments)
    ? [{...emptyDetachment, ...info}]
    : getDetachments(info)
  if (!records.length) return null
  return (
    <section className="detachment-section" id={preview ? undefined : 'destacamento'} aria-labelledby={titleId}>
      <header className="detachment-section-header">
        <p className="detachment-section-eyebrow">Nuestra comunidad</p>
        <h2 id={titleId}>Destacamentos registrados</h2>
        <span aria-hidden="true" className="detachment-section-line" />
        <p className="detachment-section-subtitle">Encuentra tu destacamento</p>
      </header>
      <div className="detachment-list">
        {records.map((record) => <DetachmentCard key={record.id || record.number || 'preview'} info={record} />)}
      </div>
    </section>
  )
}
