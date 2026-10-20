import React, {useId} from 'react'
import {EditorialHeading} from '../../../common/editorial/EditorialHeading'
import {HistoryEmphasis, splitHistoryDescription} from '../../historyText'

export const TextSection = ({textSectionInfo = {}}) => {
  const {sectionTitle, title, description} = textSectionInfo
  const id = useId()
  const paragraphs = splitHistoryDescription(description)
  const paragraph = (text, index) => <p key={index}><HistoryEmphasis text={text} /></p>
  return <div className="TextSection-History history-copy">
    <EditorialHeading id={id} eyebrow={sectionTitle} title={title} />
    <div className="history-prose">{paragraphs.slice(0, 2).map(paragraph)}</div>
    {paragraphs.length > 2 && <details className="history-more">
      <summary><span className="history-more__read">Leer historia completa</span><span className="history-more__less">Mostrar menos</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></summary>
      <div className="history-prose">{paragraphs.slice(2).map(paragraph)}</div>
    </details>}
  </div>
}
