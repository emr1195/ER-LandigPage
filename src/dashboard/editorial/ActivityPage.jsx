import React from 'react'
import {findSection} from './sections'
import {useActivity} from './useActivity'
import {ActivityDetail, formatActivityDate as date} from './ActivityDetail'
export const ActivityPage = ({onSessionExpired, sessionVersion = 0}) => {
  const {
    list,
    cursor,
    loading,
    error,
    detail,
    detailLoading,
    load,
    open,
    closeDetail,
    retry,
  } = useActivity(onSessionExpired, sessionVersion)
  return (
    <>
      <div className="admin-page-heading">
        <p className="admin-eyebrow">TRAZABILIDAD DEL SITIO</p>
        <h1>Actividad</h1>
        <p>
          Cada cambio cuenta una historia. Aquí puedes consultar quién lo hizo.
        </p>
      </div>
      <p className="admin-muted">
        Historial de solo lectura. Las publicaciones y las imágenes subidas se
        registran por separado.
      </p>
      {error && (
        <div className="admin-alert" role="alert">
          {error}{' '}
          <button className="admin-text-button" onClick={retry}>
            Reintentar
          </button>
        </div>
      )}
      {loading && <p role="status">Cargando actividad…</p>}
      {!loading && !list.length && !error && (
        <div className="admin-panel">
          <h2>Aún no hay actividad.</h2>
          <p>
            Las nuevas publicaciones aparecerán aquí. No reconstruimos cambios
            anteriores al historial.
          </p>
        </div>
      )}
      <div className="admin-activity-list">
        {list.map((event) => (
          <article key={event.id}>
            <span className="admin-activity-dot" aria-hidden="true" />
            <div>
              <h2>
                {event.action === 'upload'
                  ? 'Imagen subida'
                  : 'Contenido publicado'}{' '}
                <span>
                  · {findSection(event.section_key)?.label || 'Archivo'}
                </span>
              </h2>
              <p>
                {event.actor_name} <span>({event.actor_email})</span>
              </p>
              <time dateTime={event.created_at}>{date(event.created_at)}</time>
            </div>
            <button
              className="admin-text-button"
              onClick={() => open(event.id)}
            >
              Ver cambios
            </button>
          </article>
        ))}
      </div>
      {cursor && (
        <button
          className="admin-button admin-button-secondary"
          onClick={() => load(cursor)}
          disabled={loading}
        >
          Cargar más actividad
        </button>
      )}
      {detailLoading && <p role="status">Cargando detalle…</p>}
      {detail && <ActivityDetail detail={detail} onClose={closeDetail} />}
    </>
  )
}
