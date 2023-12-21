// React and React-related imports
import React, {useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link as RouterLink} from 'react-router-dom'

// Material-UI imports
import {Alert, Button, Grid, Link, TextField, Typography} from '@mui/material'
import {Google} from '@mui/icons-material'

// Project-specific imports
import {AuthLayout} from '../layout'
import {yupValidation, useForm} from '../../hooks'
import {startGoogleSignIn, startLoginWithEmailPassword} from '../../store/auth'
import {loginFormData} from '../../constants'
import {loginSchema} from '../../validation'

export const LoginPage = () => {
  // Redux dispatch function
  const dispatch = useDispatch()

  // Select authentication status and login error message from the Redux store
  const {
    status: authStatus,
    errorMessage: loginErrorMessage,
    accessed: loginAccessed,
  } = useSelector((state) => state.auth)

  // Form state and validation using the useForm hook
  const {
    email,
    password,
    onInputChange,
    formState,
    validationState,
    setValidationState,
  } = useForm(loginFormData)

  // Form validation functions using the yupValidation utility
  const {formValidation} = yupValidation()

  /**
   * Handles the form submission for the login page.
   *
   * @param {Event} event - The form submission event.
   * @returns {Promise<void>} - A Promise that resolves when the form submission is complete.
   */
  const onSubmit = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault()

    // Perform form validation using the login schema
    const validation = await formValidation(loginSchema, formState)

    // Update the validation state with the validation results, or use the default login form data if validation is null
    setValidationState(validation ?? loginFormData)

    // Check if there are no validation errors (all values are empty strings)
    if (!Object.values(validation || {}).some((value) => value !== '')) {
      // Dispatch the action to start the login process with the provided email and password
      dispatch(startLoginWithEmailPassword({email, password}))
      window.location.replace('/dashboard/')
    }
  }

  /**
   * Initiates the Google sign-in process.
   * Dispatches the action to start the Google sign-in.
   *
   * @returns {void}
   */
  const onGoogleSignIn = () => {
    // Dispatch the action to start the Google sign-in process
    dispatch(startGoogleSignIn())
  }

  /**
   * A memoized boolean indicating whether the authentication status is currently in the 'checking' state.
   * It is true if the authentication status is 'checking', and false otherwise.
   *
   * @type {boolean}
   * @see authStatus - The authentication status that is being checked.
   */
  const isAuthenticating = useMemo(
    () => authStatus === 'checking',
    [authStatus],
  )

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
