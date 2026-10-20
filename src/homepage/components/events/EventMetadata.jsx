import React from 'react'
import {formatEventDate} from './eventDates'
import {parseGoogleMapsUrl} from '../../../../shared/googleMaps'

export const EventIcon = ({name}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
  {name === 'calendar' ? <><rect x="4" y="5" width="16" height="16" rx="3" /><path d="M8 3v4m8-4v4M4 11h16" /></> : name === 'location' ? <><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></> : <path d="M5 12h14m-6-6 6 6-6 6" />}
</svg>

const lines = (text) => String(text || '').split(';').join('\n')
const mapLink = value => {
  try { return parseGoogleMapsUrl(value).url.href } catch { return null }
}
const EventLocation = ({event}) => {
  const href = mapLink(event.mapsUrl)
  return href ? <a className="event-location-link" href={href} target="_blank" rel="noopener noreferrer" aria-label={`${lines(event.ubication)} (abrir Google Maps en una pestaña nueva)`}>{lines(event.ubication)}</a> : <span>{lines(event.ubication)}</span>
}
export const EventMetadata = ({event, status}) => <div className="event-card__metadata">
  {event.date && <p><EventIcon name="calendar" /><time dateTime={status.start}>{lines(formatEventDate(event.date))}</time></p>}
  {event.ubication && <p><EventIcon name="location" /><EventLocation event={event} /></p>}
  {event.byWho && <p className="event-card__organizer">{lines(event.byWho)}</p>}
</div>
