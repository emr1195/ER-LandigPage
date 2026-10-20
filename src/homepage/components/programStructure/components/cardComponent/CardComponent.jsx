import React, {useEffect, useRef, useState} from 'react'

export const CardComponent = ({id, item, side, onSelect}) => {
  const selected = side === 'active'
  const description = useRef(null)
  const [scrollable, setScrollable] = useState(false)
  const text = String(item.description || '')
  const lines = text.split(/\r?\n|(?=[•●]\s)/).map(line => line.trim()).filter(Boolean)
  const bullets = lines.length > 1 && lines.every(line => /^[•●*-]\s/.test(line))
  useEffect(() => {
    const region = description.current
    const measure = () => setScrollable(region.scrollHeight > region.clientHeight + 1)
    measure()
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure)
    observer?.observe(region)
    if (region.firstElementChild) observer?.observe(region.firstElementChild)
    window.addEventListener('resize', measure)
    return () => { observer?.disconnect(); window.removeEventListener('resize', measure) }
  }, [text])
  return <article id={id} className="value-card carousel-item" data-side={side} aria-label={item.title} aria-current={selected ? 'true' : undefined}>
    <div className="value-card__content" aria-hidden={!selected || undefined}>
      {item.image && <div className="value-card__emblem"><img src={item.image} alt={item.title || 'Emblema institucional'} width="72" height="72" loading="lazy" decoding="async" /></div>}
      <h3>{item.title}</h3>
      <span className="value-card__accent" aria-hidden="true" />
      <div ref={description} className="value-card__description" role="region" aria-label={`Texto completo de ${item.title}`} tabIndex={selected ? 0 : -1}>
        {bullets ? <ul>{lines.map((line, index) => <li key={index}>{line.replace(/^[•●*-]\s*/, '')}</li>)}</ul> : <p>{text}</p>}
      </div>
      {scrollable && <span className="value-card__scroll-hint" aria-hidden="true">Desplázate para leer más ↕</span>}
    </div>
    {!selected && side !== 'hidden' && <button className="value-card__select" type="button" disabled={item.disabled} onClick={onSelect} aria-label={`Mostrar ${item.title}`} />}
  </article>
}
