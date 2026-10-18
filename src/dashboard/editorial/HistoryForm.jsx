import React from 'react'
import {at} from './formChanges'
import {Fields} from './FormFields'
import {CollectionEditor} from './CollectionEditor'
const text = [
  {key: 'sectionTitle', label: 'Nombre de la sección'},
  {key: 'title', label: 'Título de nuestra historia', required: true},
  {key: 'subTitle', label: 'Subtítulo'},
  {key: 'subTitleText', label: 'Texto del subtítulo'},
  {
    key: 'description',
    label: 'Nuestra historia',
    type: 'textarea',
    required: true,
    help: 'Separa los párrafos con punto y coma (;), como en el contenido actual.',
  },
]
const images = [
  {key: 'imageLeft', label: 'Imagen izquierda de Historia', type: 'image'},
  {key: 'imageRight', label: 'Imagen derecha de Historia', type: 'image'},
  {key: 'iconText', label: 'Texto destacado de Historia'},
  {key: 'icon', label: 'Icono de Historia'},
]
export const HistoryForm = ({value, onChange}) => (
  <>
    <h2>Una historia que sigue creciendo</h2>
    <p className="admin-muted">
      Comparte el camino recorrido y lo que nos inspira.
    </p>
    <Fields fields={text} value={value} onChange={onChange} />
    <section className="admin-field-group">
      <h3>Imágenes y texto destacado</h3>
      <Fields
        fields={images}
        value={value.imageSection}
        onChange={at(onChange, 'imageSection')}
      />
    </section>
    <CollectionEditor
      label="Datos destacados"
      items={value.infoSection}
      create={() => ({
        title: '',
        description: '',
        icon: '',
        backgroundColor: '#155e63',
      })}
      onChange={at(onChange, 'infoSection')}
    >
      {(item, change) => (
        <Fields
          fields={[
            {key: 'title', label: 'Título del dato', required: true},
            {
              key: 'description',
              label: 'Descripción del dato',
              type: 'textarea',
            },
            {key: 'icon', label: 'Icono del dato'},
            {key: 'backgroundColor', label: 'Color del dato', type: 'color'},
          ]}
          value={item}
          onChange={change}
        />
      )}
    </CollectionEditor>
  </>
)
