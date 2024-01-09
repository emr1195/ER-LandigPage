import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {Box, Link, useTheme} from '@mui/material'
import {Link as RouterLink} from 'react-router-dom'

const ITEM_HEIGHT = 48
export const MobileMenuOptions = ({options}) => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box className="MenuOptions-Mobile" display={{xs: 'block', sm: 'none'}}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map(({name, outsideURL, url}, index) => (
          <Link
            key={index}
            component={RouterLink}
            color="inherit"
            to={outsideURL ? url : `#${url ?? ''}`}
            target={outsideURL ? '_blank' : ''}
            sx={{
              textDecoration: 'none',
              textTransform: 'capitalize',
              display: 'block',
              color: theme.palette.black75.main,
              '&:hover': {
                color: theme.palette.black.main,
              },
            }}
          >
            <MenuItem
              key={index}
              // selected={name === '}
              onClick={handleClose}
            >
              {name}
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </Box>
  )
}
