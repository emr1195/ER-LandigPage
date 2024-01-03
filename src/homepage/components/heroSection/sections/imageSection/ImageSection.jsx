import {Box, Container, Grid} from '@mui/material'
import React from 'react'
import {InfoBox} from '../../../common'
import {useTheme} from '@emotion/react'

export const ImageSection = ({imageSectionInfo}) => {
  const theme = useTheme()

  const {
    imageBottomLeft,
    imageRightCenter,
    imageTopLeft,
    lastModified,
    updatedBy,
  } = imageSectionInfo
  return (
    <Box
      className="ImageSection-HeroSection"
      flex={1}
      sx={{
        transition: '.5s',
        zIndex: 10,
      }}
    >
      <Box display="flex" columnGap={{lgMobile: '16px', laptop: '32px'}}>
        <Box
          className="leftSide_images"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          rowGap={{xs: '16px', laptop: '32px'}}
        >
          <Box
            className="imageTopLeft "
            sx={{
              backgroundImage: `url(${imageTopLeft.imageURL})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: {xs: '20px', lgMobile: '32px'},
              width: {xs: 136, lgMobile: 204, tablet: 272},
              height: {xs: 150, lgMobile: 225, tablet: 300},
            }}
          />
          {/* <img
              src={imageTopLeft.imageURL}
              alt={imageTopLeft.title}
              width="100%"
              height="100%"
              style={{
                borderRadius: {xs: '20px', lgMobile: '32px'},
                objectFit: 'cover',
              }}
            /> 
          </Box>*/}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              className="imageBottomLeft boxShadowImages"
              sx={{
                backgroundImage: `url(${imageBottomLeft.imageURL})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: {xs: '20px', lgMobile: '32px'},
                width: {xs: 136, lgMobile: 204, tablet: 272},
                height: {xs: 150, lgMobile: 225, tablet: 300},
              }}
            />
            {/* <img
                className="boxShadowImages"
                src={imageBottomLeft.imageURL}
                alt={imageTopLeft.title}
                width="100%"
                height="100%"
                style={{
                  borderRadius: {xs: '20px', lgMobile: '32px'},
                  objectFit: 'cover',
                }}
              /> 
            </Box>*/}
            <Box
              sx={{scale: {xs: '.75', lgMobile: '.85'}}}
              zIndex={5}
              marginTop="-25px"
            >
              <InfoBox
                title={imageBottomLeft.title}
                icon={imageBottomLeft.icon}
                style={{
                  padding: '0 10px',
                  gap: '10px',
                  color: theme.palette.black.main,
                  width: '100%',
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          className="rightSide_images"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            className="imageBottomLeft boxShadowImages"
            sx={{
              backgroundImage: `url(${imageRightCenter.imageURL})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: {xs: '20px', lgMobile: '32px'},
              width: {xs: '136px', lgMobile: '187px', tablet: '272px'},
              height: {xs: '200px', lgMobile: '300px', tablet: '400px'},
            }}
          />
          {/* <img
              className="boxShadowImages"
              src={imageRightCenter.imageURL}
              alt={imageRightCenter.title}
              width="100%"
              height="100%"
              style={{
                // borderRadius: {xs: '20px', lgMobile: '32px'},
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            /> 
          </Box>*/}
          <Box
            sx={{scale: {xs: '.75', lgMobile: '.85', laptop: '1'}}}
            zIndex={5}
            marginTop="-25px"
          >
            <InfoBox
              title={imageRightCenter.title}
              icon={imageRightCenter.icon}
              style={{
                padding: '0 10px',
                gap: '10px',
                color: theme.palette.black.main,
                flexDirection: 'row-reverse',
                width: '100%',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
