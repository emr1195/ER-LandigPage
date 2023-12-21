import {CircularProgress, Grid} from '@mui/material'
import React from 'react'

/**
 * A loading component displayed during the process of checking the user's authentication status.
 * It renders a circular loading indicator at the center of the screen.
 *
 * @returns {JSX.Element} - The JSX representation of the CheckingAuth component.
 */
export const CheckingAuth = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{minHeight: '100vh', backgroundColor: 'primary.main', padding: 4}}
    >
      <Grid item flexDirection="row" justifyContent="center">
        <CircularProgress color="warning" />
      </Grid>
    </Grid>
  )
}
