import React from 'react'
import {at} from './formChanges'
import {Fields} from './FormFields'
import {CollectionEditor} from './CollectionEditor'
const groupFields = [
  {key: 'title', label: 'Nombre del grupo', required: true},
  {key: 'age', label: 'Edades del grupo'},
  {key: 'description', label: 'Descripción del grupo', type: 'textarea'},
  {key: 'emblema', label: 'Emblema del grupo', type: 'image'},
  {key: 'image', label: 'Fotografía del grupo', type: 'image'},
]
export const GroupsForm = ({value, onChange}) => (
  <>
    <h2>Una aventura para cada etapa</h2>
    <p className="admin-muted">
      Presenta los grupos y lo que hace especial a cada uno.
    </p>
    <Fields
      fields={[
        {key: 'title', label: 'Título de los grupos', required: true},
        {key: 'sectionTitle', label: 'Nombre de la sección'},
      ]}
      value={value}
      onChange={onChange}
    />
    <CollectionEditor
      label="Grupos"
      zeroBased
      minItems={1}
      items={value.expeditionGroups}
      create={() => ({
        title: '',
        age: '',
        description: '',
        emblema: '',
        image: '',
        colors: {primary: '#155e63', secondary: '#e6efeb'},
        aditionalInfo: [],
      })}
      onChange={at(onChange, 'expeditionGroups')}
    >
      {(group, change) => (
        <>
          <Fields fields={groupFields} value={group} onChange={change} />
          <section className="admin-field-group">
            <h3>Colores del grupo</h3>
            <Fields
              fields={[
                {
                  key: 'primary',
                  label: 'Color principal del grupo',
                  type: 'color',
                },
                {
                  key: 'secondary',
                  label: 'Color secundario del grupo',
                  type: 'color',
                },
              ]}
              value={group.colors}
              onChange={at(change, 'colors')}
            />
          </section>
          <CollectionEditor
            label="Información del grupo"
            items={group.aditionalInfo}
            create={() => ({title: '', description: ''})}
            onChange={at(change, 'aditionalInfo')}
          >
            {(item, changeInfo) => (
              <Fields
                fields={[
                  {key: 'title', label: 'Título de la información'},
                  {
                    key: 'description',
                    label: 'Información del grupo',
                    type: 'textarea',
                  },
                ]}
                value={item}
                onChange={changeInfo}
              />
            )}
          </CollectionEditor>
        </>
      )}
    </CollectionEditor>
  </>
)
