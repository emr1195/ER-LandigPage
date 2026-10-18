import React, {useContext, useEffect, useId, useState} from 'react'
import {ImageField} from './ImageField'
import {at, ValidationContext} from './formChanges'
const icons = {
  PersonIcon: 'Persona',
  LocationOnIcon: 'Ubicación',
  CalendarTodayOutlinedIcon: 'Calendario',
  ElectricBoltOutlinedIcon: 'Energía',
  TwitterIcon: 'Twitter',
  FacebookIcon: 'Facebook',
  LinkedInIcon: 'LinkedIn',
  InstagramIcon: 'Instagram',
  YouTubeIcon: 'YouTube',
}

export const Field = ({
  label,
  value,
  onChange,
  validationPath,
  type = 'text',
  help,
  required = false,
  wide = false,
  ...props
}) => {
  const [localError, setError] = useState('')
  const errors = useContext(ValidationContext)
  const id = useId()
  const error =
    errors[(validationPath || onChange.path || []).join('.')] || localError
  useEffect(() => {
    setError('')
  }, [value])
  if (type === 'image')
    return (
      <ImageField
        label={label}
        value={value}
        onChange={onChange}
        help={help}
        validationError={error}
      />
    )
  if (type === 'checkbox')
    return (
      <label className="admin-checkbox">
        <input
          type="checkbox"
          {...props}
          aria-invalid={Boolean(error)}
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
        />
        {label}
        {error && (
          <small className="admin-field-error" role="alert">
            {error}
          </small>
        )}
      </label>
    )
  const input = {
    value: value ?? '',
    'aria-label': label,
    'aria-describedby':
      (help ? id + '-help ' : '') + (error ? id + '-error' : ''),
    required,
    'aria-invalid': Boolean(error),
    ...props,
    onInvalid: (event) => {
      event.preventDefault()
      setError('Completa este campo antes de publicar.')
    },
    onChange: (event) => {
      setError('')
      onChange(
        type === 'number' ? Number(event.target.value) : event.target.value,
      )
    },
  }
  return (
    <label
      className={
        'admin-field' + (wide || type === 'textarea' ? ' admin-field-wide' : '')
      }
    >
      <span>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </span>
      {type === 'textarea' ? (
        <textarea {...input} rows={4} />
      ) : type === 'icon' ? (
        <select {...input}>
          <option value="">Sin icono</option>
          {value && !icons[value] && (
            <option value={value}>Icono actual ({value})</option>
          )}
          {Object.entries(icons).map(([key, name]) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>
      ) : (
        <input {...input} type={type} />
      )}
      {help && <small id={id + '-help'}>{help}</small>}
      {error && (
        <small id={id + '-error'} className="admin-field-error" role="alert">
          {error}
        </small>
      )}
    </label>
  )
}

export const Fields = ({fields, value = {}, onChange}) => {
  const secondary = fields.filter(
    (field) => field.key === 'sectionTitle' || field.secondary,
  )
  const primary = fields.filter((field) => !secondary.includes(field))
  const render = ({key, secondary = false, ...field}) => (
    <Field
      key={key}
      wide={secondary || ['title', 'name', 'url', 'logoTitle'].includes(key)}
      type={key === 'icon' ? 'icon' : 'text'}
      {...field}
      value={value[key]}
      onChange={at(onChange, key)}
    />
  )
  return (
    <>
      {primary.length > 0 && (
        <div className="admin-fields admin-fields-columns">
          {primary.map(render)}
        </div>
      )}
      {secondary.length > 0 && (
        <details className="admin-settings">
          <summary>Ajustes de sección</summary>
          <div className="admin-fields admin-fields-columns">
            {secondary.map(render)}
          </div>
        </details>
      )}
    </>
  )
}
