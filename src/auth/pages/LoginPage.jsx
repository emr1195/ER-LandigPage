import {Google} from '@mui/icons-material'
import {Button, Grid, Link, TextField, Typography} from '@mui/material'
import React, {useMemo, useState} from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {AuthLayout} from '../layout'

import {useDispatch, useSelector} from 'react-redux'
import {checkingAuthentication, startGoogleSignIn} from '../../store/auth'
import {loginFormData} from '../../constants'
import {yupValidation, useForm} from '../../hooks'
import {loginSchema} from '../../validation/LoginValidation'

export const LoginPage = () => {
  const dispatch = useDispatch()
  const {status: authStatus} = useSelector((state) => state.auth)
  const {
    email,
    password,
    onInputChange,
    formState,
    validationState,
    setValidationState,
  } = useForm(loginFormData)
  const {formValidation} = yupValidation()

  const onSubmit = async (event) => {
    event.preventDefault()
    const validation = await formValidation(loginSchema, formState)
    setValidationState(validation ?? loginFormData)
    if (validation && Object.values(validation).some((value) => value !== '')) {
      console.log('Form incorrect')
    } else {
      console.log('Form COrrect')
      dispatch(checkingAuthentication())
    }
  }

  const onGoogleSignIn = () => {
    console.log('on google sign in')
    dispatch(startGoogleSignIn())
  }

  const isAuthenticating = useMemo(
    () => authStatus === 'checking',
    [authStatus],
  )
  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
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
