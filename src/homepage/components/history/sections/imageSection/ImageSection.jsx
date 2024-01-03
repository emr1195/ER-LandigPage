import {Box, useTheme} from '@mui/material'
import React from 'react'
import {InfoBox} from '../../../common'

export const ImageSection = ({imageSectionInfo}) => {
  const theme = useTheme()
  const {imageLeft, imageRight, icon, iconText} = imageSectionInfo
  return (
    <Box
      className="imageSection-History"
      sx={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexDirection: 'column',
        marginLeft: {xs: '-85px', md: '0'},
        // marginBottom: {xs: '-150px', md: '0'},
        minHeight: {lgMobile: '', laptop: '1000px'},
      }}
    >
      <Box
        className="imageSection-History-Container"
        mx="auto"
        width="fit-content"
      >
        <Box
          display="flex"
          flexDirection="column-reverse"
          alignItems="center"
          justifyContent="center"
          width="fit-content"
        >
          <Box
            className="imageSectionInfo-imageLeft "
            sx={{
              backgroundImage: `url(${imageLeft})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: {xs: '500px'},
              transition: '.5s',
              width: {xs: 208, lgMobile: 288, laptop: 475},
              height: {xs: 405, lgMobile: 465, laptop: 665},
            }}
          />
          <Box
            sx={{
              transform: {
                xs: 'translate(80%, 380%) scale(.85)',
                lgMobile: 'translate(100%, 400%)',
                laptop: 'translate(125%, 500%)',
              },

              // display: {xs: 'none', lgMobile: 'flex'},
            }}
          >
            <InfoBox
              title={iconText}
              icon={icon}
              style={{
                color: theme.palette.black.main,
                backgroundColor: '#f5f5f5',
              }}
            />
          </Box>
        </Box>
        <Box
          className="imageSectionInfo-imageRight "
          sx={{
            zIndex: 10,
            backgroundImage: `url(${imageRight})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: {xs: '500px'},
            outline: '24px solid #f5f5f5',
            outlineOffset: '-1',
            transform: 'translate(50%, -60%)',
            transition: '.5s',
            // marginBottom: {md: '-85px'},
            width: {xs: 186, lgMobile: 226, laptop: 373},
            height: {xs: 310, lgMobile: 350, laptop: 500},
          }}
        />
      </Box>
    </Box>
  )
}
