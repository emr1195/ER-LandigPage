import React from 'react'
import {at} from './formChanges'
import {Fields} from './FormFields'
import {CollectionEditor} from './CollectionEditor'

const linkFields = [
  {key: 'name', label: 'Nombre del enlace', required: true},
  {key: 'url', label: 'Destino del enlace'},
  {key: 'outsideURL', label: 'Enlace a otra página', type: 'checkbox'},
]
export const FooterForm = ({value, onChange}) => (
  <>
    <h2>Sigamos conectados</h2>
    <p className="admin-muted">
      La información que acompaña el final de cada visita.
    </p>
    <Fields
      fields={[
        {key: 'title', label: 'Título de referencia', secondary: true},
        {key: 'sectionTitle', label: 'Nombre de la sección'},
      ]}
      value={value}
      onChange={onChange}
    />
    <section className="admin-field-group">
      <h3>Identidad y contacto</h3>
      <Fields
        fields={[
          {key: 'logoTitle', label: 'Nombre junto al logo del pie'},
          {key: 'logo', label: 'Logo del pie', type: 'image'},
        ]}
        value={value.mainSection}
        onChange={at(onChange, 'mainSection')}
      />
      <CollectionEditor
        label="Datos de contacto"
        items={value.mainSection?.moreInfo}
        create={() => ({name: '', description: ''})}
        onChange={at(onChange, 'mainSection', 'moreInfo')}
      >
        {(item, change) => (
          <Fields
            fields={[
              {key: 'name', label: 'Nombre del dato', required: true},
              {key: 'description', label: 'Información', type: 'textarea'},
            ]}
            value={item}
            onChange={change}
          />
        )}
      </CollectionEditor>
    </section>
    <CollectionEditor
      label="Menús"
      items={value.menus}
      create={() => ({title: '', links: []})}
      onChange={at(onChange, 'menus')}
    >
      {(menu, changeMenu) => (
        <>
          <Fields
            fields={[{key: 'title', label: 'Nombre del menú', required: true}]}
            value={menu}
            onChange={changeMenu}
          />
          <CollectionEditor
            label="Enlaces del menú"
            items={menu.links}
            create={() => ({name: '', url: '', outsideURL: false})}
            onChange={at(changeMenu, 'links')}
          >
            {(item, change) => (
              <Fields fields={linkFields} value={item} onChange={change} />
            )}
          </CollectionEditor>
        </>
      )}
    </CollectionEditor>
    <CollectionEditor
      label="Redes sociales"
      items={value.socialMedia}
      create={() => ({name: '', icon: '', url: ''})}
      onChange={at(onChange, 'socialMedia')}
    >
      {(item, change) => (
        <Fields
          fields={[
            {key: 'name', label: 'Nombre de la red', required: true},
            {key: 'url', label: 'Dirección de la red'},
            {key: 'icon', label: 'Icono de la red'},
          ]}
          value={item}
          onChange={change}
        />
      )}
    </CollectionEditor>
    <CollectionEditor
      label="Enlaces adicionales"
      items={value.aditionalFooterInfo}
      create={() => ({
        name: '',
        url: '',
        outsideURL: false,
        disabled: false,
        disable: false,
      })}
      onChange={at(onChange, 'aditionalFooterInfo')}
    >
      {(item, change) => (
        <Fields
          fields={[
            ...linkFields,
            {key: 'disabled', label: 'Desactivar enlace', type: 'checkbox'},
          ]}
          value={{...item, disabled: item.disabled ?? item.disable ?? false}}
          onChange={change}
        />
      )}
    </CollectionEditor>
  </>
)
