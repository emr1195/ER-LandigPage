// React and React-related imports
import React, {useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link as RouterLink} from 'react-router-dom'

// Material-UI imports
import {Alert, Button, Grid, Link, TextField, Typography} from '@mui/material'

// Project-specific imports
import {AuthLayout} from '../layout'
import {registrationSchema} from '../../validation'
import {yupValidation, useForm} from '../../hooks'
import {registrationFormData} from '../../constants'
import {startCreatingUserWithEmailPassword} from '../../store/auth'

export const RegisterPage = () => {
  // Custom hook to manage the state and validation for the registration form
  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    validationState,
    setValidationState,
  } = useForm(registrationFormData)

  // Validation utility using Yup for the registration form
  const {formValidation} = yupValidation()

  // Redux dispatch function
  const dispatch = useDispatch()

  // Select authentication status and error message from the Redux store
  const {
    status: statusOfAuthentication,
    errorMessage: errorMessageFromAuthentication,
  } = useSelector((state) => state.auth)

  // Memoized value to check if the authentication status is in the 'checking' state
  const isCheckingAuthentication = useMemo(
    () => statusOfAuthentication === 'checking',
    [statusOfAuthentication],
  )

  /**
   * Handle form submission for user registration.
   * @param {Event} event - The form submission event.
   */
  const onSubmit = async (event) => {
    event.preventDefault()

    // Validate the registration form using the provided schema
    const validation = await formValidation(registrationSchema, formState)

    // Update the validation state with validation results or use default values
    setValidationState(validation ?? registrationFormData)

    // Function to check if a value is non-empty
    const hasNonEmptyValue = (value) => value !== ''

    // Check if the form has any validation errors
    const isInvalidForm =
      validation && Object.values(validation).some(hasNonEmptyValue)

    // If the form is valid, dispatch the action to create a user with email and password
    if (!isInvalidForm) {
      dispatch(startCreatingUserWithEmailPassword(formState))
    }
  }

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
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
