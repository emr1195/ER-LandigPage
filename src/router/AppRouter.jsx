import React from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import {HomepageRoutes} from '../homepage/routes/HomePageRoutes'
import {apiOrigin, externalApi} from '../api/deployment'
const WalkthroughPage = React.lazy(() => import('../walkthrough/WalkthroughPage'))
const AdminApp = React.lazy(() =>
  import('../dashboard/editorial/AdminApp').then((module) => ({
    default: module.AdminApp,
  })),
)
const PreviewPage = React.lazy(() =>
  import('../dashboard/editorial/PreviewPage').then((module) => ({
    default: module.PreviewPage,
  })),
)

const AdministrativeRoute = () => {
  const location = useLocation()
  const destination =
    apiOrigin +
    '/auth/login?returnTo=' +
    encodeURIComponent(
      location.pathname.startsWith('/dashboard')
        ? location.pathname
        : '/dashboard',
    )
  React.useEffect(() => {
    if (externalApi) window.location.replace(destination)
  }, [destination])
  return externalApi ? (
    <p>
      Abriendo el dashboard seguro…{' '}
      <a href={destination}>Continuar al dashboard</a>
    </p>
  ) : (
    <AdminApp />
  )
}
export const AppRouter = () => (
  <React.Suspense fallback={<p role="status">Cargando…</p>}>
    <Routes>
      <Route path="/walkthrough" element={<WalkthroughPage />} />
      <Route path="/walktrough" element={<WalkthroughPage />} />
      <Route path="/preview/:sectionKey" element={<PreviewPage />} />
      <Route path="/dashboard/*" element={<AdministrativeRoute />} />
      <Route path="/auth/*" element={<AdministrativeRoute />} />
      <Route path="/*" element={<HomepageRoutes />} />
    </Routes>
  </React.Suspense>
)
