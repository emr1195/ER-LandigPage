import React from 'react'
import {at} from './formChanges'
import {Field, Fields} from './FormFields'
import {CollectionEditor} from './CollectionEditor'
import {parseEventDates, formatEventDate} from '../../homepage/components/events/eventDates'
const fields = [
  {key: 'title', label: 'Nombre del evento', required: true},
  {
    key: 'ubication',
    label: 'Lugar del evento',
    help: 'Puedes separar el lugar y los detalles con punto y coma (;).',
  },
  {
    key: 'mapsUrl',
    label: 'Enlace de Google Maps (opcional)',
    type: 'url',
    help: 'Pega el enlace de Compartir de Google Maps. El visitante verá el nombre del lugar, no el enlace.',
  },
  {key: 'byWho', label: 'Organiza'},
]
export const EventDate = ({value = '', onChange}) => {
  const [date = '', ...timeParts] = value.split(';')
  const time = timeParts.join(';')
  const range = parseEventDates(date)
  const start = range?.start || ''
  const end = range && range.end !== range.start ? range.end : ''
  const changeDate = (nextStart, nextEnd) => onChange(combine(nextStart ? nextStart + (nextEnd && nextEnd >= nextStart ? ` al ${nextEnd}` : '') : '', time))
  const combine = (nextDate, nextTime) =>
    nextTime || value.includes(';') ? nextDate + ';' + nextTime : nextDate
  return (
    <div className="admin-fields admin-fields-columns">
      <Field
        validationPath={onChange.path}
        label="Fecha del evento"
        type="date"
        value={start}
        onChange={(next) => changeDate(next, end)}
        help={date && !range ? `Fecha anterior: ${date}. Selecciona una fecha en el calendario.` : 'Selecciona el día en el calendario.'}
      />
      <Field
        label="Fecha de finalización (opcional)"
        type="date"
        value={end}
        min={start || undefined}
        onChange={(next) => changeDate(start || next, next)}
        help="Para eventos de varios días. Si se deja vacía, dura un solo día."
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
      initiallyOpen={false}
      summary={(event) =>
        [formatEventDate(event.date).split(';')[0], event.ubication?.split(';')[0]]
          .filter(Boolean)
          .join(' · ')
      }
      items={value.events}
      create={() => ({
        title: '',
        date: '',
        ubication: '',
        mapsUrl: '',
        byWho: '',
        image: '',
        backgroundImage: '',
      })}
      onChange={at(onChange, 'events')}
    >
      {(event, change) => (
        <div className="admin-event-editor">
          <Fields fields={fields} value={event} onChange={change} />
          <EventDate value={event.date} onChange={at(change, 'date')} />
          <Field
            label="Imagen de fondo del evento"
            type="image"
            value={event.backgroundImage}
            onChange={at(change, 'backgroundImage')}
            help="Opcional. Se coloca detrás de la imagen principal, sin reemplazarla."
          />
          <Field
            label="Imagen del evento"
            type="image"
            value={event.image}
            onChange={at(change, 'image')}
          />
        </div>
      )}
    </CollectionEditor>
  </>
)
