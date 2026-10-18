import React, {useEffect} from 'react'
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import {LoginPage} from '../pages'
import {useSelector} from 'react-redux'

export const AuthRoutes = () => {
  // Retrieve authentication status using the useCheckAuth hook
  const {status} = useSelector((state) => state.auth)
  // Use the useNavigate hook to get the navigate function
  const navigate = useNavigate()

  // Routes for authenticated users
  const authenticatedRoutes = (
    <>
      {/* Routes for authenticated users */}
      <Route path="login" element={<LoginPage />} />
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </>
  )

  const unauthenticatedRoutes = (
    <>
      {/* Routes for unauthenticated users */}
      <Route path="login" element={<LoginPage />} />
      {/* <Route path="register" element={<RegisterPage />} /> */}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </>
  )

  // Redirect to /dashboard/ after successful login
  useEffect(() => {
    if (status === 'authenticated') {
      navigate('/dashboard', {replace: true})
    }
  }, [status, navigate])

  return (
    <Routes>
      {status === 'authenticated' ? authenticatedRoutes : unauthenticatedRoutes}
    </Routes>
  )
}
