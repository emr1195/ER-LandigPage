import React, {useState} from 'react'
import {heroCarouselPhotos} from './heroPhotos'
import {usePhotoRotation} from './usePhotoRotation'
import {CrossfadeImage} from '../common/CrossfadeImage'

const SharedCarousel = ({images}) => {
  const {current, paused, setPaused, setInteracting, reducedMotion} = usePhotoRotation(images, {step: images.length > 2 ? 2 : 1})
  return <div className="hero-gallery__carousel" role="group" aria-roledescription="carrusel" aria-label="Galería compartida" onFocus={() => setInteracting(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false) }}>
    <div className="hero-gallery__secondary">
      <Photo image={images[current]} label="Fotografía inferior izquierda" pending="Fotografía de campamento pendiente" />
      <Photo image={images.length > 1 ? images[(current + 1) % images.length] : null} label="Fotografía inferior derecha" pending="Fotografía de aventura pendiente" />
    </div>
    {images.length > 1 && !reducedMotion && <div className="hero-photo__controls hero-photo__controls--shared">
      <button type="button" aria-label={paused ? 'Reanudar galería' : 'Pausar galería'} aria-pressed={paused} onClick={() => setPaused(previous => !previous)}>{paused ? 'Reanudar' : 'Pausar'}</button>
    </div>}
  </div>
}

const Photo = ({image, main, pending, label}) => {
  const [failedSource, setFailedSource] = useState(null)
  const available = Boolean(image?.imageURL?.trim() && failedSource !== image.imageURL)
  // React 18 forwards this native HTML attribute in lowercase without warnings.
  const priority = main ? {fetchpriority: 'high'} : {}
  const Image = main ? 'img' : CrossfadeImage
  return <figure className={`hero-photo${main ? ' hero-photo--main' : ''}${available ? '' : ' hero-photo--pending'}`} role="group" aria-label={label}>
    {available ? <>
      <Image src={image.imageURL} alt={image.title?.trim() || 'Actividad institucional de Exploradores del Rey Panamá'} width={main ? 900 : 450} height={main ? 675 : 300} loading={main ? 'eager' : 'lazy'} {...priority} decoding="async" onError={() => setFailedSource(image.imageURL)} />
      {main && image.title?.trim() && <figcaption>{image.title}</figcaption>}
    </> : <div className="hero-photo__notice">
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><rect x="3" y="5" width="26" height="22" rx="3" /><circle cx="11" cy="12" r="2" /><path d="m4 24 8-8 5 5 5-7 7 10" /></svg>
      <strong>{failedSource ? 'Fotografía no disponible' : pending}</strong>
      <span>{failedSource ? 'Revisa la URL de esta imagen en el dashboard.' : 'Agrega una fotografía real desde Hero Section.'}</span>
    </div>}
  </figure>
}

export const HeroImageGallery = ({info, fallbackImage}) => {
  const main = info.imageRightCenter?.imageURL?.trim() ? info.imageRightCenter : fallbackImage
  return <div className="hero-gallery" aria-label="Fotografías institucionales">
    <Photo image={main} main label="Fotografía principal" pending="Fotografía institucional pendiente" />
    <div className="hero-gallery__anniversary"><strong>50 años</strong><span>formando generaciones<small>1976–2026</small></span></div>
    <SharedCarousel images={heroCarouselPhotos(info)} />
  </div>
}
