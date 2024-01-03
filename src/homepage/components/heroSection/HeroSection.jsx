import {useTheme} from '@mui/material'
import React from 'react'
import {ImageSection, TextSection} from './sections'
import {ColorCircle, SectionContainer} from '../common'

export const HeroSection = ({heroSectionInfo}) => {
  const theme = useTheme()

  return (
    <SectionContainer className="HeroSection">
      <TextSection textSectionInfo={heroSectionInfo.textSection} />
      <ImageSection imageSectionInfo={heroSectionInfo.imageSection} />

      <ColorCircle
        color={theme.palette.blue.main}
        bottom="-40%"
        left="-40%"
        filter="blur(500px)"
      />
      <ColorCircle
        color={theme.palette.red.main}
        top="-40%"
        right="-40%"
        filter="blur(500px)"
      />
    </SectionContainer>
  )
}
