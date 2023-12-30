import React from 'react'
import {Box} from '@mui/material'
import {Logo, MenuDesktop} from '../../components'
import {EventButton} from '../../../common'

export const Desktop = ({navbarInfo, functions, headerButton}) => {
  const {listMenu, logo} = navbarInfo

  return (
    <Box
      className="desktop-header"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      sx={{display: {xs: 'none', sm: 'none', laptop: 'flex'}}}
    >
      <Logo logo={logo} />
      <MenuDesktop listMenu={listMenu} functions={functions} />

      <EventButton
        index={`${headerButton}_desktop-header`}
        displayInfo={headerButton}
      />
    </Box>
  )
}
