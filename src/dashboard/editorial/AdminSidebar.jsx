import React from 'react'
import {Link} from 'react-router-dom'
import {sections} from './sections'
import {Icon} from './Icon'
import {AppearanceControl} from './AppearanceControl'
export const AdminSidebar = ({navigation, user, preferences, activeKey}) => {
  const {mobile, open, ref, setOpen, onKeyDown} = navigation
  return (
    <aside
      ref={ref}
      className={'admin-sidebar ' + (open ? 'is-open' : '')}
      role={mobile ? 'dialog' : undefined}
      aria-modal={mobile && open ? true : undefined}
      aria-label="Navegación de administración"
      aria-hidden={mobile && !open}
      inert={mobile && !open ? '' : undefined}
      onKeyDown={onKeyDown}
    >
      <div className="admin-brand-row">
        <Link
          to="/dashboard"
          className="admin-brand"
          onClick={() => setOpen(false)}
        >
          <span className="admin-monogram">ER</span>
          <span className="admin-brand-copy">
            <span className="admin-brand-name">
              Exploradores
              <br />
              del Rey
            </span>
            <small>ADMINISTRACIÓN</small>
          </span>
        </Link>
        <button
          className="admin-icon-button admin-sidebar-close"
          onClick={() => setOpen(false)}
          aria-label="Cerrar navegación"
        >
          <Icon name="close" />
        </button>
      </div>
      <nav aria-label="Administración del sitio">
        {[
          {key: '', label: 'Inicio', icon: 'home'},
          ...sections,
          {key: 'activity', label: 'Actividad', icon: 'history'},
        ].map((item) => (
          <Link
            key={item.key}
            to={'/dashboard' + (item.key ? '/' + item.key : '')}
            aria-current={(activeKey || '') === item.key ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            <Icon name={item.icon} />
            {item.short || item.label}
          </Link>
        ))}
      </nav>
      <div className="admin-account">
        <AppearanceControl preferences={preferences} />
        <strong>{user.displayName || 'Administrador'}</strong>
        <span>{user.email}</span>
        <small>Acceso de administrador</small>
      </div>
    </aside>
  )
}
