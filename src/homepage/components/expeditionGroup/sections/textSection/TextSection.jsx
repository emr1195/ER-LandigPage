import {Box} from '@mui/material'
import React from 'react'
import {TypographyPersonalized} from '../../../common'

export const TextSection = ({group, secondaryColor, sectionTitle}) => {
  return (
    <Box
      flex={1}
      className="textSection"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      mx={{xs: 'auto'}}
      maxWidth="445px"
      gap="32px"
      textAlign={{xs: 'center', laptop: 'left'}}
    >
      <Box className="expeditionGroup-header" gap="8px" width="100%">
        <TypographyPersonalized variant="h6" title={sectionTitle} />
        <TypographyPersonalized variant="h2" title={group.title} />
      </Box>
      <TypographyPersonalized
        variant="body"
        title={group.age && `Edad: ${group.age}`}
        sx={{textAlign: 'left', width: '100%', my: '-24px', fontWeight: 'bold'}}
      />

      <TypographyPersonalized variant="body" title={group.description} />

      {group.image && <Box
        component="figure"
        className="group-supporting-image"
        sx={{
          m: 0,
          width: '100%',
          maxWidth: 360,
          boxSizing: 'border-box',
          alignSelf: {xs: 'center', laptop: 'flex-start'},
          p: {xs: 1.5, sm: 2},
          backgroundColor: '#FFFFFF',
          border: '1px solid #D9E2EC',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)',
          display: 'flex',
          justifyContent: 'center',
          '& img': {
            display: 'block',
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: {xs: 240, sm: 280},
            objectFit: 'contain',
          },
        }}
      >
        <img src={group.image} alt={`Insignias e información visual de ${group.title}`} loading="lazy" decoding="async" />
      </Box>}
    </Box>
  )
}
