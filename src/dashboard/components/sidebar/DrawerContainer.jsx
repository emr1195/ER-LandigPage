import {Divider, Toolbar, Typography} from '@mui/material'
import React from 'react'
import {MenuList} from './MenuList'

export const DrawerContainer = () => {
  return (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Nombre Completo
        </Typography>
      </Toolbar>
      <Divider />
      <MenuList />
    </>
  )
}
