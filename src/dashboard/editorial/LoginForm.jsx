import React, {useState} from 'react'
import {useLogin} from './useLogin'
export const LoginForm = ({
  onSuccess,
  reauth = false,
  initialError = '',
  onBeforeGoogle,
}) => {
  const [visible, setVisible] = useState(false)
  const {
    email,
    setEmail,
    password,
    setPassword,
    pending,
    error,
    google,
    submit,
    googleLogin,
    providerError,
    providerPending,
    loadProviders,
  } = useLogin({onSuccess, initialError, onBeforeGoogle})
  return (
    <form className="admin-login-form" onSubmit={submit}>
      <p className="admin-eyebrow">
        {reauth ? 'CONTINUEMOS DONDE QUEDASTE' : 'TU ESPACIO DE ADMINISTRACIÓN'}
      </p>
      {reauth ? <h2>Vuelve a ingresar.</h2> : <h1>Qué bueno tenerte aquí.</h1>}
      <p className="admin-muted">
        {reauth
          ? 'Tu sesión venció. Conservamos tu edición en esta pestaña.'
          : 'Ingresa para cuidar el contenido de tu comunidad.'}
      </p>
      <label className="admin-field">
        Correo electrónico
        <input
          name="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          disabled={pending}
        />
      </label>
      <label className="admin-field">
        Contraseña
        <span className="admin-password">
          <input
            aria-label="Contraseña"
            name="password"
            type={visible ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            disabled={pending}
          />
          <button
            type="button"
            className="admin-text-button"
            onClick={() => setVisible((value) => !value)}
            aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {visible ? 'Ocultar' : 'Mostrar'}
          </button>
        </span>
      </label>
      {error && (
        <p className="admin-alert" role="alert">
          {error}
        </p>
      )}
      <button className="admin-button" type="submit" disabled={pending}>
        {pending ? 'Ingresando…' : 'Ingresar'}
      </button>
      {google && (
        <button
          className="admin-button admin-button-secondary"
          type="button"
          onClick={googleLogin}
          disabled={pending}
        >
          Continuar con Google
        </button>
      )}
      {providerError && (
        <div role="alert" className="admin-muted">
          {providerError}{' '}
          <button
            type="button"
            className="admin-text-button"
            onClick={loadProviders}
            disabled={providerPending}
          >
            Reintentar opciones de acceso
          </button>
        </div>
      )}
      <p className="admin-login-note">Acceso exclusivo para administradores.</p>
    </form>
  )
}
