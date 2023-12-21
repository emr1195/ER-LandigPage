import {LogoutOutlined, MenuOutlined} from '@mui/icons-material'
import {AppBar, Grid, IconButton, Toolbar, Typography} from '@mui/material'
import React from 'react'
import {useDispatch} from 'react-redux'
import {startLogout} from '../../store/auth'

/**
 * The AppBar component represents the top application bar in the Dashboard view.
 * It includes navigation controls, the application title, and a logout button.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @param {number} props.drawerWidth - The width of the drawer when it is open.
 * @param {Function} props.handleDrawerToggle - The function to handle the drawer toggle.
 * @param {Function} props.onLogout - The function to handle the logout action.
 * @returns {JSX.Element} - The JSX representation of the AppBar component.
 */

export const NavBar = ({drawerWidth = 240, handleDrawerToggle}) => {
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(startLogout())
    window.location.replace('/auth/login')
  }
  return (
    <AppBar
      position="fixed"
      sx={{
        width: {sm: `calc(100% - ${drawerWidth}px)`},
        ml: {sm: `${drawerWidth}px`},
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          aria-label="open drawer"
          sx={{mr: 2, display: {sm: 'none'}}}
          onClick={handleDrawerToggle}
        >
          <MenuOutlined />
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          <IconButton onClick={onLogout} color="error">
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
