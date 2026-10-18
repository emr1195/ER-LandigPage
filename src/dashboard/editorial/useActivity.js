import {useCallback, useEffect, useRef, useState} from 'react'
import {apiRequest} from '../../api/client'
export const useActivity = (onSessionExpired, sessionVersion) => {
  const [list, setList] = useState([])
  const [cursor, setCursor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [failure, setFailure] = useState(null)
  const [detail, setDetail] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const listRequest = useRef(0)
  const detailRequest = useRef(0)
  const load = useCallback(
    async (next = null) => {
      const version = ++listRequest.current
      setLoading(true)
      setFailure(null)
      try {
        const data = await apiRequest(
          '/api/activity' + (next ? '?cursor=' + encodeURIComponent(next) : ''),
        )
        if (version !== listRequest.current) return
        setList((previous) =>
          next ? [...previous, ...data.items] : data.items,
        )
        setCursor(data.nextCursor)
      } catch (reason) {
        if (version !== listRequest.current) return
        setFailure({message: reason.message, kind: 'list', cursor: next})
        if (reason.status === 401) onSessionExpired?.()
      } finally {
        if (version === listRequest.current) setLoading(false)
      }
    },
    [onSessionExpired],
  )
  useEffect(() => {
    load()
    return () => {
      // Sequence counters invalidate outstanding requests, not DOM ref snapshots.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      listRequest.current++
      // eslint-disable-next-line react-hooks/exhaustive-deps
      detailRequest.current++
    }
  }, [load, sessionVersion])
  const open = async (id) => {
    const version = ++detailRequest.current
    setDetail(null)
    setDetailLoading(true)
    setFailure(null)
    try {
      const data = await apiRequest('/api/activity/' + id)
      if (version === detailRequest.current) setDetail(data)
    } catch (reason) {
      if (version === detailRequest.current) {
        setFailure({message: reason.message, kind: 'detail', id})
        if (reason.status === 401) onSessionExpired?.()
      }
    } finally {
      if (version === detailRequest.current) setDetailLoading(false)
    }
  }
  return {
    list,
    cursor,
    loading,
    error: failure?.message || '',
    detail,
    detailLoading,
    load,
    open,
    closeDetail: () => setDetail(null),
    retry: () =>
      failure?.kind === 'detail' ? open(failure.id) : load(failure?.cursor),
  }
}
