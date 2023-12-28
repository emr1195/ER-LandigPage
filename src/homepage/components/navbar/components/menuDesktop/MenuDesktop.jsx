import {useTheme} from '@emotion/react'
import {Box, Link} from '@mui/material'
import React from 'react'
import {Link as RouterLink} from 'react-router-dom'

export const MenuDesktop = ({listMenu, functions}) => {
  const theme = useTheme()
  const {handleCloseNavMenu} = functions

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        gap: {md: '32px', lg: '64px'},
        transition: '.5s',
        maxWidth: '650px',
      }}
    >
      {listMenu
        .filter((item) => item.eventButton == false)
        .sort((a, b) => a.position - b.position)
        .map((item, index) => (
          <Link
            key={index}
            onClick={handleCloseNavMenu}
            component={RouterLink}
            sx={{
              color: theme.palette.black50.main,
              listStyle: 'none',
              textDecoration: 'none',
              textTransform: 'capitalize',
              ':hover': {
                color: theme.palette.black.main,
              },
            }}
            to={item.outsideURL ? item.url : `#${item.url}`}
            target={item.outsideURL ? '_blank' : ''}
          >
            {item.title}
          </Link>
        ))}
    </Box>
  )
}
