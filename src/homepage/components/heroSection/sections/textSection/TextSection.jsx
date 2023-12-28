import {Box, Button, Typography, useTheme} from '@mui/material'
import React from 'react'
import {EventButton, InfoBox} from '../../../common'

export const TextSection = ({textSectionInfo}) => {
  const theme = useTheme()

  const {
    buttons,
    description,
    icon,
    id,
    lastModified,
    title,
    iconText,
    updatedBy,
  } = textSectionInfo

  return (
    <Box
      className="TextSection"
      display="flex"
      flexDirection="column"
      gap={'64px'}
      flexGrow={1}
      flex={1}
    >
      <Box className="Content" gap={'32px'}>
        <InfoBox title={iconText} icon={icon} />
        <Typography
          variant="h1"
          fontSize={theme.fonts.size.h1}
          lineHeight={theme.fonts.lineHeight.h1}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          fontSize={theme.fonts.size.body}
          lineHeight={theme.fonts.lineHeight.body}
        >
          {description}
        </Typography>
      </Box>
      <Box
        className="EventButtons"
        display="flex"
        justifyContent="start"
        alignItems="center"
        gap="16px"
      >
        {buttons.map((item, index) => (
          <EventButton key={index} displayInfo={item} />
        ))}
      </Box>
    </Box>
  )
}
