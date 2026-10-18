import React, {useState} from 'react'
import {ConfirmDialog} from './ConfirmDialog'
import {at} from './formChanges'

export const CollectionEditor = ({
  label,
  items = [],
  onChange,
  create,
  children,
  zeroBased = false,
  minItems = 0,
  sortable = true,
}) => {
  const [removing, setRemoving] = useState(null)
  const normalize = (rows) =>
    rows.map((item, index) => ({
      ...item,
      position: index + (zeroBased ? 0 : 1),
    }))
  const move = (index, direction) => {
    onChange((current) => {
      const rows = [...current]
      ;[rows[index], rows[index + direction]] = [
        rows[index + direction],
        rows[index],
      ]
      return normalize(rows)
    })
  }
  const name = (item) =>
    item?.title ||
    item?.name ||
    item?.bullet ||
    item?.description ||
    'Elemento sin nombre'
  return (
    <section className="admin-collection">
      <div className="admin-collection-heading">
        <h3>{label}</h3>
        <button
          type="button"
          className="admin-button admin-button-secondary"
          onClick={() =>
            onChange((current) => [
              ...(current || []),
              {
                ...create(),
                id: crypto.randomUUID(),
                position: (current?.length || 0) + (zeroBased ? 0 : 1),
              },
            ])
          }
        >
          Agregar {label.toLowerCase()}
        </button>
      </div>
      {!items.length && (
        <p className="admin-empty">
          Todavía no hay elementos. Agrega el primero cuando lo necesites.
        </p>
      )}
      {items.map((item, index) => (
        <details
          className="admin-record"
          key={item.id || index}
          open={index === 0}
        >
          <summary>
            {name(item)}
            <span>{String(index + 1).padStart(2, '0')}</span>
          </summary>
          <div className="admin-record-body">
            {children(item, at(onChange, index), index)}
            <div className="admin-record-actions">
              {sortable && (
                <>
                  <button
                    type="button"
                    className="admin-text-button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    aria-label={'Subir ' + name(item)}
                  >
                    Subir
                  </button>
                  <button
                    type="button"
                    className="admin-text-button"
                    onClick={() => move(index, 1)}
                    disabled={index === items.length - 1}
                    aria-label={'Bajar ' + name(item)}
                  >
                    Bajar
                  </button>
                </>
              )}
              <button
                className="admin-text-button admin-danger"
                type="button"
                disabled={items.length <= minItems}
                onClick={() => setRemoving(index)}
                aria-label={'Eliminar ' + name(item)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </details>
      ))}
      {removing !== null && (
        <ConfirmDialog
          title="¿Eliminar este elemento?"
          confirm="Confirmar eliminación"
          cancel="Cancelar"
          onCancel={() => setRemoving(null)}
          onConfirm={() => {
            const id = items[removing].id
            onChange((current) =>
              normalize(current.filter((item) => item.id !== id)),
            )
            setRemoving(null)
          }}
        >
          <p>
            <strong>{name(items[removing])}</strong>
          </p>
          <p>La eliminación quedará pendiente hasta Guardar y publicar.</p>
        </ConfirmDialog>
      )}
    </section>
  )
}
