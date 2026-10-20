import React, {useId} from 'react'
import {EditorialHeading} from '../common/editorial/EditorialHeading'
import {CardContainer} from './cardContainer/CardContainer'
import './events.css'

export const Events = ({eventsInfo = {}}) => {
  const headingId = useId()
  return <section id="eventos" className="EventsSection editorial-section events-editorial" aria-labelledby={headingId}>
    <EditorialHeading id={headingId} eyebrow={eventsInfo.sectionTitle} title={eventsInfo.title} description="Descubre nuestros próximos campamentos, encuentros y actividades especiales." />
    <CardContainer events={eventsInfo.events || []} />
  </section>
}
