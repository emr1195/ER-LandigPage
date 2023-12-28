import {AppBar, Container, Toolbar, useTheme} from '@mui/material'
import React from 'react'
import {Desktop, Mobile, Tablet} from './responsive'

export const Navbar = ({navbarInfo}) => {
  const theme = useTheme()
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const headerButton = navbarInfo.listMenu.find(
    (item) => item.eventButton == true,
  )

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar
      className="Header"
      position="static"
      sx={{
        transition: '.5s',
        background: 'transparent',
        boxShadow: 'none',
        padding: '32px 0',
        color: theme.palette.black.main,
        height: 'fit-content',
        gridColumn: '1/-1', // it means go from column 1 until the last one
      }}
    >
      <Container
        sx={{
          p: {xs: 0, sm: 0, md: 0},
          maxWidth: {xs: 'none', sm: 'none', md: 'none'},
        }}
      >
        <Toolbar disableGutters>
          <Desktop
            navbarInfo={navbarInfo}
            headerButton={headerButton}
            functions={{
              handleCloseNavMenu,
            }}
          />

          <Tablet
            navbarInfo={navbarInfo}
            headerButton={headerButton}
            functions={{
              anchorElNav,
              handleOpenNavMenu,
              handleCloseNavMenu,
            }}
          />

          <Mobile
            navbarInfo={navbarInfo}
            functions={{
              anchorElNav,
              handleOpenNavMenu,
              handleCloseNavMenu,
            }}
          />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
