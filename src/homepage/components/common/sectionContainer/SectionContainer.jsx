import {Box, Container} from '@mui/material'
import React from 'react'

export const SectionContainer = ({
  children,
  className = '',
  sxBox = {},
  sxContainer = {},
}) => {
  return (
    <Box
      className={className}
      sx={{
        transition: '.5s',
        position: 'relative',
        padding: {xs: '32px 0', sm: '64px 0'},
        height: 'fit-content',
        gridColumn: '1/-1', // it means go from column 1 until the last one
        ...sxBox,
      }}
    >
      <Container
        sx={{
          p: {xs: 0, sm: 0, md: 0},
          // px: {xs: '16px', sm: '32px', md: '64px'},
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
          ...sxContainer,
        }}
      >
        {children}
      </Container>
    </Box>
  )
}
