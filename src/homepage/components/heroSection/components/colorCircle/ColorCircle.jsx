import {Box} from '@mui/material'
import React from 'react'
import {isFirefox} from 'react-device-detect'
export const ColorCircle = (props) => {
  return (
    <Box
      className="colorCirlce"
      display={isFirefox ? 'none' : 'flex'}
      sx={{
        backgroundColor: props.color,
        width: props.width ?? '500px',
        height: props.height ?? '500px',
        filter: props.filter ?? 'blur(200px)',
        position: 'absolute',
        top: props.top,
        left: props.left,
        right: props.right,
        bottom: props.bottom,
        borderRadius: props.borderRadius ?? '500px',
        overflow: 'hidden',
      }}
    />
  )
}
