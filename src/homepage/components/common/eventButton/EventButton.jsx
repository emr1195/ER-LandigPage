import {useTheme} from '@emotion/react'
import {Box, Button, Link} from '@mui/material'
import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {TypographyPersonalized} from '../typography/Typography'

export const EventButton = ({
  displayInfo,
  index,
  sxButton = {},
  sxLink = {},
  sxBox = {},
  onClick,
  link = true,
}) => {
  const theme = useTheme()
  //displayInfo.eventButton for now eventButton comes from Header, because there is only one button and comes from the list of menu,
  //displayInfo.primary for now eventButton comes from HeroSection because there are more than one button one of them will be main one
  return (
    <Box
      display={displayInfo.eventButton || displayInfo.display ? 'flex' : 'none'}
      width={{xs: '100%', lgMobile: 'fit-content'}}
      height="fit-content"
      justifyContent="center"
      alignItems="center"
      className="EventButton"
      key={index}
      sx={{...sxBox}}
    >
      <Button
        variant={
          displayInfo.primary || displayInfo.eventButton ? 'contained' : 'text'
        }
        disabled={displayInfo.disabled}
        onClick={onClick}
        sx={{
          // p: '16px 32px',
          p: '0 32px',
          width: {xs: '100%', lgMobile: '160px'},
          height: '40px',
          borderRadius: '100px',
          fontWeight: displayInfo.eventButton ? '400' : '700',

          boxShadow:
            !displayInfo.eventButton &&
            `0px 4px 10px 0px rgba(0, 0, 0, 0.25), 
            0px 18px 18px 0px rgba(0, 0, 0, 0.21), 
            0px 40px 24px 0px rgba(0, 0, 0, 0.13), 
            0px 71px 28px 0px rgba(0, 0, 0, 0.04), 
            0px 111px 31px 0px rgba(0, 0, 0, 0.00)`,
          backgroundColor:
            displayInfo.primary || displayInfo.eventButton
              ? theme.palette.primary.main
              : theme.palette.light.main,
          '&[disabled]': {
            backgroundColor:
              displayInfo.primary || displayInfo.eventButton
                ? theme.palette.primary.main
                : theme.palette.light.main,
            pointerEvents: 'none',
          },
          ':hover': {
            outline: 'none',
          },
          ...sxButton,
        }}
      >
        {link ? (
          <Link
            key={`${displayInfo.url}_${displayInfo.title}`}
            component={RouterLink}
            disabled={displayInfo.disabled}
            sx={{
              color:
                displayInfo.primary || displayInfo.eventButton
                  ? theme.palette.light.main
                  : theme.palette.black.main,
              listStyle: 'none',
              textDecoration: 'none',
              fontSize: theme.fonts.size.button,
              lineHeight: theme.fonts.lineHeight.button,
              '&[disabled]': {
                pointerEvents: 'none',
              },
              ...sxLink,
            }}
            to={
              displayInfo.outsideURL
                ? displayInfo.url
                : `#${displayInfo.url ?? ''}`
            }
            target={displayInfo.outsideURL ? '_blank' : ''}
          >
            {displayInfo.title}
          </Link>
        ) : (
          <TypographyPersonalized
            variant="button"
            title={displayInfo.title}
            sx={{fontWeight: 'bold', color: 'inherit'}}
          />
        )}
      </Button>
    </Box>
  )
}
