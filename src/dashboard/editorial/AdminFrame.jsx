import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {findSection} from './sections'
import {Icon} from './Icon'
import {SectionEditor} from './SectionEditor'
import {ConfirmDialog} from './ConfirmDialog'
import {ActivityPage} from './ActivityPage'
import {ReauthDialog} from './ReauthDialog'
import {saveResumeDraft} from './resumeDraft'
import {useAppearance} from './useAppearance'
import {AdminSidebar} from './AdminSidebar'
import {AdminHome} from './AdminHome'
import {useSidebar} from './useSidebar'
export const AdminFrame = ({user, error, onLogout, onReauthenticated}) => {
  const navigation = useSidebar()
  const {open, setOpen, mobile} = navigation
  const [dirty, setDirty] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [expired, setExpired] = useState(false)
  const [sessionVersion, setSessionVersion] = useState(0)
  const [sessionError, setSessionError] = useState('')
  const context = useRef(null)
  const registerContext = useCallback((value) => {
    context.current = value
  }, [])
  const expire = useCallback(() => setExpired(true), [])
  const preferences = useAppearance(expire, sessionVersion)
  const performLogout = async () => {
    const restore = context.current?.allowExit?.()
    try {
      await onLogout()
    } catch (reason) {
      restore?.()
      setSessionError(reason.message)
    }
  }
  const key = useLocation().pathname.split('/')[2]
  const section = findSection(key)
  useEffect(() => {
    document.getElementById('admin-main')?.focus({preventScroll: true})
    window.scrollTo(0, 0)
  }, [key])
  return (
    <div className="admin-app" data-appearance={preferences.appearance}>
      <a className="admin-skip" href="#admin-main">
        Ir al contenido
      </a>
      {open && (
        <button
          className="admin-overlay"
          aria-hidden="true"
          tabIndex={-1}
          onClick={() => setOpen(false)}
        />
      )}
      <AdminSidebar
        navigation={navigation}
        user={user}
        preferences={preferences}
        activeKey={key}
      />
      <div className="admin-body" inert={mobile && open ? '' : undefined}>
        <header className="admin-topbar">
          <button
            className="admin-menu-button admin-icon-button"
            aria-label="Abrir navegación"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Icon name="bars" />
          </button>
          <span>Tu contenido, siempre al día.</span>
          <button
            className="admin-text-button"
            disabled={publishing}
            onClick={() => (dirty ? setLeaving(true) : performLogout())}
          >
            Cerrar sesión
          </button>
        </header>
        <main id="admin-main" className="admin-main" tabIndex={-1}>
          {error && (
            <p role="alert" className="admin-alert">
              {error}
            </p>
          )}
          {sessionError && (
            <p role="alert" className="admin-alert">
              {sessionError}
            </p>
          )}
          {section ? (
            <>
              <div className="admin-page-heading">
                <p className="admin-eyebrow">
                  CONTENIDO DEL SITIO / {section.label}
                </p>
                <h1>{section.label}</h1>
                <p>{section.description}</p>
              </div>
              <SectionEditor
                key={key}
                section={section}
                userId={user.uid}
                onContext={registerContext}
                onSessionExpired={expire}
                sessionExpired={expired}
                onEditingChange={setDirty}
                onPublishingChange={setPublishing}
              />
            </>
          ) : key === 'activity' ? (
            <ActivityPage
              onSessionExpired={expire}
              sessionVersion={sessionVersion}
            />
          ) : (
            <AdminHome unknown={Boolean(key)} />
          )}
        </main>
      </div>
      {expired && (
        <ReauthDialog
          onBeforeGoogle={() => saveResumeDraft(user.uid, key, context.current)}
          onSuccess={(value) => {
            onReauthenticated(value)
            setExpired(false)
            setSessionVersion((value) => value + 1)
          }}
          onLeave={() => setLeaving(true)}
        />
      )}
      {leaving && (
        <ConfirmDialog
          title="Cambios sin guardar"
          onCancel={() => setLeaving(false)}
          onConfirm={() => {
            setLeaving(false)
            performLogout()
          }}
        >
          <p>Al cerrar sesión se descartará la edición pendiente.</p>
        </ConfirmDialog>
      )}
    </div>
  )
}
