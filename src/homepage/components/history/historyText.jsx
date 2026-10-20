import React from 'react'

export const splitHistoryDescription = (description = '') => String(description).split(/;|\n\s*\n/).filter(part => part.trim()).flatMap(part => {
  const sentences = part.trim().split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ¿¡*])/u)
  const paragraphs = []
  let current = ''
  for (const sentence of sentences) {
    if (current && current.length + sentence.length > 440) { paragraphs.push(current); current = '' }
    current += (current ? ' ' : '') + sentence
  }
  if (current) paragraphs.push(current)
  return paragraphs
})

// Only institutional **emphasis** is interpreted; HTML always remains text.
export const HistoryEmphasis = ({text}) => String(text).split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
  part.startsWith('**') && part.endsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong> : part,
)
