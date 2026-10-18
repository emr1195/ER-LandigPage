import React, {useEffect, useRef} from 'react'

export const PreviewFrame = ({sectionKey, data}) => {
  const frame = useRef(null)
  useEffect(() => {
    const send = () =>
      frame.current?.contentWindow?.postMessage(
        {type: 'admin-preview', sectionKey, data},
        window.location.origin,
      )
    const ready = (event) => {
      if (
        event.origin === window.location.origin &&
        event.source === frame.current?.contentWindow &&
        event.data?.type === 'preview-ready'
      )
        send()
    }
    window.addEventListener('message', ready)
    send()
    return () => window.removeEventListener('message', ready)
  }, [sectionKey, data])
  return (
    <aside className="admin-preview">
      <div className="admin-preview-label">
        <strong>VISTA PREVIA</strong>
        <span>Página pública</span>
      </div>
      <iframe
        ref={frame}
        title={'Vista previa de ' + sectionKey}
        src={import.meta.env.BASE_URL + 'preview/' + sectionKey}
      />
      <p>La página pública conserva su propia identidad visual.</p>
    </aside>
  )
}
