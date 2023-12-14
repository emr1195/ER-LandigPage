export const yupValidation = () => {
  // Function to handle Yup validation errors
  const handleValidationErrors = (value) => {
    const validationErrors = {}

    value.inner.forEach((error) => {
      validationErrors[error.path] = error.message
    })

    return validationErrors
  }

  const formValidation = async (schemaValidation, formData) => {
    try {
      await schemaValidation.validate(formData, {abortEarly: false})
      // Update your formData or any other logic to handle the validation errors
      return null
      // if validation succees, you can proceed with your form submission
    } catch (error) {
      const yupValidation = handleValidationErrors(error)
      // Update your formData or any other logic to handle the validation errors
      return yupValidation
    }
  }

  return {handleValidationErrors, formValidation}
}
