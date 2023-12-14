import {Button, Grid, Link, TextField, Typography} from '@mui/material'
import React, {useState} from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {AuthLayout} from '../layout'
import {registrationSchema} from '../../validation'
import {yupValidation, useForm} from '../../hooks'
import {registrationFormData} from '../../constants'

export const RegisterPage = () => {
  const {
    name,
    email,
    password,
    onInputChange,
    formState,
    validationState,
    setValidationState,
  } = useForm(registrationFormData)
  const {formValidation} = yupValidation()

  const onSubmit = async (event) => {
    event.preventDefault()
    const validation = await formValidation(registrationSchema, formState)
    setValidationState(validation ?? registrationFormData)
    if (validation && Object.values(validation).some((value) => value !== '')) {
      console.log('Form incorrect')
    } else {
      console.log('Form COrrect')
      // dispatch(checkingAuthentication())
    }
  }

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label="Nombre Completo"
              type="text"
              placeholder="Nombre Completo"
              fullWidth
              value={name}
              name="name"
              onChange={onInputChange}
              error={!!validationState.name}
              helperText={validationState.name}
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
            <Grid item xs={12}>
              <Button variant="contained" fullWidth type="submit">
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{mr: 1}}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
