import {Box, Button, Typography, useTheme} from '@mui/material'
import React from 'react'
import {EventButton, InfoBox} from '../../../common'

export const TextSection = ({textSectionInfo}) => {
  const theme = useTheme()

  const {buttons, description, icon, id, title, iconText} = textSectionInfo

  return (
    <Box
      className="TextSection-HeroSection"
      display="flex"
      flexDirection="column"
      gap={{xs: '16px', lgMobile: '32px', sm: '64px'}}
      flex={1}
      zIndex={10}
    >
      <Box
        className="Content"
        gap={'32px'}
        display="flex"
        alignItems={{xs: 'center', laptop: 'flex-start'}}
        flexDirection="column"
        textAlign={{xs: 'center', laptop: 'left'}}
      >
        <InfoBox title={iconText} icon={icon} />
        <Typography
          variant="h1"
          sx={{
            fontSize: {xs: '32px', lgMobile: theme.fonts.size.h1},
            lineHeight: theme.fonts.lineHeight.h1,
            fontWeight: 'bold',
            maxWidth: {xs: 'none', laptop: '500px'},
            transition: '.5s',
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: {xs: '16px', lgMobile: theme.fonts.size.body},
            lineHeight: theme.fonts.lineHeight.body,
            color: theme.palette.black50.main,
          }}
        >
          {description}
        </Typography>
      </Box>
      <Box
        className="EventButtons"
        display="flex"
        flexDirection={{xs: 'column', lgMobile: 'row'}}
        justifyContent={{xs: 'center', laptop: 'start'}}
        alignItems="center"
        gap="16px"
        py={1}
      >
        {buttons.map((item, index) => (
          <EventButton index={`${index}_${item.title}`} displayInfo={item} />
        ))}
      </Box>
    </Box>
  )
}
