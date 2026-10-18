import React, {useEffect, useRef} from 'react'
import {PreviewSurface} from './PreviewSurface'
import {previewDevices} from './usePreviewSurface'

export const PreviewDialog = ({
  sectionKey,
  data,
  device,
  onDeviceChange,
  onClose,
}) => {
  const dialog = useRef(null)
  useEffect(() => {
    const previous = document.activeElement
    const element = dialog.current
    element.showModal()
    return () => {
      element.close()
      if (previous?.isConnected) previous.focus()
    }
  }, [])
  return (
    <dialog
      ref={dialog}
      className="admin-preview-dialog"
      aria-label="Vista previa ampliada"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      <header>
        <h2>Vista previa</h2>
        <button
          type="button"
          className="admin-button admin-button-secondary"
          onClick={onClose}
          autoFocus
        >
          Cerrar vista ampliada
        </button>
      </header>
      <label className="admin-preview-device">
        Dispositivo de vista ampliada
        <select
          value={device}
          onChange={(event) => onDeviceChange(event.target.value)}
        >
          {Object.entries(previewDevices).map(([key, item]) => (
            <option value={key} key={key}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <PreviewSurface sectionKey={sectionKey} data={data} device={device} />
    </dialog>
  )
}
