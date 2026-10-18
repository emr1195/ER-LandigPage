import React, {useState} from 'react'
import {PreviewSurface} from './PreviewSurface'
import {PreviewDialog} from './PreviewDialog'
import {previewDevices} from './usePreviewSurface'
import './preview.css'

export const PreviewFrame = ({sectionKey, data}) => {
  const [device, setDevice] = useState(() =>
    window.matchMedia('(max-width: 760px)').matches ? 'mobile' : 'desktop',
  )
  const [expanded, setExpanded] = useState(false)
  return (
    <aside className="admin-preview">
      <div className="admin-preview-label">
        <strong>VISTA PREVIA</strong>
        <span>Página pública</span>
      </div>
      <div className="admin-preview-controls">
        <label className="admin-preview-device">
          <span className="admin-visually-hidden">
            Dispositivo de vista previa
          </span>
          <select
            value={device}
            onChange={(event) => setDevice(event.target.value)}
          >
            {Object.entries(previewDevices).map(([key, item]) => (
              <option value={key} key={key}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="admin-button admin-button-secondary"
          onClick={() => setExpanded(true)}
          aria-label="Ampliar vista previa"
        >
          Ampliar
        </button>
      </div>
      <PreviewSurface sectionKey={sectionKey} data={data} device={device} />
      <p>Vista a escala · el sitio conserva su diseño.</p>
      {expanded && (
        <PreviewDialog
          sectionKey={sectionKey}
          data={data}
          device={device}
          onDeviceChange={setDevice}
          onClose={() => setExpanded(false)}
        />
      )}
    </aside>
  )
}
