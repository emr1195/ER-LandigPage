import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {AuthRoutes} from '../auth/routes/AuthRoutes'
import {DashboardRoutes} from '../dashboard/routes/DashboardRoutes'
import {HomepageRoutes} from '../homepage/routes/HomepageRoutes.jsx';
import {CheckingAuth} from '../ui'
import {useCheckAuth} from '../hooks'

export const AppRouter = () => {
  // Retrieve authentication status using the useCheckAuth hook
  const {status} = useCheckAuth()

  // Show loading state while checking authentication
  // if (status === 'checking') {
  //   return <CheckingAuth />
  // }

  const authenticatedRoutes = (
    <>
      {/* Routes for authenticated users */}
      <Route path="/dashboard/*" element={<DashboardRoutes />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      {/* <Route path="/*" element={<HomepageRoutes />} /> */}
    </>
  )

  const unauthenticatedRoutes = (
    <>
      {/* Routes for unauthenticated users */}
      <Route path="/dashboard*" element={<AuthRoutes />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      {/* <Route path="/*" element={<HomepageRoutes />} /> */}
    </>
  )

  return (
    <Routes>
      {/* Conditionally render routes based on authentication status */}
      {status === 'authenticated' ? authenticatedRoutes : unauthenticatedRoutes}
      <Route path="/" element={<HomepageRoutes />} />
    </Routes>
  )
}
