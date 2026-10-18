import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {login, logout} from '../store/auth'
import {startLoadingNotes} from '../store/dashboard'
import {getAuthorizedUser} from '../api'
import {externalApi} from '../api/deployment'

/**
 * Custom hook responsible for checking the user's authentication status.
 * Consulta la sesion segura expuesta por la API del proyecto.
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
    let active = true
    if (externalApi) {
      dispatch(logout())
      return undefined
    }

    getAuthorizedUser()
      .then((authorizedUser) => {
        if (!active) return
        dispatch(login(authorizedUser))
        dispatch(startLoadingNotes())
      })
      .catch((error) => {
        if (!active) return
        const unauthenticated = error.message === 'Debes iniciar sesion.'
        dispatch(logout(unauthenticated ? {} : {errorMessage: error.message}))
      })

    return () => {
      active = false
    }
  }, [dispatch])

  // Return an object containing the current authentication status
  return {
    status,
  }
}
