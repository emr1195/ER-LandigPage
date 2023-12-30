import {Box, Container, useTheme} from '@mui/material'
import React from 'react'
import {ImageSection, TextSection} from './sections'
import {ColorCircle} from './components'

export const HeroSection = ({heroSectionInfo}) => {
  const theme = useTheme()
  const textSectionInfo = heroSectionInfo.textSection
  const imageSectionInfo = heroSectionInfo.imageSection

  return (
    <Box
      className="HeroSection"
      sx={{
        transition: '.5s',
        position: 'relative',
        padding: {xs: '32px 0', sm: '64px 0'},
        height: 'fit-content',
        gridColumn: '1/-1', // it means go from column 1 until the last one
      }}
    >
      <Container
        sx={{
          p: {xs: 0, sm: 0, md: 0},
          maxWidth: {xs: 'none', sm: 'none', md: 'none'},
          display: 'flex',
          flexDirection: {
            xs: 'column-reverse',
            lgMobile: 'column',
            laptop: 'row',
          },
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: {xs: '64px', tablet: '16px'},
        }}
      >
        <TextSection textSectionInfo={textSectionInfo} />
        <ImageSection imageSectionInfo={imageSectionInfo} />

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
      </Container>
    </Box>
  )
}
