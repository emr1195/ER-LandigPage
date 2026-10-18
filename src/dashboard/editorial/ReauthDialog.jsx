import React, {useEffect, useRef} from 'react'
import {LoginForm} from './LoginForm'
export const ReauthDialog = ({onSuccess, onBeforeGoogle, onLeave}) => {
  const dialog = useRef(null)
  useEffect(() => {
    const element = dialog.current
    element.showModal()
    return () => element.close()
  }, [])
  return (
    <dialog
      className="admin-dialog admin-reauth-dialog"
      ref={dialog}
      aria-label="Reingresar para continuar"
      onCancel={(event) => event.preventDefault()}
    >
      <LoginForm reauth onSuccess={onSuccess} onBeforeGoogle={onBeforeGoogle} />
      <button className="admin-text-button" onClick={onLeave}>
        Salir y descartar la edición
      </button>
    </dialog>
  )
}
