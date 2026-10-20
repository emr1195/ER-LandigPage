import React, {useEffect, useRef, useState} from 'react'
import './crossfadeImage.css'

// Keep the previous photo behind the next until it has loaded and faded in.
export const CrossfadeImage = ({src, alt, onLoad, ...props}) => {
  const [displayed, setDisplayed] = useState(src)
  const [readySource, setReadySource] = useState(null)
  const timer = useRef(null)
  useEffect(() => () => window.clearTimeout(timer.current), [src])
  const ready = displayed === src || readySource === src
  return <>
    <img {...props} key={src} src={src} alt={alt} className="crossfade-image__current" style={{opacity: ready ? 1 : 0}} onLoad={event => {
      setReadySource(src)
      onLoad?.(event)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setDisplayed(src), 850)
    }} />
    {displayed !== src && <img src={displayed} alt="" aria-hidden="true" className="crossfade-image__previous" decoding="async" />}
  </>
}
