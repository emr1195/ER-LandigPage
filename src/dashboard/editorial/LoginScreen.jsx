import React from 'react'
import {LoginForm} from './LoginForm'
import {Icon} from './Icon'

export const LoginScreen = ({onSuccess, error}) => (
  <div className="admin-app admin-login">
    <aside className="admin-login-story">
      <a href="/" className="admin-brand">
        <span className="admin-monogram">ER</span>
        <span>
          Exploradores
          <br />
          del Rey<small>ADMINISTRACIÓN</small>
        </span>
      </a>
      <div className="admin-login-message">
        <p className="admin-eyebrow">UNA COMUNIDAD. MUCHAS HISTORIAS.</p>
        <h2>
          Detrás de un gran sitio,
          <br />
          hay personas como tú.
        </h2>
        <p>
          Un espacio sencillo para mantener viva nuestra historia, compartir lo
          que viene y seguir creciendo juntos.
        </p>
      </div>
      <span className="admin-login-signature">
        <Icon name="sun" /> Crecer juntos. Servir mejor.
      </span>
    </aside>
    <main className="admin-login-content">
      <LoginForm onSuccess={onSuccess} initialError={error} />
      <a href="/" className="admin-text-button">
        Volver a la página pública
      </a>
    </main>
  </div>
)
