import React, {useState} from 'react'

const Photo = ({image, main, pending}) => {
  const [failedSource, setFailedSource] = useState(null)
  const available = Boolean(image?.imageURL?.trim() && failedSource !== image.imageURL)
  // React 18 forwards this native HTML attribute in lowercase without warnings.
  const priority = main ? {fetchpriority: 'high'} : {}
  return <figure className={`hero-photo${main ? ' hero-photo--main' : ''}${available ? '' : ' hero-photo--pending'}`}>
    {available ? <>
      <img src={image.imageURL} alt={image.title?.trim() || 'Actividad institucional de Exploradores del Rey Panamá'} width={main ? 900 : 450} height={main ? 675 : 300} loading={main ? 'eager' : 'lazy'} {...priority} decoding="async" onError={() => setFailedSource(image.imageURL)} />
      {image.title?.trim() && <figcaption>{image.title}</figcaption>}
    </> : <div className="hero-photo__notice">
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><rect x="3" y="5" width="26" height="22" rx="3" /><circle cx="11" cy="12" r="2" /><path d="m4 24 8-8 5 5 5-7 7 10" /></svg>
      <strong>{failedSource ? 'Fotografía no disponible' : pending}</strong>
      <span>{failedSource ? 'Revisa la URL de esta imagen en el dashboard.' : 'Agrega una fotografía real desde Hero Section.'}</span>
    </div>}
  </figure>
}

export const HeroImageGallery = ({info, fallbackImage}) => {
  const configured = [info.imageRightCenter, info.imageTopLeft, info.imageBottomLeft].filter((image) => image?.imageURL?.trim())
  const main = configured[0] || fallbackImage
  return <div className="hero-gallery" aria-label="Fotografías institucionales">
    <Photo image={main} main pending="Fotografía institucional pendiente" />
    <div className="hero-gallery__anniversary"><strong>50 años</strong><span>formando generaciones<small>1976–2026</small></span></div>
    <div className="hero-gallery__secondary">
      <Photo image={configured[1]} pending="Fotografía de campamento pendiente" />
      <Photo image={configured[2]} pending="Fotografía de aventura pendiente" />
    </div>
  </div>
}
