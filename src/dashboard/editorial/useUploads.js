import {createContext, useCallback, useContext, useRef, useState} from 'react'
export const UploadContext = createContext(null)
export const useUploads = () => useContext(UploadContext)
export const useUploadQueue = () => {
  const entries = useRef(new Map())
  const [, setVersion] = useState(0)
  const [epoch, setEpoch] = useState(0)
  const set = useCallback((id, status, controller) => {
    entries.current.set(id, {status, controller})
    setVersion((value) => value + 1)
  }, [])
  const clear = useCallback((id) => {
    entries.current.delete(id)
    setVersion((value) => value + 1)
  }, [])
  const cancelAll = useCallback(() => {
    for (const entry of entries.current.values()) entry.controller?.abort()
    entries.current.clear()
    setVersion((value) => value + 1)
    setEpoch((value) => value + 1)
  }, [])
  return {
    set,
    clear,
    cancelAll,
    epoch,
    pending: [...entries.current.values()].some(
      (entry) => entry.status === 'pending',
    ),
    failed: [...entries.current.values()].some(
      (entry) => entry.status === 'failed',
    ),
  }
}
