import React from 'react'
import {contentChanges} from '../../../shared/contentChanges'

const date = (value) =>
  new Intl.DateTimeFormat('es', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
const fieldLabels = {
  textSection: 'Texto',
  imageSection: 'Imágenes',
  title: 'Título',
  description: 'Descripción',
  iconText: 'Texto destacado',
  icon: 'Icono',
  imageURL: 'Imagen',
  image: 'Imagen',
  logo: 'Logo',
  name: 'Nombre',
  number: 'Número',
  url: 'Destino',
  mapsUrl: 'Ubicación',
  embedUrl: 'Mapa',
  events: 'Eventos',
  members: 'Integrantes',
  detachments: 'Destacamentos',
  listMenu: 'Enlaces',
  menus: 'Menús',
  socialMedia: 'Redes sociales',
  mainSection: 'Información principal',
  moreInfo: 'Más información',
  aditionalFooterInfo: 'Información adicional',
  programValues: 'Valores',
  expeditionGroups: 'Grupos',
  infoSection: 'Información',
  before: 'Antes',
  after: 'Después',
}
const label = (path) =>
  path
    .split(' / ')
    .map((part) => fieldLabels[part] || part)
    .join(' / ')
const Value = ({value}) => {
  if (value === null || value === undefined || value === '')
    return <span className="admin-muted">Sin contenido</span>
  if (typeof value === 'boolean') return <span>{value ? 'Sí' : 'No'}</span>
  if (
    typeof value === 'string' &&
    (/^data:image\//.test(value) ||
      /\.(png|jpg|jpeg|webp|gif|avif)(\?.*)?$/i.test(value))
  )
    return (
      <img
        className="admin-history-image"
        src={value}
        alt="Imagen registrada"
      />
    )
  return (
    <span>
      {typeof value === 'object' ? JSON.stringify(value) : String(value)}
    </span>
  )
}

export const formatActivityDate = date
export const ActivityDetail = ({detail, onClose}) => (
  <section
    className="admin-panel admin-activity-detail"
    aria-label="Detalle de la actividad"
  >
    <div className="admin-collection-heading">
      <h2>Detalle de la actividad</h2>
      <button className="admin-text-button" onClick={() => onClose()}>
        Cerrar detalle
      </button>
    </div>
    <p>
      {detail.actor_email} · {date(detail.created_at)}
    </p>
    <div className="admin-change-list">
      {contentChanges(detail.before, detail.after).map((change, index) => (
        <article key={index}>
          <h3>{label(change.path)}</h3>
          <div>
            <section>
              <h4>Antes</h4>
              <Value value={change.before} />
            </section>
            <section>
              <h4>Después</h4>
              <Value value={change.after} />
            </section>
          </div>
        </article>
      ))}
    </div>
  </section>
)
