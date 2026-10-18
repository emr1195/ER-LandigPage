import {useCallback, useEffect, useState} from 'react'
import {apiRequest} from '../../api/client'
export const useAppearance = (onSessionExpired, sessionVersion) => {
  const [appearance, setAppearance] = useState('carbon-azure')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState('')
  const load = useCallback(async () => {
    setPending(true)
    setError('')
    try {
      const value = await apiRequest('/api/me/preferences')
      setAppearance(value.appearance)
    } catch (reason) {
      setError('No pudimos cargar tu apariencia. ' + reason.message)
      if (reason.status === 401) onSessionExpired()
    } finally {
      setPending(false)
    }
  }, [onSessionExpired])
  useEffect(() => {
    load()
  }, [load, sessionVersion])
  const save = async (value) => {
    setPending(true)
    setMessage('')
    setError('')
    try {
      const result = await apiRequest('/api/me/preferences', {
        method: 'PUT',
        body: JSON.stringify({appearance: value}),
      })
      setAppearance(result.appearance)
      setMessage('Apariencia guardada.')
    } catch (reason) {
      setError('No pudimos guardar tu apariencia. ' + reason.message)
      if (reason.status === 401) onSessionExpired()
    } finally {
      setPending(false)
    }
  }
  return {appearance, error, pending, message, save, retry: load}
}
