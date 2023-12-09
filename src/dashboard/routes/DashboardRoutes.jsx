import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {DashboardPage} from '../pages/DashboardPage'

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
