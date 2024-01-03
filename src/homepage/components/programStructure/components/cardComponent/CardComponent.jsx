import React from 'react'
import {Box, Card, CardContent, useTheme} from '@mui/material'
import {TypographyPersonalized} from '../../../common'

export const CardComponent = ({index, className, item}) => {
  const theme = useTheme()
  return (
    <Card
      key={index}
      className={className}
      sx={{
        width: 350,
        height: 600,
        borderRadius: '24px',
        backgroundColor: theme.palette.light.main,
        position: {xs: 'relative', specialTablet: 'absolute'},
        transition: 'all 0.5s',
        display: 'none',

        '&.active': {
          boxShadow: ` 0px 44px 97px 0px rgba(0, 0, 0, 0.1),
                    0px 176px 176px 0px rgba(0, 0, 0, 0.09),
                    0px 395px 237px 0px rgba(0, 0, 0, 0.05),
                    0px 703px 281px 0px rgba(0, 0, 0, 0.01),
                    0px 1098px 307px 0px rgba(0, 0, 0, 0);`,
          opacity: 1,
          zIndex: 5,
          display: 'flex',
          right: {specialTablet: '175px', laptop: '65px'},
        },

        '&.prev': {
          filter: 'blur(3px)',
          transform: 'scale(0.9)',
          opacity: 0.8,
          zIndex: 2,
          pointerEvents: 'none',
          display: {xs: 'none', specialTablet: 'flex'},
          left: '0',
        },

        '&.carousel-item.next': {
          filter: 'blur(3px)',
          transform: 'scale(0.9)',
          opacity: 0.8,
          zIndex: 2,
          pointerEvents: 'none',
          display: {xs: 'none', specialTablet: 'flex'},
          right: {lgMobile: '-15px', laptop: '-225px'},
        },
      }}
    >
      <CardContent
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          textAlign: 'center',
          gap: '64px',
          padding: '64px !important',
        }}
      >
        <img src={item.image} alt={item.title} width={40} height={40} />
        <Box
          gap="32px"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <TypographyPersonalized title={item.title} variant={'h5'} />
          <TypographyPersonalized
            title={item.description}
            color={theme.palette.black50.main}
          />
        </Box>
      </CardContent>
    </Card>
  )
}
