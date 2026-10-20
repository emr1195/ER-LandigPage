import React from 'react'
import './editorial.css'

export const EditorialHeading = ({id, eyebrow, title, description}) => (
  <header className="editorial-heading">
    {eyebrow && <p className="editorial-eyebrow">{eyebrow}</p>}
    <h2 id={id}>{title}</h2>
    <span className="editorial-heading__accent" aria-hidden="true" />
    {description && <p className="editorial-heading__description">{description}</p>}
  </header>
)
