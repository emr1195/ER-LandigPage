// React and React-related imports
import React from 'react'
import {Link as RouterLink} from 'react-router-dom'

// Project-specific imports
import {AuthLayout} from '../layout'

// Material-UI imports
import {Alert, Button, Grid, Link, TextField, Typography} from '@mui/material'

export const RegisterPageUI = ({props}) => {
  const {
    onSubmit,
    displayName,
    onInputChange,
    validationState,
    email,
    password,
    errorMessageFromAuthentication,
    isCheckingAuthentication,
  } = props

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit}>
        <Grid container>
          {/* Name Input Field */}
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label="Nombre Completo"
              type="text"
              placeholder="Nombre Completo"
              fullWidth
              value={displayName}
              name="displayName"
              onChange={onInputChange}
              error={!!validationState.displayName}
              helperText={validationState.displayName}
              autoComplete="off"
              inputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
            />
          </Grid>

          {/* Email Input Field */}
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              value={email}
              name="email"
              onChange={onInputChange}
              error={!!validationState.email}
              helperText={validationState.email}
              autoComplete="off"
              inputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
            />
          </Grid>

          {/* Password Input Field */}
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              value={password}
              name="password"
              onChange={onInputChange}
              error={!!validationState.password}
              helperText={validationState.password}
              autoComplete="off"
              inputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
            />
          </Grid>

          <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
            {/* Authentication Error Alert */}
            <Grid
              item
              xs={12}
              display={!!errorMessageFromAuthentication ? '' : 'none'}
            >
              <Alert severity="error">{errorMessageFromAuthentication}</Alert>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                variant="contained"
                fullWidth
                type="submit"
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          {/* Login Link */}
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{mr: 1}}>¿Ya tienes cuenta?</Typography>
            <Link
              component={RouterLink}
              color="inherit"
              // to="/auth/login"
              to={
                displayInfo.outsideURL
                  ? displayInfo.url
                  : `#${displayInfo.url ?? ''}`
              }
              target={displayInfo.outsideURL ? '_blank' : ''}
            >
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
