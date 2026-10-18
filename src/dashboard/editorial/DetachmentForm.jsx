import React from 'react'
import {at} from './formChanges'
import {Fields} from './FormFields'
import {CollectionEditor} from './CollectionEditor'
import {MapsField} from './MapsField'
import {getDetachments, emptyDetachment} from '../../../shared/detachments'
const fields = [
  {
    key: 'name',
    label: 'Nombre del destacamento',
    required: true,
    maxLength: 160,
  },
  {
    key: 'number',
    label: 'Número de destacamento',
    required: true,
    maxLength: 10,
    pattern: '[A-Za-z0-9][A-Za-z0-9-]{0,9}',
    help: 'Número asignado o código institucional, como ON o PC.',
  },
  {key: 'logo', label: 'Logo del destacamento (opcional)', type: 'image'},
]
export const DetachmentForm = ({value, onChange}) => (
  <>
    <h2>Un directorio que nos acerca</h2>
    <p className="admin-muted">
      Los destacamentos se muestran ordenados por número. El logo y la ubicación
      son opcionales.
    </p>
    <Fields
      fields={[
        {key: 'title', label: 'Título de referencia'},
        {key: 'sectionTitle', label: 'Nombre de la sección'},
      ]}
      value={value}
      onChange={onChange}
    />
    <CollectionEditor
      label="Destacamentos"
      sortable={false}
      items={value.detachments}
      create={() => ({...emptyDetachment})}
      onChange={at(onChange, 'detachments')}
    >
      {(item, change) => (
        <>
          <Fields fields={fields} value={item} onChange={change} />
          <MapsField value={item} onChange={change} />
        </>
      )}
    </CollectionEditor>
  </>
)
