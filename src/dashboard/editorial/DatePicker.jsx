import React, {useEffect, useId, useRef, useState} from 'react'
import {Popover} from '@mui/material'
import './datePicker.css'

const months = Array.from({length: 12}, (_, month) => new Intl.DateTimeFormat('es', {month: 'long'}).format(new Date(2026, month, 1)))
const weekdays = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']
const iso = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
const fromISO = value => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return null
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day, 12)
  return iso(date) === value ? date : null
}
const display = value => value ? `${value.slice(5, 7)}/${value.slice(8, 10)}/${value.slice(0, 4)}` : ''
const dayLabel = date => new Intl.DateTimeFormat('es', {day: 'numeric', month: 'long', year: 'numeric'}).format(date)

export const DatePicker = ({label, value = '', onChange, min, max, disabled, required, ...inputProps}) => {
  const id = useId()
  const input = useRef(null)
  const panel = useRef(null)
  const [anchor, setAnchor] = useState(null)
  const [draft, setDraft] = useState(null)
  const [invalid, setInvalid] = useState(false)
  useEffect(() => { setDraft(null); setInvalid(false); input.current?.setCustomValidity('') }, [value])
  const [cursor, setCursor] = useState(() => fromISO(value) || new Date())
  const [month, setMonth] = useState(() => new Date(cursor.getFullYear(), cursor.getMonth(), 1))
  const today = new Date()
  const available = date => (!min || iso(date) >= min) && (!max || iso(date) <= max)
  const close = () => setAnchor(null)
  const open = () => {
    if (disabled || anchor) return
    const date = fromISO(value) || (available(today) ? today : fromISO(min) || fromISO(max) || today)
    setCursor(date)
    setMonth(new Date(date.getFullYear(), date.getMonth(), 1))
    setAnchor(input.current)
  }
  const focusDay = date => {
    setCursor(date)
    setMonth(new Date(date.getFullYear(), date.getMonth(), 1))
    requestAnimationFrame(() => panel.current?.querySelector(`[data-date="${iso(date)}"]`)?.focus())
  }
  const commit = next => { setDraft(null); setInvalid(false); input.current?.setCustomValidity(''); onChange(next); close() }
  const select = date => { if (available(date)) commit(iso(date)) }
  const changeMonth = amount => {
    const next = new Date(month.getFullYear(), month.getMonth() + amount, 1)
    setMonth(next)
    setCursor(next)
  }
  const keyDown = event => {
    const moves = {ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7}
    let next
    if (event.key in moves) next = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + moves[event.key])
    else if (event.key === 'Home' || event.key === 'End') {
      const weekday = (cursor.getDay() + 6) % 7
      next = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + (event.key === 'Home' ? -weekday : 6 - weekday))
    } else if (event.key === 'PageUp' || event.key === 'PageDown') {
      const target = new Date(cursor.getFullYear(), cursor.getMonth() + (event.key === 'PageUp' ? -1 : 1), 1)
      next = new Date(target.getFullYear(), target.getMonth(), Math.min(cursor.getDate(), new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate()))
    }
    if (next) { event.preventDefault(); if (available(next)) focusDay(next) }
  }
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const offset = (first.getDay() + 6) % 7
  const days = Array.from({length: 42}, (_, index) => new Date(month.getFullYear(), month.getMonth(), index - offset + 1, 12))
  const year = month.getFullYear()
  return <>
    <div className="admin-datepicker-input">
      <input {...inputProps} ref={input} type="text" value={draft ?? display(value)} placeholder="MM/DD/YYYY" inputMode="numeric" aria-label={label} aria-haspopup="dialog" aria-expanded={Boolean(anchor)} aria-controls={anchor ? id : undefined} disabled={disabled} required={required} aria-invalid={invalid || inputProps['aria-invalid']}
        onChange={event => {
          const text = event.target.value
          setDraft(text)
          const match = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
          const parsed = match ? fromISO(`${match[3]}-${match[1]}-${match[2]}`) : null
          const valid = !text || (parsed && available(parsed))
          setInvalid(!valid)
          event.target.setCustomValidity(valid ? '' : 'Escribe una fecha válida en formato MM/DD/YYYY y dentro del rango permitido.')
          if (valid) onChange(parsed ? iso(parsed) : '')
        }}
        onClick={() => anchor ? close() : open()}
        onKeyDown={event => {
          if (['Enter', ' ', 'ArrowDown'].includes(event.key)) { event.preventDefault(); open() }
        }} />
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="4" y="5" width="16" height="16" rx="3" /><path d="M8 3v4m8-4v4M4 11h16" /></svg>
      {invalid && <small className="admin-field-error" role="alert">Usa MM/DD/YYYY y una fecha dentro del rango permitido.</small>}
    </div>
    <Popover open={Boolean(anchor)} anchorEl={anchor} onClose={close} container={anchor?.closest('.admin-app') || undefined} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} transformOrigin={{vertical: 'top', horizontal: 'left'}} marginThreshold={12} transitionDuration={180}
      TransitionProps={{onEntered: () => panel.current?.querySelector('[tabindex="0"][data-date]')?.focus()}}
      PaperProps={{className: 'admin-datepicker-popover', id, role: 'dialog', 'aria-label': `Calendario: ${label}`}}>
      <div ref={panel} className="admin-datepicker-panel">
        <div className="admin-datepicker-header">
          <button type="button" aria-label="Mes anterior" onClick={() => changeMonth(-1)}>‹</button>
          <div className="admin-datepicker-selects">
            <select aria-label="Mes" value={month.getMonth()} onChange={event => { const date = new Date(year, Number(event.target.value), 1); setMonth(date); setCursor(date) }}>{months.map((name, index) => <option key={name} value={index}>{name}</option>)}</select>
            <select aria-label="Año" value={year} onChange={event => { const date = new Date(Number(event.target.value), month.getMonth(), 1); setMonth(date); setCursor(date) }}>{Array.from({length: Math.max(2100, year + 10) - Math.min(1900, year - 10) + 1}, (_, index) => Math.min(1900, year - 10) + index).map(year => <option key={year} value={year}>{year}</option>)}</select>
          </div>
          <button type="button" aria-label="Mes siguiente" onClick={() => changeMonth(1)}>›</button>
        </div>
        <div className="admin-datepicker-grid" role="grid" aria-label={`${months[month.getMonth()]} ${year}`}>
          <div role="row" className="admin-datepicker-week">{weekdays.map(day => <span role="columnheader" key={day}>{day}</span>)}</div>
          {Array.from({length: 6}, (_, week) => <div role="row" className="admin-datepicker-week" key={week}>{days.slice(week * 7, week * 7 + 7).map(date => {
            const key = iso(date)
            return <span role="gridcell" aria-selected={key === value} key={key}><button type="button" data-date={key} aria-label={dayLabel(date)} aria-current={key === iso(today) ? 'date' : undefined} data-selected={key === value} data-outside={date.getMonth() !== month.getMonth()} disabled={!available(date)} tabIndex={key === iso(cursor) && available(date) ? 0 : -1} onFocus={() => setCursor(date)} onKeyDown={keyDown} onClick={() => select(date)}>{date.getDate()}</button></span>
          })}</div>)}
        </div>
        <div className="admin-datepicker-footer"><button type="button" onClick={() => commit('')}>Limpiar</button><button type="button" disabled={!available(today)} onClick={() => select(today)}>Hoy</button></div>
      </div>
    </Popover>
  </>
}
