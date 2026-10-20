import React, {useContext, useEffect, useId, useState} from 'react'
import {applyChange, at, ValidationContext} from './formChanges'
import {heroCarouselPhotos} from '../../homepage/components/heroSection/heroPhotos'
import {GalleryUpload} from './GalleryUpload'
import {Fields} from './FormFields'
import {CollectionEditor} from './CollectionEditor'

const textFields = [
  {key: 'title', label: 'Título principal', required: true},
  {key: 'description', label: 'Descripción', type: 'textarea', required: true},
  {key: 'iconText', label: 'Texto destacado'},
  {key: 'icon', label: 'Icono destacado'},
]
export const HeroForm = ({value, onChange}) => {
  const changePhotos = next => at(onChange, 'imageSection')(previous => ({...previous, carouselImages: applyChange(heroCarouselPhotos(previous), next)}))
  changePhotos.path = [...(onChange.path || []), 'imageSection', 'carouselImages']
  const [tab, setTab] = useState('Texto')
  const id = useId()
  const errors = useContext(ValidationContext)
  useEffect(() => {
    const first = Object.keys(errors)[0]
    if (first)
      setTab(
        first.startsWith('imageSection')
          ? 'Imágenes'
          : first.startsWith('textSection.buttons')
            ? 'Botones'
            : 'Texto',
      )
  }, [errors])
  const tabs = ['Texto', 'Imágenes', 'Botones']
  return (
    <>
      <div
        className="admin-tabs"
        role="tablist"
        aria-label="Contenido de Portada"
        onKeyDown={(event) => {
          const index = tabs.indexOf(tab)
          const next =
            event.key === 'ArrowRight'
              ? (index + 1) % 3
              : event.key === 'ArrowLeft'
                ? (index + 2) % 3
                : event.key === 'Home'
                  ? 0
                  : event.key === 'End'
                    ? 2
                    : null
          if (next === null) return
          event.preventDefault()
          setTab(tabs[next])
          event.currentTarget.querySelectorAll('button')[next].focus()
        }}
      >
        {tabs.map((name) => (
          <button
            type="button"
            role="tab"
            id={id + name}
            aria-controls={id + '-panel'}
            tabIndex={tab === name ? 0 : -1}
            aria-selected={tab === name}
            key={name}
            onClick={() => setTab(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <div
        className="admin-tab-content"
        role="tabpanel"
        id={id + '-panel'}
        aria-labelledby={id + tab}
      >
        {tab === 'Texto' && (
          <>
            <h2>El mensaje principal</h2>
            <p className="admin-muted">Una frase clara es un buen comienzo.</p>
            <Fields
              fields={textFields}
              value={value.textSection}
              onChange={at(onChange, 'textSection')}
            />
            <Fields
              fields={[
                {key: 'title', label: 'Título de referencia', secondary: true},
                {key: 'sectionTitle', label: 'Nombre de la sección'},
              ]}
              value={value}
              onChange={onChange}
            />
          </>
        )}
        {tab === 'Imágenes' &&
          Object.entries({
            imageRightCenter: 'Imagen principal fija (recuadro grande)',
          }).map(([key, label]) => (
            <section className="admin-field-group" key={key}>
              <h3>{label}</h3>
              <Fields
                fields={[
                  {key: 'title', label: 'Título de la imagen'},
                  {key: 'imageURL', label: label, type: 'image'},
                  {key: 'icon', label: 'Icono de la imagen'},
                ]}
                value={value.imageSection?.[key]}
                onChange={at(onChange, 'imageSection', key)}
              />
            </section>
          ))}
        {tab === 'Imágenes' && <section className="admin-field-group">
          <h3>Galería compartida de Portada e Historia</h3>
          <p className="admin-muted">Los dos recuadros inferiores de Portada y la foto secundaria de Historia usan esta lista y cambian cada 8 segundos. Sube al menos dos fotografías diferentes para no repetirlas entre los recuadros de Portada. Las fotos anteriores ya están incluidas.</p>
          <GalleryUpload onChange={changePhotos} count={heroCarouselPhotos(value.imageSection).length} />
          <CollectionEditor
                label="Fotografías de la galería"
                items={heroCarouselPhotos(value.imageSection)}
                create={() => ({title: '', imageURL: ''})}
                onChange={changePhotos}
              >
                {(image, change) => <Fields fields={[
                  {key: 'title', label: 'Descripción de la fotografía'},
                  {key: 'imageURL', label: 'Fotografía del carrusel', type: 'image'},
                ]} value={image} onChange={change} />}
              </CollectionEditor>
            </section>}
        {tab === 'Botones' && (
          <CollectionEditor
            label="Botones"
            items={value.textSection?.buttons}
            create={() => ({
              title: '',
              url: '',
              outsideURL: false,
              display: true,
              primary: false,
              color: '#2467bd',
            })}
            onChange={at(onChange, 'textSection', 'buttons')}
          >
            {(item, change) => (
              <Fields
                value={item}
                onChange={change}
                fields={[
                  {key: 'title', label: 'Texto del botón', required: true},
                  {
                    key: 'url',
                    label: 'Destino del botón',
                    help: 'Para una sección del sitio usa su identificador. Para otra página, la dirección completa.',
                  },
                  {
                    key: 'outsideURL',
                    label: 'Enlace a otra página',
                    type: 'checkbox',
                  },
                  {key: 'display', label: 'Mostrar botón', type: 'checkbox'},
                  {key: 'primary', label: 'Botón principal', type: 'checkbox'},
                  {key: 'color', label: 'Color del botón', type: 'color'},
                ]}
              />
            )}
          </CollectionEditor>
        )}
      </div>
    </>
  )
}
