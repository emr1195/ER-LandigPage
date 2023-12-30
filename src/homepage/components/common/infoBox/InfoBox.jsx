import {Box, Tooltip, Typography, useTheme} from '@mui/material'
import React, {useMemo} from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PersonIcon from '@mui/icons-material/Person'

export const InfoBox = ({title, icon, style = {}}) => {
  const theme = useTheme()

  const newTitle = useMemo(() => {
    return title.length > 14 ? title.substring(0, 14) + '...' : title
  }, [title])

  const GrabIcon = ({icon}) => {
    switch (icon) {
      case 'PersonIcon':
        return (
          <PersonIcon
            sx={{
              width: '20px',
              height: 'auto',
              color: theme.palette.black.main,
            }}
          />
        )
      case 'LocationOnIcon':
        return (
          <LocationOnIcon
            sx={{
              width: '20px',
              height: 'auto',
              color: theme.palette.black.main,
            }}
          />
        )
      default:
        return
    }
  }
  return (
    <Box
      display="flex"
      flex={1}
      justifyContent="center"
      alignItems="center"
      className="InfoBox "
      width="fit-content"
    >
      <Box
        className=" boxShadowImages"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          p: '16px 32px',
          minWidth: '160px',
          height: '40px',
          borderRadius: '100px',
          backgroundColor: theme.palette.light.main,
          fontSize: theme.fonts.size.button,
          color: theme.palette.secondary.main,
          ...style,
        }}
      >
        <Tooltip title={title} sx={{display: newTitle.length > 17}}>
          <Typography variant="body1" fontSize="inherit" color="inherit">
            {newTitle}
          </Typography>
        </Tooltip>

        {icon && <GrabIcon icon={icon} />}
      </Box>
    </Box>
  )
}
