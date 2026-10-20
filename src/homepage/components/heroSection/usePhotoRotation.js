import {useEffect, useState} from 'react'

export const usePhotoRotation = (images, {offset = 0, step = 1} = {}) => {
  const [index, setIndex] = useState(offset)
  const [paused, setPaused] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [hidden, setHidden] = useState(() => document.hidden)
  const [reducedMotion, setReducedMotion] = useState(false)
  const signature = images.map(image => image.imageURL).join('|')
  useEffect(() => { setIndex(offset) }, [signature, offset])
  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const motion = () => setReducedMotion(Boolean(media?.matches))
    const visibility = () => setHidden(document.hidden)
    motion()
    media?.addEventListener?.('change', motion)
    document.addEventListener('visibilitychange', visibility)
    return () => { media?.removeEventListener?.('change', motion); document.removeEventListener('visibilitychange', visibility) }
  }, [])
  useEffect(() => {
    if (images.length < 2 || paused || interacting || hidden || reducedMotion) return
    const timer = window.setInterval(() => setIndex(previous => (previous + step) % images.length), 8000)
    return () => window.clearInterval(timer)
  }, [images.length, paused, interacting, hidden, reducedMotion, step, index])
  return {current: images.length ? index % images.length : 0, paused, setPaused, setInteracting, reducedMotion}
}
