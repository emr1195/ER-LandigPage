import {Drawer} from '@mui/material'
import React from 'react'
import {DrawerContainer} from './DrawerContainer'

export const MobileDrawer = ({mobileOpen, handleDrawerToggle, drawerWidth}) => {
  return (
    <Drawer
      variant="temporary" //temporary
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: {xs: 'block', sm: 'none'},
        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
      }}
    >
      <DrawerContainer />
    </Drawer>
  )
}
