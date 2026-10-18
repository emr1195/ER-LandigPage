import {Box, Toolbar, useTheme} from '@mui/material'
import React, {useEffect} from 'react'
import {NothingSelectedView} from '../views'
import {NavBar, SideBar} from '../components'
import {startLoadingLandingPage} from '../../store/landingPage'
import {useDispatch} from 'react-redux'

const drawerWidth = 240

export const DashboardLayout = ({children}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const dispatch = useDispatch()
  const theme = useTheme()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  useEffect(() => {
    dispatch(startLoadingLandingPage())
  }, [dispatch])

  return (
    <Box
      sx={{display: 'flex'}}
      className="animate__animated animate__fadeIn animate_faster"
    >
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

      <Box
        component="div"
        sx={{
          flexGrow: 1,
          p: 3,
          paddingTop: '100px',
          backgroundColor: theme.palette.background.default,
          minWidth: 0,
          minHeight: '100vh',
        }}
      >
        {/* Toolbar */}
        {/* <Toolbar /> */}
        <Box sx={{bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: 2, boxShadow: '0 8px 24px rgba(15,23,42,0.08)', p: {xs: 1, md: 2}, minWidth: 0}}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
