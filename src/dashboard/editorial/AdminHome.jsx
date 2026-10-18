import React from 'react'
import {Link} from 'react-router-dom'
import {sections} from './sections'
import {Icon} from './Icon'

export const AdminHome = ({unknown}) => (
  <>
    <div className="admin-page-heading">
      <p className="admin-eyebrow">BIENVENIDO A TU ESPACIO</p>
      <h1>Tu sitio, en buenas manos.</h1>
      <p>Pequeños cambios, una comunidad siempre conectada.</p>
    </div>
    {unknown && (
      <p className="admin-alert" role="status">
        Esta sección no existe. Elige dónde quieres continuar.
      </p>
    )}
    <div className="admin-home-intro">
      <div>
        <h2>¿Qué quieres actualizar?</h2>
        <p>
          Elige una sección para editar su contenido y revisar cómo quedará.
        </p>
      </div>
      <a
        className="admin-button admin-button-secondary"
        href="/"
        target="_blank"
        rel="noreferrer"
      >
        Abrir página pública <Icon name="arrow" />
      </a>
    </div>
    <div className="admin-section-list">
      {sections.map((section, index) => (
        <Link key={section.key} to={'/dashboard/' + section.key}>
          <span className="admin-section-number">
            {String(index + 1).padStart(2, '0')}
          </span>
          <Icon name={section.icon} />
          <span>
            <strong>{section.label}</strong>
            <small>{section.description}</small>
          </span>
          <Icon name="arrow" />
        </Link>
      ))}
    </div>
  </>
)
