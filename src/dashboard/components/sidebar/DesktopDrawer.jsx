import {Drawer} from '@mui/material'
import React from 'react'
import {DrawerContainer} from './DrawerContainer'

export const DesktopDrawer = ({drawerWidth}) => {
  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        display: {xs: 'none', sm: 'block'},
        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
      }}
    >
      <DrawerContainer />
    </Drawer>
  )
}
