import React, {useEffect, useState} from 'react'
import {getAuthorizedUser, logout} from '../../api/auth'
import {LoginScreen} from './LoginScreen'
import {Navigate, useLocation, useNavigate} from 'react-router-dom'
import {clearResumeDraft} from './resumeDraft'
import {AdminFrame} from './AdminFrame'
import {loginDestination} from './loginDestination'
import './admin.css'
export const AdminApp = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    let active = true
    getAuthorizedUser()
      .then((value) => {
        if (active) setUser(value)
      })
      .catch((reason) => {
        if (active && reason.status !== 401) setError(reason.message)
      })
      .finally(() => {
        if (active) setChecking(false)
      })
    return () => {
      active = false
    }
  }, [])
  if (checking)
    return (
      <div className="admin-app admin-loading" role="status">
        Comprobando tu acceso…
      </div>
    )
  if (!user)
    return (
      <LoginScreen
        error={error}
        onSuccess={(value) => {
          setUser(value)
          setError('')
          if (!location.pathname.startsWith('/dashboard')) {
            navigate(loginDestination(location), {replace: true})
          }
        }}
      />
    )
  if (location.pathname.startsWith('/auth'))
    return <Navigate to="/dashboard" replace />
  return (
    <AdminFrame
      key={user.uid}
      user={user}
      error={error}
      onReauthenticated={setUser}
      onLogout={async () => {
        await logout()
        clearResumeDraft()
        setUser(null)
        navigate('/auth/login', {replace: true})
      }}
    />
  )
}
