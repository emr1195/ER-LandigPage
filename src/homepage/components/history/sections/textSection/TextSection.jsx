import {Box, useTheme} from '@mui/material'
import React from 'react'
import {GrabIcon, TypographyPersonalized} from '../../../common'

export const TextSection = ({textSectionInfo}) => {
  const theme = useTheme()
  const {infoSection, sectionTitle, title, description} = textSectionInfo
  const newDescription = description
    .split('.')
    .filter((part) => part.trim() !== '')

  return (
    <Box
      className="TextSection-History"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: {xs: '32px', tablet: '64px'},
        flex: 1,
        textAlign: {xs: 'center', md: 'left'},
      }}
    >
      <Box className="TopContainer">
        <TypographyPersonalized title={sectionTitle} variant="h6" />

        <TypographyPersonalized
          title={title}
          variant="h2"
          sx={{
            mx: {xs: 'auto'},
            marginBottom: '32px',
            fontWeight: 'bold',
            maxWidth: {xs: '290px', lgMobile: 'none'},
          }}
        />

        {newDescription.map((text, index) => (
          <TypographyPersonalized title={`${text}.`} variant={'body'} />
        ))}
      </Box>
      <Box className="ExtraInfoContainer">
        {infoSection
          .map((section, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: {xs: 'column', lgMobile: 'row'},
                p: '32px',
                gap: '32px',
                alignItems: 'center',
                justifyContent: 'flex-start',
                borderRadius: '32px',
              }}
              border={index === 1 && `1px solid ${theme.palette.black5.main}`}
            >
              <Box
                sx={{
                  backgroundColor: section.backgroundColor,
                  width: '100px',
                  height: '100px',
                  borderRadius: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <GrabIcon icon={section.icon.trim()} width="40px" />
              </Box>
              <Box gap="8px">
                <TypographyPersonalized title={section.title} variant="h5" />
                <TypographyPersonalized
                  title={section.description}
                  color={theme.palette.black50.main}
                />
              </Box>
            </Box>
          ))
          .sort((a, b) => a.position - b.position)}
      </Box>
    </Box>
  )
}
