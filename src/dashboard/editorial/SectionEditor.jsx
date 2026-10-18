import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useBlocker} from 'react-router-dom'
import {editorViews} from './editorViews'
import {PreviewFrame} from './PreviewFrame'
import {ConfirmDialog} from './ConfirmDialog'
import {useSectionDraft} from './useSectionDraft'
import {Icon} from './Icon'
import {PublicationFeedback} from './PublicationFeedback'
import {useUploadQueue, UploadContext} from './useUploads'
import {ValidationContext} from './formChanges'

export const SectionEditor = ({
  section,
  userId,
  onEditingChange,
  onContext,
  onSessionExpired,
  sessionExpired,
  onPublishingChange,
}) => {
  const Form = editorViews[section.key]
  const editor = useSectionDraft(section.key, userId)
  const uploads = useUploadQueue()
  const dirty = editor.dirty || uploads.pending || uploads.failed
  const exitAuthorized = useRef(false)
  const allowExit = useCallback(() => {
    exitAuthorized.current = true
    return () => {
      exitAuthorized.current = false
    }
  }, [])
  useEffect(() => {
    onContext?.({
      draft: editor.draft,
      snapshot: editor.snapshot,
      dirty,
      saving: editor.saving,
      uncertain: editor.uncertain,
      cancelUploads: uploads.cancelAll,
      allowExit,
    })
    return () => onContext?.(null)
  }, [
    editor.draft,
    editor.snapshot,
    editor.saving,
    editor.uncertain,
    dirty,
    uploads.cancelAll,
    onContext,
    allowExit,
  ])
  useEffect(() => {
    onPublishingChange?.(editor.saving)
    return () => onPublishingChange?.(false)
  }, [editor.saving, onPublishingChange])
  useEffect(() => {
    if (editor.error?.status === 401) onSessionExpired?.()
  }, [editor.error, onSessionExpired])
  const [view, setView] = useState('edit')
  const blocker = useBlocker(
    ({currentLocation, nextLocation}) =>
      !exitAuthorized.current &&
      (dirty || editor.saving) &&
      currentLocation.pathname !== nextLocation.pathname,
  )
  useEffect(() => {
    if (blocker.state === 'blocked' && !dirty && !editor.saving)
      blocker.proceed()
  }, [blocker, dirty, editor.saving])
  useEffect(() => {
    onEditingChange(dirty)
    return () => onEditingChange(false)
  }, [dirty, onEditingChange])
  useEffect(() => {
    const warn = (event) => {
      if (dirty && !exitAuthorized.current) {
        event.preventDefault()
        event.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])
  if (!editor.draft)
    return (
      <div className="admin-panel">
        {editor.error ? (
          <>
            <p role="alert">{editor.error.message}</p>
            <button className="admin-button" onClick={editor.retry}>
              Reintentar
            </button>
          </>
        ) : (
          <p role="status">Cargando contenido…</p>
        )}
      </div>
    )
  const submit = (event) => {
    event.preventDefault()
    if (uploads.pending || uploads.failed) return
    if (event.currentTarget.checkValidity()) editor.publish()
    else event.currentTarget.querySelector(':invalid')?.focus()
  }
  return (
    <ValidationContext.Provider value={editor.error?.fields || {}}>
      <UploadContext.Provider
        value={{...uploads, sectionKey: section.key, onSessionExpired}}
      >
        <div className="admin-editor-status">
          <span className={editor.dirty ? 'admin-dirty' : 'admin-clean'}>
            {editor.dirty ? 'Cambios sin guardar' : 'Al día'}
          </span>
        </div>
        <div className="admin-view-switch" aria-label="Modo de edición">
          <button
            className="admin-button admin-button-secondary"
            aria-pressed={view === 'edit'}
            onClick={() => setView('edit')}
          >
            Editar
          </button>
          <button
            className="admin-button admin-button-secondary"
            aria-pressed={view === 'preview'}
            onClick={() => setView('preview')}
          >
            Vista previa
          </button>
        </div>
        <form onSubmit={submit} noValidate>
          <div className={'admin-editor-grid admin-view-' + view}>
            <div className="admin-panel admin-edit-panel">
              <fieldset
                disabled={editor.saving || editor.discarding || sessionExpired}
              >
                <Form value={editor.draft} onChange={editor.setDraft} />
              </fieldset>
            </div>
            <PreviewFrame sectionKey={section.key} data={editor.draft} />
          </div>
          <PublicationFeedback
            editor={editor}
            sectionKey={section.key}
            onDiscard={uploads.cancelAll}
          />
          <footer className="admin-publish-bar">
            <p>
              Al publicar, los cambios estarán visibles
              <br />
              para todos los visitantes.
            </p>
            <div>
              <button
                type="button"
                className="admin-button admin-button-secondary"
                disabled={!dirty || editor.saving || editor.discarding}
                onClick={() => editor.discard(uploads.cancelAll)}
              >
                {editor.discarding ? 'Cargando…' : 'Descartar'}
              </button>
              <button
                className="admin-button"
                type="submit"
                disabled={
                  !editor.dirty ||
                  editor.saving ||
                  editor.discarding ||
                  uploads.pending ||
                  uploads.failed
                }
              >
                {editor.saving ? 'Publicando…' : 'Guardar y publicar'}
              </button>
            </div>
          </footer>
          <p className="admin-audit-note">
            <Icon name="shield" /> Los cambios quedarán registrados.
          </p>
        </form>
        {blocker.state === 'blocked' && (
          <ConfirmDialog
            title={
              editor.saving ? 'Publicación en curso' : 'Cambios sin guardar'
            }
            confirm={editor.saving ? null : 'Descartar cambios'}
            onCancel={() => blocker.reset()}
            onConfirm={() => blocker.proceed()}
          >
            <p>
              {editor.saving
                ? 'Espera a que termine la publicación antes de salir.'
                : 'Si sales ahora, se descartarán los cambios de esta sección.'}
            </p>
          </ConfirmDialog>
        )}
      </UploadContext.Provider>
    </ValidationContext.Provider>
  )
}
