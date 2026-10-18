import React from 'react'
import {usePreviewSurface} from './usePreviewSurface'

export const PreviewSurface = ({sectionKey, data, device}) => {
  const {frame, stage, width, height, scale, left} = usePreviewSurface(
    sectionKey,
    data,
    device,
  )
  return (
    <div className="admin-preview-stage" ref={stage}>
      <div
        className="admin-preview-canvas"
        style={{height: Math.ceil(height * scale)}}
      >
        <iframe
          ref={frame}
          title={'Vista previa de ' + sectionKey}
          src={import.meta.env.BASE_URL + 'preview/' + sectionKey}
          style={{width, height, left, transform: `scale(${scale})`}}
        />
      </div>
    </div>
  )
}
