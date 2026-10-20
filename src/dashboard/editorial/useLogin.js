import {useCallback, useEffect, useRef, useState} from 'react'
import {loginWithEmailPassword, signInWithGoogle} from '../../api/auth'
import {apiRequest} from '../../api/client'
import {useLocation} from 'react-router-dom'
import {loginDestination} from './loginDestination'
import {loginErrorMessage} from './loginErrors'
export const useLogin = ({onSuccess, initialError = '', onBeforeGoogle}) => {
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(initialError)
  const [google, setGoogle] = useState(false)
  const [providerError, setProviderError] = useState('')
  const [providerPending, setProviderPending] = useState(false)
  const alive = useRef(true)
  const loadProviders = useCallback(async () => {
    setProviderPending(true)
    setProviderError('')
    try {
      const config = await apiRequest('/api/config')
      if (alive.current) setGoogle(config.googleAuthEnabled)
    } catch {
      if (alive.current)
        setProviderError('No pudimos consultar los métodos de acceso.')
    } finally {
      if (alive.current) setProviderPending(false)
    }
  }, [])
  useEffect(() => {
    alive.current = true
    loadProviders()
    return () => {
      alive.current = false
    }
  }, [loadProviders])
  const submit = async (event) => {
    event.preventDefault()
    if (pending) return
    setError('')
    setPending(true)
    try {
      const result = await loginWithEmailPassword({
        email: email.trim(),
        password,
      })
      if (!result.ok) throw new Error(loginErrorMessage(result))
      if (alive.current) onSuccess(result)
    } catch (reason) {
      if (alive.current)
        setError(
          reason.message === 'Failed to fetch'
            ? 'No pudimos conectar. Revisa tu conexión e inténtalo de nuevo.'
            : reason.message,
        )
    } finally {
      if (alive.current) setPending(false)
    }
  }
  const googleLogin = async () => {
    if (pending) return
    setPending(true)
    setError('')
    try {
      onBeforeGoogle?.()
      const destination = new URL(
        loginDestination(location).slice(1),
        window.location.origin + import.meta.env.BASE_URL,
      ).href
      const result = await signInWithGoogle(destination)
      if (!result.ok) throw new Error(result.errorMessage)
    } catch (reason) {
      if (alive.current) {
        setError('No pudimos iniciar con Google. ' + reason.message)
        setPending(false)
      }
    }
  }
  return {
    email,
    setEmail,
    password,
    setPassword,
    pending,
    error,
    google,
    submit,
    googleLogin,
    providerError,
    providerPending,
    loadProviders,
  }
}
