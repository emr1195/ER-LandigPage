import React from 'react'
import Box from '@mui/material/Box'
import {Logo} from '../../components/logo/Logo'
import {ToggleMenu} from '../../components'

export const Mobile = ({navbarInfo, functions}) => {
  const {listMenu, logo} = navbarInfo

  return (
    <Box
      className="mobile-header"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      sx={{display: {xs: 'flex', sm: 'none'}}}
    >
      <Logo logo={logo} />

      <ToggleMenu functions={functions} listMenu={listMenu} />
    </Box>
  )
}
