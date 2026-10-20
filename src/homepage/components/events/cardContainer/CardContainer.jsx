import React, {useEffect, useState} from 'react'
import {eventStatus} from '../eventDates'
import {EventIcon, EventMetadata} from '../EventMetadata'
import {EventDetails} from '../EventDetails'
import {SiteLink} from '../../navigation/SiteLink'
import {EventArtwork} from '../EventArtwork'

export const CardContainer = ({events = []}) => {
  const [now, setNow] = useState(() => new Date())
  const [selected, setSelected] = useState(null)
  useEffect(() => {
    const update = () => setNow(new Date())
    const timer = window.setInterval(update, 60000)
    document.addEventListener('visibilitychange', update)
    return () => { window.clearInterval(timer); document.removeEventListener('visibilitychange', update) }
  }, [])
  const selectedEvent = selected === null ? null : events.find((event, index) => (event.id || index) === selected)
  return <>
    <div className="events-grid" data-single={events.length === 1}>
      {events.map((event, index) => {
        const status = eventStatus(event.date, now)
        return <article key={event.id || index} className="event-card">
          <EventArtwork event={event} />
          <div className="event-card__body">
            <span className={`event-status event-status--${status.key}`}>{status.label}</span>
            <h3>{String(event.title || '').split(';').join(' ')}</h3>
            <EventMetadata event={event} status={status} />
            {event.description && <p className="event-card__description">{event.description}</p>}
            {event.url ? <SiteLink item={event} className="event-card__action">Ver detalles <EventIcon name="arrow" /></SiteLink> : <button className="event-card__action" type="button" onClick={() => setSelected(event.id || index)} aria-label={`Ver detalles de ${event.title || 'este evento'}`} aria-haspopup="dialog">Ver detalles <EventIcon name="arrow" /></button>}
          </div>
        </article>
      })}
    </div>
    {events.length === 0 && <p className="events-empty">Aún no hay eventos publicados.</p>}
    {selectedEvent && <EventDetails event={selectedEvent} status={eventStatus(selectedEvent.date, now)} onClose={() => setSelected(null)} />}
  </>
}
