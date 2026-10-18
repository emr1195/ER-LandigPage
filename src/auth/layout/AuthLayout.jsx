import {Grid, Typography} from '@mui/material'
import React from 'react'

export const AuthLayout = ({children, title = ''}) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{minHeight: '100vh', backgroundColor: 'background.default', backgroundImage: 'linear-gradient(135deg, #E2EAF3 0%, #F8FAFC 65%, #F7F1E4 100%)', padding: 4}}
    >
      <Grid
        item
        // className="box-shadow"
        boxShadow={'0 16px 40px rgba(15,23,42,.18)'}
        xs={3}
        sx={{
          backgroundColor: 'white',
          border: '1px solid #D9E2EC',
          padding: 3,
          borderRadius: 2,
          width: {sm: '450px'},
        }}
      >
        <Typography variant="h5" sx={{mb: 1}}>
          {title}
        </Typography>

        {/* children */}
        {children}
      </Grid>
    </Grid>
  )
}
