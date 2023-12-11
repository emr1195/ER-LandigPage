import {Box} from '@mui/material'
import React from 'react'
import {MobileDrawer} from './MobileDrawer'
import {DesktopDrawer} from './DesktopDrawer'

export const SideBar = ({
  drawerWidth = 240,
  mobileOpen,
  handleDrawerToggle,
}) => {
  return (
    <Box component="nav" sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}>
      {/* Mobile Drawer */}
      <MobileDrawer
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      {/* Desktop Drawer */}
      <DesktopDrawer drawerWidth={drawerWidth} />
    </Box>
  )
}
