import React from 'react'
import {at} from './formChanges'
import {Fields} from './FormFields'
import {CollectionEditor} from './CollectionEditor'
const categories = {
  coorNac: 'Coordinación nacional',
  comNac: 'Comandancia nacional',
  teamNac: 'Equipo nacional',
  cmDist: 'Coordinaciones distritales',
}
const fields = [
  {key: 'name', label: 'Nombre del integrante', required: true},
  {key: 'role', label: 'Cargo del integrante', required: true},
  {key: 'image', label: 'Fotografía del integrante', type: 'image'},
]
export const OrganizationForm = ({value, onChange}) => (
  <>
    <h2>Las personas que nos acompañan</h2>
    <p className="admin-muted">
      Presenta al equipo que hace posible cada aventura.
    </p>
    <Fields
      fields={[
        {key: 'title', label: 'Título de Organización', required: true},
        {key: 'sectionTitle', label: 'Nombre de la sección'},
      ]}
      value={value}
      onChange={onChange}
    />
    {Object.entries(categories).map(([key, label]) => (
      <CollectionEditor
        key={key}
        label={label}
        items={value.members?.[key]}
        create={() => ({name: '', role: '', image: ''})}
        onChange={at(onChange, 'members', key)}
      >
        {(item, change) => (
          <Fields fields={fields} value={item} onChange={change} />
        )}
      </CollectionEditor>
    ))}
  </>
)
