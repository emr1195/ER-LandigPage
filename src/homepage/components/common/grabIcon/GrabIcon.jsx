import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PersonIcon from '@mui/icons-material/Person'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined'
import {useTheme} from '@mui/material'

export const GrabIcon = ({icon, width = '20px', height = 'auto'}) => {
  const theme = useTheme()
  switch (icon) {
    case 'PersonIcon':
      return (
        <PersonIcon
          sx={{
            width: width,
            height: height,
            color: theme.palette.light.main,
          }}
        />
      )
    case 'LocationOnIcon':
      return (
        <LocationOnIcon
          sx={{
            width: width,
            height: height,
            color: theme.palette.light.main,
          }}
        />
      )
    case 'CalendarTodayOutlinedIcon':
      return (
        <CalendarTodayOutlinedIcon
          sx={{
            width: width,
            height: height,
            color: theme.palette.light.main,
          }}
        />
      )
    case 'ElectricBoltOutlinedIcon':
      return (
        <ElectricBoltOutlinedIcon
          sx={{
            width: width,
            height: height,
            color: theme.palette.light.main,
          }}
        />
      )
    default:
      return
  }
}
