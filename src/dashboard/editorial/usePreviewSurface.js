import {useEffect, useRef, useState} from 'react'

export const previewDevices = {
  desktop: {label: 'Escritorio', width: 1280},
  tablet: {label: 'Tablet', width: 768, height: 1024},
  mobile: {label: 'Móvil', width: 390, height: 844},
}

export const usePreviewSurface = (sectionKey, data, device) => {
  const frame = useRef(null)
  const stage = useRef(null)
  const [availableWidth, setAvailableWidth] = useState(0)
  const [contentHeight, setHeight] = useState(720)
  const width = previewDevices[device].width
  // Navigation menus render in a portal outside the measured header. Give
  // their mobile/tablet viewport enough room to open, as on the public page.
  const height = Math.max(
    contentHeight,
    sectionKey === 'navbar' ? previewDevices[device].height || 64 : 64,
  )
  useEffect(() => {
    const element = stage.current
    const measure = () => setAvailableWidth(element.clientWidth)
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    measure()
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    const send = () =>
      frame.current?.contentWindow?.postMessage(
        {type: 'admin-preview', sectionKey, data},
        window.location.origin,
      )
    const receive = (event) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== frame.current?.contentWindow ||
        event.data?.sectionKey !== sectionKey
      )
        return
      if (event.data?.type === 'preview-ready') send()
      if (
        event.data?.type === 'preview-size' &&
        Number.isFinite(event.data.height)
      )
        setHeight(Math.max(64, Math.min(20000, Math.ceil(event.data.height))))
    }
    const element = frame.current
    window.addEventListener('message', receive)
    element.addEventListener('load', send)
    send()
    return () => {
      window.removeEventListener('message', receive)
      element.removeEventListener('load', send)
    }
  }, [sectionKey, data])
  const scale = Math.min(1, (availableWidth || width) / width)
  return {
    frame,
    stage,
    width,
    height,
    scale,
    left: Math.max(0, (availableWidth - width * scale) / 2),
  }
}
