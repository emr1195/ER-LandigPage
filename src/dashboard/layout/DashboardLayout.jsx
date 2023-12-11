import {Box, Toolbar} from '@mui/material'
import React from 'react'
import {NavBar, SideBar} from '../components'
import {NothingSelectedView} from '../views'

const drawerWidth = 240

export const DashboardLayout = ({children}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{display: 'flex'}}>
      {/* navbar drawerWidth*/}
      <NavBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/* sidebar drawerWidth*/}
      <SideBar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Box component="main" sx={{flexGrow: 1, p: 3}}>
        {/* Toolbar */}
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
