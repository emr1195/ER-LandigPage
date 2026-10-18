import React from 'react'
import {at} from './formChanges'
import {Fields} from './FormFields'
import {CollectionEditor} from './CollectionEditor'
const identity = [
  {key: 'logoTitle', label: 'Texto junto al logo'},
  {key: 'logo', label: 'Logo del sitio', type: 'image'},
  {key: 'title', label: 'Título de referencia'},
  {key: 'sectionTitle', label: 'Nombre de la sección'},
]
const links = [
  {key: 'title', label: 'Texto del enlace', required: true},
  {
    key: 'url',
    label: 'Destino del enlace',
    help: 'Usa el identificador de una sección o una dirección completa.',
  },
  {key: 'outsideURL', label: 'Enlace a otra página', type: 'checkbox'},
  {key: 'active', label: 'Enlace activo', type: 'checkbox'},
  {
    key: 'eventButton',
    label: 'Destacar como botón de contacto',
    type: 'checkbox',
  },
]
export const NavbarForm = ({value, onChange}) => (
  <>
    <h2>La identidad de tu sitio</h2>
    <p className="admin-muted">
      El logo y los enlaces que ayudan a encontrar cada historia.
    </p>
    <Fields fields={identity} value={value} onChange={onChange} />
    <p className="admin-muted">
      Puedes destacar un único enlace como botón de contacto. Desmarca el actual
      para elegir otro.
    </p>
    <CollectionEditor
      label="Enlaces"
      items={value.listMenu}
      create={() => ({
        title: '',
        url: '',
        outsideURL: false,
        active: false,
        eventButton: false,
      })}
      onChange={at(onChange, 'listMenu')}
    >
      {(item, change) => (
        <Fields
          fields={links.map((field) =>
            field.key === 'eventButton'
              ? {
                  ...field,
                  disabled:
                    !item.eventButton &&
                    value.listMenu.some((other) => other.eventButton),
                }
              : field,
          )}
          value={item}
          onChange={change}
        />
      )}
    </CollectionEditor>
  </>
)
