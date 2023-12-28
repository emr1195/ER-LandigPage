import {Box, Container, Grid} from '@mui/material'
import React from 'react'

export const ImageSection = ({imageSectionInfo}) => {
  const {
    imageBottomLeft,
    imageRightCenter,
    imageTopLeft,
    lastModified,
    updatedBy,
  } = imageSectionInfo
  return (
    <Box className="ImageSection" flexGrow={1} flex={1}>
      <Box display="flex" columnGap="32px">
        <Box
          className="leftSide_images"
          display="flex"
          flexDirection="column"
          gap="32px"
        >
          <img
            className="imageTopLeft"
            src={imageTopLeft.imageURL}
            alt={imageTopLeft.title}
            width={272}
            height={300}
            style={{borderRadius: '32px', objectFit: 'cover'}}
          />
          <img
            className="imageBottomLeft"
            src={imageBottomLeft.imageURL}
            alt={imageTopLeft.title}
            width={272}
            height={300}
            style={{borderRadius: '32px', objectFit: 'cover'}}
          />
        </Box>
        <Box
          className="rightSide_images"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img
            className="imageRightCenter"
            src={imageRightCenter.imageURL}
            alt={imageRightCenter.title}
            width={272}
            height={400}
            style={{borderRadius: '32px', objectFit: 'cover'}}
          />
        </Box>
      </Box>
    </Box>
  )
}
