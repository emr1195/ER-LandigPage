import {useEffect, useRef, useState} from 'react'
import {
  parseGoogleMapsUrl,
  googleMapsEmbedUrl,
} from '../../../shared/googleMaps'
import {apiRequest} from '../../api/client'
import {useFieldRequest} from './useFieldRequest'

export const useMapPreview = (value, onChange) => {
  const {start, finish, fail, cancel, epoch, pending, error} = useFieldRequest()
  const change = useRef(onChange)
  change.current = onChange
  const timer = useRef(null)
  const [url, setUrl] = useState('')
  const [attempt, setAttempt] = useState(0)
  // Discard can restore identical values; still cancel the debounce and request.
  useEffect(() => () => clearTimeout(timer.current), [epoch])
  useEffect(() => {
    let active = true
    const source = value.mapsUrl?.trim() || ''
    setUrl('')
    if (!source) {
      cancel()
      return
    }
    const controller = start()
    try {
      const parsed = parseGoogleMapsUrl(source)
      if (!parsed.short || value.embedUrl) {
        setUrl(googleMapsEmbedUrl(value.embedUrl || source))
        finish(controller)
      } else {
        timer.current = setTimeout(async () => {
          if (!active || controller.signal.aborted) return
          try {
            const result = await apiRequest('/api/maps/preview', {
              method: 'POST',
              body: JSON.stringify({url: source}),
              signal: controller.signal,
            })
            if (active && finish(controller)) {
              setUrl(result.embedUrl)
              change.current((previous) => ({
                ...previous,
                embedUrl: result.embedUrl,
              }))
            }
          } catch (reason) {
            if (active) fail(controller, reason)
          }
        }, 400)
      }
    } catch (reason) {
      fail(controller, reason)
    }
    return () => {
      active = false
      clearTimeout(timer.current)
      controller.abort()
      cancel()
    }
  }, [value.mapsUrl, value.embedUrl, attempt, start, finish, fail, cancel])
  return {url, pending, error, retry: () => setAttempt((value) => value + 1)}
}
