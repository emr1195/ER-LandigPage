import React from 'react'
import {GrabIcon} from '../../../common/grabIcon/GrabIcon'
import {heroCarouselPhotos} from '../../../heroSection/heroPhotos'
import {usePhotoRotation} from '../../../heroSection/usePhotoRotation'
import {CrossfadeImage} from '../../../common/CrossfadeImage'

export const ImageSection = ({imageSectionInfo = {}, galleryInfo}) => {
  const {imageLeft, imageRight, iconText, icon} = imageSectionInfo
  const shared = heroCarouselPhotos(galleryInfo)
  const images = shared.length ? shared : imageRight ? [{imageURL: imageRight, title: 'Encuentro de Exploradores del Rey Panamá'}] : []
  const {current, paused, setPaused, setInteracting, reducedMotion} = usePhotoRotation(images, {offset: 2})
  const photo = images[current]
  if (!imageLeft && !photo) return null
  return <aside className="imageSection-History history-visual" aria-label="Imágenes de nuestra historia">
    {imageLeft && <figure className="history-visual__portrait">
      <img src={imageLeft} alt={iconText || 'Imagen histórica de Exploradores del Rey'} loading="lazy" decoding="async" />
      {iconText && <figcaption>{icon && <GrabIcon icon={icon} width="16px" color="#102a43" />}{iconText}</figcaption>}
    </figure>}
    {photo && <figure className={`history-visual__gathering${!imageLeft ? ' history-visual__gathering--only' : ''}`} aria-label="Galería de encuentros" onFocus={() => setInteracting(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false) }}>
      <CrossfadeImage src={photo.imageURL} alt={photo.title || 'Encuentro de Exploradores del Rey Panamá'} loading="lazy" decoding="async" />
      {images.length > 1 && !reducedMotion && <button type="button" className="history-gallery-pause" aria-pressed={paused} onClick={() => setPaused(previous => !previous)}>{paused ? 'Reanudar fotografías de Historia' : 'Pausar fotografías de Historia'}</button>}
    </figure>}
  </aside>
}
