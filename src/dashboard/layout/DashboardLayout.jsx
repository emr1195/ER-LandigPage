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
  }, [])

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
          backgroundColor: theme.palette.light.main,
        }}
      >
        {/* Toolbar */}
        {/* <Toolbar /> */}
        {children}
      </Box>
    </Box>
  )
}
