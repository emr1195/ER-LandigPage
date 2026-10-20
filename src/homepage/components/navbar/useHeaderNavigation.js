import {useEffect, useState} from 'react'
import {navigationTarget} from '../navigation/SiteLink'

// Follow real section positions without changing configured destinations.
export const useHeaderNavigation = (links, header) => {
  const [activeIndex, setActiveIndex] = useState(-1)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 12)
      const atBottom = document.documentElement.scrollHeight > window.innerHeight && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      const offset = atBottom ? window.innerHeight : (header.current?.getBoundingClientRect().height || 84) + 32
      let current = -1
      let closest = -Infinity
      links.forEach((item, index) => {
        if (item.outsideURL || item.disabled || item.disable) return
        const target = new URL(navigationTarget(item), window.location.href)
        if (target.pathname !== window.location.pathname) return
        if (!target.hash) {
          if (item.title.trim().toLocaleLowerCase('es') === 'inicio' && current === -1) current = index
          return
        }
        let id
        try { id = decodeURIComponent(target.hash.slice(1)) } catch { return }
        const section = document.getElementById(id)
        if (!section) return
        const top = section.getBoundingClientRect().top
        if (top <= offset && top >= closest) { current = index; closest = top }
      })
      setActiveIndex(current)
    }
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, {passive: true})
    window.addEventListener('resize', schedule)
    window.addEventListener('hashchange', schedule)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('hashchange', schedule)
    }
  }, [links, header])
  return {activeIndex, scrolled}
}
