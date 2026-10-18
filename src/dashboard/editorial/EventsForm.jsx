import React from 'react'
import {at} from './formChanges'
import {Field, Fields} from './FormFields'
import {CollectionEditor} from './CollectionEditor'
const fields = [
  {key: 'title', label: 'Nombre del evento', required: true},
  {
    key: 'ubication',
    label: 'Lugar del evento',
    help: 'Puedes separar el lugar y los detalles con punto y coma (;).',
  },
  {key: 'byWho', label: 'Organiza'},
  {key: 'image', label: 'Imagen del evento', type: 'image'},
]
const EventDate = ({value = '', onChange}) => {
  const [date = '', ...timeParts] = value.split(';')
  const time = timeParts.join(';')
  const combine = (nextDate, nextTime) =>
    nextTime || value.includes(';') ? nextDate + ';' + nextTime : nextDate
  return (
    <div className="admin-fields admin-field-group">
      <Field
        validationPath={onChange.path}
        label="Fecha del evento"
        value={date}
        required
        onChange={(next) => onChange(combine(next, time))}
        help="Por ejemplo: 30 de noviembre de 2026."
      />
      <Field
        label="Hora del evento"
        value={time}
        onChange={(next) => onChange(combine(date, next))}
        help="Por ejemplo: 09:00 a. m. Se conserva el formato que escribas."
      />
    </div>
  )
}
export const EventsForm = ({value, onChange}) => (
  <>
    <h2>Lo próximo que viviremos juntos</h2>
    <p className="admin-muted">
      Comparte los encuentros y los detalles para participar.
    </p>
    <Fields
      fields={[
        {key: 'title', label: 'Título de los eventos', required: true},
        {key: 'sectionTitle', label: 'Nombre de la sección'},
      ]}
      value={value}
      onChange={onChange}
    />
    <CollectionEditor
      label="Eventos"
      items={value.events}
      create={() => ({
        title: '',
        date: '',
        ubication: '',
        byWho: '',
        image: '',
      })}
      onChange={at(onChange, 'events')}
    >
      {(event, change) => (
        <>
          <Fields fields={fields} value={event} onChange={change} />
          <EventDate value={event.date} onChange={at(change, 'date')} />
        </>
      )}
    </CollectionEditor>
  </>
)
