import React, {useEffect, useRef} from 'react'

export const ConfirmDialog = ({
  title,
  children,
  confirm = 'Descartar cambios',
  cancel = 'Seguir editando',
  onConfirm,
  onCancel,
}) => {
  const dialog = useRef(null)
  useEffect(() => {
    const previous = document.activeElement
    const element = dialog.current
    element.showModal()
    return () => {
      element.close()
      previous?.focus()
    }
  }, [])
  return (
    <dialog
      ref={dialog}
      className="admin-dialog"
      aria-labelledby="admin-confirm-title"
      onCancel={(event) => {
        event.preventDefault()
        onCancel()
      }}
    >
      <h2 id="admin-confirm-title">{title}</h2>
      <div className="admin-muted">{children}</div>
      <div className="admin-dialog-actions">
        <button
          className="admin-button admin-button-secondary"
          type="button"
          onClick={onCancel}
          autoFocus
        >
          {cancel}
        </button>
        {confirm && (
          <button className="admin-button" type="button" onClick={onConfirm}>
            {confirm}
          </button>
        )}
      </div>
    </dialog>
  )
}
