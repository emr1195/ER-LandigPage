import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import {FirebaseAuth} from './config'

/**
 * Google authentication provider instance for use with Firebase authentication.
 * Used in conjunction with signInWithPopup or signInWithRedirect methods.
 *
 * @type {Object} - Instance of GoogleAuthProvider.
 * @see https://firebase.google.com/docs/reference/js/auth/googleauthprovider
 */
const googleProvider = new GoogleAuthProvider()

/**
 * Signs in a user using Google authentication via Firebase.
 *
 * @returns {Object} - An object indicating the result of the Google sign-in attempt.
 * @returns {boolean} Object.ok - Indicates whether the Google sign-in attempt was successful.
 * @returns {string|null} Object.errorMessage - Error message if the sign-in attempt fails, null if successful.
 * @returns {string|null} Object.errorCode - Error code if the sign-in attempt fails, null if successful.
 * @returns {string|null} Object.displayName - User's display name if the sign-in attempt is successful, null if unsuccessful.
 * @returns {string|null} Object.email - User's email address if the sign-in attempt is successful, null if unsuccessful.
 * @returns {string|null} Object.photoURL - User's photo URL if the sign-in attempt is successful, null if unsuccessful.
 * @returns {string|null} Object.uid - User ID (uid) if the sign-in attempt is successful, null if unsuccessful.
 */
export const singInWithGoogle = async () => {
  try {
    // Attempt to sign in with Google
    const result = await signInWithPopup(FirebaseAuth, googleProvider)

    // Destructure user information from the result
    const {displayName, email, photoURL, uid} = result.user

    // Return success with user information
    return {
      ok: true,
      // User Info
      displayName,
      email,
      photoURL,
      uid,
    }
  } catch (error) {
    // Return failure with error details
    const errorCode = error.code
    const errorMessage = error.message
    return {
      ok: false,
      errorMessage,
      errorCode,
    }
  }
}

/**
 * Registers a new user with the provided email, password, and name using Firebase authentication.
 *
 * @param {Object} userData - User data for registration.
 * @param {string} userData.email - User's email address.
 * @param {string} userData.password - User's password.
 * @param {string} userData.displayName - User's name.
 * @returns {Object} - An object indicating the result of the user registration attempt.
 * @returns {boolean} Object.ok - Indicates whether the user registration attempt was successful.
 * @returns {string|null} Object.errorMessage - Error message if the registration attempt fails, null if successful.
 * @returns {string|null} Object.uid - User ID (uid) if the registration attempt is successful, null if unsuccessful.
 * @returns {string|null} Object.photoURL - User's photo URL if the registration attempt is successful, null if unsuccessful.
 * @returns {string} Object.email - User's email address.
 * @returns {string} Object.name - User's name if the registration attempt is successful, null if unsuccessful.
 */
export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}) => {
  try {
    // Create a new user with the provided email and password
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password,
    )
    // Destructure user information from the response
    const {uid, photoURL} = resp.user

    // Update the user profile with the provided name
    await updateProfile(FirebaseAuth.currentUser, {displayName})

    // Return success with user information
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    }
  } catch (error) {
    // Return failure with a personalized error message
    return {
      ok: false,
      errorMessage: handleFirebaseErrorMessage(error.message),
    }
  }
}

/**
 * Attempts to log in a user with the provided email and password using Firebase authentication.
 *
 * @param {Object} credentials - User credentials for login.
 * @param {string} credentials.email - User's email address.
 * @param {string} credentials.password - User's password.
 * @returns {Object} - An object indicating the result of the login attempt.
 * @returns {boolean} Object.ok - Indicates whether the login attempt was successful.
 * @returns {string|null} Object.errorMessage - Error message if the login attempt fails, null if successful.
 * @returns {string|null} Object.uid - User ID (uid) if the login attempt is successful, null if unsuccessful.
 * @returns {string|null} Object.photoURL - User's photo URL if the login attempt is successful, null if unsuccessful.
 * @returns {string|null} Object.displayName - User's display name if the login attempt is successful, null if unsuccessful.
 */

export const loginWithEmailPassword = async ({email, password}) => {
  //! signInWithEmailAndPassword
  try {
    // Attempt to sign in with the provided email and password
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
    // Destructure user information from the response
    const {uid, photoURL, displayName} = resp.user
    // Return success with user information
    return {
      ok: true,
      uid,
      photoURL,
      displayName,
    }
  } catch (error) {
    // Return failure with a personalized error message
    return {
      ok: false,
      errorMessage: handleFirebaseErrorMessage(error.message),
    }
  }
}

/**
 * Extracts the Firebase authentication error code from the error message
 * and returns a personalized error message based on the error code.
 * If no match is found or the error message is not a string, returns the original error message.
 *
 * @param {string|null} errorMessage - The Firebase authentication error message.
 * @returns {string} - Personalized error message or the original error message.
 */
const handleFirebaseErrorMessage = (errorMessage) => {
  const errorCodePattern = /\(auth\/([^)]+)\)/
  const match = errorMessage.match(errorCodePattern)
  const errorCode = match ? match[1] : null

  const personalizedErrorMessage = handleFirebaseError(errorCode)
  const finalErrorMessage = personalizedErrorMessage || error.message

  return finalErrorMessage
}

const handleFirebaseError = (errorCode) => {
  switch (errorCode) {
    case 'user-not-found':
      return 'User not found. Please check your email.'
    case 'wrong-password':
      return 'Invalid password. Please try again.'
    case 'email-already-in-use':
      return 'Email is already in use. Try signing in or use another email.'
    case 'invalid-email':
      return 'Invalid email address. Please enter a valid email.'
    case 'weak-password':
      return 'Weak password. Please choose a stronger password.'
    // Add more cases for other error codes as needed

    // Default case for any other unhandled error codes
    default:
      return 'An error occurred during authentication. Please try again later.'
  }
}

/**
 * The `logoutFirebase` function signs out the currently authenticated user from Firebase.
 *
 * @function
 * @example
 * // Example usage of logoutFirebase function:
 * const handleLogout = async () => {
 *   try {
 *     await logoutFirebase();
 *     console.log('Logout successful');
 *   } catch (error) {
 *     console.error('Error during logout:', error.message);
 *   }
 * };
 * @returns {Promise<void>} A promise that resolves once the user is signed out.
 */
export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut()
}
