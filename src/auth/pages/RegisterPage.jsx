// React and React-related imports
import React, {useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// Project-specific imports
import {AuthLayout} from '../layout'
import {registrationSchema} from '../../validation'
import {yupValidation, useForm} from '../../hooks'
import {registrationFormData} from '../../constants'
import {startCreatingUserWithEmailPassword} from '../../store/auth'
import {RegisterPageUI} from './RegisterPageUI'

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
    <RegisterPageUI
      props={{
        onSubmit,
        displayName,
        onInputChange,
        validationState,
        email,
        password,
        errorMessageFromAuthentication,
        isCheckingAuthentication,
      }}
    />
  )
}
