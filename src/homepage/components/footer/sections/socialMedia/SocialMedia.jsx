import {Box, Link, useTheme} from '@mui/material'
import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {GrabIcon} from '../../../common'

export const SocialMedia = ({socialMedia}) => {
  const theme = useTheme()
  return (
    <Box
      className="socialMedia-Container"
      flex={1}
      alignItems="center"
      justifyContent={{xs: 'center', sm: 'flex-start'}}
      display="flex"
      columnGap="24px"
      width="100%"
    >
      {socialMedia
        .map(({name, icon, position, url}, socialMediaIndex) => {
          return (
            <Link
              key={socialMediaIndex}
              component={RouterLink}
              color="inherit"
              to={url}
              target={'_blank'}
              sx={{
                textDecoration: 'none',
                display: 'inline-block',
                color: theme.palette.black.main,
                '&:hover': {
                  color: theme.palette.gradient.main,
                },
              }}
            >
              <GrabIcon
                icon={icon.trim()}
                height="20px"
                color={'inherit'}
                key={socialMediaIndex}
              />
            </Link>
          )
        })
        .sort((a, b) => a.position - b.position)}
    </Box>
  )
}
