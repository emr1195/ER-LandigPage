import {Box, IconButton, Menu, MenuItem, Typography} from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'

export const ToggleMenu = ({listMenu, functions}) => {
  const {anchorElNav, handleOpenNavMenu, handleCloseNavMenu} = functions

  return (
    <Box display="flex" alignItems="center" width="fit-content">
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          color: '#000',
        }}
      >
        {listMenu.map((item, index) => (
          <MenuItem key={index} onClick={handleCloseNavMenu}>
            <Typography textAlign="center">{item.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
