import React, {useEffect, useId, useRef} from 'react'
import {MembersContainer} from './membersContainer/MembersContainer'
import './styles.css'

export const Organization = ({organizationInfo = {}}) => {
  const {title, members} = organizationInfo
  const headingId = useId()
  const sectionRef = useRef(null)
  const displayTitle = title?.replace(/^[\s.,;:]+/u, '').trim().replace(/^Organizacion Nacional$/i, 'Organización Nacional') || 'Organización Nacional'

  useEffect(() => {
    if (!window.IntersectionObserver || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({target, isIntersecting}) => {
        if (isIntersecting) {
          target.dataset.reveal = 'visible'
          observer.unobserve(target)
        }
      })
    }, {threshold: 0.08})
    const cards = sectionRef.current.querySelectorAll('.organization-leader')
    cards.forEach((card) => {
      card.dataset.reveal = 'waiting'
      observer.observe(card)
    })
    return () => {
      observer.disconnect()
      cards.forEach((card) => { delete card.dataset.reveal })
    }
  }, [members])

  return (
    <section className="OrganizationSection" aria-labelledby={headingId} ref={sectionRef}>
      <div className="organization-content">
        <header className="organization-header">
          <p className="organization-eyebrow">Nuestro equipo</p>
          <h2 id={headingId}>{displayTitle}</h2>
          <span className="organization-header-line" aria-hidden="true" />
          <p className="organization-subtitle">Conoce a nuestros líderes</p>
        </header>
        <MembersContainer members={members} />
      </div>
    </section>
  )
}
