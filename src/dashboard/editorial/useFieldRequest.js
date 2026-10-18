import {useCallback, useEffect, useId, useRef, useState} from 'react'
import {useUploads} from './useUploads'

// Image uploads and map resolutions share queue ownership and cancellation.
export const useFieldRequest = () => {
  const id = useId()
  const {set, clear, epoch, sectionKey, onSessionExpired} = useUploads()
  const controller = useRef(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const cancel = useCallback(() => {
    controller.current?.abort()
    controller.current = null
    clear(id)
    setPending(false)
    setError('')
  }, [clear, id])
  useEffect(() => {
    cancel()
  }, [epoch, cancel])
  useEffect(
    () => () => {
      controller.current?.abort()
      clear(id)
    },
    [clear, id],
  )
  const start = useCallback(() => {
    controller.current?.abort()
    const next = new AbortController()
    controller.current = next
    setPending(true)
    setError('')
    set(id, 'pending', next)
    return next
  }, [id, set])
  const finish = useCallback(
    (next) => {
      if (controller.current !== next || next.signal.aborted) return false
      clear(id)
      setPending(false)
      setError('')
      return true
    },
    [clear, id],
  )
  const fail = useCallback(
    (next, reason) => {
      if (controller.current !== next || next.signal.aborted) return
      setPending(false)
      setError(reason.message)
      set(id, 'failed', next)
      if (reason.status === 401) onSessionExpired?.()
    },
    [id, set, onSessionExpired],
  )
  return {pending, error, start, finish, fail, cancel, epoch, sectionKey}
}
