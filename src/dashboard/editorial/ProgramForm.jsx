import React from 'react'
import {at} from './formChanges'
import {Fields} from './FormFields'
import {CollectionEditor} from './CollectionEditor'
const valueFields = [
  {key: 'title', label: 'Nombre del valor', required: true},
  {
    key: 'description',
    label: 'Descripción del valor',
    type: 'textarea',
    required: true,
  },
  {key: 'image', label: 'Imagen del valor', type: 'image'},
  {key: 'display', label: 'Mostrar este valor', type: 'checkbox'},
  {key: 'active', label: 'Valor activo', type: 'checkbox'},
]
export const ProgramForm = ({value, onChange}) => (
  <>
    <h2>Aprender con propósito</h2>
    <p className="admin-muted">
      Presenta el programa y lo que cada explorador puede descubrir.
    </p>
    <Fields
      fields={[
        {key: 'title', label: 'Título del programa', required: true},
        {key: 'sectionTitle', label: 'Nombre de la sección'},
      ]}
      value={value}
      onChange={onChange}
    />
    <CollectionEditor
      label="Valores del programa"
      items={value.programValues}
      create={() => ({
        title: '',
        description: '',
        image: '',
        display: true,
        active: true,
        details: [],
      })}
      onChange={at(onChange, 'programValues')}
    >
      {(item, change) => (
        <>
          <Fields fields={valueFields} value={item} onChange={change} />
          <CollectionEditor
            label="Detalles"
            items={item.details}
            create={() => ({bullet: '', definition: ''})}
            onChange={at(change, 'details')}
          >
            {(detail, changeDetail) => (
              <Fields
                fields={[
                  {key: 'bullet', label: 'Nombre del detalle'},
                  {key: 'definition', label: 'Explicación', type: 'textarea'},
                ]}
                value={detail}
                onChange={changeDetail}
              />
            )}
          </CollectionEditor>
        </>
      )}
    </CollectionEditor>
  </>
)
