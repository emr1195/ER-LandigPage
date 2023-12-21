import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {login, logout} from '../store/auth'
import {FirebaseAuth} from '../firebase/config'
import {onAuthStateChanged} from 'firebase/auth'
import {startLoadingNotes} from '../store/dashboard'

/**
 * Custom hook responsible for checking the user's authentication status.
 * Utilizes Firebase Authentication's onAuthStateChanged to listen for changes in the authentication state.
 * Dispatches login or logout actions accordingly based on the user's presence.
 *
 * @returns {Object} - An object containing the current authentication status.
 * @property {string} status - The current authentication status ('checking', 'not-authenticated', 'authenticated').
 */
export const useCheckAuth = () => {
  // Retrieve authentication status from the Redux store
  const {status} = useSelector((state) => state.auth)

  // Initialize the dispatch function from the Redux store
  const dispatch = useDispatch()

  useEffect(() => {
    // Subscribe to changes in the authentication state using onAuthStateChanged
    onAuthStateChanged(FirebaseAuth, async (user) => {
      try {
        // If no user is present, dispatch a logout action
        if (!user) return dispatch(logout())

        // If a user is present, extract relevant information and dispatch a login action
        const {uid, email, displayName, photoURL} = user

        // Dispatch a login action with the extracted user information to update the authentication state.
        dispatch(login({uid, email, displayName, photoURL}))

        // Dispatch an action to start loading user notes, assuming that user-related notes need to be loaded upon authentication.
        dispatch(startLoadingNotes())
      } catch (error) {
        // Handle any errors that might occur during the authentication state change
        throw new Error('Error during onAuthStateChanged:', error)
      }
    })
  }, []) // The effect runs once on component mount

  // Return an object containing the current authentication status
  return {
    status,
  }
}
