import {useCallback, useEffect, useState} from 'react'
import {readContent, publishContent} from './contentApi'
import {contentIdentity} from './contentIdentity'
import {consumeResumeDraft} from './resumeDraft'
import {normalizeDraft} from './defaultContent'

export const useSectionDraft = (sectionKey, userId) => {
  const [resume] = useState(() => consumeResumeDraft(userId, sectionKey))
  const [snapshot, setSnapshot] = useState(null)
  const [draft, setDraft] = useState(null)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
  const [discarding, setDiscarding] = useState(false)
  const [message, setMessage] = useState('')
  const [attempt, setAttempt] = useState(0)
  const [latest, setLatest] = useState(null)
  const [uncertain, setUncertain] = useState(() => resume?.uncertain || null)
  const changeDraft = useCallback((next) => {
    setDraft(next)
    setError((value) => (value?.status === 400 ? null : value))
    setMessage('')
  }, [])
  useEffect(() => {
    let active = true
    setError(null)
    if (resume) {
      setSnapshot(resume.snapshot)
      setDraft(resume.draft)
      return () => {
        active = false
      }
    }
    readContent(sectionKey)
      .then((value) => {
        if (!active) return
        const data = normalizeDraft(sectionKey, value.data)
        setSnapshot({...value, data})
        setDraft(structuredClone(data))
      })
      .catch((reason) => {
        if (active) setError(reason)
      })
    return () => {
      active = false
    }
  }, [sectionKey, attempt, resume])
  const dirty = Boolean(
    draft &&
      snapshot &&
      contentIdentity(draft) !== contentIdentity(snapshot.data),
  )
  const discard = async () => {
    if (saving || discarding) return false
    setDiscarding(true)
    try {
      const current = await readContent(sectionKey)
      const data = normalizeDraft(sectionKey, current.data)
      setSnapshot({...current, data})
      setDraft(structuredClone(data))
      setLatest(null)
      setError(null)
      setUncertain(false)
      setMessage('')
      return true
    } catch (reason) {
      setError(reason)
      return false
    } finally {
      setDiscarding(false)
    }
  }
  const publish = async () => {
    if (saving || discarding) return
    setSaving(true)
    setError(null)
    setMessage('')
    let base = snapshot
    let attempted = null
    try {
      if (uncertain) {
        const current = await readContent(sectionKey)
        const currentData = normalizeDraft(sectionKey, current.data)
        if (
          publicationIdentity(sectionKey, currentData) ===
          publicationIdentity(sectionKey, uncertain.data)
        ) {
          base = {...current, data: currentData}
          setSnapshot(base)
          setUncertain(null)
          if (
            publicationIdentity(sectionKey, currentData) ===
            publicationIdentity(sectionKey, draft)
          ) {
            setDraft(structuredClone(currentData))
            setMessage('Contenido publicado. Confirmamos el guardado anterior.')
            return
          }
        } else if (current.revision !== uncertain.revision) {
          const conflict = new Error(
            'Otro administrador publicó cambios. Conservamos tu edición para que puedas revisarla.',
          )
          conflict.status = 412
          throw conflict
        }
      }
      attempted = {data: structuredClone(draft), revision: base.revision}
      const saved = await publishContent(sectionKey, draft, base.revision)
      const data = normalizeDraft(sectionKey, saved.data)
      setSnapshot({...saved, data})
      setDraft(structuredClone(data))
      setUncertain(false)
      setMessage('Contenido publicado. Ya está visible en tu sitio.')
    } catch (reason) {
      setError(reason)
      if (!reason.status && attempted) setUncertain(attempted)
    } finally {
      setSaving(false)
    }
  }
  const consultLatest = async () => {
    try {
      const value = await readContent(sectionKey)
      setLatest({...value, data: normalizeDraft(sectionKey, value.data)})
    } catch (reason) {
      setError(reason)
    }
  }
  const adoptLatest = () => {
    setSnapshot(latest)
    setDraft(structuredClone(latest.data))
    setLatest(null)
    setError(null)
    setUncertain(false)
    setMessage('')
  }
  return {
    draft,
    setDraft: changeDraft,
    snapshot,
    dirty,
    error,
    saving,
    discarding,
    uncertain,
    message,
    discard,
    publish,
    latest,
    consultLatest,
    adoptLatest,
    retry: () => setAttempt((value) => value + 1),
  }
}

const publicationIdentity = (key, value) => {
  const data = normalizeDraft(key, value)
  if (key === 'detachment')
    data.detachments = data.detachments.map((record) => ({
      ...record,
      name: record.name.trim(),
      number: record.number.trim(),
      mapsUrl: record.mapsUrl.trim(),
    }))
  return contentIdentity(data)
}
