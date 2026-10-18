import React from 'react'
import {useHref} from 'react-router-dom'

export const navigationTarget = ({url = '', outsideURL = false} = {}) => {
  const value = String(url).trim()
  if (outsideURL || value.startsWith('/')) return value || '#'
  return `#${value.replace(/^#+/, '')}`
}

// Native anchors keep hash navigation, new tabs and keyboard interaction working.
export const SiteLink = ({item = {}, children, onClick, ...props}) => {
  const destination = navigationTarget(item)
  const internalHref = useHref(item.outsideURL ? '#' : destination)
  const disabled = Boolean(item.disabled || item.disable)
  return <a
    {...props}
    href={item.outsideURL ? destination : internalHref}
    target={item.outsideURL ? '_blank' : undefined}
    rel={item.outsideURL ? 'noopener noreferrer' : undefined}
    aria-disabled={disabled || undefined}
    onClick={(event) => { if (disabled) event.preventDefault(); else onClick?.(event) }}
  >{children}</a>
}
