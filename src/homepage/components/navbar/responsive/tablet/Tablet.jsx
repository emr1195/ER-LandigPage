import React from 'react'
import {Logo} from '../../components/logo/Logo'
import {ToggleMenu} from '../../components'
import {Box} from '@mui/material'
import {EventButton} from '../../../common'

export const Tablet = ({navbarInfo, functions, headerButton}) => {
  const {listMenu, logoTitle, logo} = navbarInfo

  return (
    <Box
      className="tablet-header"
      sx={{display: {xs: 'none', sm: 'flex', md: 'none'}}}
      width="100%"
      alignItems="center"
      justifyContent="space-between"
    >
      <ToggleMenu functions={functions} listMenu={listMenu} />

      <Logo logo={logo} title={logoTitle} showTitle={true} />

      <EventButton displayInfo={headerButton} />
    </Box>
  )
}
