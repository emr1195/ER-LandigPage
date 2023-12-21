import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  singInWithGoogle,
} from '../../firebase/providers'
import {clearNotesLogout, handleError} from '../dashboard'
import {checkingCredentials, login, logout} from './authSlice'

/**
 * Initiates the process of checking user authentication without providing specific credentials.
 *
 * Actions:
 * - `checkingCredentials`: Dispatched to indicate that the application is checking user credentials.
 *
 * @example
 * // Dispatching the checkingAuthentication action in a Redux component
 * dispatch(checkingAuthentication());
 */
export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
  }
}

/**
 * Initiates the Google sign-in process.
 * Dispatches actions to check credentials, perform Google sign-in, or log out based on the response.
 *
 * @returns {Function} Asynchronous function that dispatches actions based on the Google sign-in response.
 * @throws {Error} Throws an error if an issue occurs during the sign-in process.
 *
 * @example
 * // Dispatching the action in a Redux store
 * dispatch(startGoogleSignIn());
 */
export const startGoogleSignIn = () => {
  return async (dispatch) => {
    // Dispatch checking credentials action
    dispatch(checkingCredentials())

    // Call the singInWithGoogle function to initiate Google sign-in
    const result = await singInWithGoogle()

    // If Google sign-in is unsuccessful, dispatch logout action with error details
    if (!result.ok) return dispatch(logout(result.errorMessage))

    // If Google sign-in is successful, dispatch login action with user details
    dispatch(login(result))
  }
}

/**
 * Initiates the user registration process with email, password, and name credentials.
 * Dispatches actions to check credentials, perform registration, or log out based on the response.
 *
 * @param {Object} credentials - User registration credentials, including name, email, and password.
 * @param {string} credentials.displayName - User's full name.
 * @param {string} credentials.email - User's email address.
 * @param {string} credentials.password - User's password.
 * @returns {Function} Asynchronous function that dispatches actions based on the registration response.
 * @throws {Error} Throws an error if an issue occurs during the registration process.
 *
 * @example
 * // Dispatching the action in a Redux store
 * dispatch(startCreatingUserWithEmailPassword({
 *   displayName: 'John Doe',
 *   email: 'john.doe@example.com',
 *   password: 'securePassword'
 * }));
 */
export const startCreatingUserWithEmailPassword = ({
  displayName,
  password,
  email,
}) => {
  return async (dispatch) => {
    // Dispatch checking credentials action
    dispatch(checkingCredentials())

    // Call the registerUserWithEmailPassword function to attempt registration
    const {ok, uid, photoURL, errorMessage} =
      await registerUserWithEmailPassword({
        displayName,
        password,
        email,
      })

    // If registration is unsuccessful, dispatch logout action with error details
    if (!ok) return dispatch(logout({errorMessage}))

    // If registration is successful, dispatch login action with user details
    dispatch(login({uid, displayName, email, photoURL}))
  }
}

/**
 * Initiates the login process with email and password credentials.
 * Dispatches actions to check credentials, perform login, or log out based on the response.
 *
 * @param {Object} credentials - User credentials, including email and password.
 * @param {string} credentials.email - User's email address.
 * @param {string} credentials.password - User's password.
 * @returns {Function} Asynchronous function that dispatches actions based on the login response.
 * @throws {Error} Throws an error if an issue occurs during the login process.
 *
 * @example
 * // Dispatching the action in a Redux store
 * dispatch(startLoginWithEmailPassword({ email: 'user@example.com', password: 'securePassword' }));
 */
export const startLoginWithEmailPassword = ({email, password}) => {
  return async (dispatch) => {
    // Dispatch checking credentials action
    dispatch(checkingCredentials())

    // Call the loginWithEmailPassword function to attempt login
    const resp = await loginWithEmailPassword({
      email,
      password,
    })

    // If login is unsuccessful, dispatch logout action with error details
    if (!resp.ok) return dispatch(logout(resp))

    // If login is successful, dispatch login action with user details
    dispatch(login(resp))
  }
}

/**
 * Initiates the logout process, including logging the user out from Firebase.
 *
 * @function
 * @async
 * @param {Function} dispatch - The Redux dispatch function.
 * @throws {Error} Throws an error if an issue occurs during the logout process.
 * @returns {Promise<void>} A Promise that resolves once the logout process is complete.
 */
export const startLogout = () => {
  return async (dispatch) => {
    try {
      // Call the Firebase logout function to sign the user out
      await logoutFirebase()

      // Dispatch the logout action to update the authentication state
      dispatch(logout({}))

      // Dispatch the logout action to clean up the dashboard state
      dispatch(clearNotesLogout)
    } catch (error) {
      // Handle any errors that occurred during the logout process
      dispatch(handleError(error.message))
      throw new Error(`Error during logout: ${error.message}`)
    }
  }
}
