import {useRef} from 'react'
import {apiResponse} from '../../api/client'
import {useFieldRequest} from './useFieldRequest'

export const useImageUpload = (label, onChange) => {
  const request = useFieldRequest()
  const file = useRef(null)
  const change = useRef(onChange)
  change.current = onChange
  const upload = async (next) => {
    if (!next) return
    file.current = next
    const controller = request.start()
    try {
      const body = new FormData()
      body.append('file', next)
      body.append('sectionKey', request.sectionKey)
      body.append('field', label)
      const response = await apiResponse('/api/uploads', {
        method: 'POST',
        body,
        signal: controller.signal,
      })
      const data = await response.json()
      if (request.finish(controller)) change.current(data.url)
    } catch (reason) {
      request.fail(controller, reason)
    }
  }
  return {
    pending: request.pending,
    error: request.error,
    cancel: request.cancel,
    upload,
    retry: () => upload(file.current),
  }
}
