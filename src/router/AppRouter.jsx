import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {AuthRoutes} from '../auth/routes/AuthRoutes'
import {DashboardRoutes} from '../dashboard/routes/DashboardRoutes'
import {HomepageRoutes} from '../homepage/routes/HomePageRoutes.jsx'
import {CheckingAuth} from '../ui'
import {useCheckAuth} from '../hooks'
import {apiOrigin, externalApi} from '../api/deployment'

const ServerDashboard = () => {
  React.useEffect(() => { window.location.replace(`${apiOrigin}/auth/login`) }, [])
  return <p>Abriendo el dashboard seguro… <a href={`${apiOrigin}/auth/login`}>Continuar al dashboard</a></p>
}

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
      <Route path="/dashboard/*" element={<AuthRoutes />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      {/* <Route path="/*" element={<HomepageRoutes />} /> */}
    </>
  )

  return (
    <Routes>
      {/* Conditionally render routes based on authentication status */}
      {externalApi ? <>
        <Route path="/dashboard/*" element={<ServerDashboard />} />
        <Route path="/auth/*" element={<ServerDashboard />} />
      </> : status === 'authenticated' ? authenticatedRoutes : unauthenticatedRoutes}
      <Route path="/*" element={<HomepageRoutes />} />
    </Routes>
  )
}
