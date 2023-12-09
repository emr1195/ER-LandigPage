import React from 'react'
import {AppRouter} from './router/AppRouter'
import {AppTheme} from './theme/AppTheme'

const App = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  )
}

export default App
