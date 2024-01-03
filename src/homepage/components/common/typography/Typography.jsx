import {Typography, useTheme} from '@mui/material'
import React from 'react'

export const TypographyPersonalized = ({title, variant, color, sx = {}}) => {
  const theme = useTheme()

  switch (variant) {
    case 'h1':
      return (
        <Typography
          variant="h1"
          sx={{
            color: color ?? theme.palette.black.main,
            fontSize: {xs: '32px', lgMobile: theme.fonts.size.h1},
            lineHeight: theme.fonts.lineHeight.h1,
            fontWeight: 'bold',
            ...sx,
          }}
        >
          {title}
        </Typography>
      )
    case 'h2':
      return (
        <Typography
          variant="h2"
          sx={{
            color: color ?? theme.palette.black.main,
            fontSize: {xs: '32px', lgMobile: theme.fonts.size.h2},
            lineHeight: theme.fonts.lineHeight.h2,
            fontWeight: 'bold',
            ...sx,
          }}
        >
          {title}
        </Typography>
      )
    case 'h3':
      return (
        <Typography
          variant="h3"
          sx={{
            color: color ?? theme.palette.black.main,
            fontSize: theme.fonts.size.h3,
            lineHeight: theme.fonts.lineHeight.h3,
            fontWeight: 'bold',
            ...sx,
          }}
        >
          {title}
        </Typography>
      )
    case 'h4':
      return (
        <Typography
          variant="h4"
          sx={{
            color: color ?? theme.palette.black.main,
            fontSize: theme.fonts.size.h4,
            lineHeight: theme.fonts.lineHeight.h4,
            fontWeight: 'bold',
            ...sx,
          }}
        >
          {title}
        </Typography>
      )
    case 'h5':
      return (
        <Typography
          variant="h5"
          sx={{
            color: color ?? theme.palette.black.main,
            fontSize: theme.fonts.size.h5,
            lineHeight: theme.fonts.lineHeight.h5,
            fontWeight: 'bold',
            ...sx,
          }}
        >
          {title}
        </Typography>
      )
    case 'h6':
      return (
        <Typography
          variant="h6"
          sx={{
            color: color ?? theme.palette.secondary.main,
            fontSize: {xs: '16px', lgMobile: theme.fonts.size.h6},
            lineHeight: theme.fonts.lineHeight.h6,
            letterSpacing: '5.75px',
            fontWeight: 'bold',
            ...sx,
          }}
        >
          {title}
        </Typography>
      )
    case 'body':
      return (
        <Typography
          variant="body"
          sx={{
            color: color ?? theme.palette.black.main,
            fontSize: {xs: '16px', lgMobile: theme.fonts.size.body},
            lineHeight: theme.fonts.lineHeight.body,
            ...sx,
          }}
        >
          {title}
        </Typography>
      )
    case 'button':
      return (
        <Typography
          variant="button"
          sx={{
            color: color ?? theme.palette.black.main,
            fontSize: {xs: '14px', lgMobile: theme.fonts.size.button},
            lineHeight: theme.fonts.lineHeight.button,
            ...sx,
          }}
        >
          {title}
        </Typography>
      )
    case 'caption':
      return (
        <Typography
          variant="caption"
          sx={{
            color: color ?? theme.palette.black.main,
            fontSize: {xs: '10px', lgMobile: theme.fonts.size.caption},
            lineHeight: theme.fonts.lineHeight.caption,
            ...sx,
          }}
        >
          {title}
        </Typography>
      )

    default:
      return (
        <Typography
          variant="body"
          sx={{
            color: color ?? theme.palette.black.main,
            fontSize: theme.fonts.size.body,
            lineHeight: theme.fonts.lineHeight.body,
            ...sx,
          }}
        >
          {title}
        </Typography>
      )
  }
}
