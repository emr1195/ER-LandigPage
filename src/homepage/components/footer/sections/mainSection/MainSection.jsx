import {Box} from '@mui/material'
import React from 'react'
import {TypographyPersonalized} from '../../../common'

export const MainSection = ({mainSection}) => {
  return (
    <Box
      className="FooterContainer-principalSection"
      display="flex"
      flexDirection="column"
      gap="32px"
    >
      <Box
        sx={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: {xs: '100%', lgMobile: 'fit-content'},
          flexDirection: {xs: 'column', lgMobile: 'row'},
        }}
      >
        <img
          src={mainSection.logo}
          alt={mainSection.logoTitle}
          width={48}
          height={48}
        />
        <TypographyPersonalized variant="h5" title={mainSection.logoTitle} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {mainSection.moreInfo.map(({name, description}, index) => (
          <Box key={index} display="flex" gap="8px">
            <TypographyPersonalized
              variant="h5"
              sx={{
                fontSize: '23px',
                fontWeight: 'bold',
                textTransform: 'capitalize !important',
              }}
              title={`${name}: `}
            />
            <TypographyPersonalized
              variant="body"
              sx={{fontSize: '18px'}}
              title={description}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
