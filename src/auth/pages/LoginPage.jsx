// React and React-related imports
import React, {useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// Material-UI imports
import {Alert, Button, Grid, Link, TextField, Typography} from '@mui/material'
import {Google} from '@mui/icons-material'

// Project-specific imports
import {AuthLayout} from '../layout'
import {yupValidation, useForm} from '../../hooks'
import {startGoogleSignIn, startLoginWithEmailPassword} from '../../store/auth'
import {loginFormData} from '../../constants'
import {loginSchema} from '../../validation'
import {LoginPageUI} from './LoginPageUI'

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
    <LoginPageUI
      props={{
        onSubmit,
        onInputChange,
        email,
        validationState,
        password,
        loginAccessed,
        loginErrorMessage,
        isAuthenticating,
        onGoogleSignIn,
      }}
    />
  )
}
