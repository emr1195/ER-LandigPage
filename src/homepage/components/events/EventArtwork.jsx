import React from 'react'

export const EventArtwork = ({event}) => <div className="event-card__image">
  {event.backgroundImage && <img className="event-artwork__background" src={event.backgroundImage} alt="" aria-hidden="true" loading="lazy" decoding="async" />}
  {event.image ? <img className="event-artwork__foreground" src={event.image} alt={event.title || 'Imagen del evento'} loading="lazy" decoding="async" /> : <span>Imagen del evento no disponible</span>}
</div>
