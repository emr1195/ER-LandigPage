import {ThemeProvider} from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'
import {purpleTheme} from './purpleTheme'

export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
