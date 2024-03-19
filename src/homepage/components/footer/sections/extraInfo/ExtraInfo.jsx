import {Box, Link, useTheme} from '@mui/material'
import React from 'react'
import {TypographyPersonalized} from '../../../common'
import {Link as RouterLink} from 'react-router-dom'

export const ExtraInfo = ({aditionalFooterInfo}) => {
  const theme = useTheme()

  return (
    <Box
      className="personalizedInfo-Container"
      display="flex"
      flexDirection={{xs: ' column', sm: 'row'}}
      flex={1}
      alignItems="center"
      justifyContent={{xs: 'center', sm: 'space-between'}}
      width="100%"
      gap="32px"
    >
      {aditionalFooterInfo.map(
        ({name, disabled, outsideURL, url}, socialMediaIndex) => {
          return (
            <Link
              key={socialMediaIndex}
              component={RouterLink}
              color="inherit"
              to={outsideURL ? url : `#${url ?? ''}`}
              target={outsideURL ? '_blank' : ''}
              sx={{
                pointerEvents: disabled ? 'none' : 'inherit',
                textDecoration: 'none',
                display: 'inline-block',
                color: theme.palette.black50.main,
                '&:hover': {
                  color: theme.palette.black.main,
                },
              }}
            >
              <TypographyPersonalized
                variant={'body'}
                title={name}
                color="inherit"
              />
            </Link>
          )
        },
      )}
    </Box>
  )
}
