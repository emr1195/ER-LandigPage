import React, {useId, useMemo, useRef, useState} from 'react'
import {EditorialHeading} from '../common/editorial/EditorialHeading'
import {CardComponent} from './components'
import './values.css'

export const ProgramStructure = ({programStructureInfo = {}}) => {
  const id = useId()
  const controls = useRef(null)
  const touch = useRef(null)
  const items = useMemo(() => [...(programStructureInfo.programValues || [])]
    .filter(item => item.display !== false)
    .sort((a, b) => (Number(a.position) || 0) - (Number(b.position) || 0))
    .map((item, index) => ({...item, key: item.id || `value-${index}`})), [programStructureInfo.programValues])
  const [selectedKey, setSelectedKey] = useState(() => (items.find(item => item.position === 1) || items[0])?.key)
  const selectedIndex = Math.max(0, items.findIndex(item => item.key === selectedKey))
  const choose = (index) => { if (items[index] && !items[index].disabled) setSelectedKey(items[index].key) }
  const onControlKey = (event) => {
    const moves = {ArrowRight: 1, ArrowLeft: -1, Home: 0, End: items.length - 1}
    if (!(event.key in moves) || !items.length) return
    event.preventDefault()
    const index = event.key === 'Home' || event.key === 'End' ? moves[event.key] : (selectedIndex + moves[event.key] + items.length) % items.length
    choose(index)
    controls.current?.querySelectorAll('button')[index]?.focus()
  }
  const onTouchEnd = (event) => {
    if (!touch.current || !items.length) return
    const point = event.changedTouches[0]
    if (!point) return
    const dx = point.clientX - touch.current.x
    const dy = point.clientY - touch.current.y
    touch.current = null
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) choose((selectedIndex + (dx < 0 ? 1 : -1) + items.length) % items.length)
  }
  return <section id="programa" className="ProgramStructure-Container editorial-section values-editorial" aria-labelledby={`${id}-heading`}>
    <div className="values-intro">
      <EditorialHeading id={`${id}-heading`} eyebrow={programStructureInfo.sectionTitle} title={programStructureInfo.title} />
      <div className="values-controls" role="group" aria-label="Seleccionar valor del programa" ref={controls} onKeyDown={onControlKey}>
        {items.map((item, index) => <button key={item.key} type="button" aria-pressed={index === selectedIndex} aria-controls={`${id}-card-${index}`} disabled={item.disabled} onClick={() => choose(index)}>{item.title}</button>)}
      </div>
      <p className="values-current" role="status" aria-live="polite">{items.length ? `${items[selectedIndex].title} · ${selectedIndex + 1} de ${items.length}` : 'Aún no hay valores publicados.'}</p>
    </div>
    <div className="values-stage" role="group" aria-label="Carrusel de valores" onTouchStart={(event) => { const point = event.touches[0]; if (point) touch.current = {x: point.clientX, y: point.clientY} }} onTouchEnd={onTouchEnd} onTouchCancel={() => { touch.current = null }}>
      {items.map((item, index) => {
        const distance = (index - selectedIndex + items.length) % items.length
        const side = index === selectedIndex ? 'active' : distance === 1 ? 'next' : distance === items.length - 1 ? 'previous' : 'hidden'
        return <CardComponent key={item.key} id={`${id}-card-${index}`} item={item} side={side} onSelect={() => { choose(index); controls.current?.querySelectorAll('button')[index]?.focus({preventScroll: true}) }} />
      })}
    </div>
  </section>
}
