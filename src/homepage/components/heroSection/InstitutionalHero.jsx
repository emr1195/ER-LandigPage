import React, {useId} from 'react'
import {HeroContent} from './HeroContent'
import {HeroImageGallery} from './HeroImageGallery'
import './institutional.css'

export const InstitutionalHero = ({heroSectionInfo = {}, fallbackImage}) => {
  const headingId = useId()
  return (
  <section className="HeroSection institutional-hero" id="home" aria-labelledby={headingId}>
    <div className="institutional-hero__inner">
      <HeroContent info={heroSectionInfo.textSection || {}} headingId={headingId} />
      <HeroImageGallery info={heroSectionInfo.imageSection || {}} fallbackImage={fallbackImage} />
    </div>
  </section>
  )
}
