import {useRef} from 'react'
import {uploadImageFile} from '../../api/uploads'
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
      const data = await uploadImageFile(next, {sectionKey: request.sectionKey, field: label, signal: controller.signal})
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
