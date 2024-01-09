import {Box, Link, useTheme} from '@mui/material'
import React from 'react'
import {TypographyPersonalized} from '../../../common'
import {Link as RouterLink} from 'react-router-dom'
import {MobileMenuOptions} from './MobileMenuOptions'

export const MenuSection = ({menus}) => {
  const theme = useTheme()
  return (
    <>
      {menus.map((item, index) => {
        return (
          <Box
            key={index}
            className="menu"
            display="flex"
            flexDirection={{xs: 'row', sm: 'column'}}
            justifyContent={{xs: 'space-between', sm: 'flex-start'}}
            gap="32px"
            p={{xs: '10px 0', md: '0 10px'}}
          >
            <TypographyPersonalized variant={'h5'} title={item.title} />

            <MobileMenuOptions options={item.links} />
            <Box
              display={{xs: 'none', sm: 'flex'}}
              flexDirection="column"
              gap="32px"
              className="MenuOptions"
            >
              {item.links.map(({name, outsideURL, url}, linksIndex) => {
                return (
                  <Link
                    key={linksIndex}
                    component={RouterLink}
                    color="inherit"
                    to={outsideURL ? url : `#${url ?? ''}`}
                    target={outsideURL ? '_blank' : ''}
                    sx={{
                      textDecoration: 'none',
                      textTransform: 'capitalize',
                      display: 'block',
                      color: theme.palette.black50.main,
                      '&:hover': {
                        color: theme.palette.black.main,
                      },
                    }}
                  >
                    <TypographyPersonalized
                      variant={'body'}
                      title={name}
                      color="inherit"
                    />
                  </Link>
                )
              })}
            </Box>
          </Box>
        )
      })}
    </>
  )
}
