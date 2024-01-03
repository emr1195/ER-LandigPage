import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {Box, Link, Skeleton, Typography, useTheme} from '@mui/material'

export const Logo = ({logo = '', title = '', showTitle = false}) => {
  const theme = useTheme()

  return (
    <Box
      display={'flex'}
      justifyContent={showTitle ? 'center' : 'start'}
      alignItems={'center'}
    >
      <Link
        component={RouterLink}
        color="inherit"
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        sx={{
          textDecoration: 'none',
          gap: '16px',
          fontSize: theme.fonts.size.body,
        }}
        to="/"
      >
        {logo ? (
          <img
            src={logo}
            alt="Emblema de los Exploradores del Rey"
            width={40}
            height={40}
          />
        ) : (
          <Skeleton variant="circular" width={40} height={40} />
        )}

        <Typography
          display={showTitle ? 'block' : 'none'}
          variant={'body1'}
          sx={{
            color: theme.palette.black50.main,
            fontSize: theme.fonts.size.body,
            lineHeight: theme.fonts.lineHeight.body,
          }}
        >
          {title ?? <Skeleton variant="text" sx={{fontSize: 'inherit'}} />}
        </Typography>
      </Link>
    </Box>
  )
}
