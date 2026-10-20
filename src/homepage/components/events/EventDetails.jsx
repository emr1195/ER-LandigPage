import React, {useEffect, useId, useRef} from 'react'
import {EventMetadata} from './EventMetadata'
import {EventArtwork} from './EventArtwork'

export const EventDetails = ({event, status, onClose}) => {
  const dialog = useRef(null)
  const titleId = useId()
  useEffect(() => {
    const element = dialog.current
    element.showModal()
    return () => { if (element.open) element.close() }
  }, [])
  return <dialog ref={dialog} className="event-details" aria-labelledby={titleId} onCancel={(e) => { e.preventDefault(); onClose() }} onClick={(e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    if (e.target === e.currentTarget && (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)) onClose()
  }}>
    <div className="event-details__header"><span className={`event-status event-status--${status.key}`}>{status.label}</span><button type="button" onClick={onClose} aria-label="Cerrar detalles del evento">×</button></div>
    <h2 id={titleId}>{String(event.title || '').split(';').join(' ')}</h2>
    {(event.image || event.backgroundImage) && <EventArtwork event={event} />}
    <EventMetadata event={event} status={status} />
    {event.description && <p className="event-card__description">{event.description}</p>}
    <button type="button" className="event-details__close" onClick={onClose}>Volver a eventos</button>
  </dialog>
}
