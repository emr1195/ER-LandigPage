import React from 'react'
import {HeroActions} from './HeroActions'

export const HeroContent = ({info, headingId}) => (
  <div className="institutional-hero__content">
    <p className="anniversary-badge"><span aria-hidden="true" />50 AÑOS EN PANAMÁ · 1976–2026</p>
    <p className="institutional-hero__identity">{info.title?.trim() || 'Exploradores del Rey Panamá'}</p>
    <h1 id={headingId}><span>Formando líderes.</span> Inspirando generaciones.</h1>
    <p className="institutional-hero__mission">{info.description?.trim() || 'Formamos nuevas generaciones mediante la fe, la aventura, el compañerismo y el liderazgo, preparando niños y jóvenes para servir a Dios y transformar su comunidad.'}</p>
    {info.iconText?.trim() && <p className="institutional-hero__detail">{info.iconText}</p>}
    <HeroActions buttons={info.buttons} />
    <p className="institutional-hero__values"><span>Fe</span><span>Aventura</span><span>Compañerismo</span><span>Liderazgo</span></p>
  </div>
)
