// ESLint 8's resolver does not understand this package export subpath.
// eslint-disable-next-line import/no-unresolved
import {createAuthClient} from 'better-auth/react'
import {apiRequest} from './client'

export const authClient = createAuthClient({
  baseURL: window.location.origin,
})

export const signInWithGoogle = async (
  callbackURL = `${window.location.origin}${import.meta.env.BASE_URL}dashboard`,
) => {
  const {error} = await authClient.signIn.social({
    provider: 'google',
    callbackURL,
  })

  if (error) return {ok: false, errorMessage: error.message}
  return {ok: true, redirecting: true}
}

export const registerUserWithEmailPassword = async () => ({
  ok: false,
  errorMessage: 'El registro publico esta deshabilitado.',
})

export const loginWithEmailPassword = async ({email, password}) => {
  const {error} = await authClient.signIn.email({email, password})

  if (error) return {ok: false, errorMessage: error.message, errorCode: error.code}

  try {
    const user = await getAuthorizedUser()
    return {ok: true, ...user}
  } catch (authorizationError) {
    await authClient.signOut()
    return {ok: false, errorMessage: authorizationError.message, errorCode: authorizationError.code}
  }
}

export const getAuthorizedUser = async () => apiRequest('/api/me')

export const logout = async () => {
  const {error} = await authClient.signOut()
  if (error) throw new Error(error.message)
}
