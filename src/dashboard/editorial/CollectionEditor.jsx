import React, {useContext, useEffect, useState} from 'react'
import {ConfirmDialog} from './ConfirmDialog'
import {at, ValidationContext} from './formChanges'

export const CollectionEditor = ({
  label,
  items = [],
  onChange,
  create,
  children,
  zeroBased = false,
  minItems = 0,
  sortable = true,
  initiallyOpen = true,
  summary,
}) => {
  const [removing, setRemoving] = useState(null)
  const [openIds, setOpenIds] = useState(
    () => new Set(initiallyOpen && items[0] ? [items[0].id] : []),
  )
  const errors = useContext(ValidationContext)
  const path = (onChange.path || []).join('.')
  useEffect(() => {
    const index = items.findIndex((_, index) =>
      Object.keys(errors).some((key) =>
        key.startsWith(path + '.' + index + '.'),
      ),
    )
    const id = items[index]?.id
    if (id)
      setOpenIds((previous) =>
        previous.has(id) ? previous : new Set([...previous, id]),
      )
  }, [errors, items, path])
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
          onClick={() => {
            const next = {...create(), id: crypto.randomUUID()}
            setOpenIds((previous) => new Set([...previous, next.id]))
            onChange((current) => [
              ...(current || []),
              {
                ...next,
                position: (current?.length || 0) + (zeroBased ? 0 : 1),
              },
            ])
          }}
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
          open={openIds.has(item.id)}
          onToggle={(event) => {
            const open = event.currentTarget.open
            setOpenIds((previous) => {
              if (previous.has(item.id) === open) return previous
              const next = new Set(previous)
              if (open) next.add(item.id)
              else next.delete(item.id)
              return next
            })
          }}
          onInvalidCapture={() =>
            setOpenIds((previous) =>
              previous.has(item.id)
                ? previous
                : new Set([...previous, item.id]),
            )
          }
        >
          <summary>
            <span className="admin-record-name">
              {name(item)}
              {summary && <small>{summary(item)}</small>}
            </span>
            <span className="admin-record-index">
              {String(index + 1).padStart(2, '0')}
            </span>
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
