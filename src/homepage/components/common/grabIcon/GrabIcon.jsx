import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PersonIcon from '@mui/icons-material/Person'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'

import {useTheme} from '@mui/material'

export const GrabIcon = ({
  icon,
  width = '20px',
  height = 'auto',
  color = '',
}) => {
  const theme = useTheme()
  switch (icon) {
    case 'PersonIcon':
      return (
        <PersonIcon
          sx={{
            width: width,
            height: height,
            color: color ?? theme.palette.light.main,
          }}
        />
      )
    case 'LocationOnIcon':
      return (
        <LocationOnIcon
          sx={{
            width: width,
            height: height,
            color: color ?? theme.palette.light.main,
          }}
        />
      )
    case 'CalendarTodayOutlinedIcon':
      return (
        <CalendarTodayOutlinedIcon
          sx={{
            width: width,
            height: height,
            color: color ?? theme.palette.light.main,
          }}
        />
      )
    case 'ElectricBoltOutlinedIcon':
      return (
        <ElectricBoltOutlinedIcon
          sx={{
            width: width,
            height: height,
            color: color ?? theme.palette.light.main,
          }}
        />
      )
    case 'TwitterIcon':
      return (
        <TwitterIcon
          sx={{
            width: width,
            height: height,
            color: color ?? theme.palette.light.main,
          }}
        />
      )
    case 'FacebookIcon':
      return (
        <FacebookIcon
          sx={{
            width: width,
            height: height,
            color: color ?? theme.palette.light.main,
          }}
        />
      )
    case 'LinkedInIcon':
      return (
        <LinkedInIcon
          sx={{
            width: width,
            height: height,
            color: color ?? theme.palette.light.main,
          }}
        />
      )
    case 'InstagramIcon':
      return (
        <InstagramIcon
          sx={{
            width: width,
            height: height,
            color: color ?? theme.palette.light.main,
          }}
        />
      )
    case 'YouTubeIcon':
      return (
        <YouTubeIcon
          sx={{
            width: width,
            height: height,
            color: color ?? theme.palette.light.main,
          }}
        />
      )
    default:
      return
  }
}
