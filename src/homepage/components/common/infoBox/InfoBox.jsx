import {Box, Typography, useTheme} from '@mui/material'
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PersonIcon from '@mui/icons-material/Person'

export const InfoBox = ({title, icon}) => {
  const theme = useTheme()

  const GrabIcon = ({icon}) => {
    switch (icon) {
      case 'PersonIcon':
        return <PersonIcon />
      case 'LocationOnIcon':
        return <LocationOnIcon />
      default:
        return <LocationOnIcon />
    }
  }
  return (
    <Box
      display="flex"
      flexGrow={1}
      justifyContent="center"
      alignItems="center"
      className="InfoBox"
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          p: '16px 32px',
          minWidth: '160px',
          height: '40px',
          borderRadius: '100px',
          boxShadow: `0px 50px 109px 0px rgba(0, 0, 0, 0.20), 
          0px 198px 198px 0px rgba(0, 0, 0, 0.17), 
          0px 446px 267px 0px rgba(0, 0, 0, 0.10), 
          0px 792px 317px 0px rgba(0, 0, 0, 0.03), 
          0px 1238px 347px 0px rgba(0, 0, 0, 0.00)`,
          backgroundColor: theme.palette.light.main,
        }}
      >
        <Typography variant="body1" color={theme.palette.secondary.main}>
          {title}
        </Typography>

        {icon && <GrabIcon icon={icon} />}
      </Box>
    </Box>
  )
}
