import React from 'react'
import {AuthLayout} from '../layout'
import {Alert, Button, Grid, TextField, Typography} from '@mui/material'
import {Link} from 'react-router-dom'
import {Link as RouterLink} from 'react-router-dom'
import {Google} from '@mui/icons-material'

export const LoginPageUI = ({props}) => {
  const {
    onSubmit,
    onInputChange,
    email,
    validationState,
    password,
    loginAccessed,
    loginErrorMessage,
    isAuthenticating,
    onGoogleSignIn,
  } = props
  return (
    <AuthLayout title="Login">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate_faster"
      >
        <Grid container>
          {/* Email Input */}
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              onChange={onInputChange}
              value={email}
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

          {/* Password Input */}
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              onChange={onInputChange}
              value={password}
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

          {/* Display Login Error */}
          <Grid
            item
            xs={12}
            display={loginErrorMessage || loginAccessed ? '' : 'none'}
            sx={{mt: 2}}
          >
            <Alert
              severity={
                loginErrorMessage ? 'error' : loginAccessed ? 'success' : 'info'
              }
            >
              {loginErrorMessage || 'Access Successfull'}
            </Alert>
          </Grid>

          {/* Login and Google Sign-In Buttons */}
          <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="button"
                disabled={isAuthenticating}
                onClick={() => onGoogleSignIn()}
                variant="contained"
                fullWidth
              >
                <Google />
                <Typography sx={{ml: 1}}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          {/* Link to Register Page */}
          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
