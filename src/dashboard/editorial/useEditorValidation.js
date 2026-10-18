import {useCallback, useEffect, useRef} from 'react'

export const useEditorValidation = (errors, setView) => {
  const form = useRef(null)
  const pending = useRef(0)
  const reveal = useCallback(
    (selector) => {
      setView('edit')
      cancelAnimationFrame(pending.current)
      pending.current = requestAnimationFrame(() => {
        const control = form.current?.querySelector(selector)
        if (!control) return
        for (
          let parent = control.parentElement;
          parent && parent !== form.current;
          parent = parent.parentElement
        ) {
          if (parent.tagName === 'DETAILS') parent.open = true
        }
        control.focus()
      })
    },
    [setView],
  )
  useEffect(() => {
    if (Object.keys(errors || {}).length)
      reveal(
        'input[aria-invalid="true"], select[aria-invalid="true"], textarea[aria-invalid="true"]',
      )
    return () => cancelAnimationFrame(pending.current)
  }, [errors, reveal])
  return {
    form,
    validate: () => {
      if (form.current.checkValidity()) return true
      reveal('input:invalid, select:invalid, textarea:invalid')
      return false
    },
  }
}
