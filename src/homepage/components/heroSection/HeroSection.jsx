import {Box, Container} from '@mui/material'
import React from 'react'
import {ImageSection, TextSection} from './sections'

export const HeroSection = ({heroSectionInfo}) => {
  console.log(heroSectionInfo.imageSection)
  const textSectionInfo = heroSectionInfo.textSection
  const imageSectionInfo = heroSectionInfo.imageSection

  return (
    <Box
      className="HeroSection"
      sx={{
        transition: '.5s',
        padding: {xs: '32px 0', sm: '64px 0'},
        height: 'fit-content',
        gridColumn: '1/-1', // it means go from column 1 until the last one
        border: '1px solid black',
      }}
    >
      <Container
        sx={{
          p: {xs: 0, sm: 0, md: 0},
          p: '64px 0',
          maxWidth: {xs: 'none', sm: 'none', md: 'none'},
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextSection textSectionInfo={textSectionInfo} />
        <ImageSection imageSectionInfo={imageSectionInfo} />
      </Container>
    </Box>
  )
}
