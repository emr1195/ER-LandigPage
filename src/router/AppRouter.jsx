import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {AuthRoutes} from '../auth/routes/AuthRoutes'
import {DashboardRoutes} from '../dashboard/routes/DashboardRoutes'
import {HomepageRoutes} from '../homepage/routes/HomepageRoutes'

export const AppRouter = () => {
  return (
    <Routes>
      {/* Login Y Registro*/}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* Dashboard */}
      <Route path="/dashboard/*" element={<DashboardRoutes />} />

      {/* Landing Page */}
      <Route path="/*" element={<HomepageRoutes />} />
    </Routes>
  )
}
