import {useEffect, useRef, useState} from 'react'
const query = '(max-width: 1024px)'
export const useSidebar = () => {
  const [mobile, setMobile] = useState(() => window.matchMedia(query).matches)
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => {
      setMobile(media.matches)
      if (!media.matches) setOpen(false)
    }
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    if (!mobile || !open) return
    const previous = document.activeElement
    ref.current?.querySelector('button')?.focus()
    return () => {
      if (previous?.isConnected) previous.focus()
    }
  }, [mobile, open])
  const onKeyDown = (event) => {
    if (!mobile || !open) return
    if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
    }
    if (event.key !== 'Tab') return
    const controls = [
      ...ref.current.querySelectorAll(
        'a[href],button:not([disabled]),select:not([disabled]),input:not([disabled])',
      ),
    ].filter((element) => element.getClientRects().length)
    const first = controls[0],
      last = controls.at(-1)
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }
  return {mobile, open, setOpen, ref, onKeyDown}
}
